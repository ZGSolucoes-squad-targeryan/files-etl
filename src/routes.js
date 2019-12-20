import { Router } from 'express';

import DemonstrativeController from './app/controllers/DemonstrativeController'

const routes = new Router();

routes.get('/', defaultResponse)
routes.get('/analytic-demonstrative', DemonstrativeController.index);

async function defaultResponse(req,res) {
    return res.json({Message: 'Files-ETL-System'})
}

export default routes;