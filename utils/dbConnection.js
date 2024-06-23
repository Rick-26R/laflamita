import { MongoClient } from 'mongodb';

const uri = process.env.URI;

export async function connectToDatabase() {
    try {
        const client = await MongoClient.connect(uri)
        const db = client.db('laflamita');
        console.log('Conexión exitosa a la base de datos');
        return db;
    } catch (error) {
        console.log('Error al conectar a la base de datos:', error);
        throw error;
    }
}

export async function closeConnection() {
    try {
        const client = await MongoClient.connect(uri);
        await client.close();
    } catch (error) {
        console.log('Error al cerrar la conexión:', error);
        throw error;
    }
}

export async function insertDocument(collection, document) {
    try {
        const db = await connectToDatabase();
        const result = await db.collection(collection).insertOne(document);
        await closeConnection();
        return result;
    } catch (error) {
        console.log('Error al insertar documento:', error);
        throw error;
    }
}

export async function findDocuments(collection, query) {
    try {
        const db = await connectToDatabase();
        const result = await db.collection(collection).find(query).toArray();
        return result;
    } catch (error) {
        console.log('Error al buscar documentos:', error);
        throw error;
    }
}

export async function findDocument(collection, query) {
    console.log('Buscando documento:', query);
    console.log('En la colección:', collection);
    try {
        const db = await connectToDatabase();
        const result = await db.collection(collection).findOne(query);
        console.log(result);
        return result;
    } catch (error) {
        console.log('Error al buscar documento:', error);
        throw error;
    }
}

export async function updateDocument(collection, query, update) {
    try {
        const db = await connectToDatabase();
        const result = await db.collection(collection).updateOne(query, update);
        return result;
    } catch (error) {
        console.log('Error al actualizar documento:', error);
        throw error;
    }
}

export async function deleteDocument(collection, query) {
    try {
        const db = await connectToDatabase();
        const result = await db.collection(collection).deleteOne(query);
        return result;
    } catch (error) {
        console.log('Error al eliminar documento:', error);
        throw error;
    }
}