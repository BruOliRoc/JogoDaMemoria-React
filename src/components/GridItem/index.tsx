import { GridItemType } from '../../types/GridItemType';
import * as S from './styles';
import b7SVG  from '../../svgs/b7.svg';
import {items} from '../../data/Items';

type Props = {
    gridEl: GridItemType;
    funçaoClick: ()=> void;
}
export const GridItem = ({gridEl,funçaoClick}:Props)=>{
    return(
        <S.Container onClick={funçaoClick} mostrarBackground = {gridEl.mostradoPermanente || gridEl.mostrado}>
            {gridEl.mostradoPermanente === false  && gridEl.mostrado === false &&
                <S.Icon src={b7SVG} opacidade={0.1}/>
            }
            {(gridEl.mostradoPermanente || gridEl.mostrado) && gridEl.item !== null &&
                <S.Icon src={items[gridEl.item].icon} />
            }
        </S.Container>
    )
}