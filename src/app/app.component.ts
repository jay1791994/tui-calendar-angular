import { Component, ViewChild, OnInit } from '@angular/core';
import { NgxTuiCalendarComponent } from '../../projects/ngx-tui-calendar/src/lib';
import { ClickDaynameEvent, BeforeCreateScheduleEvent } from '../../projects/ngx-tui-calendar/src/lib/Models/Events';
import { Schedule } from '../../projects/ngx-tui-calendar/src/lib/Models/Schedule';
import { ScheduleDiscription } from './models/ScheduleDiscription.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
	title = 'app';
	viewSchedule: boolean = false;
	scheduleDiscription: ScheduleDiscription = new ScheduleDiscription();


  @ViewChild('calendar') calendar: NgxTuiCalendarComponent;
  schedules: Schedule[];

	calendarViews = [
		{ value: '0', name: 'month' },
		{ value: '1', name: 'week' },
		{ value: '2', name: 'day' }
	];

	defaultView = 'week';

	constructor() {
  }

  ngOnInit(): void {
    this.schedules = [
		{
			id: '1',
			calendarId: '1',
			title: 'my schedule',
			category: 'allday',
			dueDateClass: '',
			start: '2019-09-08T22:30:00+09:00',
			end: '2019-09-09T02:30:00+09:00'
		},
		{
			id: '2',
			calendarId: '1',
			title: 'second schedule',
			category: 'time',
			dueDateClass: '',
			start: '2019-09-06T17:30:00+09:00',
			end: '2019-09-06T17:31:00+09:00',
			isAllDay:true
		}
    ]
  }

	onTuiCalendarCreated($event) {
	}
	onBeforeCreateSchedule(event) {
		
		var ele = event.guide.guideElement
		
		if(ele){
		ele.ondblclick = function(){
		  ele.parentNode.removeChild(ele)
		}
	   }else{
  
		var elem = event.guide.guideElements;
		var key = Object.keys(elem);
		 
		 if(elem[key[0]]){
			  elem[key[0]].ondblclick = function(){
			  elem[key[0]].parentNode.removeChild(elem[key[0]]);
			  }
			}
		 }
	}


  onDate(date) {
    console.log('onDate', date);
  }

  onTime(dateTime) {
    console.log('dateTime', dateTime);
  }

	onSchedule(event) {
 
		console.log(event)
		this.scheduleDiscription.schedule = event.schedule;
		this.scheduleDiscription.discription = "DISCRIPION IS HERE";
		if(this.viewSchedule == false){
			this.viewSchedule = true;
		}
		

  
	}


	hideScheduleView(hideViewSchedule: boolean){
		this.viewSchedule = hideViewSchedule;
	}

	onDateChange($event) {
		this.calendar.setDate(new Date($event.target.value));
	}

	onCalendarToday() {
		this.calendar.today();
	}

	onCalendarNext() {
		this.calendar.next();
	}

	onCalendarPrev() {
		this.calendar.prev();
	}

	onChangeCalendarView($event) {
		this.calendar.changeView(this.calendarViews.find(view => view.value === $event.target.value).name);
	}

	onUpdateSchedule(event){
	
		var schedule = event.schedule;
		var startTime = event.start;
		var endTime = event.end;
        let tuiCalendar = this.calendar.getCalender();
        tuiCalendar.updateSchedule(schedule.id, schedule.calendarId,{
			start: startTime,
			end: endTime
		});
	  }

}
