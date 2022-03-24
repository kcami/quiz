import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Questao from '../components/Questao'
import QuestaoModel from '../model/questao'
import RespostaModel from '../model/resposta'
import styles from '../styles/Home.module.css'

const questaoMock = new QuestaoModel(1, 'Melhor cor?', [
    RespostaModel.certa('Verde'),
    RespostaModel.errada('Branco'),
    RespostaModel.errada('Laranja'),
    RespostaModel.errada('Azul')
])

export default function Home() {

  const [questao, setQuestao] = useState(questaoMock)

  function respostaFornecida(indice: number) { // comunicacao indireta (info do Resposta vai para a Questao e depois para o indice)
    setQuestao(questao.responderCom(indice)) // retorna uma questao com dados atualizados
  }

  function tempoEsgotado() {
    if(questao.naoRespondida) {
      setQuestao(questao.responderCom(-1))
    }
  }

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Questao valor={questao} 
          respostaFornecida={respostaFornecida}
          tempoEsgotado={tempoEsgotado}/>

    </div>
  )
}
