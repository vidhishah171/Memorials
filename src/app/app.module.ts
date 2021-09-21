import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule } from './material/material.module';
import { ColorPickerModule } from 'ngx-color-picker'
import {MatSnackBarModule} from '@angular/material/snack-bar';




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
    SnackbarComponent
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


  ],
  providers: [SnackbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
