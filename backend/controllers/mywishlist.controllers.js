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

const putWishlist = async (req, res) => {
    try {
        const bookId = req.params.id;
        const { userid, bookName, bookAuthor, bookimg, bookPrice, bookLink } = req.body;
        const result = await db.query(
            "UPDATE wishlist SET user_id = ?, name = ?, author = ?, cover_image = ?, price = ?, link = ? WHERE id = ?", 
            [userid, bookName, bookAuthor, bookimg, bookPrice, bookLink, bookId]
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
            bookId: result.insertId,
        });
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong", error: error
            
        })
    }
}


const deleteMyWishlist = async (req, res) =>{
    try {
        const bookId = req.params.id;
        const [result] = await db.query(
            "DELETE FROM wishlist WHERE id = ?",
            [bookId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Libro no encontrado" });
        }

        // Si la eliminación fue exitosa
        res.status(200).json({ message: "Libro eliminado con éxito" });
    } catch (error) {
        console.error('Error al eliminar el libro:', error);
        res.status(500).json({ message: "Error al eliminar el libro", error });
    }
}


export { getMyWishlist, postWishlist, putWishlist, deleteMyWishlist };