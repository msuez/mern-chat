import React, { useContext, useState } from 'react';

import { AuthContext } from '../auth/AuthContext';
import { SocketContext } from '../context/SocketContext';
import { ChatContext } from '../context/chat/ChatContext';

export const SendMessage = () => {

    const [message, setMessage] = useState('');
    const { socket } = useContext( SocketContext );
    const { auth } = useContext( AuthContext );
    const { chatState } = useContext( ChatContext );

    const onInputChange = ({target}) => {
        setMessage( target.value );
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if( message.length === 0 ) { return; }
        setMessage('');

        socket.emit('personal-message', {
            from: auth.uid,
            to: chatState.activeChat,
            message,
        })

    }

    return (
        <form
            onSubmit={ onSubmit }>
            <div className="type_msg row">
                <div className="input_msg_write col-sm-9">
                    <input 
                        type="text" 
                        className="write_msg" 
                        placeholder="Mensaje..." 
                        value={ message } 
                        onChange={ onInputChange } />
                </div>
                <div className="col-sm-3 text-center">
                    <button className="msg_send_btn mt-3" type="submit">
                        Send
                    </button>
                </div>
            </div>
        </form>
    )
}
