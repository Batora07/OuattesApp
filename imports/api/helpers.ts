import { Meteor } from 'meteor/meteor';

import { User, Chat, Message } from './models';
import { Accounts } from 'meteor/accounts-base';
import { ChatsCollection } from './chats';
import { MessagesCollection } from './messages';
import { ImagesCollection } from './images';
import { Session } from 'meteor/session';

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
        const lastMessage:Message = findLastMessage(chatCollection._id);
        if(otherUserInfo != undefined){
            console.log(otherUserInfo.username);
            return {
                ...chatCollection,
                title: otherUserInfo.username,
                picture: otherUserInfo.profile.picture,
                lastMessage: {
                    ...lastMessage
                }
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

const findLastMessage = (chatId:string):Message => {
    return MessagesCollection.find({chatId}, {
        // afficher les messages dans l'ordre décroissant
        sort: {createdAt: -1}
    }).fetch()[0];
    // on récupère le message le plus récent
}

export const uploadFile = (file:any):void => {
    const fileUpload = ImagesCollection.insert({
        file,
        streams: "dynamic",
        chunkSize: "dynamic",
        allowWebWorkers: true
    }, false);
    fileUpload.on('start', () => {
        console.log('start');
    });
    fileUpload.on('end', (err, fileObj) => {
        console.log('end', fileObj);
        if(err){
            console.log('err upload', err);
        }
        else {
            const _id:string = fileObj._id;
            Meteor.call('images.url', _id, (err, url) => {
                if(err){
                    console.log('err', err);
                }
                else{
                    console.log('url', url);
                    Session.set('wwc__imageUrl', url);
                }
            })
        }
    });
    fileUpload.on('err', (err, fileObj) => {
        console.log('err', err);
    });
    fileUpload.on('progress', (progress, fileObj) => {
        console.log('progress', progress);
    });
    fileUpload.start();
}