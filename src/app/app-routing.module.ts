import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WrapperComponent } from "@core/layouts/wrapper/wrapper.component";
import { AuthComponent } from "@core/layouts/auth/auth.component";

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    canActivate: [
    ],
    children: [
      { path: ':nickname', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [
    ],
    children: [
      { path: 'sign-up', loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpModule) },
      { path: 'sign-in', loadChildren: () => import('./sign-in/sign-in.module').then(m => m.SignInModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
