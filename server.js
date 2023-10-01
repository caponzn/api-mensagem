import {fastify} from 'fastify';
// import {DatabaseMemory} from './database-memory.js';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();
// const database = new DatabaseMemory();
const database = new DatabasePostgres();


//http://localhost:3333/mensagem
server.get('/mensagem', async (req, reply) =>{
    const search = req.query.search
   console.log(search)
    const mensagem = await database.list(search)
    
    return mensagem;
});
//http://localhost:3333/mensagem
server.post('/mensagem',async (req, reply) =>{
    const { titulo, descricao} = req.body;

    await database.create({
        titulo,
        descricao,
    })
    
    return reply.status(201).send();
});
//http://localhost:3333/mensagem/3
server.put('/mensagem/:id', async (req, reply) =>{
    const mensagemId = req.params.id;
    const { titulo, descricao} = req.body;

    await database.updade(mensagemId, {
        titulo,
        descricao,
    });
    return reply.status(204).send;
});
//http://localhost:3333/mensagem/3
server.delete('/mensagem/:id', async (req, reply) =>{
    const mensagemId = req.params.id;

    await database.delete(mensagemId);

    return reply.status(204).send();
});

server.listen({
    port: process.env.PORT ?? 3333,
});