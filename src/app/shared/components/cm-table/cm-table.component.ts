import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef, viewChild, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmPaginationComponent } from '../cm-pagination/cm-pagination.component';
import { MatMenuPanel } from '@angular/material/menu';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '../../Material.module';

@Component({
  standalone: true,
  selector: 'app-cm-table',
  imports: [CommonModule, CmPaginationComponent, MatFormFieldModule,
      MatInputModule, MaterialModule],
  templateUrl: './cm-table.component.html',
  styleUrls: ['./cm-table.component.css']
})
export class CmTableComponent implements OnInit {

  listOfData: any;
    tooltip: string = "";
    searchText: string = "";
    @Input() _headerName:string = "";
    @Input() pagination:boolean =true;
    @Input() isSearch: boolean = false;

    @Output() pager = new EventEmitter<{ type: string; pageNo: number }>();
@Output() recordPerPage = new EventEmitter<{ type: string; perPage: number }>();

   
    @Output() searchWithId = new EventEmitter<any>();
    @Output() search = new EventEmitter<string>();
   
    @Input() headArr: any[] = [];
    @Input() link!: string;
    @Input() isSearchBox: boolean = true;
    @Input() fieldName!: string;
    @Input() gridArr: any[] = [];
    @Input() totalRecords!: number;
    @Input() perPage: number = 10;
    @Input() totalPages: number = 1;
    @Input() collectionSize: number = 1;
    @Input() btnArray: any[] = [];
    filteredData: any = [];
    @Input() activePage: number = 0;
    @Output() btnAction = new EventEmitter<any>();
    @Output() checked = new EventEmitter<any>();
    @Output() notChecked = new EventEmitter<any>();
    @Output() searchChanged = new EventEmitter<void>();
  // menu1: MatMenuPanel<any>|null;
  showSearchIcon: boolean = false;
  showSearch: boolean = false;
// @ViewChild('searchTemplate', { static: true }) searchTemplate!: TemplateRef<any>;
// In cm-table.component.ts
//@ViewChild('searchRef') searchTemplate!: TemplateRef<any>;
  // Use viewChild.required to ensure it's captured immediately
//readonly searchTemplate = viewChild.required<TemplateRef<any>>('searchRef');
// Remove .required()
readonly searchTemplate = viewChild<TemplateRef<any>>('searchRef');
  onSearch(event: any) { /* search logic */ }
    constructor(private router: Router) {
  
    }
    ngOnInit(): void {
      //this.headArr = this.headArr.sort(x=>x.position);
      console.log(this.headArr);
    }
    // ngOnChanges(changes: SimpleChanges): void {
    //   if(!this.isSearch) {
    //     this.searchText = "";
    //   }
    // }
// Initialize as empty so no column shows an active arrow on load
currentSortField: string = ''; 
sortDirection: boolean = false;

sortData(field: string) {
  // If clicking the same field, toggle direction. If new field, start with Ascending (true)
  if (this.currentSortField === field) {
    this.sortDirection = !this.sortDirection;
  } else {
    this.currentSortField = field;
    this.sortDirection = true; 
  }

  this.gridArr.sort((a, b) => {
    const valA = a[field]?.toString().toLowerCase() || '';
    const valB = b[field]?.toString().toLowerCase() || '';
    
    const comparison = valA.localeCompare(valB);
    return this.sortDirection ? comparison : -comparison;
  });
}
    displayActivePage(activePageNumber: number) {
      this.activePage = activePageNumber
    }
    Search() {
      if (this.searchText.trim().length > 2) {
        this.search.emit(this.searchText);
      } else if (this.searchText.trim() == "") {
        this.search.emit(this.searchText);
      }
    }
    mouseEnter(msg: string) {
      this.tooltip = msg;
    }
    pageChange(pager: any) {
       this.pager.emit({ type: 'pageChange', pageNo: pager });
    }
    filterData() {
  // Simply tell the parent: "Hey, something changed in the search boxes!"
  this.searchChanged.emit();
}
  
    onPageChange(pageNo: number) {
      this.activePage= pageNo;
      this.pageChange(pageNo);
      
    }
    onPageRecordsChange(pageNo: number) {
     this.recordPerPage.emit({ type: 'perPageChange', perPage: pageNo });
    }
  
    ShowForm(item: any) {
      if (this.btnArray.length == 0)
        this.searchWithId.emit(item);
      //this.router.navigate([this.link]);
    }
    GoToBtnAction(evt:any, data: any) {
      let _sendData = {"event":evt, "data": data };
      this.btnAction.emit(_sendData);
    }
    Checked(eve: any, data: any) {
      if (eve.target.checked == true)
        this.checked.emit(data);
      else
        this.notChecked.emit(data);
    }
    getButtonColor(btn: any): 'primary' | 'accent' | 'warn' | 'orange' {
  switch (btn.label) {
    case 'Edit':
      return 'primary';
    case 'Delete':
      return 'warn';
    default:
      return 'accent';
  }
}

    clearSearch(col: any) {
      col.showSearch = false;
      col.searchValue = '';
      this.filterData();
    }
  }
