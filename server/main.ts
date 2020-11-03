import { Meteor } from 'meteor/meteor';

import {createDummyUsers} from '../imports/api/helpers';
import { dummyUsers } from '../imports/api/users';

Meteor.startup(() => {
    const numberOfUsers:number = Meteor.users.find().count();
    if(numberOfUsers === 0 ){
        console.log("Il n'y a pas d'utilisateurs");
        createDummyUsers(dummyUsers);
    }
    else{
        console.log("Il y a des utilisateurs");
    }
});