import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedule } from '../../../projects/ngx-tui-calendar/src/lib/Models/Schedule';
import { ScheduleDiscription } from '../models/ScheduleDiscription.model';

@Injectable({
  providedIn: 'root'
})
export class EventCaptureService {
  
  resourceUrl: string = "assets/json/data.json";
  resourceUrlForScheduleDiscription: string = "assets/json/scheduleDiscription.json";

  constructor( private http: HttpClient) {
  }
   
  getSchedules():Observable<any>{
         return this.http.get<any>(this.resourceUrl);
  }


  createSchedule(scheduleDiscription: ScheduleDiscription) {
       return this.http.post<ScheduleDiscription>(this.resourceUrl, scheduleDiscription).subscribe(
             data => {
              
             },
             err => {
               console.log(err);
             }

       );
         
         ;
  }

  

}


