
const baseURL = `http://localhost:8000/api`;

export const fetchHTTP = async(endpoint, data, method = 'GET') => {

    try {
        
        const url = `${baseURL}/${endpoint}`;

        if( method === 'GET' ) {
            const res = await fetch( url );
            return await res.json();
        } else {
            const res = await fetch( url, {
                method,
                headers: {
                    'Content-type': 'application/json',
                },
                body : JSON.stringify(data)
            });
            return await res.json();
        }
        
    } catch (error) {
        throw error;
    }

}

export const fetchTokenizedHTTP = async(endpoint, data, method = 'GET') => {

    try {

        const url = `${baseURL}/${endpoint}`;
        const token = localStorage.getItem('token') || '';
        
        if( method === 'GET' ) {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-type': 'application/json',
                    'x-token': token
                },
            });
            return res.json();
        } else {
            const res = await fetch( url, {
                method,
                headers: {
                    'Content-type': 'application/json',
                    'x-token': token
                },
                body : JSON.stringify(data)
            });
            return res.json();
        }

    } catch (error) {
        throw error;
    }


}