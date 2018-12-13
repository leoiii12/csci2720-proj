import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminEventsComponent } from './admin-events/admin-events.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin/users', component: AdminUsersComponent},
  {path: 'admin/events', component: AdminEventsComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
