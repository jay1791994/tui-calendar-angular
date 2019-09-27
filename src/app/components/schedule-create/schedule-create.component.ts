import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { EventCaptureService } from '../../services/event-capture.service';
import { Schedule } from '../../../../projects/ngx-tui-calendar/src/lib/Models/Schedule';

@Component({
  selector: 'app-schedule-create',
  templateUrl: './schedule-create.component.html',
  styleUrls: ['./schedule-create.component.css']
})
export class ScheduleCreateComponent implements OnInit {



  @Input() scheduleDiscription: Schedule;
  @Output() hideCreateScheduleEmitter: EventEmitter<boolean> = new EventEmitter();

  changeEndDate: boolean = false;

  constructor(private _eventCapturer: EventCaptureService) { }

  ngOnInit() {
       
  }


  hideCreateSchedule() {
    this.hideCreateScheduleEmitter.emit(false);
  }

  changeEndDateHandler() {
    this.changeEndDate = true;
  }

  onChangeEndDate($event) {

    this.scheduleDiscription.end["_date"] = new Date($event.target.value);
    this.changeEndDate = false;

  }

  createEvent() {
    
     this._eventCapturer.createSchedule(this.scheduleDiscription);
  }

}
