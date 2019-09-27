import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Schedule } from '../../../../projects/ngx-tui-calendar/src/lib/Models/Schedule';



@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.css']
})
export class ScheduleViewComponent implements OnInit {


  @Input() scheduleDiscription: Schedule;
  @Output() hideScheduleView: EventEmitter<boolean> = new EventEmitter();
  constructor() { }
  ngOnInit() {
  
  }


  hideSchedule(){
    this.hideScheduleView.emit(false);
  }

}
