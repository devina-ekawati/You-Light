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

	/* Does mot work asynchronously I should understand better Observable object to perform it
	But no time for that
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

	getGoalsbyID(key){
		return this.afd.object('/Goals/'+key);
	}

	//NOT TESTED YET
	getMyGoals(userID){
		var listOfGoalsKeys =[];
		var test = [1,2];
		var Goals; //:FireListObservable<any[]]>;
		var listKey = this.afd.list('/Users/'+userID+'/Goals/');
		listKey.forEach(element => {
			element.forEach(element1 => {
				listOfGoalsKeys.push(element1.$value);
				Goals.push(this.afd.object('/Goals/'+element1.$value));
			})
		});
		return listOfGoalsKeys;

	}

	addGoal(Name,Item1,Item2,Item3,Item4,Item5,UserId){
		var item = {
			'goal': {
        'goalName':Name,
        'tasks':{
          'Item1': Item1,
    			'Item2': Item2,
    			'Item3': Item3,
          'Item4': Item4,
          'Item5': Item5,
        }
      },
			'goalStage':1,
      'taskStage':1
			};

		var goal = {}
		this.afd.object('/Goals/'+UserId).update(item);
		//var item2 = this.afd.object('/Users/'+Owner.$key+'/Goals');

	}

	addItems(goalID,Name){
		var item = {
			'Name': Name,
			'status': 0,
			};
		this.afd.list('/Goal/'+goalID+'/Items').push(item);
	}


  getGoal(userID) {
    console.log('test');
    var goal;
    // this.afd.object('/Goals/'+userID).subscribe(
    //   items => {
    //     items.map(
    //       item => console.log(item)
    //     )
    //   }
    // );
    // this.afd.object('/Goals/'+userID).snapshotChanges().map(item => {
    //   const data = item;
    //   return data;
    // });
    return this.afd.object('/Goals/'+userID);
  }

	initiateUserFeatures(userID){
		var userFeatures = {
			'blinkState': 0,
			'breathState': 1,
			'finishedState': 0,
			'followState': 0
		}

		this.afd.object('/userFeatures/'+userID).update(userFeatures);

		this.afd.object('/userFeatures/'+userID).subscribe(
			userFeatures => console.log(userFeatures)
		);
	}

	blinkMyLight(userID) {
		this.afd.object('/userFeatures/'+userID).update({'blinkState': 1});
	}

	follow(userID) {
		this.afd.object('/userFeatures/' + userID).update({'followState': 1});
	}

}
