import React from 'react';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import moment from 'moment';

import StyledMessageBox from '../elements/StyledMessageBox';
import Day from './Day';
import MessageText from './MessageText';

let isEven:boolean = false;

const format:string = "D MMMM YYYY";

const MessageBox = (props:any):JSX.Element => {
    const {messages} = props;
    // messages est un tableau
    messages.forEach(message => {
        // on alterne l'apparition des messages, l'un m'appartient l'autre appartient au correspondant
        if(!message.senderId) {
            message.ownership = !!message.ownership === isEven ? 'mine' : 'other';
            isEven = !isEven;
            return message;
        } else {
            message.ownership = message.senderId === Meteor.userId() ? "mine" : "other";
            return message;
        }
    });

    // la valeur retournée par groupedMessages sera un objet (dictionnaire)
    const groupedMessages:any = _.groupBy(messages, message => {
        // condition de regroupement des messages
        return moment(message.createdAt).format(format);
    });

    const newMessages:any[] = Object.keys(groupedMessages).map(key => {
        return {
            date: key,
            groupedMessages: groupedMessages[key],
            today: moment().format(format) === key
        }
    });

    const renderMessages = (newMessage:any):JSX.Element[] => {
        return newMessage.groupedMessages.map(message => {
            const msgClass:string = `message message--${message.ownership}`;
            return (
                <MessageText 
                    key={message._id}
                    msgClass={msgClass}
                    content={message.content}
                    ownership={message.ownership}
                />
            )
        })
    }

    const renderDays = ():JSX.Element[] => {
        return newMessages.map((newMessage, index:number) => {
            const dateText:string = newMessage.today ? "Aujourd'hui" : newMessage.date;
            return (
                <div key={index}>
                    <Day date={dateText} />
                    {renderMessages(newMessage)}
                </div>
            )
        })
    }

    return (
        <StyledMessageBox>
            {renderDays()}
        </StyledMessageBox>
    )
}

export default MessageBox;