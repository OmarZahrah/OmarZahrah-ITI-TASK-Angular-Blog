import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { Register } from './features/auth/pages/register/register';
import { Articles } from './features/articles/pages/articles/articles';
import { Editor } from './features/articles/pages/editor/editor';
import { Landing } from './features/home/pages/landing/landing';
import { authGuard } from './core/guards/auth-guard';

const routes: Routes = [
  { path: '', component: Landing },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'articles', component: Articles },
  { path: 'editor', component: Editor, canActivate: [authGuard] },
  { path: 'editor/:id', component: Editor, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
