import { types } from "../types/types";

export const chatReducer = (state, action) => {
    
    switch (action.type) {
        case types.usersLoadAll:
            
            return {
                ...state,
                users: [
                    ...action.payload
                ]
            }
        
        case types.chatActiveMessages:
            
            if( state.activeChat === action.payload) return state;
            
            return {
                ...state,
                activeChat: action.payload,
                messages: [],
            }

        case types.chatSendMessage:
        
            if( state.activeChat === action.payload.from ||
                state.activeChat === action.payload.to ) { 
                return {
                    ...state,
                    messages: [ ...state.messages, action.payload]
                }
            } else {
                return state;
            }

        case types.chatLoadMessages:
            
            return {
                ...state,
                messages: [ ...action.payload ],
            }

        case types.chatLogout:
        
            return {
                uid: '',
                activeChat: null,
                users: [],
                messages: [],
            }
    
        default:
            return state;
    }
}
