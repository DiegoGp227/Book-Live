import bcryptjs from "bcryptjs";
import { db } from "../db/db.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 

dotenv.config(); 

const SECRET_KEY = process.env.SECRET_KEY; 
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION; 

const signup = async (req, res) => {
    try {
        const connection = await db; // Asegúrate de que esto esté funcionando correctamente

        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).send({
                message: "Some field is missing."
            });
        }

        console.log('Consultando usuario con email:', email);
        const [results] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (results.length > 0) {
            console.log("El usuario ya existe");
            return res.status(409).send({
                message: "User already exists.",
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        console.log('Contraseña encriptada');

        const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        const [insertResult] = await connection.execute(insertQuery, [username, email, hashedPassword]);

        console.log('Usuario creado exitosamente con ID:', insertResult.insertId);

        // Generar el token al crear el usuario
        const token = jwt.sign({ id: insertResult.insertId, email: email }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });

        // Establecer cookies
        res.cookie('token', token, {
            httpOnly: false, // Cambiar a true para mayor seguridad
            secure: process.env.NODE_ENV === 'production',
            maxAge: 14400000 // 4 horas en milisegundos
        });

        res.cookie('userId', insertResult.insertId, {
            httpOnly: false, // Cambiar a true para mayor seguridad
            secure: process.env.NODE_ENV === 'production',
            maxAge: 14400000 // 4 horas en milisegundos
        });

        res.cookie('userName', username, {
            httpOnly: false, // Cambiar a true para mayor seguridad
            secure: process.env.NODE_ENV === 'production',
            maxAge: 14400000 // 4 horas en milisegundos
        });

        res.cookie('userEmail', email, {
            httpOnly: false, // Cambiar a true para mayor seguridad
            secure: process.env.NODE_ENV === 'production',
            maxAge: 14400000 // 4 horas en milisegundos
        });

        return res.status(201).json({
            message: 'User successfully created.',
            userId: insertResult.insertId,
            token // Devolvemos el token si es necesario
        });

    } catch (error) {
        console.error('Error en la operación:', error);
        return res.status(500).send({
            message: 'Internal server error.',
        });
    }
};

export default signup;
