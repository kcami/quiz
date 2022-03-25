import { useRouter } from 'next/router'
import styles from '../styles/Resultado.module.css'
import Estatistica from '../components/Estatistica'
import Botao from '../components/Botao'

export default function Resultado() {
    const router = useRouter()
    const total = +router.query.total
    const certas = +router.query.certas
    const percentual = Math.round((certas / total) * 100)

    const cor = percentual > 50 ? "#90ec4d" : "#de6a33"    

    return (
        <div className={styles.resultado}>
            {console.log(percentual)}
            <h1>Resultado Final</h1>
            <div style={{display: "flex"}}>
                <Estatistica texto="Perguntas" valor={total}/>
                <Estatistica texto="Certas" valor={certas}
                                corFundo="#9cd2a4"/>
                <Estatistica texto="Percentual" valor={percentual + '%'}
                                corFundo={cor} />
            </div>
            <Botao href='/' texto='Tentar novamente'></Botao>
        </div>
    )
}