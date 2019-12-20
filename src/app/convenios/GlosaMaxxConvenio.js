import api from '../services/api';
import {csvToJson} from '../utils/csvToJson'

class GlosaMaxxConvenio{
    async getAnalyticDemonstrative(competencia, baseURL){
        const urlDemonstrativePage = await this.getDemonstrativePageURL(baseURL)
        const urlDemonstatives = await this.getDemonstrativesURL(baseURL,`${baseURL}${urlDemonstrativePage}`)
        const demonstrativeInfos =  await this.getDemonstrativesInfo(urlDemonstatives)
        return demonstrativeInfos
    }

    async getDemonstrativePageURL(baseURL) {
        const response = await api.get(`${baseURL}/pagamento-glosamax/`);
    
        const urlDemonstrativePage = await response.data.match(/(\/paga.*)(?=">br)/)[0]
        return urlDemonstrativePage
    }

    async getDemonstrativesURL(baseURL,url) {
        const response = await api.get(url);
        const urlDemonstatives = response.data.match(/(pa.*?)(?=">P.gina)/g)

        const urlLinks= await Promise.all(urlDemonstatives.map(async (actualURL) => {
            const actualResponse = await api.get(`${baseURL}/${actualURL}`)
            const actualURLS = actualResponse.data.match(/(http.*?)(?="\starget="_blank.*?\.csv)/g)
            const actualFileNames = actualResponse.data.match(/(?<=target="_blank">).*?csv/g)
            const fileInfos = []
            for(let idx=0; idx< actualURLS.length; idx++){
                fileInfos.push({ 
                    'url' : actualURLS[idx],
                    'fileName' : actualFileNames[idx]
                })
            }
            return fileInfos
        }));

        return [].concat.apply([], urlLinks);
    }

    async getDemonstrativesInfo(urlDemonstatives){
        const infos = await Promise.all(urlDemonstatives.map(async actualInfos => {
            const actualURL = actualInfos.url
            const response = await api.get(actualURL)

            return csvToJson(response.data, {
                discriminador: 'CONVENIO',
                nomeArquivo: actualInfos.fileName
            });
        }));

        return [].concat.apply([], infos);
    }
}

export default new GlosaMaxxConvenio();