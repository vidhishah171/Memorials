import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HashLocationStrategy,LocationStrategy  } from '@angular/common';

// Components
import { HomeComponent } from './Components/home/home.component'; 
import { LoginComponent } from './Components/login/login.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { CreateMemorialComponent } from './Components/create-memorial/create-memorial.component';
import { ThankYouComponent } from './Components/thank-you/thank-you.component';
import {EmailActivationComponent} from './Components/email-activation/email-activation.component';
import { GriefComponent } from './Components/grief/grief.component';
import { AuthGuard } from './Helper/auth.guard';
import { ForgotPasswordActivationComponent } from './Components/forgot-password-activation/forgot-password-activation.component';
import { AdminEditComponent } from './Components/admin-edit/admin-edit.component';
import { AdminEditPopupComponent } from './Components/admin-edit/admin-edit-popup/admin-edit-popup.component';


const routes: Routes = [
  {path:"",component:HomeComponent },
  // {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"forgot-password",component: ForgotPasswordComponent},
  {path:"create-memorial",component:CreateMemorialComponent},
  {path:'thank-you',component:ThankYouComponent},
  {path:'email-activation',component:EmailActivationComponent},
  {path:'grief',component:GriefComponent},
  {path:'forgot-password-activation',component:ForgotPasswordActivationComponent},
  {path:'admin-edit',component:AdminEditComponent},
  {path:"admin-edit-popup",component:AdminEditPopupComponent},
  {path:"**" ,component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration:'enabled',
    // useHash: true 
  })],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  exports: [RouterModule]
})
export class AppRoutingModule { }
