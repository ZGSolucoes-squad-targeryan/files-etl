import GlosaMaxxConvenio from '../convenios/GlosaMaxxConvenio';
import Sites from '../configs/sites'

class Handler {
    GlosaMaxx = async function (competencia){
        const convenio = Sites['GlosaMaxx'];
        const response =  await GlosaMaxxConvenio.getAnalyticDemonstrative(competencia, convenio.baseURL);
        return response;
    }
}

export default new Handler();