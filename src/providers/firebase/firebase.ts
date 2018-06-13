import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable } from 'rxjs';
/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {
  
  authPro: AuthProvider;
  constructor(public afd: AngularFireDatabase, public authPro1 : AuthProvider) { 

	this.authPro = authPro1;

  }
   
    	getUsers() {
        	return this.afd.list('/Users');
	}
	
	getUserByID(id) {
		var test = this.afd.object('/Users/'+id);
		console.log(test);
		return test;
	}

	/* Does mot work asynchronously 
	
	getMyUserInfo(){
		
		const authObserver = this.authPro.afAuth.authState.subscribe(user => {
			var id = user.uid;
			var User: Observable<any[]>;
			//console.log(id);
			User = this.getUserByID(id);
			//console.log(this.User);
			
		  });	
		  return authObserver;
	}*/
	connectUser(arg0: any, arg1: any): any {
		throw new Error("Method not implemented.");
	  }

	addUser(name,mail,password,key) {
		var item = {
			'Name': name,
			'mail' : mail,
			'Password' : password,
			'UID' : key,
		};
		console.log(key);
		const userList = this.afd.list('/Users');
		userList.update(key,item);
		
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
  
