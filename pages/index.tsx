import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Questionario from '../components/Questionario'
import QuestaoModel from '../model/questao'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

const BASE_URL = 'http://localhost:3000/api'

export default function Home() {
  const router = useRouter()

  const [idsQuestoes, setIdsQuestoes] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>()
  const [respostasCertas, setRespostasCertas] = useState<number>(0)

  async function carregarIdsDasQuestoes() {
    const resp = await fetch(`${BASE_URL}/questionario`) //faz um chamada em http
    const idsQuestoes = await resp.json()
    setIdsQuestoes(idsQuestoes)
  }

  async function carregarQuestoes(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`) //faz um chamada em http
    const jsonQuestao = await resp.json() // ja é um objeto, mas nao é do tipo das classes q a gente definiu
    const novaQuestao = QuestaoModel.criarUsandoObjeto(jsonQuestao)
    setQuestao(novaQuestao)
  }

  useEffect(() => {
    carregarIdsDasQuestoes()
  }, [])// como é um [] vazio, chama a funcao quando o componente for inicializado
  
  useEffect(() => {
    idsQuestoes.length > 0 && carregarQuestoes(idsQuestoes[0])
  }, [idsQuestoes])// qnd o idsQuestoes mudar ele chama essa funcao

  function questaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestao(questaoRespondida)
    const acertou = questaoRespondida.acertou
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0)) // soma 1 se acertou
  }

  function idProximaPergunta() {
    const proximoIndice = idsQuestoes.indexOf(questao.id) + 1
    return idsQuestoes[proximoIndice]
  }

  function irParaProximoPasso() {
    const proximoId = idProximaPergunta()
    proximoId ? irParaProximaQuestao(proximoId) : finalizar()
  }

  function irParaProximaQuestao(proximoId: number) {
    carregarQuestoes(proximoId)
  }

  function finalizar() {
    router.push({
      pathname: '/resultado',
      query: { // mostra esses dois parametros na propria url 
        total: idsQuestoes.length,
        certas: respostasCertas
      }
    })
  }

  return questao ? (
    <Questionario 
      questao={questao}
      ultima={idProximaPergunta() === undefined}
      questaoRespondida={questaoRespondida}
      irParaProximoPasso={irParaProximoPasso}/>
  )  : false 
  
}
