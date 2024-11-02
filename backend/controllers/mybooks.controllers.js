import { db } from "../db/db.js";

const getMyBooks = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        let userId
        if (authHeader) {
            userId = authHeader.split(' ')[1];
            // console.log(`El ID de usuario es: ${userId}`);
        }

        if (!userId) {
            return res.status(400).json({
                message: "User ID no encontrado en las cookies"
            });
        }

        const query = 'SELECT * FROM books WHERE user_id = ?';
        const [data] = await db.query(query, [userId]);

        res.json(data);
    } catch (error) {
        console.error("Error en la consulta:", error);
        return res.status(500).json({
            message: "something went wrong"
        });
    }
}


const postMyBooks = async (req, res) => {
    console.log(req.body)
    try{
        const { userid, bookName, bookAuthor, bookCalification, bookimg, bookCategory, bookDescription } = req.body;
        const rows = await db.query(
            "INSERT INTO books ( user_id, title, author, cover_image, rating, category, description) VALUES ( ?, ?, ?, ?, ?, ?, ?)", [userid, bookName, bookAuthor, bookimg, bookCalification, bookCategory, bookDescription]
        );
        db.connect((error) => {
            if (error) {
                console.error('Error de conexión:', error);
                return;
            }
            console.log('Conectado a la base de datos');
        });
        return res.status(201).json({
            message: "Book added successfully",
            bookId: rows.insertId,
        });
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong", error: error

        })
    }
}

export { getMyBooks, postMyBooks };