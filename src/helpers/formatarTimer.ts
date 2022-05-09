export const formatarTempoDecorrido = (segundos:number)=>{
    let minutos = Math.floor(segundos/60);
    segundos = segundos - (minutos*60);

    let secString = `${segundos < 10 ? '0'+segundos : segundos} `
    let minString = `${minutos < 10 ? '0'+minutos : minutos} `

    return `${minString}: ${secString}`;
}