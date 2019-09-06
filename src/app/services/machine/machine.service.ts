import { Injectable } from '@angular/core';
import { MachineApiService } from './machine-api.service';
import { MachineChartsService } from './machine-charts.service';
import { debug } from 'util';
import { MatDialog } from '@angular/material';
import { IssuePopupComponent } from 'src/app/issue-popup/issue-popup.component';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(public machineApiService: MachineApiService,
    public machineChartsService: MachineChartsService,
    public dialog: MatDialog) { }

  fetchMachineDetails() {
    this.machineApiService.fetchMachineDetailsAPI()
      .subscribe((response: any) => {
        if (response) {
          this.machineApiService.Machine_Status_Array = response.machine_status[0];
          this.machineApiService.Machine_Signals_Array = response.machine_signals[0];
        }
      })
  }

  fetchingMESValue() {
    this.machineApiService.fetchingMESValueAPI()
      .subscribe((response: any) => {
        console.log(response);
        this.machineApiService.Machine_Live_Array = response;
        this.machineApiService.RPM = response.RPM;
        this.machineApiService.TEMP = response.Temp;

        // For RPM
        if (response.RPM >= 50 && response.RPM < 75 && this.machineApiService.RPM_Checkpoint_Stage_2 == false) {
          this.machineApiService.Checkpoint = "RPM_Stage_2";
          this.machineApiService.RPM_Checkpoint_Stage_2 = true;
          this.openIssueDailog();
        }

        if (response.RPM >= 75 && response.RPM < 110 && this.machineApiService.RPM_Checkpoint_Stage_3 == false) {
          this.machineApiService.Checkpoint = "RPM_Stage_3";
          this.machineApiService.RPM_Checkpoint_Stage_3 = true;
          this.openIssueDailog();
        }

        if (response.RPM > 110 && this.machineApiService.RPM_Checkpoint_Stage_4 == false) {
          this.machineApiService.Checkpoint = "RPM_Stage_4";
          this.machineApiService.RPM_Checkpoint_Stage_4 = true;
          this.openIssueDailog();

          setTimeout(() => {
            this.MotorOff();
            this.machineApiService.checked = false;
          }, 10000)
        }

        // For Temperature
        if (response.Temp >= 60 && response.Temp < 80 && this.machineApiService.TEMP_Checkpoint_Stage_2 == false) {
          this.machineApiService.Checkpoint = "TEMP_Stage_2";
          this.machineApiService.TEMP_Checkpoint_Stage_2 = true;
          this.openIssueDailog();
        }

        if (response.Temp >= 80 && response.Temp < 110 && this.machineApiService.TEMP_Checkpoint_Stage_3 == false) {
          this.machineApiService.Checkpoint = "TEMP_Stage_3";
          this.machineApiService.TEMP_Checkpoint_Stage_3 = true;
          this.openIssueDailog();
        }

        if (response.Temp > 110 && this.machineApiService.TEMP_Checkpoint_Stage_4 == false) {
          this.machineApiService.Checkpoint = "TEMP_Stage_4";
          this.machineApiService.TEMP_Checkpoint_Stage_4 = true;
          this.openIssueDailog();
          setTimeout(() => {
            this.MotorOff();
            this.machineApiService.checked = false;
          }, 10000)
        }

      })
  }

  fetchingMESValue2() {
    this.machineApiService.fetchingMESValueAPI2()
      .subscribe((response: any) => {
        console.log(response);
        this.machineApiService.Contactor = response.CONTACTOR;
        this.machineApiService.MPCB = response.MPCB;

        // For CONTACTOR
        if (response.CONTACTOR >= 15 && response.CONTACTOR < 30 && this.machineApiService.CONTACTOR_Checkpoint_Stage_2 == false ) {
          this.machineApiService.Checkpoint = "CONTACTOR_Stage_2";
          this.machineApiService.CONTACTOR_Checkpoint_Stage_2 = true;
          this.openIssueDailog();
          
        }

        if (response.CONTACTOR >= 30 && response.CONTACTOR < 45 && this.machineApiService.CONTACTOR_Checkpoint_Stage_3 == false ) {
          this.machineApiService.Checkpoint = "CONTACTOR_Stage_3";
          this.machineApiService.CONTACTOR_Checkpoint_Stage_3 = true;
          this.openIssueDailog();
        }

        if (response.CONTACTOR > 45 && this.machineApiService.CONTACTOR_Checkpoint_Stage_4 == false ) {
          this.machineApiService.Checkpoint = "CONTACTOR_Stage_4";
          this.machineApiService.CONTACTOR_Checkpoint_Stage_4 = true;
          this.openIssueDailog();

          setTimeout(() => {
            this.MotorOff();
            this.machineApiService.checked = false;
          }, 10000)
        }

        // For MPCB
        if (response.MPCB >= 15 && response.MPCB < 30 && this.machineApiService.MPCB_Checkpoint_Stage_2 == false ) {
          this.machineApiService.Checkpoint = "MPCB_Stage_2";
          this.machineApiService.MPCB_Checkpoint_Stage_2 = true;
          this.openIssueDailog();
        }

        if (response.MPCB >= 30 && response.MPCB < 45 && this.machineApiService.MPCB_Checkpoint_Stage_3 == false ) {
          this.machineApiService.Checkpoint = "MPCB_Stage_3";
          this.machineApiService.MPCB_Checkpoint_Stage_3 = true;
          this.openIssueDailog();
        }

        if (response.MPCB > 45 && this.machineApiService.MPCB_Checkpoint_Stage_4 == false ) {
          this.machineApiService.Checkpoint = "MPCB_Stage_4";
          this.machineApiService.MPCB_Checkpoint_Stage_4 = true;
          this.openIssueDailog();
          setTimeout(() => {
            this.MotorOff();
            this.machineApiService.checked = false;
          }, 10000)
        }
      })
  }

  MotorOn() {
    this.machineApiService.motorONAPI()
      .subscribe((response: any) => {
        this.machineApiService.checked = true;
      })
  }

  MotorOff() {
    this.machineApiService.motorOFFAPI()
      .subscribe((response: any) => {
        this.machineApiService.checked = false;
      })
  }


  openIssueDailog() {
    const dialogRef = this.dialog.open(IssuePopupComponent, {
      width: '600px',
    });
  }

}
