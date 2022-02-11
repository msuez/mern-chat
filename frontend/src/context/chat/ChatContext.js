import React, {createContext, useReducer} from 'react';
import { chatReducer } from '../../reducers/chatReducer';

export const ChatContext = createContext();

const initState = {
    uid: '',
    activeChat: null,
    users: [],
    messages: [],
}

export const ChatProvider = ({ children }) => {

    const [chatState, dispatch] = useReducer(chatReducer, initState);

    return (
        <ChatContext.Provider value={{
            chatState,
            dispatch,
        }}>
            { children }
        </ChatContext.Provider>
    );
}