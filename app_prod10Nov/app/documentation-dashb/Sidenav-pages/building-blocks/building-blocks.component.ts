import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-building-blocks',
  templateUrl: './building-blocks.component.html',
  //styleUrls: ['./building-blocks.component.css']
})
export class BuildingBlocksComponent implements OnInit {

  constructor() { 
    // if(localStorage.getItem('IsReload')=='true')
    // {
    //   window.location.reload(true);
    //   localStorage.setItem('IsReload','false');
    // }
  }

  ngOnInit() {
  }

}
