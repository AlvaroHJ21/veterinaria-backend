import { Router } from 'express';
import { ClientesService } from '../services/clientes.service.js';

const router = Router();
const service = new ClientesService();

router.get('/', async (req, res, next) => {
    try {
        const facturas = await service.findAll();

        res.status(200).json({
            ok: true,
            data: facturas,
        });
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const factura = await service.findOne(req.params.id);

        res.status(200).json({
            ok: true,
            data: factura,
        });
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const factura = await service.create(req.body);

        res.status(201).json({
            ok: true,
            data: factura,
        });
    } catch (error) {
        next(error);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const factura = await service.update(id, data);

        res.status(200).json({
            ok: true,
            data: factura,
        });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;

        await service.delete(id);

        res.status(200).json({
            ok: true,
            data: 'Cliente eliminado',
        });
    } catch (error) {
        next(error);
    }
});

export default router;
