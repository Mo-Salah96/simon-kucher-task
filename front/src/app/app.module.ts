import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApolloModule, Apollo} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {HttpClientModule} from '@angular/common/http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ListComponent} from './list/list.component';
import {MatTableModule} from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatCardModule, MatInputModule} from '@angular/material';
import {CreateCustomerComponent} from './create-customer/create-customer.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOptionModule} from '@angular/material';
import {MatSelectModule} from '@angular/material';
import {MatDialogModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {CustomerDetailComponent} from './customer-detail/customer-detail.component';
import {UpdateCustomerComponent} from './update-customer/update-customer.component';
import {DefaultOptions} from 'apollo-client';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateCustomerComponent,
    CustomerDetailComponent,
    UpdateCustomerComponent
  ],
  entryComponents: [CreateCustomerComponent, UpdateCustomerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApolloModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpLinkModule,
    HttpClientModule,
    MatFormFieldModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    const defaultOptions: DefaultOptions = {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    };
    apollo.create({
      link: httpLink.create({uri: 'http://localhost:3000/graphql'}),
      cache: new InMemoryCache(),
      defaultOptions
    });
  }
}
