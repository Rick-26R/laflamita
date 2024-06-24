export default async function clients(req, res) {
    const method = req.method;

    switch (method) {
        case 'GET':
            // check if theres and id in the query
            const { id } = req.query;
            return res.status(200).json({ id });
            break;
        case 'PUT':
            break;
        case 'DELETE':
            break;
    }
}