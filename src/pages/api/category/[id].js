import CustomResponse from "../../../../utils/CustomeResponse";
import { findDocument, connectToDatabase, deleteDocument } from "../../../../utils/dbConnection";
import { decodeToken, isExpired, isValidToken } from "../../../../utils/TokenUtils";


export default async function clients(req, res) {
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
    const category = await findDocument('categories', { _id: id });

    if (!category) {
        return res.status(404).json(new CustomResponse(404, 'Categoría no encontrada', null, null));
    }

    try {
        switch (method) {
            case 'PUT':
                const { name } = req.body;

                const db = await connectToDatabase();
                const result = await db.collection('categories').updateOne({ _id: id }, { $set: { name: name, updatedAt: new Date() } });

                if (result.modifiedCount === 0) {
                    return res.status(400).json(new CustomResponse(400, 'Categoría no actualizada', null, null));
                }

                return res.status(200).json(new CustomResponse(200, 'Categoría actualizada', null, null));
                break;
            case 'DELETE':
                const resultDelete = await deleteDocument('categories', { _id: id });
                if (resultDelete.deletedCount === 0) {
                    return res.status(404).json(new CustomResponse(404, 'Categoría no eliminada', null, null));
                }
                return res.status(200).json(new CustomResponse(200, 'Categoría eliminada', null, null));

                break;
            default:
                return res.status(405).json(new CustomResponse(405, 'Método no permitido', null, null));
                break;
        }
    } catch (error) {
        return res.status(500).json(new CustomResponse(500, 'Error al actualizar o eliminar cliente', null, error));
    }
}