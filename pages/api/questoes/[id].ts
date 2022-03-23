import Questao from '../../../quiz/components/Questao'
import questoes from '../bancoDeQuestoes'
export default function handler(req, res) {
    const idSelecionado = +req.query.id

    // Filter: Returns the elements of an array that meet the condition specified in a callback function.
    const unicaQuestaoOuNada = questoes.filter(questao => questao.id === idSelecionado)
    if(unicaQuestaoOuNada.length === 1) {
        const questaoSelecionada = unicaQuestaoOuNada[0].embaralharRespostas()
        // pega o primeiro objeto instaciado mas ainda assim nao pega o objeto e por isso cria o metodo
        // converter para Objeto que retorna um ob com as propriedades dessa instancia
        res.status(200).json(questaoSelecionada.converterParaObjeto())
    } else { // usuario passou um id que nao tem questao associada
        res.status(204).send() // pagina sem conteudo - no content
    }

}
  