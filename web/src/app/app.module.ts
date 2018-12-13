import { DateTimePickerModule } from 'ngx-datetime-picker';
import { FileDropModule } from 'ngx-file-drop';
import { NgxSpinnerModule } from 'ngx-spinner';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AdminEventsComponent } from './admin-events/admin-events.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpErrorInterceptor } from './http-error-interceptor';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserEventsComponent } from './user-events/user-events.component';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    AdminComponent,
    AdminUsersComponent,
    AdminEventsComponent,
    UserEventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    NgxDatatableModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    DateTimePickerModule,
    FileDropModule,
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
