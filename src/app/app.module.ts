import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, NativeDateModule, MatNativeDateModule, MatInputModule, MatSlideToggleModule, MatSnackBarModule, MatDialogModule } from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSidenavMenuModule } from './components/side-nav-menu/mat-sidenav-menu.module';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MachineDetailsComponent } from './machine-details/machine-details.component';

// Import angular-fusioncharts
import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts library and chart modules
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as Widgets from 'fusioncharts/fusioncharts.widgets';

import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { IssuePopupComponent } from './issue-popup/issue-popup.component';

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, Charts, Widgets ,FusionTheme);


enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DashboardComponent,
    SideMenuComponent,
    MachineDetailsComponent,
    IssuePopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    MatCardModule,
    MatSidenavMenuModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    FusionChartsModule
  ],
  entryComponents: [
    IssuePopupComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
