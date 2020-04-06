import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login';
import { ChatComponent } from './components/chat';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ChatComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        appRoutingModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
