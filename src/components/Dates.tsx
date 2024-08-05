import styled from "styled-components"
import { data } from "../data"
import { useAppDispatch } from "../store/store"
import { setTimelineId } from "../store/timelineSlice"
import { useState } from "react"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTimelineDates } from "../hooks/useTimelineDates"

gsap.registerPlugin(useGSAP);

interface DatesProps {
  timelineStart: number,
  timelineEnd: number,
  currentTimelineId: number
}

const Container = styled.div`
  display: flex;
  flex-basis: 55%;
  align-items: center;
  justify-content: center;
  position: relative;
  @media only screen and (min-width: 767px) {
    min-height: 15rem;
    flex-basis: 30%;
  }
  // horizontal  line
  &:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    top: calc(50% - 0.5px);
    background: rgba(66, 86, 122, .1);
    @media only screen and (max-width: 767px) {
      display: none;
    }
  }
  // vertical line
  &:after {
    content: "";
    position: absolute;
    top: -80%;
    bottom: -125%;
    width: 1px;
    left: calc(50% - 0.5px);
    background: rgba(66, 86, 122, .1);
    @media only screen and (max-width: 767px) {
      display: none;
    }
  }   
`

const Circle = styled.div`
  display: none;
  @media only screen and (min-width: 767px) {  
    height: 15rem;
    width: 15rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
  }
    @media only screen and (min-width: 960px) {
      height: 24rem;
      width: 24rem;
  }
`

const Date = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5em;
  max-width: 100%;
  @media only screen and (min-width: 767px) { 
    gap: 2.5em;
  }
`

const Header = styled.h1<{ $first?: boolean }>`
  font-size: 4em;
  font-weight: 700;
  line-height: 72.46px;
  letter-spacing: 0.02em;
  color: ${props => props.$first ? "#5d5fef" : "#ef5da8"};
  @media (min-width: 767px) {
    font-size: 5em;
  }
  @media (min-width: 960px) {
    font-size: 9em;
  }
`

const Element = styled.div<{ $deg?: number }>`
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(${props => props.$deg}deg) translate(50%) rotate(calc(-1 * ${props => props.$deg}deg));
  transition-property: transform;
  transition-duration: 0.8s;
  @media only screen and (max-width: 767px) {
    display: none;
  }
`

const Dot = styled.button<{ $active?: boolean }>`
  pointer-events: all;
  cursor: pointer;
   
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border:  ${props => props.$active ? "1px solid rgba(48, 62, 88, .5)" : "none"};
  background: ${props => props.$active ? "#F4F5F9" : "transparent"};
  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    width: 4px;
    height: 4px;
    display: ${props => props.$active ? "none" : "flex"};
    background-color: black;
    border: 1px solid rgba(48, 62, 88, .5);
    border-radius: 50%;
    transition: width 0.25s ease-in, height 0.25s ease-in, left 0.25s ease-in, top 0.25s ease-in, background-color 0.25s ease-in;
      
  }
  &hover{
    border: 1px solid rgba(48, 62, 88, .5);
  }
  &:hover:after {
    display: none;
  }
`

const Id = styled.p<{ $active?: boolean }>`
  font-size: 1.4em;
  font-weight: 400;
  display: ${props => props.$active ? "flex" : "none"};
  position: absolute;
  left: calc(50% - 6px);
  &:hover{
    display: flex;
  }
`

const Title = styled.p<{ $active?: boolean }>`
  font-size: 1.2em;
  font-weight: 700;
  display: ${props => props.$active ? "flex" : "none"};
  position: absolute;
  left: 130%;
`

export const Dates = ({ timelineStart, timelineEnd, currentTimelineId }: DatesProps) => {

  const offsetPerChild = 360 / data.length

  const dispatch = useAppDispatch()

  const [hoveredTimeline, setHoveredTimeline] = useState<number | null>(null)

  const [prevtimelineId, setPrevtimelineId] = useState<number>(1)

  const [prevTimelineStart, prevTimelineEnd] = useTimelineDates(data[prevtimelineId - 1])

  const handleTimelineClick = (timelineId: number) => {
    setPrevtimelineId(currentTimelineId)
    dispatch(setTimelineId(timelineId))
  }

  useGSAP(() => {
    gsap.fromTo('.box', { opacity: 0 }, { opacity: 1, duration: 3 })
    gsap.from('.startYear', {
      innerText: prevTimelineStart, duration: 1, snap: {
        innerText: 1
      }
    })
    gsap.from('.endYear', {
      innerText: prevTimelineEnd, duration: 1, snap: {
        innerText: 1
      }
    })
  },
    { dependencies: [currentTimelineId] }
  );

  return (

    <Container >
      <Circle>
        {data.map((timeline, idx) =>
          <Element
            key={timeline.id}
            $deg={-1 * ((idx) * offsetPerChild * (-1) + (offsetPerChild * currentTimelineId))}
            onClick={() => handleTimelineClick(timeline.id)}
            onMouseEnter={() => setHoveredTimeline(timeline.id)}
            onMouseLeave={() => setHoveredTimeline(null)}
            className='element'
          >
            <Dot
              $active={timeline.id === currentTimelineId || timeline.id === hoveredTimeline}
              className={`dot${idx + 1}${timeline.id === currentTimelineId}`}
            >
              <Id $active={timeline.id === currentTimelineId || timeline.id === hoveredTimeline}>{timeline.id}</Id>
              <Title $active={timeline.id === currentTimelineId}>{timeline.title}</Title>
            </Dot>
          </Element>
        )}
        <svg width="400" height="400" viewBox="0 0 530 530" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle opacity="0.2" cx="265" cy="265" r="264.5" stroke="#42567A" />
          <path
            id='circle'
            d="
                M 265, 265
                m 264.5, 0
                a 264.5,264.5 0 1,0 -529,0
                a 264.5,264.5 0 1,0 -529,0
              "
          />
        </svg>
      </Circle>
      <Date>
        <Header className="startYear" $first>{timelineStart}</Header>
        <Header className="endYear">{timelineEnd}</Header>
      </Date>
    </Container>

  )
}
