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
import { AdminEditComponent } from './Components/admin-edit/admin-edit.component';
import { AdminEditPopupComponent } from './Components/admin-edit/admin-edit-popup/admin-edit-popup.component';
import { EditMemorialComponent } from './Components/edit-memorial/edit-memorial.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { MemoryImageComponent } from './Components/memory-image/memory-image.component';
import { UserAccountComponent } from './Components/user-account/user-account.component';
import { CreatePremiunMemComponent } from './Components/create-premiun-mem/create-premiun-mem.component';
import { CanvasComponent } from './Components/create-memorial/canvas/canvas.component';
import { ForgotPassAcitveComponent } from './Components/forgot-pass-acitve/forgot-pass-acitve.component';
import { ForgotPassComponent } from './Components/user-account/forgot-pass/forgot-pass.component';


const routes: Routes = [
  {path:"",component:HomeComponent },
  // {path:"home",component:HomeComponent,canActivate:[AuthGuard]},
  {path:"login",component:LoginComponent},
  {path:"forgot-password",component: ForgotPasswordComponent},
  {path:"create-memorial",component:CreateMemorialComponent},
  {path:'thank-you',component:ThankYouComponent},
  {path:'email-activation',component:EmailActivationComponent},
  {path:'grief',component:GriefComponent},
  {path:'admin-edit',component:AdminEditComponent},
  {path:"admin-edit-popup",component:AdminEditPopupComponent},
  {path:"edit-memorial",component:EditMemorialComponent},
  {path:"user-profile",component:UserProfileComponent},
  {path:"memory-image",component:MemoryImageComponent},
  {path:"user-account",component:UserAccountComponent},
  {path:"create-premium-mem",component:CreatePremiunMemComponent},
  {path:"canvas",component:CanvasComponent},
  {path:"forgot-pass-active",component:ForgotPassAcitveComponent},
  {path:"user-profile-forgot-pass",component:ForgotPassComponent},
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
