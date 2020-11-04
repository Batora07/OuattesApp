import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';

import App from '../imports/ui/components/App';

Meteor.startup(() => {
  Tracker.autorun(()=> {
    const userReady:boolean = Meteor.subscribe('users.all').ready();
    if(userReady){
      ReactDOM.render(<App />, document.getElementById('root'));
    }
    else{
      console.log('user not ready');
    }
  });
});
