import * as angular from 'angular';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Component, Inject } from "@angular/core";
import {
  FormGroup,
  FormControl
} from '@angular/forms';
import { downgradeComponent } from "@angular/upgrade/static";
import { ContactService } from '../services/contact-service';



@Component({
  selector: 'search',
  templateUrl: 'app/components/person-search.html'
})
export class SearchComponent {

  protected myform: FormGroup;

  constructor( @Inject(ContactService) private contacts: ContactService) {
    this.myform = new FormGroup({
      search: new FormControl(),
      sorting: new FormControl('name'),
      ordering: new FormControl('ASC')
    });
  }

  ngOnInit() {
    debugger
    console.log('Running search component....');
    
    this.myform
        .valueChanges
        .debounceTime(400)
        .distinctUntilChanged()
        .do(console.log)
        .subscribe(({sorting, ordering, search}) => {
          this.contacts.sorting = sorting;
          this.contacts.ordering = ordering;
          this.contacts.search = search;
          this.contacts.doSearch();
        });
  }  
}

angular
  .module('codecraft')
  .directive("search", downgradeComponent({
    component: SearchComponent
  }));