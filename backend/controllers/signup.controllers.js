import bcryptjs from "bcryptjs";
import { db } from "../db/db.js";


const signup = async (req, res) => {
    const connection = await db;

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send({
            message: "Some field is missing."
        });
    }
    
    const query = 'SELECT * FROM users WHERE email = ?';
    connection.execute(query, [email], async (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).send({
                message: 'Internal server error.',
            });
        }

        if (results.length > 0) {
            console.log("El usuario ya existe");
            return res.status(202).send({
                message: "User already exists.",
            });
        }

        try {
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt);
            console.log('Contraseña encriptada');

            const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
            db.query(insertQuery, [username, email, hashedPassword], (err, results) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    return res.status(500).send({
                        message: 'Internal server error.',
                    });
                }
                console.log('Usuario creado exitosamente con ID:', results.insertId);
                return res.status(201).send({
                    message: 'User successfully created.',
                    userId: results.insertId,
                });
            });
        } catch (error) {
            console.error('Error encrypting password:', error);
            return res.status(500).send({
                message: 'Internal server error.',
            });
        }
    });
};

export default signup;