import { Component, ViewChild, OnInit } from '@angular/core';
import { NgxTuiCalendarComponent } from '../../projects/ngx-tui-calendar/src/lib';
import { Schedule } from '../../projects/ngx-tui-calendar/src/lib/Models/Schedule';

import { ComponentInjectorService } from './services/component-injector.service';
import { ScheduleViewComponent } from './components/schedule-view/schedule-view.component';
import { EventCaptureService } from './services/event-capture.service';



@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	title = 'app';

	scheduleDiscription : Schedule;
	scheduleViewParent: HTMLElement;
	createNewEvent: boolean = false;

	@ViewChild('calendar') calendar: NgxTuiCalendarComponent;

	schedules: Schedule[];

	calendarViews = [
		{ value: '0', name: 'month' },
		{ value: '1', name: 'week' },
		{ value: '2', name: 'day' }
	];

	defaultView = 'month';

	constructor(private _componentFactoryResolver: ComponentInjectorService, private eventCapturer: EventCaptureService) {
	}

	ngOnInit(): void {

		this.eventCapturer.getSchedules().subscribe(
      	(data) => {
				this.schedules = [];
				
				for (let i = 10; i < 30; i++) {
 
                    if(data[i]['summary']){
						data[i]['summary'] = data[i]['summary'];
					}


					if(data[i].hasOwnProperty('plannedStartDate') && data[i].plannedStartDate != "" && data[i].hasOwnProperty('CRNumber') && data[i].CRNumber != "" && data[i].hasOwnProperty('approvalStatus') && data[i].approvalStatus != "" ) {
						data[i]['id'] = data[i]['id'];
					                            
						data[i]['calendarId'] = data[i]['id'];
						data[i]['title'] = data[i]['CRNumber'] + " - " + data[i]['CRStatus'];
						data[i]['start'] = (new Date(data[i]['plannedStartDate']));
						data[i]['end'] = new Date(data[i]['plannedEndDate']);

						data[i]['category'] = "allday";
						if (data[i]['CRStatus'] == "Approved") {
							data[i]['bgColor'] = "green";
							data[i]['color'] = "white";
						}
						else if (data[i]['CRStatus'] == "WorkInProgress") {
							data[i]['bgColor'] = "blue";
							data[i]['color'] = "white";
						}
						else if (data[i]['CRStatus'] == "Assigned") {
							data[i]['bgColor'] = "violet";
						}
						else if (data[i]['CRStatus'] == "Cancelled") {
							data[i]['bgColor'] = "red";
							data[i]['color'] = "white";
						}
						else if (data[i]['CRStatus'] == "Pending Approval") {
							data[i]['bgColor'] = "yellow";
						}
						else if (data[i]['CRStatus'] == "Approval Required") {
							data[i]['bgColor'] = "grey";
							data[i]['color'] = "white";
						}

						this.schedules.push(data[i]);
					}
				}

			},
			err => {
				console.log(err);
			}
			
		)
	}

	onTuiCalendarCreated($event) {
	}

	hideCreateSchedule(hideCreateSchedule: boolean) {
		this.createNewEvent = hideCreateSchedule;
	}

	onBeforeCreateSchedule(event) {

		this.scheduleDiscription = <Schedule>Object();
		this.scheduleDiscription.start = event.start;
		this.scheduleDiscription.end = event.end;
	    
		this.createNewEvent = true;
		this.scheduleViewParent = <HTMLElement>event.target;

		var ele = event.guide.guideElement;

		if (ele) {
			ele.ondblclick = function () {
				ele.parentNode.removeChild(ele)
			}
		} else {

			var elem = event.guide.guideElements;
			let key = Object.keys(elem);


			for (let i = 0; i < key.length; i++) {
 
	  			elem[key[i]].ondblclick = function () {
					elem[key[i]].parentNode.removeChild(elem[key[i]]);
				}
			}
		}
	}



	onDate(date) {
	 //console.log('onDate', date);
	}

	onTime(dateTime) {
		//console.log('dateTime', dateTime);
	}
	onSchedule($event) {

	
		
		let element = <HTMLElement>event.target;
		element.style.overflow = "visible";

		if (this.scheduleViewParent) {

			let parent = <HTMLElement>this.scheduleViewParent;
			parent.removeChild(parent.lastChild);

			if (this.scheduleViewParent === element) {
				this.scheduleViewParent = undefined;
				return;
			}
			this.scheduleViewParent = undefined;

		}

		let scheduleDiscription = $event.schedule; 
		let componentRef = this._componentFactoryResolver.createSchduleViewComponent(ScheduleViewComponent, scheduleDiscription, element)
		this.scheduleViewParent = <HTMLElement>event.target;
	}

	onClickCalendar($event) {


		if (this.scheduleViewParent) {
			if ($event.target === this.scheduleViewParent) {
				if (this.createNewEvent == true) {
					this.createNewEvent = false;
				}
				return;
			} else {
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

	onUpdateSchedule(event) {

		var schedule = event.schedule;
		var startTime = event.start;
		var endTime = event.end;
		let tuiCalendar = this.calendar.getCalender();
		tuiCalendar.updateSchedule(schedule.id, schedule.calendarId, {
			start: startTime,
			end: endTime
		});
	}

}
