import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ScheduleDiscription } from '../../models/ScheduleDiscription.model';


@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.css']
})
export class ScheduleViewComponent implements OnInit {


  @Input() scheduleDiscription: ScheduleDiscription;
  @Output() hideScheduleView: EventEmitter<boolean> = new EventEmitter();
  constructor() { }
  ngOnInit() {
    console.log(this.scheduleDiscription);
    console.log(this.scheduleDiscription.schedule);
  }


  hideSchedule(){
    this.hideScheduleView.emit(false);
  }

}
