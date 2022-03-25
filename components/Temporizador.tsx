import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import styles from '../styles/Temporizador.module.css'

interface TemporizadorProps {
    key: number // é para diferenciar cada temporizador e dai toda vez que troca de tela reiniciar o tempo
    duracao: number
    tempoEsgotado: () => void
}

export default function Temporizador(props: TemporizadorProps) {
    let duracao = props.duracao
    return (
        <div className={styles.temporizador}>
            <CountdownCircleTimer 
                size={120}
                isPlaying
                duration={props.duracao}
                onComplete={props.tempoEsgotado}
                colors={['#bce596','#f7b801','#FF0000']}
                colorsTime={[duracao, duracao/3, 0]}
            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
        </div>
    )
}