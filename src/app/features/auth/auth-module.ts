import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

@NgModule({
  declarations: [Login, Register],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class AuthModule {}
