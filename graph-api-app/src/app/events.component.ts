import { Component, Input } from '@angular/core';
import { FBService } from './fb.service';

@Component({
	selector: 'events-list',
	templateUrl: './events.component.html',
	styleUrls: ['./events.component.css'],
	inputs: ['latestEvents'],
})
export class EventsComponent {
	@Input() latestEvents: Event[]; 
	selectedEvent: Event;

	constructor(private fbService: FBService) { }
	
	onSelect(event: Event): void {
		this.selectedEvent = event;
	}
}
