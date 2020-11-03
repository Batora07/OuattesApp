import React from 'react';
import { Meteor } from 'meteor/meteor';

import RightImg from './RightImg';
import FormLogin from './FormLogin';

const messageText:string = "Connectez vous afin de lancer une conversation ";

const Login = (props:any):JSX.Element => {
    const handleLogin = (state:any):void => {
        const {password, username} = state;
        Meteor.call('user.login', state, (err, res) => {
            if(err){
                console.log('error login', err);
            }
            else{
                console.log("resultat", res);
                Meteor.loginWithPassword(username, password, (err) => {
                    if(err){
                        console.log('err', err);
                    }
                    else{
                        console.log('res', res);
                        props.history.push('/chats');
                    }
                });
            }
        })
    }

    return (
       <RightImg messageText={messageText}>
           <FormLogin onLogin={handleLogin}/>
       </RightImg>
    )
};

export default Login;