import { db } from "../db/db.js";

const getMyWishlist = async (req, res) => {
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

        const query = 'SELECT * FROM wishlist WHERE user_id = ?';
        const [data] = await db.query(query, [userId]);
        // console.log("Datos obtenidos:", data);

        res.json(data);
    } catch (error) {
        console.error("Error en la consulta:", error); // Agregar detalle del error
        return res.status(500).json({
            message: "something went wrong"
        });
    }
}

const postWishlist = async (req, res) => {
    try {
        const { userid, bookName, bookAuthor, bookimg, bookPrice, bookLink } = req.body;
        const rows = await db.query(
            "INSERT INTO wishlist ( user_id, name, author, cover_image, price, link ) VALUES ( ?, ?, ?, ?, ?, ? )", [ userid, bookName, bookAuthor, bookimg, bookPrice, bookLink ]
        )
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

export { getMyWishlist, postWishlist };