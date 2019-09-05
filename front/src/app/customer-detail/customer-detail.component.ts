import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Apollo} from 'apollo-angular';
import {BehaviorSubject, Observable} from 'rxjs';
import gql from 'graphql-tag';
import {Query} from '../types';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  id: number;
  customerObservable: Observable<object>;
  // customer: BehaviorSubject<object> = new BehaviorSubject<object>({});
  customerDetail: any;

  constructor(
    private activeRouteed: ActivatedRoute,
    private apollo: Apollo,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.id = +this.activeRouteed.snapshot.paramMap.get('id');
    this.getSingleCustomer();
  }


  getSingleCustomer() {
    this.customerObservable = this.apollo.watchQuery<Query>({
      query: gql`
        query customers($id: Int) {
          customer(id: $id){
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
        id: this.id
      }
    }).valueChanges.pipe(map(result => {
      return result.data.customer;
    }));
    this.customerObservable.subscribe(result => {
      console.log('Result ', result);
      this.customerDetail = result;
    }, err => {
      this.router.navigate(['/']);

    });

  }

}
