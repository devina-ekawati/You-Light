import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
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
		return test;
	}

	addUser(name,mail,password,key) {
		var item = {
			'Name': name,
			'mail' : mail,
			'Password' : password,
			'UID' : key,
		};
		const userList = this.afd.list('/Users');
		userList.update(key,item);

	}

	removeUser(id) {
		this.afd.list('/Users').remove(id);
	}

	getGoals(){
		return this.afd.list('/Goals');
	}

	addGoal(userID, name, isFirstGoal: boolean=true){
		var goal = {}
		if (isFirstGoal) {
			goal = {
				"goalName": name,
				"goalStage": 0,
				"taskStage": 0
			}
		} else {
			goal = {
				"goalName": name,
				"taskStage": 0
			}
		}
		
		this.afd.object('/Goals/' + userID).update(goal);
	}

	getGoal(userID) {
		return this.afd.object('/Goals/' + userID);
	}

	finishGoal(userID, goalStage) {
		this.afd.object('/userFeatures/' + userID).update({ 'finishedState': 1 });
		this.afd.object('/Goals/' + userID).update({ 'goalStage': goalStage, 'taskStage': 0 });
	}

	addTasks(userID, item1, item2, item3, item4, item5) {
		var tasks = {
			"item1": {
				"name": item1,
				"isFinished": false
			},
			"item2": {
				"name": item2,
				"isFinished": false
			},
			"item3": {
				"name": item3,
				"isFinished": false
			},
			"item4": {
				"name": item4,
				"isFinished": false
			},
			"item5": {
				"name": item5,
				"isFinished": false
			}
		}

		this.afd.object('/Tasks/'+userID).update(tasks);
	} 

	updateTaskStage(userID, taskStage) {
		this.afd.object('/Goals/' + userID).update({ 'taskStage': taskStage });
	}

	finishTask(userID, taskID) {
		this.afd.object('/Tasks/'+ userID + "/" + taskID).update({'isFinished': true});
	}
	
	getTasks(userID) {
		return this.afd.list('/Tasks/'+userID);
	}

	initiateUserFeatures(userID){
		var userFeatures = {
			'blinkState': 0,
			'breathState': 1,
			'finishedState': 0,
			'followState': 0,
			'likeState': 0
		}

		this.afd.object('/userFeatures/'+userID).update(userFeatures);
	}

	blinkMyLight(userID) {
		this.afd.object('/userFeatures/'+userID).update({'blinkState': 1});
	}

	follow(userID) {
		this.afd.object('/userFeatures/' + userID).update({'followState': 1});
	}

	like(userID) {
		this.afd.object('/userFeatures/' + userID).update({ 'likeState': 1 });
	}

}
