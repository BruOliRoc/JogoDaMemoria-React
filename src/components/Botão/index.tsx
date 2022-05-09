import * as S from './styles';

type Props = {
    nome:string;
    icone?:any;
    funçaoClick:React.MouseEventHandler<HTMLDivElement>;
}
export const Botão = ({nome,icone,funçaoClick}:Props)=>{
    return(
        <S.Container onClick={funçaoClick}>
           {icone &&
            <S.IconArea>
                <S.Icon src={icone}/>
            </S.IconArea>
           }
            <S.Label>{nome}</S.Label>
        </S.Container>
    )
}