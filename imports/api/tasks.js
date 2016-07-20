import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');


// define some methods to interact with the DB. 
//We need one method for each database operation we want to perform on the client.
Meteor.methods({
    'tasks.insert'(text) {
        //check(text, String);
        check(text, String);

        // Make sure the user is logged in before inserting a task
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.insert({
            text,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },

    'tasks.remove'(taskId) {
        check(taskId, String);
        Tasks.remove(taskId);
    },
    
    'tasks.setChecked'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);
        Tasks.update(taskId, { $set: { checked: setChecked } });
    },
});
