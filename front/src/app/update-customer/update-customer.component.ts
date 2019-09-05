import {Component, Inject, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Query, Mutation} from '../types';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit {
  industriesObservable: Observable<object[]>;
  industries: BehaviorSubject<object[]> = new BehaviorSubject<object[]>([]);
  createForm: FormGroup;

  constructor(
    private apollo: Apollo,
    private formBuilder: FormBuilder,
    private matRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public customer: any,
  ) {
  }

  getIndustries() {
    this.industriesObservable = this.apollo.watchQuery<Query>({
      query: gql`
        query industries {
          industries {
            id
            name
          }
        }
      `
    }).valueChanges.pipe(map(result => {
      return result.data.industries;
    }));
    this.industriesObservable.subscribe(result => {
      this.industries.next(result);
    });

  }

  ngOnInit() {
    console.log(this.customer);
    this.getIndustries();
    this.createForm = this.formBuilder.group({
      code: [this.customer.code, [Validators.required, Validators.minLength(1)]],
      profile: this.formBuilder.group(
        {
          name: [this.customer.profile.name, [Validators.required, Validators.minLength(4)]],
          last_name: [this.customer.profile.last_name, [Validators.required, Validators.minLength(4)]],
          email: [this.customer.profile.email, [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]],
          number: [this.customer.profile.number, [Validators.required, Validators.minLength(6)]],
          website: [this.customer.profile.website, [Validators.required, Validators.minLength(6)]],
        }
      ),
      balance: [this.customer.balance, [Validators.required, Validators.minLength(1)]],
      industryId: [this.customer.industry.id, Validators.required],
    });
  }

  updateCustomer(id, data) {
    this.apollo.mutate({
      mutation: gql`
        mutation mutation($input: CustomerInput, $id: Int)  {
          updateCustomer(input: $input, id: $id){
            id
          }
        }
      `,
      variables: {
        input: data,
         id
      }
    }).subscribe(value => {
      this.matRef.closeAll();
    });
  }


  submit() {
    if (this.createForm.valid) {
      this.updateCustomer(this.customer.id, this.createForm.value);
    } else {

    }
    console.log(this.createForm.value);
  }

}
