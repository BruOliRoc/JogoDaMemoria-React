import { useEffect,useState } from 'react';
import * as S from './App.styles';
import logoImagem from './assets/devmemory_logo.png';
import restartIcone from './svgs/restart.svg';
import { Botão } from './components/Botão';
import { InfoItem } from './components/InfoItem';
import { GridItem } from './components/GridItem';
import { GridItemType } from './types/GridItemType';
import { items } from './data/Items';
import { formatarTempoDecorrido } from './helpers/formatarTimer';



const App = ()=>{
  
  const [jogando,setJogando] = useState<boolean>(false);
  const [tempoDecorrido,setTempoDecorrido] = useState<number>(0);
  const [movimentos,setMovimentos] = useState<number>(0);
  const [cartasViradas, setCartasViradas] = useState<number>(0);
  const [gridItens, setGridItens] = useState<GridItemType[]>([]);

  useEffect( ()=>{
    resetAndCreate();
  },[] );

  useEffect ( ()=>{
    const timer = setInterval( ()=>{
      if(jogando){setTempoDecorrido(tempoDecorrido + 1) }
    },1000 );
    return ()=> clearInterval(timer)
  },[jogando,tempoDecorrido] );

  //*Verificar se acertou(cartas iguais )
  useEffect ( ()=>{
    if(cartasViradas === 2){
      let aberto = gridItens.filter(item => item.mostrado === true);
      if(aberto.length === 2){
        //verificação 1- se são iguais irão virar permanentes
        let tmpGrid = [...gridItens];
        if(aberto[0].item === aberto[1].item){
          for(let i in tmpGrid){
            if(tmpGrid[i].mostrado){
              tmpGrid[i].mostradoPermanente = true;
              tmpGrid[i].mostrado = false;
            }
          }
          setGridItens(tmpGrid);
          setCartasViradas(0);
        }else{
        //verificação 2- se não são iguais as cartas serão fechadas
       setTimeout(() =>{
        let tmpGrid = [...gridItens];
        for(let i in tmpGrid){
          tmpGrid[i].mostrado = false;
        }
        setGridItens(tmpGrid);
        setCartasViradas(0);
       },1000)
        }
        setMovimentos(movimentos => movimentos + 1);
      }
    }
  },[cartasViradas,gridItens])

  //*Verifica se o jogo acabou
  useEffect ( ()=>{
    if(cartasViradas > 0 && gridItens.every(item => item.mostradoPermanente === true)){
      setJogando(false);
    }
  },[cartasViradas,gridItens])

  const resetAndCreate = ()=>{
    //*passo 1- resetar o jogo
    setTempoDecorrido(0);
    setMovimentos(0);
    setCartasViradas(0);

    //*passo 2- criar o grid
    //2.1- criar o grid vazio
    let gridTemporario:GridItemType[] =[];
    for(let i=0; i<(items.length*2); i++ ){
      gridTemporario.push({
        item:null, mostrado:false, mostradoPermanente:false
      });
    };

    //2.2- preencher o grid vazio
    for(let w=0; w<2; w++){
      for(let i=0; i<items.length; i++){
        let posiçao = -1;
        while(posiçao <0 || gridTemporario[posiçao].item !==null){
          posiçao = Math.floor(Math.random() * (items.length*2));
          
        }
        gridTemporario[posiçao].item = i;
      }
    }

    //2.1- jogar o grid preenchido no state
    setGridItens(gridTemporario);


    //*passo 3- começar o jogo
    setJogando(true);

  }

  const funçaoItemClick = (index: number)=>{
    if(jogando && index !== null && cartasViradas<2 ){
      let tmpGrid = [...gridItens];

      if(tmpGrid[index].mostradoPermanente === false && tmpGrid[index].mostrado === false){
        tmpGrid[index].mostrado = true;
        setCartasViradas(cartasViradas + 1);
      }
      setGridItens(tmpGrid);
    }
  }

return(
  <S.Container>
    <S.Info>
      <S.LogoLink href="">
        <img src={logoImagem} width="200"/>
      </S.LogoLink>
      <S.InfoArea>
        
        <InfoItem titulo='Tempo' valor={formatarTempoDecorrido(tempoDecorrido)} />
        <InfoItem titulo='Movimentos' valor={movimentos.toString()} />

      </S.InfoArea>
      <Botão nome='Reiniciar' icone={restartIcone} funçaoClick={resetAndCreate}/>
    </S.Info>
    
    <S.GridArea> 
        <S.Grid>
          {gridItens.map( (item,index)=>(
            <GridItem key={index} gridEl={item} funçaoClick={()=> funçaoItemClick(index)}/>
          ) )}
        </S.Grid>
    </S.GridArea>
  </S.Container>
);

}

export default App;