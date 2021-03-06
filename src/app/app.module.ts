import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//for material module import things which you need
import {MatButtonModule,
        MatCheckboxModule,
        MatCardModule, 
        MatToolbarModule,
        MatListModule,
        MatGridListModule,
        MatSpinner,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatTabsModule,
        MatInputModule,
        MatMenuModule,
        MatIconModule,
        MatRadioModule,
        MatDialogModule
        } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import 'hammerjs';



import { RouterModule, Routes } from '@angular/router';
import { RoutingModule } from './routing/routing.module';
import { HttpModule } from '@angular/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { McqComponent } from './components/mcq/mcq.component';
import { CodingComponent } from './components/coding/coding.component';
import { MarkdownComponent } from './components/markdown/markdown.component';
import { MarkdownService } from './services/markdown.service';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { ProcessHttpMsgService } from './services/process-http-msg.service';
import { McqtestComponent } from './components/mcqtest/mcqtest.component';
import { AuthGuard } from './guards/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    McqComponent,
    CodingComponent,
    MarkdownComponent,
    LoginComponent,
    DashboardComponent,
    McqtestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    MatProgressSpinnerModule, MatCardModule,
    MatToolbarModule, MatListModule, 
    MatGridListModule,MatSelectModule,MatTabsModule,
    FlexLayoutModule,
    RoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [MarkdownService,AuthService, DataService,AuthGuard, ProcessHttpMsgService],
  bootstrap: [AppComponent]
})
export class AppModule { }
