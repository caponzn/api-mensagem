import {fastify} from 'fastify';
// import {DatabaseMemory} from './database-memory.js';
import { DatabasePostgres } from './database/database-postgres.js';

const server = fastify();
// const database = new DatabaseMemory();
const database = new DatabasePostgres();


//rota de exibição das contas
server.get('/contas', async (req, reply) =>{
    const search = req.query.search
    const conta = await database.list(search)
    
    return conta;
});
//rota de criação das contas
server.post('/contas',async (req, reply) =>{
    const { titulo, descricao, valor, id_User} = req.body;

    await database.create({
        titulo,
        descricao,
        valor,
        id_User
    })
    
    return reply.status(201).send();
});
//rota de modificação das contas
server.put('/contas/:id', async (req, reply) =>{
    const contaID = req.params.id;
    const { titulo, descricao, valor, id_User} = req.body;

    await database.updade(contaID, {
        titulo,
        descricao,
        valor,
        id_User
    });
    return reply.status(204).send;
});
//rota de exclusão das contas
server.delete('/contas/:id', async (req, reply) =>{
    const contaID = req.params.id;

    await database.delete(contaID);

    return reply.status(204).send();
});

server.listen({
    host: process.env.HOST ?? '0.0.0.0',
    port: process.env.PORT ?? 3333,
});