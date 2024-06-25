import CustomResponse from "../../../../utils/CustomeResponse";
import { connectToDatabase, findDocuments, insertDocument, findDocument } from "../../../../utils/dbConnection";
import { isValidToken, isExpired } from "../../../../utils/TokenUtils";
import { generateUUID } from "../../../../utils/UUIDGenerator";

export default async function orders(req, res) {
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

    try {
        switch (method) {
            case 'POST':
                const { name, total, items, isPaid } = req.body;
                console.log(req.body);

                if (!name || !total || !items || isPaid) {
                    console.log('Datos incompletos');
                    return res.status(400).json(new CustomResponse(400, 'Datos incompletos', null, null));
                }

                const client = await findDocument('users', { email: name });

                console.log(client);

                if (!client) {
                    return res.status(404).json(new CustomResponse(404, 'Cliente no encontrado', null, null));
                }

                let date = new Date();
                date = date.toISOString().split('T')[0];
                console.log(date);

                const order = {
                    _id: generateUUID(),
                    client_id: client._id,
                    client: `${client.name} ${client.lastname}`,
                    total: total,
                    items: items,
                    isPaid: isPaid,
                    createdAt: date
                }
                console.log(order);

                const rs = await insertDocument('orders', order);
                console.log(rs);

                // reducir stock de los productos comprados
                items.forEach(async item => {
                    const product = await findDocument('products', { _id: item.id });
                    console.log(product);
                    if (product) {
                        const newStock = product.quantity - item.quantity;
                        console.log(newStock);
                        const db = await connectToDatabase();
                        const result = await db.collection('products').updateOne({ _id: item.id }, { $set: { quantity: newStock } });

                        if (!result) {
                            return res.status(500).json(new CustomResponse(500, 'Error al actualizar stock', null, null));
                        }
                    }
                });

                if (!rs) {
                    return res.status(500).json(new CustomResponse(500, 'Error al crear la orden', null, null));
                }

                return res.status(201).json(new CustomResponse(201, 'Orden creada', rs, null));

                break;

            case 'GET':
                const result = await findDocuments('orders', {});

                if (!result) {
                    return res.status(404).json(new CustomResponse(404, 'No hay ordenes', null, null));
                }

                return res.status(200).json(new CustomResponse(200, 'Ordenes encontradas', result, null));

                break;

            default:
                return res.status(405).json(new CustomResponse(405, 'Método no permitido', null, null));
                break;
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(new CustomResponse(500, 'Error en la petición', null, null));
    }

}