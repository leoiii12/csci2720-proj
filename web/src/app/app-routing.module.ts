import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LogOutComponent } from './log-out/log-out.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserEventComponent } from './user-event/user-event.component';
import { UserEventsComponent } from './user-events/user-events.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'log-out', component: LogOutComponent},
  {path: 'about', component: AboutComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin/users', component: AdminUsersComponent},
  {path: 'admin/events', component: AdminEventsComponent},
  {path: 'user/events', component: UserEventsComponent},
  {path: 'user/event/:id', component: UserEventComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
