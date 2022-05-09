import * as S from './styles';

type Props = {
    titulo:string,
    valor:string
}
export const InfoItem = ({titulo,valor}:Props)=>{
    return(
        <S.Container>
            <S.Titulo>{titulo}</S.Titulo>
            <S.Valor>{valor}</S.Valor>
        </S.Container>
    )
}