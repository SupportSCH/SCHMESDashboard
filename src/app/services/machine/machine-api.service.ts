import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class MachineApiService {

  checked = false;

  machine_code: any = localStorage.getItem("MACHINE_CODE");

  Machine_Status_Array: any = [];
  Machine_Signals_Array: any = [];
  Machine_Live_Array: any = [];

  RPM: any = 0;
  TEMP: any = 0;
  MPCB: any = 0;
  Contactor: any = 0;

  RPM_Checkpoint_Stage_2: boolean = false;
  RPM_Checkpoint_Stage_3: boolean = false;
  RPM_Checkpoint_Stage_4: boolean = false;

  TEMP_Checkpoint_Stage_2: boolean = false;
  TEMP_Checkpoint_Stage_3: boolean = false;
  TEMP_Checkpoint_Stage_4: boolean = false;

  CONTACTOR_Checkpoint_Stage_2: boolean = false;
  CONTACTOR_Checkpoint_Stage_3: boolean = false;
  CONTACTOR_Checkpoint_Stage_4: boolean = false;

  MPCB_Checkpoint_Stage_2: boolean = false;
  MPCB_Checkpoint_Stage_3: boolean = false;
  MPCB_Checkpoint_Stage_4: boolean = false;

  Checkpoint: any;
  
  constructor(public http: HttpClient,
    public sharedService: SharedService) {
    this.machine_code = localStorage.getItem("MACHINE_CODE");
  }

  // For Fetching the Machine Status from the server
  fetchMachineDetailsAPI() {
    let data = {
      "token": "machine_details",
      "machine_code": this.machine_code
    }

    const headerDict = {
      'Content-Type': 'application/json',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(this.sharedService.BaseURL + 'PM_API/machine_details/api/machine_details.php', JSON.stringify(data), requestOptions);
  }

  // Fetching the API from the server
  fetchingMESValueAPI() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('adm:adm')
      })
    };

    return this.http.get("http://172.16.16.67/rcgi.bin/ParamForm?AST_Param=$dtSE$se'test$'", httpOptions);
  }

  fetchingMESValueAPI2() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('adm:adm')
      })
    };

    return this.http.get("http://172.16.16.67/rcgi.bin/ParamForm?AST_Param=$dtSE$se'test2$'", httpOptions);
  }

  // Fetching the API from the server
  motorONAPI() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('adm:adm')
      })
    };

    return this.http.get("http://adm:adm@172.16.16.67/rcgi.bin/UpdateTagForm?TagName1=motor_on&TagValue1=1", httpOptions);
  }

  // Fetching the API from the server
  motorOFFAPI() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('adm:adm')
      })
    };

    return this.http.get("http://adm:adm@172.16.16.67/rcgi.bin/UpdateTagForm?TagName1=motor_on&TagValue1=0", httpOptions);
  }

  // Fetching the API from the server
  motorStatusAPI() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('adm:adm')
      })
    };

    return this.http.get("http://172.16.16.67/rcgi.bin/ParamForm?AST_Param=$dtSE$se'motor$'", httpOptions);
  }



}
