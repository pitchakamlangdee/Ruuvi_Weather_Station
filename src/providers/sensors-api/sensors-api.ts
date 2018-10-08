import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SensorsApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class SensorsApiProvider {
  apiUrl = 'http://localhost:8080/Ruuvitag';
  constructor(public http: HttpClient) {
    console.log('Hello SensorsApiProvider Provider');

  }
  
  getMacSelect() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl +'/API_Mac_Ruuvitag.php/').subscribe(select_mac => {
        resolve(select_mac);
      },
        err => {
          console.log(err);
        });
    });
  }
  
  getLastDataSensors(selectedItem){
    //console.log(selectedItem);
    return new Promise(resolve => {
      
      this.http.get(this.apiUrl +'/API_Last_Data_Ruuvitag.php?selectedItem=' + selectedItem).subscribe(data_last => {
        resolve(data_last);
      }, 
        err => {
          console.log(err);
        });
      
    });
    
  }

  getGraphsDataDay(myDate,selectedItemGraphs) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl +'/API_Ruuvitag.php?selectedItemGraphs='+selectedItemGraphs+'&myDate='+myDate).subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }



}

