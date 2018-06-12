import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
 
/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {
  
 
  constructor(public afd: AngularFireDatabase) { }
   
    	getUsers() {
        	return this.afd.list('/Users');
	}
	
	connectUser(arg0: any, arg1: any): any {
		throw new Error("Method not implemented.");
	  }

	addUser(name,mail,password) {
		var item = {
			'Name': name,
			'mail' : mail,
			'Password' : password
		};
	        this.afd.list('/Users').push(item);
	}
	
	removeUser(id) {
		this.afd.list('/Users').remove(id);
	}

	getGoals(){
		 return this.afd.list('/Goals');
	}
	
	addGoals(Name,Owner,Privacy,Type){
		var item = {
			'Name': Name,
			'Owner': Owner.name,
			'OwnerID': Owner.$key,
			'Privacy': Privacy,
			'Type': Type
			};
		this.afd.list('/Goals').push(item);
	}
	
	addItems(goalID,Name){
		var item = {
			'Name': Name,
			'status': 0,
			};
		this.afd.list('/Goal/'+goalID+'/Items').push(item);
	}
}
  
