import { Embaralhar } from "../../../functions/array"
import questoes from "../bancoDeQuestoes"

export default function Quest(req, res) {
    // pegando todos os ids das questoes 
    const ids = questoes.map(questao => questao.id)
    // embaralhando todos os ids que pegamos no bancoDeQuestoes
    res.status(200).json(Embaralhar(ids))
    
}