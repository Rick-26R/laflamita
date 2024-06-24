import Cookies from 'js-cookie';

export function getRole() {
    const token = Cookies.get('token');

    if (!token) {
        return null;
    }

    const { role } = JSON.parse(token);

    return role;
}

export function getToken() {
    const tokenC = Cookies.get('token');

    if (!tokenC) {
        return null;
    }

    const { token } = JSON.parse(tokenC);

    return token;
}

export function getPath() {
    const token = Cookies.get('token');

    if (!token) {
        return null;
    }

    const { path } = JSON.parse(token);

    return path;
}