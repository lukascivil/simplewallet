import { User } from '../models/user.model';

export class UserService {

	constructor() { }

	// Register the new user in the database
	register(username, email, password) {
		let newuser: User = {
			id: this.hashCode(),
			name: username,
			email: email,
			password: password,
			transactions: [],
			money_brl: 100000,
			cryptocoins: { brita: 0, bitcoin: 0 }
		};

		var promise = new Promise((resolve, reject) => {
			// Save new user on users database
			let users_database = localStorage.getItem("users");
			let users = users_database ? JSON.parse(users_database) : [];
			users.push(newuser);
			localStorage.setItem("users", JSON.stringify(users));

			// Save newuser session/currentuser
			localStorage.setItem("user", JSON.stringify(newuser));

			resolve(true);
		});
		return promise;
	}

	// Generates a unique hash code for the user id
	private hashCode() {
		return Math.random().toString(36).substr(2, 9);
	}

}