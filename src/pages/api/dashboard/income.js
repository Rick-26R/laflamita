import CustomResponse from "../../../../utils/CustomeResponse";
import { getToken } from "../../../../utils/CookiesUtils";
import { isValidToken, isExpired } from "../../../../utils/TokenUtils";
import { findDocument, findDocuments } from "../../../../utils/dbConnection";

export default async function income(req, res) {
    const method = req.method;

    if (method !== 'GET') {
        return res.status(405).json(new CustomResponse(405, 'Método no permitido', null, null));
    }

    const date = new Date();

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
        // buscar las ordenes del día actual
        const orders = await findDocuments('orders', { createdAt: date.toISOString().split('T')[0] });
        console.log(orders);

        let income = 0;

        orders.forEach(order => {
            income += order.total;
        });

        console.log(income);


        return res.status(200).json(new CustomResponse(200, 'Ingresos obtenidos', income, null));
    } catch (error) {
        console.log(error)
        return res.status(500).json(new CustomResponse(500, 'Error al obtener los ingresos', null, null));
    }

}


