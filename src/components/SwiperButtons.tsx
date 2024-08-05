import { Button } from "./BottomNavigation";
import styled from "styled-components";

const SwiperButton = styled(Button)`
  position: absolute;
  z-index: 1;
  width: 2.2em;
  height: 2.2em;
  border: none;
  box-shadow: 0px 0px 15px 0px #3877EE1A;

  &:before{
    border-left: .15em solid #3877EE;
    border-top: .15em solid #3877EE;
    width: .4em;
    height: .4em;
    
  }
  @media only screen and (max-width: 767px) {
    display: none;
  }
`

const SwipeArrowLeft = styled(SwiperButton) <{ $disabled?: boolean; }>`
  display: ${props => props.$disabled ? "none" : "flex"};
  top:20%;
  left: -6%;
  &:before{
    transform: translate(-140%, -45%) rotate(-45deg);
  }
  @media (max-width: 767px) {
    display: none;
  }
`

const SwipeArrowRight = styled(SwiperButton) <{ $disabled?: boolean }>`
  display: ${props => props.$disabled ? "none" : "flex"};
  top:20%;
  right: -6%;
  &:before{
    transform: translate(-180%, -45%) rotate(135deg);
  }
  @media (max-width: 767px) {
    display: none;
  }
`

interface SwiperButtonProps {
  swiperRef: any,
  disabled?: boolean
}

export const SwiperButtonPrev = ({ swiperRef, disabled }: SwiperButtonProps) => {
  return <SwipeArrowLeft $disabled={disabled} onClick={() => { swiperRef.current?.slidePrev() }}></SwipeArrowLeft>;
};

export const SwiperButtonNext = ({ swiperRef, disabled }: SwiperButtonProps) => {
  return <SwipeArrowRight $disabled={disabled} onClick={() => { swiperRef.current?.slideNext() }}></SwipeArrowRight>;
}