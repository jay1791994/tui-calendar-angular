import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgxTuiCalendarModule } from '../../projects/ngx-tui-calendar/src/lib';
import { ScheduleViewComponent } from './components/schedule-view/schedule-view.component';
import { HttpClientModule } from '@angular/common/http';
import { ScheduleCreateComponent } from './components/schedule-create/schedule-create.component';
import { DateTimeFormatPipe } from './pipes/date-time-format.pipe';


@NgModule({
	declarations: [
		AppComponent,
		ScheduleViewComponent,
		ScheduleCreateComponent,
		DateTimeFormatPipe
	],
	imports: [
		BrowserModule,
		FormsModule,
		NgxTuiCalendarModule,
	   HttpClientModule
		
	],
	providers: [],
	bootstrap: [AppComponent],
	entryComponents: [ScheduleViewComponent]
})
export class AppModule {}
