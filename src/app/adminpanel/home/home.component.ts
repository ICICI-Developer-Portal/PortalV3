import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { WARN } from 'config/properties';

/**
 * File node data with nested structure.
 * Each node has a filename, and a type or a list of children.
 */
export class FileNode {
  id: string;
  children: FileNode[];
  filename: string;
  type: any;
}

/** Flat node with expandable and level information */
export class FileFlatNode {
  constructor(
    public expandable: boolean,
    public filename: string,
    public level: number,
    public type: any,
    public id: string,
  ) {}
}

/**
 * The file structure tree data in string. The data could be parsed into a Json object
 */
const TREE_DATA = JSON.stringify({
  Applications: {
    Calendar: 'app',
    Chrome: 'app',
    Webstorm: 'app',
  },
  Documents: {
    angular: {
      src: {
        compiler: 'ts',
        core: 'ts',
      },
    },
    material2: {
      src: {
        button: 'ts',
        checkbox: 'ts',
        input: 'ts',
      },
    },
  },
  Downloads: {
    October: 'pdf',
    November: 'pdf',
    Tutorial: 'html',
  },
  Pictures: {
    'Photo Booth Library': {
      Contents: 'dir',
      Pictures: 'dir',
    },
    Sun: 'png',
    Woods: 'jpg',
  },
});

const TREE_DATA1 = JSON.stringify({
  'Building Blocks': {
    'Pre approved offers': {
      'Get Pre approved offers': {
        API_ID: '1',
      },
      'Get Pre approved offers On Customer ID': {
        API_ID: '1',
      },
      'Get Pre approved offers On Mobile': {
        API_ID: '1',
      },
      'Pre Approved Offers': {
        API_ID: '1',
      },
      'Block Pre approved offers': {
        API_ID: '1',
      },
    },
    'Customer Authentication': {
      'OTP Generation': {
        API_ID: '1',
      },
      'OTP Verification': {
        API_ID: '1',
      },
      'Aadhar Based OTP Generation': {
        API_ID: '1',
      },
      'Aadhar Based OTP Verification': {
        API_ID: '1',
      },
    },
    'New Customer Onboarding': {
      'Demographic Details': {
        'State Locator': {
          API_ID: '1',
        },
        'City Locator': {
          API_ID: '1',
        },
        'Company Locator': {
          API_ID: '1',
        },
        'Esign (Initial)': {
          API_ID: '1',
        },
        'Esign (Final)': {
          API_ID: '1',
        },
      },
      Account: {
        'Choose Your Account': {
          API_ID: '1',
        },
        'Customer Registeration': {
          API_ID: '1',
        },
        'Account Activation': {
          API_ID: '1',
        },
      },
      'Additional Features': {
        'Face Reader': {
          API_ID: '1',
        },
        'Image Reader': {
          API_ID: '1',
        },
      },
    },
    'Bureau Check': {
      API_ID: '1',
    },
    'PAN Validation': {
      API_ID: '1',
    },
    'Eligibility Check': {
      API_ID: '1',
    },
  },
});

/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
@Injectable()
export class FileDatabase {
  dataChange = new BehaviorSubject<FileNode[]>([]);
  responseData: any;

  get data(): FileNode[] {
    return this.dataChange.value;
  }

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
  ) {
    this.initialize();
  }

  initialize() {
    //api for get tree data
    this.dashboardService.getMenuTreeData().subscribe((data: any) => {
      this.responseData = data._body;
      // Parse the string to json object.
      const dataObject = JSON.parse(this.responseData);

      // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
      //     file node as children.
      const data1 = this.buildFileTree(dataObject, 0);

      // Notify the change.
      this.dataChange.next(data1);
    },
    err => {
      console.log('err', err);
      //this.router.navigate(['error']);
    },);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.
   */
  buildFileTree(
    obj: { [key: string]: any },
    level: number,
    parentId: string = '0',
  ): FileNode[] {
    return Object.keys(obj).reduce<FileNode[]>((accumulator, key, idx) => {
      const value = obj[key];
      const node = new FileNode();
      node.filename = key;
      /**
       * Make sure your node has an id so we can properly rearrange the tree during drag'n'drop.
       * By passing parentId to buildFileTree, it constructs a path of indexes which make
       * it possible find the exact sub-array that the node was grabbed from when dropped.
       */
      node.id = `${parentId}/${idx}`;

      if (value != null) {
        if (typeof value === 'object') {
          if (value.API_ID) {
            //node.type = 'value';
          } else node.children = this.buildFileTree(value, level + 1, node.id);
        } else {
          node.type = value;
        }
      }
      if (key != 'ID') {
        return accumulator.concat(node);
      } else return accumulator;
    }, []);
  }
}

/**
 * @title Tree with flat nodes
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [FileDatabase],
})
export class HomeComponent {
  treeControl: FlatTreeControl<FileFlatNode>;
  treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;
  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;
  expandedNodeSet = new Set<string>();
  dragging = false;
  expandTimeout: any;
  expandDelay = 1000;
  color = 'primary';

  constructor(database: FileDatabase, private router: Router) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this._getLevel,
      this._isExpandable,
      this._getChildren,
    );
    this.treeControl = new FlatTreeControl<FileFlatNode>(
      this._getLevel,
      this._isExpandable,
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener,
    );

    database.dataChange.subscribe(data => this.rebuildTreeForData(data));
  }

  transformer = (node: FileNode, level: number) => {
    return new FileFlatNode(
      !!node.children,
      node.filename,
      level,
      node.type,
      node.id,
    );
  };
  private _getLevel = (node: FileFlatNode) => node.level;
  private _isExpandable = (node: FileFlatNode) => node.expandable;
  private _getChildren = (node: FileNode): Observable<FileNode[]> =>
    observableOf(node.children);
  hasChild = (_: number, _nodeData: FileFlatNode) => _nodeData.expandable;

  /**
   * This constructs an array of nodes that matches the DOM,
   * and calls rememberExpandedTreeNodes to persist expand state
   */
  visibleNodes(): FileNode[] {
    this.rememberExpandedTreeNodes(this.treeControl, this.expandedNodeSet);
    const result = [];

    function addExpandedChildren(node: FileNode, expanded: Set<string>) {
      result.push(node);
      if (expanded.has(node.id)) {
        node.children.map(child => addExpandedChildren(child, expanded));
      }
    }
    this.dataSource.data.forEach(node => {
      addExpandedChildren(node, this.expandedNodeSet);
    });
    return result;
  }

  /**
   * Handle the drop - here we rearrange the data based on the drop event,
   * then rebuild the tree.
   * */
  drop(event: CdkDragDrop<string[]>) {
    // console.log('origin/destination', event.previousIndex, event.currentIndex);

    // ignore drops outside of the tree
    if (!event.isPointerOverContainer) return;

    // construct a list of visible nodes, this will match the DOM.
    // the cdkDragDrop event.currentIndex jives with visible nodes.
    // it calls rememberExpandedTreeNodes to persist expand state
    const visibleNodes = this.visibleNodes();

    // deep clone the data source so we can mutate it
    const changedData = JSON.parse(JSON.stringify(this.dataSource.data));

    // recursive find function to find siblings of node
    function findNodeSiblings(arr: Array<any>, id: string): Array<any> {
      let result, subResult;
      arr.forEach(item => {
        if (item.id === id) {
          result = arr;
        } else if (item.children) {
          subResult = findNodeSiblings(item.children, id);
          if (subResult) result = subResult;
        }
      });

      return result;
    }

    // remove the node from its old place
    const node = event.item.data;
    const siblings = findNodeSiblings(changedData, node.id);
    const siblingIndex = siblings.findIndex(n => n.id === node.id);
    const nodeToInsert: FileNode = siblings.splice(siblingIndex, 1)[0];

    // determine where to insert the node
    const nodeAtDest = visibleNodes[event.currentIndex];
    if (nodeAtDest.id === nodeToInsert.id) return;

    // determine drop index relative to destination array
    let relativeIndex = event.currentIndex; // default if no parent
    const nodeAtDestFlatNode = this.treeControl.dataNodes.find(
      n => nodeAtDest.id === n.id,
    );
    const parent = this.getParentNode(nodeAtDestFlatNode);
    if (parent) {
      const parentIndex = visibleNodes.findIndex(n => n.id === parent.id) + 1;
      relativeIndex = event.currentIndex - parentIndex;
    }
    // insert node
    const newSiblings = findNodeSiblings(changedData, nodeAtDest.id);
    if (!newSiblings) return;
    newSiblings.splice(relativeIndex, 0, nodeToInsert);
    let finalObj = this.createFinalObject(changedData, undefined);

    // rebuild tree with mutated data
    this.rebuildTreeForData(changedData);
  }

  createFinalObject(array, order) {
    let object = {};
    if (order != undefined) {
      object['menuOrder'] = order;
    }

    array.forEach(async (each, index) => {
      if (each.children && each.children.length > 0) {
        object[each.filename] = await this.createFinalObject(
          each.children,
          index,
        );
      } else
        object[each.filename] = {
          API_ID: '1',
          menuOrder: index,
          id: each.filename + '_' + index,
        };
    });
    this.sortFinalObject(object);
    return object;
  }

  //   sortFinalObject(object){
  //     var sorted = {};
  //     Object
  //     .keys(object).sort(function(a, b){
  //         return object[b].menuOrder - object[a].score;
  //     })
  //     .forEach(function(key) {
  //         sorted[key] = data[key];
  //     });

  // console.log(sorted);
  //   }

  sortFinalObject(data): Array<object> {
    let tempArray = [];
    Object.keys(data).forEach(async (eachKey, index) => {
      let tempObj = { menuName: eachKey, menuOrder: index };
      if (typeof data[eachKey] == 'object' && !data[eachKey].API_ID) {
        //parent node
        tempObj['children'] = this.sortFinalObject(data[eachKey]);
      } else if (typeof data[eachKey] == 'object' && data[eachKey].API_ID) {
        //child
        tempObj['API_ID'] = data[eachKey].API_ID;
      }
      tempArray.push(tempObj);
    });

    tempArray = tempArray.sort((a, b) =>
      a.menuOrder > b.menuOrder ? 1 : b.menuOrder > a.menuOrder ? -1 : 0,
    );

    return tempArray;
  }

  /**
   * Experimental - opening tree nodes as you drag over them
   */
  dragStart() {
    this.dragging = true;
  }
  dragEnd() {
    this.dragging = false;
  }
  dragHover(node: FileFlatNode) {
    if (this.dragging) {
      clearTimeout(this.expandTimeout);
      this.expandTimeout = setTimeout(() => {
        this.treeControl.expand(node);
      }, this.expandDelay);
    }
  }
  dragHoverEnd() {
    if (this.dragging) {
      clearTimeout(this.expandTimeout);
    }
  }

  /**
   * The following methods are for persisting the tree expand state
   * after being rebuilt
   */

  rebuildTreeForData(data: any) {
    this.rememberExpandedTreeNodes(this.treeControl, this.expandedNodeSet);
    this.dataSource.data = data;
    this.forgetMissingExpandedNodes(this.treeControl, this.expandedNodeSet);
    this.expandNodesById(
      this.treeControl.dataNodes,
      Array.from(this.expandedNodeSet),
    );
  }

  private rememberExpandedTreeNodes(
    treeControl: FlatTreeControl<FileFlatNode>,
    expandedNodeSet: Set<string>,
  ) {
    if (treeControl.dataNodes) {
      treeControl.dataNodes.forEach(node => {
        if (treeControl.isExpandable(node) && treeControl.isExpanded(node)) {
          // capture latest expanded state
          expandedNodeSet.add(node.id);
        }
      });
    }
  }

  private forgetMissingExpandedNodes(
    treeControl: FlatTreeControl<FileFlatNode>,
    expandedNodeSet: Set<string>,
  ) {
    if (treeControl.dataNodes) {
      expandedNodeSet.forEach(nodeId => {
        // maintain expanded node state
        if (!treeControl.dataNodes.find(n => n.id === nodeId)) {
          // if the tree doesn't have the previous node, remove it from the expanded list
          expandedNodeSet.delete(nodeId);
        }
      });
    }
  }

  private expandNodesById(flatNodes: FileFlatNode[], ids: string[]) {
    if (!flatNodes || flatNodes.length === 0) return;
    const idSet = new Set(ids);
    return flatNodes.forEach(node => {
      if (idSet.has(node.id)) {
        this.treeControl.expand(node);
        let parent = this.getParentNode(node);
        while (parent) {
          this.treeControl.expand(parent);
          parent = this.getParentNode(parent);
        }
      }
    });
  }

  private getParentNode(node: FileFlatNode): FileFlatNode | null {
    const currentLevel = node.level;
    if (currentLevel < 1) {
      return null;
    }
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (currentNode.level < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  //  Fuction for Logout
  logout() {
    this.router.navigate(['admin/login']);
  }

  //Function for edit menu item
  editMenuItem() {
    alert('edit');
  }

  //Function for delete menu item
  deleteMenuItem(node) {
    console.log('node===', node);
    var deleteState;
    deleteState = confirm(WARN.DELETE);
    if (deleteState === true) {
      // const changedData = JSON.parse(JSON.stringify(this.dataSource.data));
      // console.log('changedData', changedData);
      // const siblings = this.findNodeSiblings(changedData, node.id);
      // console.log('siblings', siblings);
    } else {
      console.log('You pressed cancel!');
    }
  }
  // findNodeSiblings(arr: Array<any>, id: string): Array<any> {
  //   let result, subResult;
  //   arr.forEach(item => {
  //     if (item.id === id) {
  //       result = arr;
  //     } else if (item.children) {
  //       subResult = this.findNodeSiblings(item.children, id);
  //       if (subResult) result = subResult;
  //     }
  //   });

  //   return result;
  // }

  //Function for save menu items
  saveMenuItems() {
    alert('save');
  }

  //Function for update menu item
  updateMenuItems() {
    alert('update');
  }
  //Function for add menu item
  addMenuItems() {
    alert('add');
  }

  toggle(event) {
    console.log(event);
    console.log(event.checked);
  }
}
