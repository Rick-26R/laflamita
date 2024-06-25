import CustomResponse from "../../../../utils/CustomeResponse";
import { isValidToken, verifyToken, isExpired } from "../../../../utils/TokenUtils";
import { findDocuments } from "../../../../utils/dbConnection";

export default async function chart(req, res) {
    const method = req.method;
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    if (method !== 'GET') {
        return res.status(405).json(new CustomResponse(405, 'Método no permitido', null, null));
    }

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
        const orders = await findDocuments('orders', {});
        console.log(orders);

        let months = [];
        let incomePerMonth = [];

        orders.forEach(order => {
            const month = order.createdAt.split('-')[1];
            if (!months.includes(month)) {
                months.push(month);
            }
        });

        const labels = months.map(month => meses[parseInt(month) - 1]);
        console.log(labels);

        months.forEach(month => {
            let total = 0;
            orders.forEach(order => {
                if (order.createdAt.split('-')[1] === month) {
                    total += order.total;
                }
            });
            incomePerMonth.push(total);
        });

        console.log(incomePerMonth);

        const dataToSend = {
            labels,
            data: incomePerMonth
        }

        return res.status(200).json(new CustomResponse(200, 'Datos obtenidos', dataToSend, null));

    } catch (error) {
        console.log(error)
        return res.status(500).json(new CustomResponse(500, 'Error al obtener los datos', null, null));
    }
}
