import CustomResponse from "../../../../utils/CustomeResponse";
import { isValidToken, isExpired, decodeToken } from "../../../../utils/TokenUtils";
import { connectToDatabase, deleteDocument, findDocument } from "../../../../utils/dbConnection";

export default async function handler(req, res) {
    const method = req.method;

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
    try {
        switch (method) {
            case 'PUT':
                // solo se cambia el status si es active pasa a blocked y viceversa
                const response = await findDocument('users', { _id: id });

                if (!response) {
                    return res.status(404).json(new CustomResponse(404, 'Usuario no encontrado', null, null));
                }

                const db = await connectToDatabase()

                const result = await db.collection('users').updateOne({ _id: id
                }, { $set: { status: response.status === 'active' ? 'blocked' : 'active' } });

                if (!result) {
                    return res.status(500).json(new CustomResponse(500, 'Error al actualizar el usuario', null, null));
                }

                return res.status(200).json(new CustomResponse(200, 'Usuario actualizado', null, null));

                break;

            case 'DELETE':
                const user = await findDocument('users', { _id: id });

                if (!user) {
                    return res.status(404).json(new CustomResponse(404, 'Usuario no encontrado', null, null));
                }

                const rs = await deleteDocument('users', { _id: id });

                if (!rs) {
                    return res.status(500).json(new CustomResponse(500, 'Error al eliminar el usuario', null, null));
                }

                return res.status(200).json(new CustomResponse(200, 'Usuario eliminado', null, null));
                break;

            default:
                break;
        }
    } catch (error) {

    }
}