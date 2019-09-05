import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Customer, Query} from '../types';
import gql from 'graphql-tag';
import {MatDialog} from '@angular/material';
import {createComponent} from '@angular/compiler/src/core';
import {CreateCustomerComponent} from '../create-customer/create-customer.component';
import {UpdateCustomerComponent} from '../update-customer/update-customer.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  customersObservable: Observable<object[]>;
  customers: BehaviorSubject<object[]> = new BehaviorSubject<object[]>([]);
  name: string = '';
  displayedColumns: string[] = ['id', 'name', 'code', 'balance', 'actions'];


  constructor(private apollo: Apollo, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.customersObservable = this.apollo.watchQuery<Query>({
      query: gql`
        query customers($name: String) {
          customers(name: $name){
            id
            code
            balance
            profile{
              id
              name
              last_name
              id
              email
              number
              website
            }
            industry{
              id
              name
            }
          }
        }
      `,
      variables: {
        name: this.name
      }
    }).valueChanges.pipe(map(result => {
      console.log('From Map');
      console.log(result);
      return result.data.customers;
    }));
    this.customersObservable.subscribe(result => {
      console.log('From Subscribe');
      console.log(result);
      this.customers.next(result);
    });

  }

  applyFilter(name: string) {
    this.name = name;
    console.log(`name changed to ${this.name}`);
    this.getCustomers();
  }

  createCustomer() {
    const dialogRef = this.dialog.open(CreateCustomerComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getCustomers();
    });
  }

  deleteCustomer(id) {
    this.apollo.mutate({
      mutation: gql`
        mutation mutation($id: Int)  {
          deleteCustomer(id: $id)
        }
      `,
      variables: {
        id
      }
    }).subscribe(value => this.getCustomers());
  }

  EditCustomer(element) {
    const dialogRef = this.dialog.open(UpdateCustomerComponent, {
      width: '600px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getCustomers();
    });
  }
}
