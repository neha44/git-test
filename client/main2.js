import { Template } from 'meteor/templating';
import { Tasks } from './api/tasks.js';
import './main2.html';

 
// if (Meteor.isServer) {
//   This code only runs on the server
//  Meteor.publish('tasks', function tasksPublication() {
//    return Tasks.find();
//  });
//}
// 
 
Template.body.helpers({
  //tasks: [
  //
  //  { text: 'This is task 1' },  
  //  { text: 'This is task 2' },  
  //  { text: 'This is task 3' },
  //],
    tasks:function () {
        //console.log(Tasks.find().fetch());
    return Tasks.find({});
  }
});

