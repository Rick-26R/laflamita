import CustomResponse from "../../../../utils/CustomeResponse";
import { findDocuments, findDocument, insertDocument } from "../../../../utils/dbConnection";
import { decodeToken, isExpired, isValidToken } from "../../../../utils/TokenUtils";
import { generateUUID } from "../../../../utils/UUIDGenerator";

export default async function category(req, res) {

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
                const { name, lastname, email } = req.body;

                const providerExists = await findDocument('providers', { email: email });

                if (providerExists) {
                    return res.status(400).json(new CustomResponse(400, 'El proveedor ya existe', null, null));
                }

                const provider = {
                    _id: generateUUID(),
                    name: name,
                    lastname: lastname,
                    email: email.toLowerCase(),
                    debt: 0,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };

                const result = await insertDocument('providers', provider);


                if (!result) {
                    return res.status(400).json(new CustomResponse(400, 'Proveedor no creado', null, null));
                }

                return res.status(201).json(new CustomResponse(201, 'Proveedor creado', result, null));

                break;
            case 'GET':

                const providers = await findDocuments('providers', {});

                if (!providers) {
                    return res.status(404).json(new CustomResponse(404, 'Proveedores no encontrados', null, null));
                }

                return res.status(200).json(new CustomResponse(200, 'Proveedores encontrados', providers, null));

                break;
            default:
                return res.status(405).json(new CustomResponse(405, 'Método no permitido', null, null));
                break;
        }

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json(new CustomResponse(500, 'Error interno', null, null));
    }
}