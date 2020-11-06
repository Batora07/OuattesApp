import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';

import { Message, MessageType } from './models';

export const MessagesCollection = new Mongo.Collection('Messages');

if(Meteor.isServer){
    Meteor.publish('messages.all', function(){
        return MessagesCollection.find();
    })
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