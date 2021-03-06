import QuestaoModel from '../model/questao'
import styles from '../styles/Questao.module.css'
import Enunciado from './Enunciado'
import Resposta from './Resposta'
import Temporizador from './Temporizador'

const letras = [
    { valor: 'A', cor: '#F2C866' },
    { valor: 'B', cor: '#F266BA' },
    { valor: 'C', cor: '#85D4F2' },
    { valor: 'D', cor: '#BCE596' },
]

interface QuestaoProps {
    valor: QuestaoModel
    tempoParaResposta?: number
    respostaFornecida: (indice: number) => void
    tempoEsgotado: () => void
}

export default function Questao(props: QuestaoProps) {
    const questao = props.valor

    function renderizarRespostas() {
        // colocar o key como i vai fazer com que a proxima pagina repita a chave(e da problemas)
        return questao.respostas.map((resposta, i) => { // precisa do key porque esta renderizando um array de elementos
            return <Resposta
                        key={`${questao.id}-${i}`} // para garantir que a chave vai ser diferente
                        valor={resposta}
                        indice={i}
                        letra={letras[i].valor}
                        corFundoLetra={letras[i].cor}
                        respostaFornecida={props.respostaFornecida}
                    />
        })
    }

    return (
        <div className={styles.questao}>
            <Enunciado texto={questao.enunciado}/>
            <Temporizador key={questao.id} duracao={props.tempoParaResposta ?? 10} 
                tempoEsgotado={props.tempoEsgotado}/>
            {renderizarRespostas()}
        </div>
    )
}