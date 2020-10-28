import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DashboardService } from "src/app/services";
import { document } from "ngx-bootstrap";
import { ToasterService, Toast } from 'angular2-toaster';

declare var $: any;

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html"
})
export class SidebarComponent implements OnInit {
  treeDataKeys: any;
  responseData: any;
  menuArray: any[];
  tDataKeys: any[];
  treeArr: any[];
  treeItems: any;
  nodeId: any;
  nodeType: any;
  levels: any;
  treeData = [];
  treeData1: any[];
  treeElements: any;
  showMatSpinner: boolean = false;

  /** @class SidebarComponent
   * @constructor
   */
  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private toasterService: ToasterService
  ) {
    var counter2 = 0;
    //on load introduction active
    var check = setInterval(() => {
      if (this.router.url === "/documentation") {
        $(document).ready(function() {
          $(".sideMenu>.nav-pills li.nav-link")
            .removeClass("active")
            .removeClass("openDropdown");

          $(".intro")
            .addClass("active")
            .addClass("openDropdown");
        });
        counter2 = counter2 + 1;
      console.log(counter2)
      if (counter2 === 1) {
        clearInterval(check);
      }
      counter2 = 0;
      }
    }, 1000);
  }

  ngOnInit() {
    var self = this;
    //api for get menu tree data
    this.getMenuTree();

    //api for get tree data
    // this.dashboardService.getMenuTreeData().subscribe((data: any) => {
    //   this.responseData = JSON.parse(data._body);
    //   this.menuArray = this.getMenuData(this.responseData);
    // });
  }

  /** To send data to next page
   * @class SidebarComponent
   * @method assignClickToNodes
   */
  assignClickToNodes() {
    var self = this;
    $('.sideMenu>.nav-pills li.nav-link').off('click');

    $(".sideMenu>.nav-pills li.nav-link").click(function() {
      $(this)
        .siblings(".active")
        .removeClass("active");
      $(this).addClass("active");
    });

    $(".sideMenu>.nav-pills>li.nav-link a").click(function() {
      $(this)
        .parent()
        .siblings(".openDropdown")
        .removeClass("openDropdown");
      $(this)
        .parent()
        .toggleClass("openDropdown");
    });

    $(".sideMenu .openDropdown.active").click(function() {
      $(this).toggleClass("openDropdown");
    });

    $(".sideMenu .nav-pills-first-level>li.nav-link").click(function() {
      $(this)
        .siblings(".active")
        .removeClass("active");
      $(this).addClass("active");
    });

    $(".sideMenu .nav-pills-first-level>li.nav-link a").click(function() {
      $(this).removeClass("active show");
    });

    $(".sideMenu .nav-pills-second-level>li.nav-link").click(function() {
      $(this).toggleClass("openDropdown");
      $(this).addClass("active");
      $(this)
        .siblings(".openDropdown")
        .removeClass("openDropdown active");
    });

    $(".sideMenu .nav-pills-second-level>li.nav-link a").click(function() {
      $(this).removeClass("active show");
    });

    //for dynamic data click event handle
    $(document)
      .off("click")
      .on("click", ".tree-node", function(e) {
        var selectedId = $(this).attr("role");
        this.nodeId = selectedId.split("_").pop();
        var nodeType = selectedId.split("_", 2).pop();
        self.AppId(this.nodeId, nodeType);
      });
  }

  /** get menu tree data
   * @class SidebarComponent
   * @method getMenuTree
   */
  getMenuTree() {
    this.showMatSpinner = true;
    this.dashboardService.getMenuTreeData().subscribe((data: any) => {
      this.treeData = JSON.parse(data._body);
      this.createTreeAndJquery();
      this.showMatSpinner = false;
    },
    err => {
      console.log('err', err);
      //this.router.navigate(['error']);
      this.toastrmsg('error',"Something went wrong. Please try again in some time.");
    },);
  }

  toastrmsg(type ,title) {
    var toast: Toast = {
      type: type,
      title:"",
      body:title,
      showCloseButton: true 
    }; 
    this.toasterService.pop(toast);
  }

  /** create tree and jquery for menu tree expand/collapse
   * @class SidebarComponent
   * @method createTreeAndJquery
   */
  createTreeAndJquery() {
    this.treeElements = this.createTree();
    setTimeout(() => {
      this.assignClickToNodes();
    }, 1000);
  }

  /** create menu tree dynamically
   * @class SidebarComponent
   * @method createTree
   */
  createTree() {
    this.treeItems =
      `<li class="nav-link active intro">` +
      `<a id="v-pills-home-tab" data-toggle="pill"  href="#/documentation" role="tab" aria-controls="v-pills-home" aria-selected="true">Introduction` +
      `</a>` +
      `</li>` +
      ` <li class="nav-link">

        <a id="v-pills-messages-tab" data-toggle="pill"  href="#/security" role="tab" aria-controls="v-pills-messages" aria-selected="false"> Security` +
      `<img class="dropdownIcon" src="assets/images/dropdown-2.svg" alt="" />` +
      `</a>` +
      `<ul class="collapse nav-pills-first-level submenuLevelOne list-unstyled">` +
      `<li class="nav-link">` +
      `<a id="v-pills-List-Customer-Accounts-tab" class="tree-node" role="tab_api_1" data-toggle="pill" aria-selected="false" >Encryption` +
      `</a>` +
      `</li>` +
      `<li class="nav-link">` +
      `<a id="v-pills-List-Customer-Accounts-tab" class="tree-node" role="tab_api_2" data-toggle="pill" aria-selected="false" >Test API` +
      `</a>` +
      `</li>` +
      `<li class="nav-link">` +
      `<a id="v-pills-List-Customer-Accounts-tab" class="tree-node" role="tab_api_3" data-toggle="pill"  aria-selected="false" >` +
      `Decryption` +
      `</a>` +
      `</li>` +
      `</ul>` +
      `</li>`;

    for (var i = 0; i < this.treeData.length; i++) {
      if (this.treeData[i].CHILD_COUNT !== "0") {
        this.treeItems +=
          `<li class="nav-link">` +
          `<a id="v-pills-messages-tab" class="tree-node" data-toggle="pill"  role="tab_${this.treeData[i].TYPE}_${this.treeData[i].TREE_ID}" aria-controls="v-pills-home" aria-selected="true">` +
          `${this.treeData[i].TAB_NAME}` +
          `<img class="dropdownIcon" src="assets/images/dropdown-2.svg" alt=""/>` +
          `</a>`;

        if (this.treeData[i].CHILD_COUNT !== "0") {
          this.createUnorderedList(
            this.treeData[i].children,
            this.treeData[i].TYPE,
            this.treeData[i].LEVEL
          );
        }
      } else {
        this.treeItems +=
          `<li class="nav-link">` +
          `<a id="v-pills-messages-tab" class="tree-node" data-toggle="pill" role="tab_${this.treeData[i].TYPE}_${this.treeData[i].API_ID}" aria-controls="v-pills-home" aria-selected="true">` +
          `${this.treeData[i].TAB_NAME}` +
          `</a>` +
          `</span>`;
      }

      this.treeItems = this.treeItems + `</li>`;
    }
    this.treeItems += `<li class="nav-link viewAllLink">
        <a id="v-view-all-tab" data-toggle="pill"  href="#/viewallapi" role="tab" aria-controls="v-view-all" aria-selected="true">
          <div class="viewAllIcon">
            <i class="material-icons">dashboard</i>
          </div>
          VIEW ALL APIs
          <img
            class="viewAllDropdownActive"
            src="assets/images/dropdown-3.svg"
            alt=""
          />
          <img
            class="viewAllDropdown" 
            src="assets/images/dropdown-viewall.svg"
            alt=""
          />
        </a>
      </li>`;

    return this.treeItems;
  }

  /** Create menu tree sub nodes dynamically
   * @class SidebarComponent
   * @method createUnorderedList
   */
  createUnorderedList(childrenArr, nodeType, level) {
    if (level === "1") {
      this.treeItems += `<ul
      class="collapse nav-pills-first-level submenuLevelOne list-unstyled"
    >`;
    }
    if (level === "2") {
      this.treeItems += `<ul
      class="collapse nav-pills-first-level submenuLevelTwo list-unstyled"
    >`;
    }
    if (level >= "3") {
      this.treeItems += `<ul
      class="collapse nav-pills-third-level submenuLevelThree list-unstyled"
    >`;
    }

    for (var i = 0; i < childrenArr.length; i++) {
      if(childrenArr[i].TREE_ID =="556" || childrenArr[i].TREE_ID == "557" ||  childrenArr[i].TREE_ID == "325" || childrenArr[i].TREE_ID == "328"){}

      else{
      if (childrenArr[i].CHILD_COUNT !== "0") {

        this.treeItems +=
          `<li class="nav-link">` +
          `<a id="v-pills-messages-tab" class="tree-node" data-toggle="pill" role="tab_${childrenArr[i].TYPE}_${childrenArr[i].TREE_ID}" aria-controls="v-pills-home" aria-selected="true">` +
          `${childrenArr[i].TAB_NAME}` +
          `<img class="dropdownIcon" src="assets/images/dropdown-2.svg" alt="" />` +
          `</a>`;

        this.createUnorderedList(
          childrenArr[i].children,
          childrenArr[i].TYPE,
          childrenArr[i].LEVEL
        );
      } else {
        this.treeItems +=
          `<li class="nav-link">` +
          `<a id="v-pills-messages-tab" class="tree-node" data-toggle="pill" role="tab_${childrenArr[i].TYPE}_${childrenArr[i].API_ID}" aria-controls="v-pills-home" aria-selected="true">` +
          `${childrenArr[i].TAB_NAME}` +
          `</a>`;
      }

      this.treeItems += `</li>`;
    }
  }
    
    this.treeItems += `</ul>`;
  }

  /** get menu data
   * @class SidebarComponent
   * @method getMenuData
   */
  getMenuData(data): Array<object> {
    let tempArray = [];
    Object.keys(data).forEach(async (eachKey, index) => {
      let tempObj = { menuName: eachKey, menuOrder: index };
      if (typeof data[eachKey] == "object" && !data[eachKey].API_ID) {
        //parent node
        tempObj["children"] = this.getMenuData(data[eachKey]);
      } else if (typeof data[eachKey] == "object" && data[eachKey].API_ID) {
        //child
        tempObj["API_ID"] = data[eachKey].API_ID;
      }
      tempArray.push(tempObj);
    });

    tempArray = tempArray.sort((a, b) =>
      a.menuOrder > b.menuOrder ? 1 : b.menuOrder > a.menuOrder ? -1 : 0
    );
    return tempArray;
  }

  /** Redirect root,branch, api common component based on node type
   * @class SidebarComponent
   * @method AppId
   */
  AppId(num: any, nodeType: any) {
    if (nodeType === "api") {
      this.router.navigate(["apidetails/" + num]);
    }
    if (nodeType === "branch") {
      this.router.navigate(["branchdetails/" + num]);
    }
    if (nodeType === "root") {
      this.router.navigate(["rootdetails/" + num]);
    }
  }

  /** For scroll view
   * @class SidebarComponent
   * @method scroll_view
   */
  scroll_view(id) {
    this.router.navigate(["index"]);
    setTimeout(function() {
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }, 10);
  }
}
