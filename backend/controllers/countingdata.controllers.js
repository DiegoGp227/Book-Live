import { db } from "../db/db.js";

const getCountingData = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        let userId
        if (authHeader) {
            userId = authHeader.split(' ')[1];
        }

        if (!userId) {
            return res.status(400).json({
                message: "User ID no encontrado en las cookies"
            });
        }

        var contBook = 0
        var contWishlist = 0

        const queryBooks = 'SELECT * FROM books WHERE user_id = ?';
        const [dataBooks] = await db.query(queryBooks, [userId]);


        if (!dataBooks || dataBooks.length === 0) {
            console.log("No se encontraron libros para este usuario.");
        } else {
            contBook = dataBooks.length
        }

        const queryWishlist = 'SELECT * FROM wishlist WHERE user_id = ?';
        const [dataWishlist] = await db.query(queryWishlist, [userId]);

        if (!dataWishlist || dataWishlist.length === 0) {
            console.log("No se encontraron libros para este usuario.");
        } else {
            contWishlist = dataWishlist.length
        }

        res.json({ bookCount: contBook, wishlistCount: contWishlist });
    } catch (error) {
        console.error("Error en la consulta:", error);
        return res.status(500).json({
            message: "something went wrong"
        });
    }
}

export { getCountingData };
