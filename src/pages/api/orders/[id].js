import CustomResponse from "../../../../utils/CustomeResponse";
import { isValidToken, isExpired } from "../../../../utils/TokenUtils";
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

    const { id } = req.query;

    try {
        switch (method) {
            case 'DELETE':
                const order = await findDocument('orders', { _id: id });

                console.log(order);

                if (!order) {
                    return res.status(404).json(new CustomResponse(404, 'Orden no encontrada', null, null));
                }

                const rs = await deleteDocument('orders', { _id: id });

                if (!rs) {
                    return res.status(500).json(new CustomResponse(500, 'Error al eliminar la orden', null, null));
                }

                //restaurar stock de los productos comprados
                order.items.forEach(async item => {
                    console.log(item);
                    const product = await findDocument('products', { _id: item.id });
                    console.log(product);
                    if (!product) {
                        return res.status(404).json(new CustomResponse(404, 'Producto no encontrado', null, null));
                    }

                    const db = await connectToDatabase();

                    const result = await db.collection('products').updateOne({ _id: item.id }, { $set: { quantity: product.quantity + item.quantity } });
                    console.log(result);
                    if (!result) {
                        return res.status(500).json(new CustomResponse(500, 'Error al restaurar el stock del producto', null, null));
                    }
                });


                return res.status(200).json(new CustomResponse(200, 'Orden eliminada', null, null));

                break;

            case 'PUT':
                // solo se cambia el estado de isPaid
                const response = await findDocument('orders', { _id: id });
                console.log(response);

                if (!response) {
                    return res.status(404).json(new CustomResponse(404, 'Orden no encontrada', null, null));
                }

                const db = await connectToDatabase()

                const result = await db.collection('orders').updateOne({ _id: id }, { $set: { isPaid: !response.isPaid } });

                if (!result) {
                    return res.status(500).json(new CustomResponse(500, 'Error al actualizar la orden', null, null));
                }

                return res.status(200).json(new CustomResponse(200, 'Orden actualizada', null, null));

                break

            default:
                return res.status(405).json(new CustomResponse(405, 'Método no permitido', null, null));
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(new CustomResponse(500, 'Error al eliminar la orden', null, null));
    }

}