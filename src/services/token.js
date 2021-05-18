import jwt_decode from 'jwt-decode';

const decodeToken = () => {
    let token = localStorage.getItem('token');
    if(token) {
        var decoded = jwt_decode(token);
        return decoded;
    }
}

export default decodeToken;