import CustomResponse from "../../../../utils/CustomeResponse";
import { findDocuments, findDocument, deleteDocument, connectToDatabase } from "../../../../utils/dbConnection";
import { decodeToken, isExpired, isValidToken } from "../../../../utils/TokenUtils";
import { generateUUID } from "../../../../utils/UUIDGenerator";

export default async function providers(req, res) {
    const method = req.method;
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

    const { id } = req.query;
    console.log(id);
    try {
        switch (method) {
            case 'PUT':
                const { name, lastname, email } = req.body;

                const providerExists = await findDocument('providers', { _id: id });
                console.log(providerExists);

                if (!providerExists) {
                    return res.status(404).json(new CustomResponse(404, 'Proveedor no encontrado', null, null));
                }

                const db = await connectToDatabase();
                const result = await db.collection('providers').updateOne({ _id: id }, { $set: { name: name, lastname: lastname, email: email, updatedAt: new Date() } });

                if (result.modifiedCount === 0) {
                    return res.status(400).json(new CustomResponse(400, 'Proveedor no actualizado', null, null));
                }

                return res.status(200).json(new CustomResponse(200, 'Proveedor actualizado', null, null));
                break;

            case 'DELETE':
                console.log(id);
                const resultDelete = await deleteDocument('providers', { _id: id });
                console.log(resultDelete);
                if (resultDelete.deletedCount === 0) {
                    return res.status(404).json(new CustomResponse(404, 'Proveedor no eliminado', null, null));
                }

                return res.status(200).json(new CustomResponse(200, 'Proveedor eliminado', null, null));
                break;

            default:
                return res.status(405).json(new CustomResponse(405, 'Método no permitido', null, null));
                break;
        }
    } catch (error) {
        console.error('Error creating provider:', error);
        return res.status(500).json(new CustomResponse(500, 'Error interno del servidor', null, null));
    }
}