import CustomResponse from "../../../../utils/CustomeResponse";
import { isValidToken, isExpired, decodeToken } from "../../../../utils/TokenUtils";
import { connectToDatabase, insertDocument, findDocument, findDocuments } from "../../../../utils/dbConnection";
import { generateUUID } from "../../../../utils/UUIDGenerator";
import { hashPassword } from "../../../../utils/passwordUtils";

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

    // only superadmin can perform this action

    const role = decodeToken(token).role;

    if (role !== 'superadmin') {
        return res.status(401).json(new CustomResponse(401, 'No tienes permisos para realizar esta acción', null, null));
    }

    try {
        switch (method) {
            case 'GET':
                const users = await findDocuments('users', { role: 'admin' });

                if (!users) {
                    return res.status(404).json(new CustomResponse(404, 'Usuarios no encontrados', null, null));
                }

                return res.status(200).json(new CustomResponse(200, 'Usuarios obtenidos', users, null));
                break;

            case 'POST':
                const { name, lastname, email, password } = req.body;

                if (!name || !lastname || !email || !password) {
                    return res.status(400).json(new CustomResponse(400, 'Datos incompletos', null, null));
                }

                const user = await findDocument('users', { email });

                if (user) {
                    return res.status(400).json(new CustomResponse(400, 'El usuario ya existe', null, null));
                }

                const hashedPassword = await hashPassword(password);

                const newUser = {
                    _id: generateUUID(),
                    name,
                    lastname,
                    email: email.toLowerCase(),
                    password: hashedPassword,
                    role: 'admin',
                    status: 'active',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }

                const result = await insertDocument('users', newUser);

                if (!result) {
                    return res.status(500).json(new CustomResponse(500, 'Error al crear el usuario', null, null));
                }

                return res.status(201).json(new CustomResponse(201, 'Usuario creado', result, null));

                break;

            default:
                return res.status(405).json(new CustomResponse(405, 'Método no permitido', null, null));
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(new CustomResponse(500, 'Error al obtener los usuarios', null, null));
    }

}