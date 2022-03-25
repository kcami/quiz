import Link from 'next/link'
import styles from '../styles/Botao.module.css'


// criar componentes menos flexiveis e menos genericos nao precisa criar um componente com muitas personalizacoes
// pois ele vai ter poucas situações de uso
interface BotaoProps {
    href?: string
    texto: string // para a situacao de envolver um link 
    onClick?: (e: any) => void // para outra situacao que chama so uma funcao
}

export default function Botao(props: BotaoProps) {
    function renderizarBotao() {
        return (
            <button className={styles.botao}
                onClick={props.onClick}>
                {props.texto}
            </button>
        )
    }

    return props.href ? (
        <Link href={props.href} passHref>
            {renderizarBotao()}
        </Link>
    ) : renderizarBotao()

}