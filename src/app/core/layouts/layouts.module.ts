import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from '@core/layouts/auth/auth.component';
import { WrapperComponent } from '@core/layouts/wrapper/wrapper.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AuthComponent,
    WrapperComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AuthComponent,
    WrapperComponent
  ]
})
export class LayoutsModule {
}
