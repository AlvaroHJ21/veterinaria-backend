import { Router } from 'express';
import { MascotasService } from '../services/mascotas.service.js';

const router = Router();
const service = new MascotasService();

router.get('/', async (req, res, next) => {
    try {
        const mascotas = await service.findAll();
        res.status(200).json({
            ok: true,
            data: mascotas,
        });
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const mascota = await service.findOne(req.params.id);
        res.status(200).json({
            ok: true,
            data: mascota,
        });
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const mascota = await service.create(req.body);
        res.status(201).json({
            ok: true,
            data: mascota,
        });
    } catch (error) {
        next(error);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const mascota = await service.update(id, data);
        res.status(200).json({
            ok: true,
            data: mascota,
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
            data: 'Mascota eliminada',
        });
    } catch (error) {
        next(error);
    }
});

export default router;
