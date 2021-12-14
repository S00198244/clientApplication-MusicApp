import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './core/auth.guard';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'songs',component: SongListComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
