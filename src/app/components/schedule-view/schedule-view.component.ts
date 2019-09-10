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
    
  }


  hideSchedule(){
    this.hideScheduleView.emit(false);
  }

}
