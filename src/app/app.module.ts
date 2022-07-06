import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { AgmMarkerClustererModule } from '@agm/markerclusterer';
import { CompanionService } from './services/units.service';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { secrets } from '../secrets';

// import { AngularSplitModule } from 'angular-split';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    // AngularSplitModule,
    AgGridModule,
    AgmCoreModule.forRoot({
      apiKey: secrets.apiKey
    }),
    AgmMarkerClustererModule
  ],
  providers: [
    CompanionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
