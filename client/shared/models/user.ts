export class User {
	username: string;
	role: string;
	password: string;

	constructor(obj?: Object) {
		var self = this;
		if (obj) { 
				Object.keys(obj).forEach(function(key) {
					self[key] = obj[key];
				});
			}
		}
}

