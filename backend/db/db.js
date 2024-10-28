import mysql from "mysql2/promise"; // Cambia a mysql2/promise

const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password",
    port: 3306,
    database: "booklive",
});

// Función para conectarse a la base de datos y realizar consultas
async function connectAndQuery() {
    try {
        await db.connect(); 
    } catch (err) {
        console.error('Error al conectar o consultar la base de datos:', err.message);
    }
}

connectAndQuery(); // Llama a la función para conectar y consultar
export { db }; // Exporta la conexión si es necesario
