import { Component, Inject } from '@angular/core';
import * as angular from 'angular';
import { ContactService } from '../services/contact-service';
import { downgradeComponent } from '@angular/upgrade/static';

@Component({
  selector: 'personCreate',
  templateUrl: 'app/components/person-form.html'
})

export class PersonCreateComponent {
  public person = {};

  private $state = null;

  constructor(@Inject(ContactService) private contacts: ContactService) {
    this.person = {};
  }

  save() {
    console.log("createContact");
    this.contacts.createContact(this.person)
      .then(() => {
        this.$state.go("list");
      })
  }
}

angular
  .module("codecraft")
  .directive('personCreate', downgradeComponent({
    component: PersonCreateComponent,
  }));