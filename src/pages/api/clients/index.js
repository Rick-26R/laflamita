import { findDocuments } from "../../../../utils/dbConnection";
import CustomResponse from "../../../../utils/CustomeResponse";
import { decodeToken, verifyToken, isExpired, isValidToken } from "../../../../utils/TokenUtils";

export default async function clients(req, res) {
    const method = req.method;

    if (method !== 'GET') {
        return res.status(405).json(new CustomResponse(405, 'Método no permitido', null, null));
    }

    let token = req.headers.authorization;
    token = token.split(' ')[1];


    if (!token) {
        return res.status(401).json(new CustomResponse(401, 'No autorizado', null, null));
    }

    const decoded = decodeToken(token);
    const valid = isValidToken(token);

    if (!valid) {
        return res.status(401).json(new CustomResponse(401, 'Token no válido', null, null));
    }

    if (isExpired(token)) {
        return res.status(401).json(new CustomResponse(401, 'Token expirado', null, null));
    }

    if (decoded.role !== 'superadmin' && decoded.role !== 'admin') {
        return res.status(403).json(new CustomResponse(403, 'No tienes permisos', null, null));
    }

    try {
        const clients = await findDocuments('users', { role: 'user' });
        return res.status(200).json(new CustomResponse(200, 'Clientes encontrados', clients, null));
    } catch (error) {
        return res.status(500).json(new CustomResponse(500, 'Error al buscar clientes', null, error));
    }

}