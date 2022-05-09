import styled from "styled-components";

type ContainerProps ={
    mostrarBackground: boolean,
}
export const Container = styled.div<ContainerProps>`
    background-color: ${props => props.mostrarBackground ? '#1550FF' : '#E2E3E3'};
    height: 100px;
    border-radius:20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

type IconProps ={
    opacidade?:number
}
export const Icon = styled.img<IconProps>`
    width: 40px;
    height: 40px;
    opacity: ${props => props.opacidade ? props.opacidade : 1}
`;