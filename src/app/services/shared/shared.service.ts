import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  MOBILE_VIEW: boolean;

  public BaseURL: any = 'http://localhost/';
  
  constructor() { }

}