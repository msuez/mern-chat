import React, { useContext } from 'react';

import { ChatContext } from '../context/chat/ChatContext';
import { fetchTokenizedHTTP } from '../helpers/fetch';
import { scrollToBottom } from '../helpers/scrollToBottom';
import { types } from '../types/types';

export const SidebarItem = ({ user }) => {

  const { chatState, dispatch } = useContext(ChatContext);
  const { activeChat } = chatState;

  const activateChat = async() => {
    dispatch({
      type: types.chatActiveMessages,
      payload: user.uid
    });

    const res = await fetchTokenizedHTTP(`messages/${ user.uid }`);
    
    dispatch({
      type: types.chatLoadMessages,
      payload: res.messages,
    });

    scrollToBottom( 'messages' );

  }

  return (
    <div 
      className={`chat_list ${ 
        user.uid === activeChat && 'active_chat' 
      }`}
      onClick={ activateChat }>
        <div className="chat_people">
            <div className="chat_img"> 
                <img src="https://cdn1.vectorstock.com/i/1000x1000/31/95/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg" alt="sunil" />
            </div>
            <div className="chat_ib">
                <h5>{ user.name }</h5>
                {
                  user.online ? 
                    <span className="text-success">Online</span>
                    :
                    <span className="text-danger">Offline</span>
                }
            </div>
        </div>
    </div>
  )
}
