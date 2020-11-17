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

export const findOtherId = (participants : string[]):string => {
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

export const findOtherUser = (_id:string):User => {
    return Meteor.users.findOne({_id});
}

const findLastMessage = (chatId:string):Message => {
    const Msg:Message[] = MessagesCollection.find({chatId}, {
            // afficher les messages dans l'ordre décroissant
            sort: {createdAt: -1}
        }).fetch();

    if(!Msg[0]){
        return ChatsCollection.findOne(chatId).lastMessage;
    }
    
    return Msg[0];
    // on récupère le message le plus récent
}

export const uploadFile = (file:any, isMessage:boolean):void => {
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
            if(isMessage){
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
            else{
                Meteor.call('user.picture', _id, (err, url) => {
                    if(err){
                        console.log('err', err);
                    }
                    else{
                        console.log('url', url);
                    }
                })
            }
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

export const getBadges = (chatId:string):number => {
    const participants:string[] = ChatsCollection.findOne(chatId).participants;
    const otherId:string = findOtherId(participants);
    const badge:number = MessagesCollection.find({chatId, senderId: otherId, read: false}).count();
    return badge;
}

export const updateBadges = (participants:string[], chatId:string):void => {
    const otherId:string = findOtherId(participants);
    Meteor.call('message.update.badges', chatId, otherId, (err, res) => {
        if(err){
            console.log('err', err);
        } else {
            console.log('res', res);
        }
    })
}