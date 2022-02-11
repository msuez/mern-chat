import React, { useContext } from 'react';

import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';

import { SidebarItem } from './SidebarItem';

export const Sidebar = () => {

    const { chatState } = useContext( ChatContext);
    const { auth } = useContext(AuthContext);
    return (
        <div className="inbox_chat">
            {
                chatState
                    .users
                    .filter( u => u.uid !== auth.uid )
                    .map( (user) => (

                    <SidebarItem 
                        key={ user.uid }
                        user={ user }
                    />

                ))
            }
            <div className="extra_space"></div>
        </div>
    )
}
