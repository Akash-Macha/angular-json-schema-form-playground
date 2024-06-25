import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Bootstrap4FrameworkModule } from '@ajsf/bootstrap4';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Bootstrap4FrameworkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
