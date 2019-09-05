import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Query, Mutation} from '../types';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {
  industriesObservable: Observable<object[]>;
  industries: BehaviorSubject<object[]> = new BehaviorSubject<object[]>([]);
  createForm: FormGroup;
  submitted = false;

  constructor(
    private apollo: Apollo,
    private formBuilder: FormBuilder,
    private matRef: MatDialog
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
    this.getIndustries();
    this.createForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(1)]],
      profile: this.formBuilder.group(
        {
          name: ['', [Validators.required, Validators.minLength(4)]],
          last_name: ['', [Validators.required, Validators.minLength(4)]],
          email: ['', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]],
          number: ['', [Validators.required, Validators.minLength(6)]],
          website: ['', [Validators.required, Validators.minLength(6)]],
        }
      ),
      balance: ['', [Validators.required, Validators.minLength(1)]],
      industryId: ['', Validators.required],
    });
  }

  createCustomer(data) {
    this.apollo.mutate({
      mutation: gql`
        mutation mutation($input: CustomerInput)  {
          createCustomer(input: $input){
            id
          }
        }
      `,
      variables: {
        input: data
      }
    }).subscribe(value => {
      this.matRef.closeAll();
    });
  }

  submit() {
    if (this.createForm.valid) {
      this.createCustomer(this.createForm.value);
    } else {

    }
    console.log(this.createForm.value);
  }

}
