import Jwt from "jsonwebtoken";
import { getToken } from "./CookiesUtils";

export const generateToken = (user) => {
    const token = Jwt.sign(
        {
            id: user._id,
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );
    return token;
}

export const verifyToken = (token) => {
    const decoded = Jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
}

export const decodeToken = (token) => {
    const decoded = Jwt.decode(token);
    return decoded;
}

export const isExpired = (token) => {
    const decoded = Jwt.decode(token);
    const now = Date.now() / 1000;
    return now > decoded.exp;
}

export const isValidToken = (token) => {
    try {
        Jwt.verify(token, process.env.JWT_SECRET);
        return true;
    } catch (error) {
        return false;
    }
}

export const isAValidRoute = (route, role) => {
    console.log('Route:', route);
    console.log('role:', role);

    if (role === 'admin' || role === 'superadmin') {
        return true;
    }

    // si el usuario no es admin o superadmin no puede acceder a las rutas que inicien con /admin
    if (route.startsWith('/admin') && role !== 'admin' && role !== 'superadmin') {
        return false;
    }

    return true
}