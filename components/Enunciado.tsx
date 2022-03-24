import styles from '../styles/Enunciado.module.css'

interface EnunciadoProps {
    texto: string
}

export default function Enunciado(props) {
    return (
        <div className={styles.enunciado}>
            <div className={styles.texto}>
                {props.texto
                }
            </div>
        </div>
    )
}