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
		// Default user attributes
		const newuser: User = {
			id: this.hashCode(),
			name: username,
			email: email,
			password: password,
			transactions: [],
			money_brl: 100000,
			cryptocoins: { brita: 0, bitcoin: 0 }
		};

		return new Promise((resolve, reject) => {
			this.updateUser(newuser, true);
			resolve(true);
		});
	}

	// Get user data
	getUser(): User {
		return JSON.parse(localStorage.getItem('user'));
	}

	// Update user data
	// If the user is null remove session
	// If persist == true, update users database
	updateUser(user: User, persist: boolean = false) {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user));
			this.usersource.next(user);
			if (persist) {
				this.updateDatabase(user);
			}
		} else {
			localStorage.removeItem('user');
			this.usersource.next(null);
		}
	}

	// Update users database, if the user does not exist, create it
	private updateDatabase(user: User) {
		// Get users database
		let existid = false;
		const users_database = localStorage.getItem('users');
		let users = [];

		if (users_database) {
			users = JSON.parse(users_database);
			// Override user data
			users.forEach((element, index, array) => {
				if (element.id === user.id) {
					array[index] = user;
					existid = true;
					return false;
				}
			});
			// If no user id, create the user
			if (!existid) {
				users.push(user);
			}
		} else {
			users.push(user);
		}

		// Update users database
		localStorage.setItem('users', JSON.stringify(users));
	}

	// Generates a unique hash code for the user id
	private hashCode() {
		return Math.random().toString(36).substr(2, 9);
	}

}