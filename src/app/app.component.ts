import { Component, OnInit } from '@angular/core';
import { CompanionService } from './services/units.service';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AgmInfoWindow } from '@agm/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tabName = 'unidades';
  unitSelected;
  markerSelected: boolean = false;
  markers: Observable<any[]>;

  dateWithoutReport = '0001-01-01T00:00:00';

  lat: number = 19.3910038;
  lng: number = -99.2836972;
  zoom: number = 5;

  previousInfoWindow: AgmInfoWindow;
  rowData: any[];
  columnDefs: ColDef[];
  gridApi;
  gridColumnApi;

  //sets props common to all Columns
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    headerClass: 'header_color',
    resizable: true,
    cellStyle: (params) => ({
        display: "flex",
        alignItems: "center"
    })
  };
  
  constructor(
    private companionService: CompanionService,
  ){ 
    this.columnsByTabname(this.tabName);    
  }

  ngOnInit() {
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.companionService.getUnits(this.tabName).subscribe((res : any) => {
      console.log('RES',res);
      this.rowData = res.lastpositions;
      this.gridApi.sizeColumnsToFit();
    });
  }

  onSelectionChanged($event) {
    console.log('sele $event',$event);
  }

  clickedMarker($event, marker, index: number) {
    this.previousInfoWindow?.close();
    
    if ($event.infoWindow.length) {
      this.previousInfoWindow = $event.infoWindow.first as AgmInfoWindow;
    }

    this.markerSelected = true;
    this.unitSelected = marker;
  }
  
  mapClicked() {
    this.previousInfoWindow?.close();
  }

  mapContextInfo(id: number) {
    if(id == 1) {
      document.getElementById('ubicacion').style.display = "block";
      document.getElementById('vehiculo').style.display = "none";
      document.getElementById('interno').style.display = "none";
    } else if (id == 2) {
      document.getElementById('ubicacion').style.display = "none";
      document.getElementById('vehiculo').style.display = "block";
      document.getElementById('interno').style.display = "none";
    } else if (id == 3) {
      document.getElementById('ubicacion').style.display = "none";
      document.getElementById('vehiculo').style.display = "none";
      document.getElementById('interno').style.display = "block";
    }
  }

  columnsByTabname(tabName: string) {
    if(tabName == 'companion') {
      this.columnDefs = [
        { headerName: 'Unidad', field: 'una', sortable: true, filter: true, resizable: true},
        { headerName: 'ID', field: "uco", sortable: true, filter: true, resizable: true },
        { headerName: 'Fecha', field: "ppo", sortable: true, filter: true, resizable: true, valueFormatter: params => moment(params.value).format("DD/MM/YYYY HH:mm") == '01/01/0001 00:00' ? '' : moment(params.value).format("DD/MM/YYYY")},
        { headerName: 'Hora', field: "ppo", sortable: true, filter: true, resizable: true, valueFormatter: params => moment(params.value).format("DD/MM/YYYY HH:mm") == '01/01/0001 00:00' ? '' : moment(params.value).format("HH:mm:ss") },
        { headerName: 'Estatus', field: "ppo", sortable: true, filter: true, resizable: true},
        { headerName: 'En servicio', field: "gto", sortable: true, filter: true, resizable: true, valueFormatter: params => params.data.tgo != '' && params.data.tgo > 0 ? `SI(${params.data.tgo})` : 'NO' },
        { headerName: 'Ayuda', field: "csm", sortable: true, filter: true, resizable: true },
        { headerName: 'Ruta', field: "gti", sortable: true, filter: true, resizable: true },
        { headerName: 'Arribo', field: "nta", sortable: true, filter: true, resizable: true, valueFormatter: params => params.value != this.dateWithoutReport ? moment(params.value).format('YYYY-MM-DD HH:mm') : '' },
        { headerName: 'Sinc', field: "csy", sortable: true, filter: true, resizable: true, valueFormatter: params => params.value != this.dateWithoutReport ? moment(params.value).format('YYYY-MM-DD HH:mm') : '' },
        { headerName: 'Visto', field: "cvi", sortable: true, filter: true, resizable: true, valueFormatter: params => params.value != this.dateWithoutReport ? moment(params.value).format('YYYY-MM-DD HH:mm') : '' },
        { headerName: 'Encendido', field: "acc", sortable: true, filter: true, resizable: true, valueFormatter: params => params.value.toUpperCase() }
      ];
    } else if (tabName == 'unidades'){
      this.columnDefs = [
        { headerName: 'Unidad', field: "una", sortable: true, filter: true, resizable: true },
        { headerName: 'ID', field: "uco", sortable: true, filter: true, resizable: true },
        { headerName: 'Fecha', field: "upos.pldt", maxWidth: 80, sortable: true, filter: true, resizable: true, valueFormatter: params => moment(params.value).format("DD/MM/YYYY HH:mm") == '01/01/0001 00:00' ? '' : moment(params.value).format("DD/MM/YYYY")},
        { headerName: 'Hora', field: "upos.pldt", maxWidth: 80, sortable: true, filter: true, resizable: true, valueFormatter: params => moment(params.value).format("DD/MM/YYYY HH:mm") == '01/01/0001 00:00' ? '' : moment(params.value).format("HH:mm:ss") },
        { headerName: 'Estatus', field: "upos.pldt", maxWidth: 70, sortable: true, filter: true, resizable: true },
        { headerName: 'Encendido', field: "usta.uacc", maxWidth: 80, sortable: true, filter: true, resizable: true, valueFormatter: params => params.value.toUpperCase() },
        { headerName: 'Motor', field: "usta.ueng", maxWidth: 60, sortable: true, filter: true, resizable: true, valueFormatter: params => params.value.toUpperCase()  },
        { headerName: 'Modelo', field: "ucar.cmdl", maxWidth: 65, sortable: true, filter: true, resizable: true },
        { headerName: 'Marca', field: "ucar.cbrd", sortable: true, filter: true, resizable: true },
        { headerName: 'Submarca', field: "ucar.csbb", sortable: true, filter: true, resizable: true },
        { headerName: 'Color', field: "ucar.ccol", sortable: true, filter: true, resizable: true },
        { headerName: 'Placas', field: "ucar.cpla", sortable: true, filter: true, resizable: true },
        { headerName: 'VIN', field: "ucar.cvin", sortable: true, filter: true, resizable: true },
        { headerName: 'Económico', field: "ucar.econ", sortable: true, filter: true, resizable: true }
      ];
    }
  }
}