import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FacebookModule } from 'ngx-facebook';

import { AppComponent } from './app.component';
import { FacebookFormComponent } from './fb-form.component';
import { EventsComponent } from './events.component';
import { UsersComponent } from './users.component';

import { FBService } from './fb.service';

@NgModule({
  declarations: [
    AppComponent,
    FacebookFormComponent,
    EventsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    FacebookModule.forRoot(),
  ],
  exports: [
    AppComponent,
    FacebookFormComponent,
  ],
  providers: [FBService],
  bootstrap: [AppComponent]
})
export class AppModule { }
