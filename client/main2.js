import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.js';
import './task.js';
import './main2.html';


import { Accounts } from 'meteor/accounts-base';
Accounts.ui.config({

  passwordSignupFields: 'USERNAME_ONLY',

});


Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

 Template.body.helpers({
    tasks:function () {
            const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
        //console.log(Tasks.find().fetch());
       return Tasks.find({}, { sort: { createdAt: -1 } });
  },
    incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },
});

Template.body.events({

  'submit .new-task'(event) {

    // Prevent default browser form submit

    event.preventDefault();

    // Get value from form element

    const target = event.target;

    const text = target.text.value;

    // Insert a task into the collection

    Tasks.insert({

      text,

      createdAt: new Date(), // current time
      owner: Meteor.userId(),

      username: Meteor.user().username,
    });

    // Clear form

    target.text.value = '';

  },
   'change .hide-completed input'(event, instance) {
console.log(instance);
    instance.state.set('hideCompleted', event.target.checked);

  },
});

