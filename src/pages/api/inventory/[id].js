import CustomResponse from "../../../../utils/CustomeResponse";
import { connectToDatabase, insertDocument, findDocuments, findDocument, deleteDocument, updateDocument } from "../../../../utils/dbConnection";
import { decodeToken, isExpired, isValidToken } from "../../../../utils/TokenUtils";
import { generateUUID } from "../../../../utils/UUIDGenerator";

export default async function inventory(req, res) {
    const method = req.method;
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json(new CustomResponse(401, 'No autorizado', null, null));
    }

    token = token.split(' ')[1];


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

    try {
        switch (method) {
            case 'PUT':
                const { name, cost, costPublic, quantity, category, expirationDate, image } = req.body;
                console.log(req.body);

                if (!name && !cost && !costPublic && !quantity && !category && !expirationDate && !image) {
                    return res.status(400).json(new CustomResponse(400, 'Por favor, complete todos los campos', null, null));
                }

                const productExists = await findDocument('products', { _id: id })

                console.log(productExists);

                if (!productExists) {
                    return res.status(404).json(new CustomResponse(404, 'Producto no encontrado', null, null));
                }

                // si la imagen que se recib es igual a data:application/octet-stream;base64,' significa que no se ha cambiado la imagen
                const newImage = image === 'data:application/octet-stream;base64,' ? productExists.image : image;

                const productPut = {
                    name : name ? name : productExists.name,
                    cost: cost ? parseFloat(cost) : productExists.cost,
                    costPublic: costPublic ? parseFloat(costPublic) : productExists.costPublic,
                    quantity: quantity ? parseInt(quantity) : productExists.quantity,
                    category: category ? category : productExists.category,
                    expirationDate: expirationDate ? expirationDate : productExists.expirationDate,
                    image: newImage,
                    updatedAt: new Date()
                };

                const db = await connectToDatabase();
                const resultPut = await db.collection('products').updateOne({ _id: id }, { $set: {
                    name: productPut.name,
                    cost: productPut.cost,
                    costPublic: productPut.costPublic,
                    quantity: productPut.quantity,
                    category: productPut.category,
                    expirationDate: productPut.expirationDate,
                    image: productPut.image,
                    updatedAt: productPut.updatedAt
                } });

                if (resultPut.modifiedCount === 0) {
                    return res.status(404).json(new CustomResponse(404, 'Producto no actualizado', null, null));
                }

                return res.status(200).json(new CustomResponse(200, 'Producto actualizado', null, null));


                break;
            case 'DELETE':
                if (!id) {
                    return res.status(400).json(new CustomResponse(400, 'Por favor, proporcione un id', null, null));
                }
                const product = await findDocument('products', { _id: id });
                if (!product) {
                    return res.status(404).json(new CustomResponse(404, 'Producto no encontrado', null, null));
                }
                const result = await deleteDocument('products', { _id: id });
                return res.status(200).json(new CustomResponse(200, 'Producto eliminado', null, null));
                break
            default:
                return res.status(405).json(new CustomResponse(405, 'Método no permitido', null, null));
                break;
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(new CustomResponse(500, 'Error al actualizar producto', null, error));
    }
}