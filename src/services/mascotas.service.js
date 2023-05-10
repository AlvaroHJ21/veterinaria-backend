import boom from '@hapi/boom';
import db from '../db/postgres.js';

export class MascotasService {
    async findAll() {
        const mascotas = await db.any(`
        SELECT
            m.id,
            m.nombre,
            m.edad,
            JSON_BUILD_OBJECT(
                'id', c.id,
                'nombre', c.nombre,
                'apellido', c.apellido,
                'telefono', c.telefono,
                'dni', c.dni
            ) as cliente
        FROM mascotas as m
        INNER JOIN clientes as c ON m.cliente_id = c.id
        `);
        return mascotas;
    }

    async findOne(id) {
        const mascota = await db.oneOrNone(
            `SELECT
                m.id,
                m.nombre,
                m.edad,
                JSON_BUILD_OBJECT(
                    'id', c.id,
                    'nombre', c.nombre,
                    'apellido', c.apellido,
                    'telefono', c.telefono,
                    'dni', c.dni
                ) as cliente
            FROM mascotas as m
            INNER JOIN clientes as c ON m.cliente_id = c.id
            WHERE m.id = $1`,
            [id]
        );
        if (!mascota)
            throw boom.notFound(`La mascota con el id ${id} no existe`);
        return mascota;
    }

    async create(data) {
        const mascota = await db.one(
            `INSERT INTO mascotas (
                nombre,
                edad,
                cliente_id
            ) VALUES ($1, $2, $3) RETURNING
                id,
                nombre,
                edad,
                cliente_id
            `,
            [data.nombre, data.edad, data.idCliente]
        );
        const mascotaDB = this.findOne(mascota.id);
        return mascotaDB;
    }

    async update(id, data) {
        await this.findOne(id);
        const mascota = await db.one(
            `UPDATE mascotas SET
                nombre = COALESCE($1, nombre),
                edad = COALESCE($2, edad),
                cliente_id = COALESCE($3, cliente_id)
            WHERE id = $4
            RETURNING
                id,
                nombre,
                edad,
                cliente_id
            `,
            [data.nombre, data.edad, data.idCliente, id]
        );
        const mascotaDB = this.findOne(mascota.id);
        return mascotaDB;
    }

    async delete(id) {
        await this.findOne(id);
        await db.none(
            `DELETE FROM mascotas
            WHERE id = $1`,
            [id]
        );
    }
}
