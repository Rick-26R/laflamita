import CustomResponse from "../../../../utils/CustomeResponse";
import { findDocument, updateDocument, deleteDocument, connectToDatabase } from "../../../../utils/dbConnection";
import { decodeToken, isExpired, isValidToken } from "../../../../utils/TokenUtils";


export default async function clients(req, res) {
    const method = req.method;
    const { id } = req.query;
    console.log(id);

    let token = req.headers.authorization;
    token = token.split(' ')[1];
    const decoded = decodeToken(token);
    const valid = isValidToken(token);

    if (!token) {
        return res.status(401).json(new CustomResponse(401, 'No autorizado', null, null));
    }

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
        switch (method) {
            case 'GET':
                const client = await findDocument('users', { _id: id });

                if (!client) {
                    return res.status(404).json(new CustomResponse(404, 'Cliente no encontrado', null, null));
                }

                return res.status(200).json(new CustomResponse(200, 'Cliente encontrado', client, null));
                break;
            case 'PUT':
                try {
                    const client = await findDocument('users', { _id: id });

                    if (!client) {
                        return res.status(404).json(new CustomResponse(404, 'Cliente no encontrado', null, null));
                    }

                    const statusValue = client.status === 'active' ? 'blocked' : 'active';
                    const db = await connectToDatabase();

                    const result = await db.collection('users').updateOne({ _id: id }, { $set: { status: statusValue, updatedAt: new Date() } });

                    if (result.modifiedCount === 0) {
                        return res.status(404).json(new CustomResponse(404, 'Cliente no actualizado', null, null));
                    }
                    return res.status(200).json(new CustomResponse(200, 'Estado del cliente actualizado', null, null));
                } catch (error) {
                    return res.status(500).json(new CustomResponse(500, 'Error al actualizar cliente', null, error));
                }
                break;
            case 'DELETE':
                try {
                    const client = await findDocument('users', { _id: id });

                    if (!client) {
                        return res.status(404).json(new CustomResponse(404, 'Cliente no encontrado', null, null));
                    }

                    const db = await connectToDatabase();
                    const result = await deleteDocument('users', { _id: id });

                    if (result.deletedCount === 0) {
                        return res.status(404).json(new CustomResponse(404, 'Cliente no eliminado', null, null));
                    }
                    return res.status(200).json(new CustomResponse(200, 'Cliente eliminado', null, null));
                } catch (error) {
                    return res.status(500).json(new CustomResponse(500, 'Error al eliminar cliente', null, error));
                }

                break;
            default:
                res.status(405).json(new CustomResponse(405, 'Método no permitido', null, null));
                break;
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json(new CustomResponse(500, 'Error al realizar la petición', null, error));
    }
}