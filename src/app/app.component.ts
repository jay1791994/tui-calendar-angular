import { Component, ViewChild, OnInit } from '@angular/core';
import { NgxTuiCalendarComponent } from '../../projects/ngx-tui-calendar/src/lib';
import { ClickDaynameEvent, BeforeCreateScheduleEvent } from '../../projects/ngx-tui-calendar/src/lib/Models/Events';
import { Schedule } from '../../projects/ngx-tui-calendar/src/lib/Models/Schedule';
import { ScheduleDiscription } from './models/ScheduleDiscription.model';
import { ComponentInjectorService } from './services/component-injector.service';
import { ScheduleViewComponent } from './components/schedule-view/schedule-view.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
	title = 'app';

	scheduleDiscription: ScheduleDiscription = new ScheduleDiscription();
    scheduleViewParent: HTMLElement;
	
    @ViewChild('calendar') calendar: NgxTuiCalendarComponent;

  schedules: Schedule[];

	calendarViews = [
		{ value: '0', name: 'month' },
		{ value: '1', name: 'week' },
		{ value: '2', name: 'day' }
	];

	defaultView = 'month';

	constructor(private _componentFactoryResolver: ComponentInjectorService ) {
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
	onSchedule($event) {

       console.log($event);

		let element = <HTMLElement>event.target;
		element.style.overflow = "visible";

		if(this.scheduleViewParent){
		  
			let parent = <HTMLElement>this.scheduleViewParent;
			parent.removeChild(parent.lastChild);
			
			if(this.scheduleViewParent === element){
			this.scheduleViewParent = undefined;
			return;
			}
			this.scheduleViewParent = undefined;

		}

     		let scheduleDiscription = new ScheduleDiscription();
			scheduleDiscription.schedule = $event.schedule;
			scheduleDiscription.discription ="THIS IS THE DISCRIPTION";
		    let componentRef = this._componentFactoryResolver.createComponent(ScheduleViewComponent,scheduleDiscription,element)
			this.scheduleViewParent = <HTMLElement>event.target;
	}

	onClickCalendar($event){
	 
		if(this.scheduleViewParent){
	     	if($event.target === this.scheduleViewParent){
				 return;
			}else{
				let parent = <HTMLElement>this.scheduleViewParent;
				parent.removeChild(parent.lastChild);
				this.scheduleViewParent = undefined;
			}
	    };
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
