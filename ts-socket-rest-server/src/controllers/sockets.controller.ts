
import { IUser } from 'interfaces/user.interface';
import User from '../models/user.model';
import Message from '../models/message.model';

export const connectUser = async(uid : string) => {

    const user : IUser | any = await User.findById(uid);

    user.online = true;
    await user.save();

    return user;

}

export const disconnectUser = async(uid : string) => {

    const user : IUser | any = await User.findById(uid);

    user.online = false;
    await user.save();

    return user;

}

export const getUsers = async () => {
    const result = await User.find().sort('-online');
    return result;
}

export const saveMessage = async(payload : any) => {
    try {
        
        const message = new Message( payload );

        await message.save();

        return message;

    } catch (error) {
        console.log(error);
        return false;
    }
}