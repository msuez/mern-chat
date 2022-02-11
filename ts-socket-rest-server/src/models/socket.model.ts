
import { approveJWT } from '../helpers/jwt.helper';
import { Server } from 'socket.io';
import { 
    connectUser,
    disconnectUser,
    getUsers,
    saveMessage,
} from '../controllers/sockets.controller';

class Socket {

    private io: Server;

    constructor( io: Server ) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', async( socket ) => {      

            const [valid, uid] : any = approveJWT(socket.handshake.query['x-token']);
            
            // Check if token is valid
            if( !valid ) {
                console.log('Socket not identificated.');
                return socket.disconnect();
            }

            // Connect User
            const user = await connectUser(uid);
            console.log(`User: ${user.name} connected!`);

            // Enter in room
            socket.join( uid );

            // List all users
            this.io.emit('users-list', await getUsers() );

            // Listen persona message
            socket.on('personal-message', async(payload) => {
                const message = await saveMessage( payload );
                this.io.to(payload.to).emit('personal-message', message);
                this.io.to(payload.from).emit('personal-message', message);
            });

            socket.on('disconnect', async () => {
                // Disconnect User
                const user = await disconnectUser(uid);
                this.io.emit('users-list', await getUsers());
                console.log(`User: ${user.name} disconnected!`);
            });

        });
    }

}

export default Socket;