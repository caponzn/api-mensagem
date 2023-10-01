import { randomUUID } from "crypto"
import { sql } from "./db.js";

export class DatabasePostgres {
    #mensagens = new Map();

    async list(search) {
        let mensagem
        if (search) {
            mensagem = await sql`select * from menssagem where title ilike ${'%'+search+'%'}`
        }
        else{
            mensagem =  await sql`select * from menssagem`
        }
        return mensagem
    };

    async create(mensagem) {
        const mensagemId = randomUUID();
        const { titulo, descricao} = mensagem
        await sql`insert into menssagem (id, title, description) VALUES (${mensagemId}, ${titulo}, ${descricao})`
    };

    async updade(id, mensagem) {
        const { titulo, descricao} = mensagem

        await sql`update menssagem set title = ${titulo}, description = ${descricao} WHERE id = ${id}`
    };

    async delete(id) {
        await sql `delete from menssagem where id = ${id}` 
    };

}