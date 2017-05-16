import { Component, Input } from '@angular/core';
import { FBService } from './fb.service';

import { User } from './data-model';

@Component({
	selector: 'users-list',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css'],
	inputs: ['mostActive'],
})
export class UsersComponent {
	@Input() mostActive: User[]; 

	constructor(private fbService: FBService) { }

}