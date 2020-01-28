import { environment } from './../environments/environment.prod';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ZXingScannerModule } from '../app/public_api';
import { AppInfoComponent } from './app-info/app-info.component';
import { AppInfoDialogComponent } from './app-info-dialog/app-info-dialog.component';
import { FormatsDialogComponent } from './formats-dialog/formats-dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    AppInfoComponent,
    AppInfoDialogComponent,
    FormatsDialogComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ZXingScannerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],

  entryComponents: [FormatsDialogComponent, AppInfoDialogComponent],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
