import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from './services/user.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { LayoutsModule } from '@core/layouts/layouts.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    LayoutsModule
  ],
  providers: [
    AuthService,
    UserService
  ],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    LayoutsModule
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
