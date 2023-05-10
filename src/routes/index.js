import { Router } from 'express';
import clienteRouter from './clientes.routes.js';
import mascotaRouter from './mascotas.routes.js';

const router = Router();

router.use('/clients', clienteRouter);
router.use('/pets', mascotaRouter);

export default router;
