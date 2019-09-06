import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { MachineApiService } from '../services/machine/machine-api.service';

@Component({
  selector: 'app-issue-popup',
  templateUrl: './issue-popup.component.html',
  styleUrls: ['./issue-popup.component.css']
})
export class IssuePopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<IssuePopupComponent>,
    public machineApiService: MachineApiService, public snackbar: MatSnackBar) { 
    dialogRef.disableClose = true;
  }

  ngOnInit() {
     
  }

  openSnackBar(message: string, action?: string) {
    this.snackbar.open(message, action, {
      duration: 2000,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  Update() {
    this.dialogRef.close();
    this.openSnackBar("Updated Successfully");
  }

}
