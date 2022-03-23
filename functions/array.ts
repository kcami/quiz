export function Embaralhar(elementos: any[]): any[] {
    return elementos
        .map(valor => ({ valor, aleatorio: Math.random() })) // adicona numeros aleatorios
        .sort((obj1, obj2) => obj1.aleatorio - obj2.aleatorio) // organiza baseado no numero aleatorio
        .map(obj => obj.valor)// retorna so o valor
}