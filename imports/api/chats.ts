import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';

import { Chat } from './models';

export const ChatsCollection = new Mongo.Collection<Chat>('Chats');

export const dummyChats:Chat[] = [
    {
        title: "",
        picture: "",
        participants: ["wYZ8ABS9PgeZrLAgi", "nWsvn89XcWygkPdxM"],
        lastMessage: {
            content: "Salut, ça va ?",
            createdAt: moment().toDate()
        }
    },
    {
        title: "",
        picture: "",
        participants: ["vXBk4jwKDCcJHmqDH", "nWsvn89XcWygkPdxM"],
        lastMessage: {
            content: "Salut, comment tu vas ?",
            createdAt: moment().subtract(1, 'days').toDate()
        }
    },
    {
        title: "",
        picture: "",
        participants: ["vXBk4jwKDCcJHmqDH", "wYZ8ABS9PgeZrLAgi"],
        lastMessage: {
            content: "Hey !",
            createdAt: moment().subtract(2, 'days').toDate()
        }
    }
];

if(Meteor.isServer){
    Meteor.publish('chats.all', function(){
        return ChatsCollection.find();
    });
    Meteor.publish('chats.mine', function(){
        return ChatsCollection.find({
            participants: {
                $in: [this.userId]
            }
        })
    })
}