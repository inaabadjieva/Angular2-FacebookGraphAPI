import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Event, User } from './data-model';
import { EventsComponent } from './events.component';
import { FBService } from './fb.service';

@Component({
	selector: 'fb-form',
	templateUrl: './fb-form.component.html',
	providers: [FBService],
})
export class FacebookFormComponent {
	url = new FormControl();
	latestEvents: Event[] = [];
	allEvents: Event[] = [];
	mostActive: User[] = [];
	showEvents = false;
	showUsers = false;

	constructor(private fb: FBService) {}

	getLatestEvents() : void {
		this.showUsers = false;
		this.showEvents = true;

		let pageName = this.getPageName();

		this.fb.getLatestEvents(pageName).then(res => {
			res.data.forEach(obj => {
				this.latestEvents.push(new Event(
					obj.id,
					obj.name, 
					obj.description,
					obj.start_time,
					obj.end_time,
					obj.place == undefined ? '' : obj.place.name));
			});

			this.latestEvents.forEach(event => {
				this.fb.getPicture(event.id).then(res => event.photo = res.data.url);
			})
		})
	}

	getUsers() : void{
		this.showEvents = false;
		this.showUsers = true;

		let pageName = this.getPageName();
		
		this.fb.getAllEvents(pageName).then(res => {
			this.updateAllEvents(res.data, this.allEvents, this.fb);	

			if(res.paging.next != undefined) {
				this.fb.getNextEvents(res.paging.next, this.allEvents, this.updateAllEvents);
			} 

			this.getMostActiveUsers();
		});
	}
	
	private getMostActiveUsers() : void {
		let uniqueUsers = new Map();
		this.allEvents.forEach(e => {
			e.attendees.forEach(a => {
				if (!uniqueUsers.has(a.id)) {
					uniqueUsers.set(a.id, a);
				} else {
					a.eventsAttended++;
					uniqueUsers.set(a.id, a);
				}
			});

			this.mostActive = Array.from(uniqueUsers.values())
				.sort((a, b) => b.eventsAttended - a.eventsAttended)
				.slice(0, 20);
			
			this.mostActive.forEach(user => {
				this.fb.getPicture(user.id).then(res=> user.profilePhoto = res.data.url);
			})
		})
	}

	private updateAllEvents(fbEvents, allEvents, fbService) : void {
		
		fbEvents.forEach(obj => {
		fbService.getEventAttendees(obj.id).then(res => {		
				var attendees : User[] = [];
				res.data.forEach(user => attendees.push(new User(user.id, user.name)));
				
				allEvents.push(new Event(
					obj.id,
					obj.name, 
					obj.description,
					obj.start_time,
					obj.end_time,
					null,
					null,
					attendees
				));
			})
		});
	}

	private getPageName() : string {
		let regex = /https:\/\/www\.facebook\.com\/([\w.]+)\//
		let match = regex.exec(this.url.value);
		return match[1];
	}
}
