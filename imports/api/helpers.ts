import { Meteor } from 'meteor/meteor';

import { User, Chat, Message } from './models';
import { Accounts } from 'meteor/accounts-base';
import { ChatsCollection } from './chats';
import { MessagesCollection } from './messages';

export const createDummyUsers = (users:User[]) => {
    users.forEach(user => {
        const {username, profile, password} = user;
        Accounts.createUser({
            username,
            password,
            profile
        });
    });
}

export const createDummyChats = (chats: Chat[]):void => {
    chats.forEach(chat => {
        ChatsCollection.insert(chat);
    })
}

export const createDummyMessages = (messages: Message[]):void => {
    messages.forEach(message => {
        MessagesCollection.insert(message);
    })
}


export const findChats = ():Chat[] => {
    return ChatsCollection.find().fetch().map(chatCollection => {
        const otherUserId:string = findOtherId(chatCollection.participants);       
        const otherUserInfo:User = findOtherUser(otherUserId);
        if(otherUserInfo != undefined){
            console.log(otherUserInfo.username);
            return {
                ...chatCollection,
                title: otherUserInfo.username,
                picture: otherUserInfo.profile.picture
            }
        }
        else{
            console.log("erreur lors de la récupération du nom des utilisateurs du chat");
            return {
                ...chatCollection
            }
        }
    });
};

const findOtherId = (participants : string[]):string => {
    const myId:string = Meteor.userId();
    let otherUserId:string;
    if(myId === participants[0]){
        otherUserId = participants[1];
    }
    else{
        otherUserId = participants[0];
    }
    return otherUserId;
}

const findOtherUser = (_id:string):User => {
    return Meteor.users.findOne({_id});
}