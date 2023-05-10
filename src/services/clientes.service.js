import boom from '@hapi/boom';
import db from '../db/postgres.js';

export class ClientesService {
    async findAll() {
        const clientes = await db.any(`
            SELECT
                id,
                dni,
                nombre,
                apellido,
                telefono
            FROM clientes`);
        return clientes;
    }

    async findOne(id) {
        const cliente = await db.oneOrNone(
            `SELECT
                id,
                dni,
                nombre,
                apellido,
                telefono
            FROM clientes WHERE id = $1`,
            [id]
        );
        if (!cliente)
            throw boom.notFound(`El cliente con el id ${id} no existe`);
        return cliente;
    }

    async create(data) {
        const cliente = await db.one(
            `INSERT INTO clientes (
                dni,
                nombre,
                apellido,
                telefono
            ) VALUES ($1, $2, $3, $4) RETURNING
                id,
                dni,
                nombre,
                apellido,
                telefono
            `,
            [data.dni, data.nombre, data.apellido, data.telefono]
        );
        return cliente;
    }

    async update(id, data) {
        await this.findOne(id);
        const cliente = await db.one(
            `UPDATE clientes SET
                dni = COALESCE($1, dni),
                nombre = COALESCE($2, nombre),
                apellido = COALESCE($3, apellido),
                telefono = COALESCE($4, telefono)
            WHERE id = $5
            RETURNING
                id,
                dni,
                nombre,
                apellido,
                telefono
            `,
            [data.dni, data.nombre, data.apellido, data.telefono, id]
        );
        return cliente;
    }

    async delete(id) {
        await this.findOne(id);
        await db.none(
            `DELETE FROM clientes
            WHERE id = $1`,
            [id]
        );
    }
}
