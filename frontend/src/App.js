import React from 'react';
import moment from 'moment';

import { AuthProvider } from './auth/AuthContext';
import { ChatProvider } from './context/chat/ChatContext';
import { SocketProvider } from './context/SocketContext';
import { AppRouter } from './router/AppRouter';

import 'moment/locale/en-gb';

moment.locale('en-gb');

export const App = () => {
  return (
    <ChatProvider>
      <AuthProvider >
        <SocketProvider>

          <AppRouter />
        </SocketProvider>
      </AuthProvider>
    </ChatProvider>
  )
}
