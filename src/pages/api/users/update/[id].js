import CustomResponse from "../../../../../utils/CustomeResponse";
import { isValidToken, isExpired, decodeToken } from "../../../../../utils/TokenUtils";
import { connectToDatabase, findDocument } from "../../../../../utils/dbConnection";
import { hashPassword } from "../../../../../utils/passwordUtils";

export default async function handler(req, res) {
    const method = req.method;

    if (method !== 'PUT') {
        return res.status(405).json(new CustomResponse(405, 'Método no permitido', null, null));
    }

    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json(new CustomResponse(401, 'Token no encontrado', null, null));
    }

    token = token.split(' ')[1];

    if (isExpired(token)) {
        return res.status(401).json(new CustomResponse(401, 'Token expirado', null, null));
    }

    if (!isValidToken(token)) {
        return res.status(401).json(new CustomResponse(401, 'Token inválido', null, null));
    }

    // only superadmin can perform this action

    const role = decodeToken(token).role;

    if (role !== 'superadmin') {
        return res.status(401).json(new CustomResponse(401, 'No tienes permisos para realizar esta acción', null, null));
    }

    const { id } = req.query;
    const { name, lastname, email, password } = req.body;

    console.log(id, name, lastname, email, password);

    if (!name || !lastname || !email || !password) {
        return res.status(400).json(new CustomResponse(400, 'Datos incompletos', null, null));
    }

    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);

    try {
        const user = await findDocument('users', { _id: id });

        if (!user) {
            return res.status(404).json(new CustomResponse(404, 'Usuario no encontrado', null, null));
        }

        const db = await connectToDatabase()

        const result = await db.collection('users').updateOne({ _id: id }, { $set: { name, lastname, email, password: hashedPassword } });

        if (!result) {
            return res.status(500).json(new CustomResponse(500, 'Error al actualizar el usuario', null, null));
        }

        return res.status(200).json(new CustomResponse(200, 'Usuario actualizado', null, null));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new CustomResponse(500, 'Error al actualizar el usuario', null, null));
    }
}