import { randomUUID } from "crypto"
import { sql } from "./db.js";

export class DatabasePostgres {
    #contas = new Map();

    async list(search) {
        let conta
        if (search) {
            conta = await sql`select * from contas where title ilike ${'%'+search+'%'}`
        }
        else{
            conta =  await sql`select * from contas`
        }
        return conta
    };

    async create(conta) {
        const contaId = randomUUID();
        const { titulo, descricao, valor, id_User} = conta
        await sql`insert into contas (id, titulo, descricao, valor, id_User) VALUES (${contaId}, ${titulo}, ${descricao}, ${valor}, ${id_User})`
    };
    
    async updade(id, conta) {
        const { titulo, descricao, valor, id_User} = conta

        await sql`update contas set title = ${titulo}, description = ${descricao}, valor = ${valor}, id_User = ${id_User} WHERE id = ${id}`
    };

    async delete(id) {
        await sql `delete from contas where id = ${id}` 
    };

}