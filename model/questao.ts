// classe do questionário
// vc vai descobrindo as coisas durante o desenvolvimento (as vezes precisa de mais atributos, ...)

import { Embaralhar } from "../functions/array"
import RespostaModel from "./resposta"

// no fundo vc esta fazendo um pouco do front, depois um pouco da api, ... ate dar certo
export default class QuestaoModel {
    #id: number
    #enunciado: string
    #respostas: RespostaModel[]
    #acertou: boolean
    //#respondida: boolean

    constructor(id: number, enunciado: string, respostas: any[], acertou = false) {
        this.#id = id
        this.#enunciado = enunciado
        this.#respostas = respostas
        this.#acertou = acertou
    }

    get id() {
        return this.#id
    }

    get enunciado() {
        return this.#enunciado
    }

    get respostas() {
        return this.#respostas
    }

    get acertou() {
        return this.#acertou
    }
    // esse metodo getter é calculado e nao tem um atributo associado 
    get respondida() {
        for(let respostas of this.#respostas) {// percorrendo os valores da array de respostas
            if(respostas.revelada) return true 
        }
        return false
    }

    embaralharRespostas(): QuestaoModel {
        let respostasEmbaralhadas = Embaralhar(this.#respostas)
        // criamos uma nova instancia com as respostas embaralhadas
        return new QuestaoModel(this.#id, this.#enunciado, respostasEmbaralhadas, this.#acertou)
    }

    converterParaObjeto() {
        return {
            id: this.#id,
            enunciado: this.#enunciado,
            respostas: this.#respostas.map(resp => resp.converterParaObjeto()),
            // precisou criar um método converterParaObjetos no PerguntasModel tbm para retornar o obj de maneira apropriada
            acertou: this.#acertou,
        }
    }

}