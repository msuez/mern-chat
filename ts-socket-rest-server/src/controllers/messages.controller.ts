import { Request, Response } from 'express';
import Message from '../models/message.model';


export const getChat = async( req: Request | any, res: Response) => {
    try {
        
        const myId = req.uid;
        const fromMessage = req.params.from;
        console.log(fromMessage);
        console.log(myId);
        const last30 = await Message.find({
            $or: [
                { from: myId, to: fromMessage },
                { from: fromMessage, to: myId },
            ]
        })
        .sort({ createdAt: 'asc' })
        .limit(30);
        console.log(last30);
        return res.status(201).json({
            ok: true,
            message: 'List of messages.',
            messages: last30,
        });

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}