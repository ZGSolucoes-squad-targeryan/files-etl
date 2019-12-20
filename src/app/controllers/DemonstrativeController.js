import Handler from "../helpers/Handler";

class DemonstrativeController {

    async index(req,res){
        const { convenio, competencia } = req.query;
        if(!convenio){
            return res.status(400).json({error: 'Insuficient params to get demonstratives'})
        }
        const response = await Handler[convenio](competencia)
        return res.json(response);
    }
}

export default new DemonstrativeController();