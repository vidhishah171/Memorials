import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ColorPickerModule } from 'ngx-color-picker'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSliderModule } from '@angular/material/slider';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';





// Components

import { HomeComponent } from './Components/home/home.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HeaderComponent } from './Components/header/header.component';
import { FearturedMemorialComponent } from './Components/feartured-memorial/feartured-memorial.component';
import { MemorialFeaturesComponent } from './Components/memorial-features/memorial-features.component';
import { RecentComponent } from './Components/recent/recent.component';
import { MostVisitedComponent } from './Components/most-visited/most-visited.component';
import { PlatformComponent } from './Components/platform/platform.component';
import { EverydayComponent } from './Components/everyday/everyday.component';
import { GriefComponent } from './Components/grief/grief.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { CreateMemorialComponent } from './Components/create-memorial/create-memorial.component';
import { ThankYouComponent } from './Components/thank-you/thank-you.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CanvasComponent } from './Components/create-memorial/canvas/canvas.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { EmailActivationComponent } from './Components/email-activation/email-activation.component';
import { ForgotPassPopupComponent } from './Components/forgot-password/forgot-pass-popup/forgot-pass-popup.component';
import { FilterPipe } from './Pipe/filter.pipe';
import { AdminEditComponent } from './Components/admin-edit/admin-edit.component';
import { AdminEditPopupComponent } from './Components/admin-edit/admin-edit-popup/admin-edit-popup.component';
import { AdminEditExampleComponent } from './Components/admin-edit-example/admin-edit-example.component';
import { EditMemorialComponent } from './Components/edit-memorial/edit-memorial.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { MemoryImageComponent } from './Components/memory-image/memory-image.component';
import { UserProfilePopComponent } from './Components/user-profile/user-profile-pop/user-profile-pop.component';
import { UserAccountComponent } from './Components/user-account/user-account.component';
import { CreatePremiunMemComponent } from './Components/create-premiun-mem/create-premiun-mem.component';
import { EditCanvasComponent } from './Components/edit-memorial/edit-canvas/edit-canvas.component';
import { ForgotPassAcitveComponent } from './Components/forgot-pass-acitve/forgot-pass-acitve.component';
import { ForgotPassActivePopComponent } from './Components/forgot-pass-acitve/forgot-pass-active-pop/forgot-pass-active-pop.component';
import { ForgotPassComponent } from './Components/user-account/forgot-pass/forgot-pass.component';
import { VisitorModeComponent } from './Components/visitor-mode/visitor-mode.component';
import { VisitorCanvasComponent } from './Components/visitor-mode/visitor-canvas/visitor-canvas.component';
import { MemoryImagesComponent } from './Components/memory-images/memory-images.component';
import { VisitorCanvasNewComponent } from './Components/visitor-mode/visitor-canvas-new/visitor-canvas-new.component';
import { VisitorCondolencePopupComponent } from './Components/visitor-mode/visitor-condolence-popup/visitor-condolence-popup.component';
import { InvitePopupComponent } from './Components/visitor-mode/invite-popup/invite-popup.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    HeaderComponent,
    FearturedMemorialComponent,
    MemorialFeaturesComponent,
    RecentComponent,
    MostVisitedComponent,
    PlatformComponent,
    EverydayComponent,
    GriefComponent,
    FooterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    CreateMemorialComponent,
    ThankYouComponent,
    CanvasComponent,
    SnackbarComponent,
    EmailActivationComponent,
    ForgotPassPopupComponent,
    FilterPipe,
    AdminEditComponent,
    AdminEditPopupComponent,
    AdminEditExampleComponent,
    EditMemorialComponent,
    UserProfileComponent,
    MemoryImageComponent,
    UserProfilePopComponent,
    UserAccountComponent,
    CreatePremiunMemComponent,
    EditCanvasComponent,
    ForgotPassAcitveComponent,
    ForgotPassActivePopComponent,
    ForgotPassComponent,
    VisitorModeComponent,
    VisitorCanvasComponent,
    MemoryImagesComponent,
    VisitorCanvasNewComponent,
    VisitorCondolencePopupComponent,
    InvitePopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    ColorPickerModule,
    MatSnackBarModule,
    MatDialogModule,
    ScrollingModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    NgxSpinnerModule,
    NgxSliderModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyDs2Vdbr8b2MpY5iV9Ss4iIdV3gbTZcpSs',
      libraries: ['places'],
    }),
    



  ],

  providers: [SnackbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
