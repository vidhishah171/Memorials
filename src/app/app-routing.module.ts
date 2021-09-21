import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './Components/home/home.component'; 
import { LoginComponent } from './Components/login/login.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { CreateMemorialComponent } from './Components/create-memorial/create-memorial.component';
import { ThankYouComponent } from './Components/thank-you/thank-you.component';



const routes: Routes = [
  {path:"",component:HomeComponent },
  {path:"login",component:LoginComponent},
  {path:"forgot-password",component: ForgotPasswordComponent},
  {path:"create-memorial",component:CreateMemorialComponent},
  {path:'thank-you',component:ThankYouComponent},
  {path:"**" ,component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration:'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
