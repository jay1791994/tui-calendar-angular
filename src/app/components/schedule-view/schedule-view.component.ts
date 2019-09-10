import { Component, OnInit, Input } from '@angular/core';
import { ScheduleDiscription } from '../../models/ScheduleDiscription.model';

@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.css']
})
export class ScheduleViewComponent implements OnInit {


  @Input() scheduleDiscription: ScheduleDiscription;
  constructor() { }

  ngOnInit() {
    console.log(this.scheduleDiscription);
  }

}
