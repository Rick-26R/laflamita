import CustomResponse from "../../../../utils/CustomeResponse";
import { connectToDatabase, insertDocument, findDocuments, findDocument } from "../../../../utils/dbConnection";
import { decodeToken, isExpired, isValidToken } from "../../../../utils/TokenUtils";
import { generateUUID } from "../../../../utils/UUIDGenerator";

export default async function inventory(req, res) {
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

    try {

        switch (method) {
            case 'POST':
                const { name, cost, costPublic, quantity, category, provider, expirationDate, image } = req.body;
                console.log(req.body);
                if (!name || !cost || !costPublic || !quantity || !category || !expirationDate || !image) {
                    return res.status(400).json(new CustomResponse(400, 'Por favor, complete todos los campos', null, null));
                }

                const productExists = await findDocument('products', { name: name })

                if (productExists) {
                    return res.status(400).json(new CustomResponse(400, 'El producto ya existe', null, null));
                }

                const product = {
                    _id: generateUUID(),
                    name: name,
                    cost: cost,
                    costPublic: costPublic,
                    quantity: quantity,
                    category: category,
                    provider: provider,
                    expirationDate: expirationDate,
                    image: image,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };

                const result = await insertDocument('products', product);

                return res.status(201).json(new CustomResponse(201, 'Producto creado', result, null));
                break;
            case 'GET':
                const products = await findDocuments('products', {});
                return res.status(200).json(new CustomResponse(200, 'Productos encontrados', products, null));
                break;
            default:
                return res.status(405).json(new CustomResponse(405, 'Método no permitido', null, null));
                break;
        }

    } catch (error) {
        console.log(error)
        console.error('Error in inventory API', error);
        return res.status(500).json(new CustomResponse(500, 'Error en el servidor', null, null));
    }
}