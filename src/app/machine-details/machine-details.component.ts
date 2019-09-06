import { Component, OnInit, HostListener } from '@angular/core';
import { MachineChartsService } from '../services/machine/machine-charts.service';
import { MachineApiService } from '../services/machine/machine-api.service';
import { MachineService } from '../services/machine/machine.service';

import * as FusionCharts from 'fusioncharts';
import { MatDialog } from '@angular/material';
import { IssuePopupComponent } from '../issue-popup/issue-popup.component';
import { SharedService } from '../services/shared/shared.service';


@Component({
  selector: 'app-machine-details',
  templateUrl: './machine-details.component.html',
  styleUrls: ['./machine-details.component.scss']
})
export class MachineDetailsComponent implements OnInit {

  innerWidth: any;

  color = 'primary';
  disabled = false;

  dataSource: any = {
    chart: {
      caption: "",
      subCaption: "",
      lowerLimit: "-40",
      upperLimit: "110",
      numberSuffix: "°C",
      thmFillColor: "#29C3BE",
    },
    value: "0"
  }

  constructor(public machineChartsService: MachineChartsService,
    public machineApiService: MachineApiService,
    public machineService: MachineService,
    public dialog: MatDialog,
    public sharedService: SharedService) {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit() {

    // this.MotorStatus();

    setInterval(() => {
      this.machineService.fetchingMESValue();
      this.machineService.fetchingMESValue2();
      this.dataSource.value = this.machineApiService.Machine_Live_Array.Temp;
    }, 500)

    this.machineChartsService.rpmGaugeChart();
    this.machineChartsService.tempGaugeChart();
    this.machineChartsService.energyLiveChart();
    this.machineChartsService.rpmLiveChart();
  }

  ngOnDestroy() {
    this.machineChartsService.destroyCharts();
  }

  // Host listener for capturing the window size
  @HostListener('window:size', ['$event'])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
    this.calcGridColumns();
    this.calcLiveGridColumns();
  }

  calcGridColumns() {
    if (this.innerWidth > 950 && this.innerWidth <= 1280) {
      this.sharedService.MOBILE_VIEW = false;
      return 4;
    } else if (this.innerWidth > 768 && this.innerWidth <= 1200) {
      this.sharedService.MOBILE_VIEW = false;
      return 4;
    } else if (this.innerWidth <= 768) {
      this.sharedService.MOBILE_VIEW = true;
      return 1;
    } else {
      this.sharedService.MOBILE_VIEW = false;
      return 4;
    }
  }

  calcLiveGridColumns() {
    if (this.innerWidth > 950 && this.innerWidth <= 1280) {
      this.sharedService.MOBILE_VIEW = false;
      return 2;
    } else if (this.innerWidth > 768 && this.innerWidth <= 1200) {
      this.sharedService.MOBILE_VIEW = false;
      return 2;
    } else if (this.innerWidth <= 768) {
      this.sharedService.MOBILE_VIEW = true;
      return 1;
    } else {
      this.sharedService.MOBILE_VIEW = false;
      return 2;
    }
  }

  onChange(value) {
    if (value.checked == true) {
      this.machineApiService.checked = true;
      this.machineService.MotorOn();
    } else {
      this.machineApiService.checked = false;
      this.machineService.MotorOff();
    }
  }

  MotorStatus() {
    this.machineApiService.motorStatusAPI()
      .subscribe((response: any) => {
        console.log(response);
        if (response.Motor_status == 0) {
          this.machineApiService.checked = false;
        } else {
          this.machineApiService.checked = true;
        }
      })
  }

  openIssueDailog() {
    const dialogRef = this.dialog.open(IssuePopupComponent, {
      width: '600px',
    });
  }

}
