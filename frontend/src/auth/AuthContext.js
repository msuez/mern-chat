import React, { 
    createContext, 
    useCallback, 
    useContext, 
    useState 
} from 'react';
import { ChatContext } from '../context/chat/ChatContext';
import { fetchHTTP, fetchTokenizedHTTP } from '../helpers/fetch';
import { types } from '../types/types';

export const AuthContext = createContext();

const initState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null,
}

export const AuthProvider = ({ children }) => {

    const [ auth, setAuth ] = useState(initState);
    const { dispatch } = useContext(ChatContext);

    const signin = async(email, password) => {
        
        const res = await fetchHTTP(
            'auth', {
                email,
                password,
            }, 
            'POST'
        );
        
        if( res.ok ) {
            localStorage.setItem('token', res.token);
            const { user } = res;
            
            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                name: user.name,
                email: user.email,
            });
        }
        
        return res.ok;

    }

    const signup = async(name, email, password) => {
        
        const res = await fetchHTTP(
            'auth/signup', {
                name,
                email,
                password,
            }, 
            'POST'
        );
        
        
        if( res.ok ) {
            localStorage.setItem('token', res.token);
            const { user } = res;
            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                name: user.name,
                email: user.email,
            });
            return true;
        }

        return res.msg;

    }

    const verifyToken = useCallback( async() => {
        
        const token = localStorage.getItem('token');
        
        if( !token ) {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
            });
            return false;
        }

        const res = await fetchTokenizedHTTP(
            'auth/revalidate',
        );

        if( res.ok ) {

            localStorage.setItem('token', res.token);

            const { user } = res;

            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                name: user.name,
                email: user.email,
            });
            return true;

        } else {

            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
            });

            return false;

        }

    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({
            type: types.chatLogout,
        });
        setAuth({
            checking: false,
            logged: false,
        });
    }

    return (
        <AuthContext.Provider value={{
            auth,
            signin,
            signup,
            verifyToken,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    )
}

