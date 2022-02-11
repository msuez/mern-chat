import fs from 'fs';
import jwt from 'jsonwebtoken';

import { 
    PRI_KEY_JSONWEBTOKEN,
    PUB_KEY_JSONWEBTOKEN,
} from '../keys/jwt.keys';

export const generateJWT = (uid : any) => {
    
    return new Promise( (resolve, reject) => {
        
        const payload : any = { uid };

        const privateKey : any  = PRI_KEY_JSONWEBTOKEN;
        const signOpt : any = { 
            expiresIn: '1h', 
            algorithm: 'RS256' 
        };

        jwt.sign( payload, privateKey, signOpt, (err, token) => {

            if( err ) {
                console.log(err);
                reject(`We cant generate the token.`);
            }

            resolve(token);

        });

    });

}

export const approveJWT = (token : string | any = '') => {
    
    try {
        const publicKey  = PUB_KEY_JSONWEBTOKEN;
        const { uid } : any = jwt.verify(
            token,
            publicKey
        );

        return [ true, uid];

    } catch (error) {
        return [false, null];
    }

}