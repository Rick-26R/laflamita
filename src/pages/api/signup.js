import { findDocument, insertDocument } from '../../../utils/dbConnection';
import CustomResponse from '../../../utils/CustomeResponse';
import { hashPassword } from '../../../utils/passwordUtils';
import { generateUUID } from '../../../utils/UUIDGenerator';

export default async function signup(req, res) {
    const method = req.method;

    if (method !== 'POST') {
        return res.status(405).json(new CustomResponse(405, 'Método no permitido', null, null));
    }

    const { email, password, name, lastname } = req.body;
    
    if (!email || !password || !name || !lastname) {
        return res.status(400).json(new CustomResponse(400, 'Por favor, complete todos los campos.', null, null));
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json(new CustomResponse(400, 'Por favor, ingrese un correo electrónico válido.', null, null));
    }

    try {

        const user = await findDocument('users', { email });

        if (user) {
            return res.status(400).json(new CustomResponse(400, 'El correo electrónico ya está en uso.', null, null));
        }

        const hashedPassword = await hashPassword(password);

        const newUser = {
            _id: generateUUID(),
            email,
            password: hashedPassword,
            name,
            lastname,
            role: 'user',
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const result = await insertDocument('users', newUser);

        if (!result) {
            return res.status(500).json(new CustomResponse(500, 'Error al crear usuario', null, null));
        }

        return res.status(201).json(new CustomResponse(201, 'Usuario creado con éxito', null, null));

    } catch (error) {
        console.log('Error al crear usuario:', error);
        return res.status(500).json(new CustomResponse(500, 'Error al crear usuario', null, error));
    }
}