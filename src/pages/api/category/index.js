import CustomResponse from "../../../../utils/CustomeResponse";
import { findDocuments, insertDocument, findDocument } from "../../../../utils/dbConnection";
import { decodeToken, isExpired, isValidToken } from "../../../../utils/TokenUtils";
import { generateUUID } from "../../../../utils/UUIDGenerator";

export default async function category(req, res) {
    const mehod = req.method;
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

        switch (mehod) {
            case 'POST':
                const { name } = req.body;

                const categoryExists = await findDocument('categories', { name: name });

                if (categoryExists) {
                    return res.status(400).json(new CustomResponse(400, 'La categoría ya existe', null, null));
                }

                const category = {
                    _id: generateUUID(),
                    name: name,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };

                const result = await insertDocument('categories', category);

                return res.status(201).json(new CustomResponse(201, 'Categoría creada', result, null));
                break;
            case 'GET':
                const categories = await findDocuments('categories', {});
                return res.status(200).json(new CustomResponse(200, 'Categorías encontradas', categories, null));
                break;
            default:
                return res.status(405).json(new CustomResponse(405, 'Método no permitido', null, null));
                break;
        }

    } catch (error) {
        return res.status(500).json(new CustomResponse(500, 'Error al crear categoría', null, error));
    }

}