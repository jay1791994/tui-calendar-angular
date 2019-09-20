import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ScheduleDiscription } from '../../models/ScheduleDiscription.model';
import { EventCaptureService } from '../../services/event-capture.service';

@Component({
  selector: 'app-schedule-create',
  templateUrl: './schedule-create.component.html',
  styleUrls: ['./schedule-create.component.css']
})
export class ScheduleCreateComponent implements OnInit {



  @Input() scheduleDiscription: ScheduleDiscription;
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

    console.log($event);
    this.scheduleDiscription.schedule.end["_date"] = new Date($event.target.value);
    this.changeEndDate = false;

  }

  createEvent() {
     this._eventCapturer.createSchedule(this.scheduleDiscription);
  }

}
