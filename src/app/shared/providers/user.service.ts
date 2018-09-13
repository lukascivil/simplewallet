import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

	// Userdata
	private usersource = new BehaviorSubject<User>(this.getUser());
	usercurrent = this.usersource.asObservable();

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

	// Get user data
	getUser(): User {
		return JSON.parse(localStorage.getItem("user"));
	}

	// Update user data
	updateUser(user: User) {
		localStorage.setItem("user", JSON.stringify(user));
		this.usersource.next(user);
	}

	// Generates a unique hash code for the user id
	private hashCode() {
		return Math.random().toString(36).substr(2, 9);
	}

}