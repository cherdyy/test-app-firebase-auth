import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule
  ],
  providers: [
    AuthService
  ],
  exports: [
    BrowserAnimationsModule,
    BrowserModule
  ]
})
export class CoreModule {
}
