import CustomResponse from "../../../utils/CustomeResponse";
import { findDocument } from "../../../utils/dbConnection";
import { comparePassword } from "../../../utils/passwordUtils";
import { generateToken } from "../../../utils/TokenUtils";

export default async function login(req, res) {
    const method = req.method;

    if (method !== 'POST') {
        return res.status(405).json(new CustomResponse(405, 'Método no permitido', null, null));
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json(new CustomResponse(400, 'Por favor, complete todos los campos.', null, null));
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json(new CustomResponse(400, 'Por favor, ingrese un correo electrónico válido.', null, null));
    }

    try {

        const user = await findDocument('users', { email });

        if (!user) {
            return res.status(404).json(new CustomResponse(404, 'Usuario no encontrado', null, null));
        }


        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(401).json(new CustomResponse(401, 'Contraseña incorrecta', null, null));
        }

        if (user.status !== 'active') {
            return res.status(403).json(new CustomResponse(403, 'Usuario inactivo', null, null));
        }

        const userToken = {
            id: user._id,
            name: user.name,
            lastname: user.lastname,
            role: user.role
        }

        const token = generateToken(userToken);

        return res.status(200).json(new CustomResponse(200, 'Usuario autenticado', {
            token,
            role: userToken.role,
            path: userToken.role === 'admin' || userToken.role === 'superadmin' ? '/admin/dashboard' : '/client'
        }, null));

    } catch (error) {
        console.log('Error al buscar usuario:', error);
        return res.status(500).json(new CustomResponse(500, 'Error al buscar usuario', null, error));
    }
}