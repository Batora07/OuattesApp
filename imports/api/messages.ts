import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';

import { Message, MessageType } from './models';

export const MessagesCollection = new Mongo.Collection('Messages');

if(Meteor.isServer){
    Meteor.publish('messages.all', function(){
        return MessagesCollection.find();
    });
    Meteor.methods(
        {
            "message.insert" : function(message){
                return MessagesCollection.insert(message);
            },
            "message.update": function(_id:string, content:string){
              return MessagesCollection.update({_id},{
                $set: {
                  content
                }
              })
            },
            "message.update.badges": function(chatId:string, otherId:string){
              return MessagesCollection.update({
                chatId, senderId: otherId
              }, {
                $set: {
                  read: true
                }
              }, {
                multi: true
              });
            },
            "message.delete": function(_id:string){
              return MessagesCollection.remove(_id);
            }
        }
    )
}

export const DummyMessages:Message[] = [
    {
      chatId: "vTvp8fxXinZDG5XAY",
      content: "Salut ça va ?",
      createdAt: moment().subtract(2, 'days').toDate(),
      type: MessageType.TEXT,
    },
    {
      chatId: "vTvp8fxXinZDG5XAY",
      content: "Salut ça va ?",
      createdAt: moment().subtract(2, 'days').toDate(),
      type: MessageType.TEXT,
    },
    {
      chatId: "vTvp8fxXinZDG5XAY",
      content: "Salut ça va ?",
      createdAt: moment().subtract(2, 'days').toDate(),
      type: MessageType.TEXT,
    },
    {
      chatId: "vTvp8fxXinZDG5XAY",
      content: "Salut ça va ?",
      createdAt: moment().subtract(2, 'days').toDate(),
      type: MessageType.TEXT,
    },
    {
      chatId: "nfq2WudCpvoDaf7ZM",
      content: "Salut ça va ?",
      createdAt: moment().subtract(1, 'days').toDate(),
      type: MessageType.TEXT,
    },
    {
      chatId: "nfq2WudCpvoDaf7ZM",
      content: "Salut ça va ?",
      createdAt: moment().subtract(1, 'days').toDate(),
      type: MessageType.TEXT,
    },
    {
      chatId: "nfq2WudCpvoDaf7ZM",
      content: "Salut ça va ?",
      createdAt: moment().subtract(1, 'days').toDate(),
      type: MessageType.TEXT,
    },
    {
      chatId: "vTvp8fxXinZDG5XAY",
      content: "Salut ça va ?",
      createdAt: moment().subtract(1, 'days').toDate(),
      type: MessageType.TEXT,
    },
    {
      chatId: "nfq2WudCpvoDaf7ZM",
      content: "Salut ça va ?",
      createdAt: moment().toDate(),
      type: MessageType.TEXT,
    },
    {
      chatId: "vTvp8fxXinZDG5XAY",
      content: "Salut ça va ?",
      createdAt: moment().toDate(),
      type: MessageType.TEXT,
    },
    {
      chatId: "nfq2WudCpvoDaf7ZM",
      content: "Salut ça va ?",
      createdAt: moment().toDate(),
      type: MessageType.TEXT,
    },
    {
      chatId: "nfq2WudCpvoDaf7ZM",
      content: "Salut ça va ?",
      createdAt: moment().toDate(),
      type: MessageType.TEXT,
    },
    {
      chatId: "vTvp8fxXinZDG5XAY",
      content: "Salut ça va ?",
      createdAt: moment().toDate(),
      type: MessageType.TEXT,
    },
    {
      chatId: "nfq2WudCpvoDaf7ZM",
      content: "Salut ça va ?",
      createdAt: moment().toDate(),
      type: MessageType.TEXT,
    },
    {
      chatId: "vTvp8fxXinZDG5XAY",
      content: "Salut ça va ?",
      createdAt: moment().toDate(),
      type: MessageType.TEXT,
    },
    {
      chatId: "nfq2WudCpvoDaf7ZM",
      content: "Salut ça va ?",
      createdAt: moment().toDate(),
      type: MessageType.TEXT,
    },
    {
      chatId: "vTvp8fxXinZDG5XAY",
      content: "Salut ça va ?",
      createdAt: moment().toDate(),
      type: MessageType.TEXT,
    },
    {
      chatId: "nfq2WudCpvoDaf7ZM",
      content: "Salut ça va ?",
      createdAt: moment().toDate(),
      type: MessageType.TEXT,
    },
  ];