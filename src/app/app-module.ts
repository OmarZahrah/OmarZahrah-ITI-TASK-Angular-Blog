import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './shared/components/navbar/navbar';
import { AuthModule } from './features/auth/auth-module';
import { ArticlesModule } from './features/articles/articles-module';
import { authTokenInterceptor } from './core/interceptors/auth-token-interceptor';
import { Footer } from './shared/components/footer/footer';
import { Landing } from './features/home/pages/landing/landing';

@NgModule({
  declarations: [App, Navbar, Footer, Landing],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, AuthModule, ArticlesModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
  ],
  bootstrap: [App],
})
export class AppModule {}
