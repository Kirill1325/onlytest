import { useRef, useState } from 'react'
import { Timeline, TimelineEvent } from '../App'
import { EventItem } from './EventItem'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, FreeMode } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import styled from 'styled-components';
import { SwiperButtonPrev, SwiperButtonNext } from './SwiperButtons';
import { Swiper as SwiperType } from "swiper/types";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

interface EventListProps {
  timeline: Timeline
}

const Container = styled.div`
  height: 20vh;
  position: relative;
  order: 1;
  cursor: grab;
  @media (min-width: 767px) {
    order: 2;
    margin-top: 4em;
  }
`

export const EventList = ({ timeline }: EventListProps) => {

  const swiperRef = useRef<SwiperType>()

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const containerRef = useRef()

  useGSAP(() => {
    gsap.fromTo('.box', { opacity: 0 }, { opacity: 1, duration: 3 })
  },
    { scope: containerRef, dependencies: [timeline] }
  );

  return (
    <Container ref={containerRef as any}>
      <Swiper
        direction='horizontal'
        breakpoints={{
          320: {
            slidesPerView: 1.5,
          },
          767: {
            slidesPerView: 3,
          },
        }}
        onRealIndexChange={(swiper: SwiperType) => setCurrentIndex(swiper?.activeIndex)}
        onSwiper={(swiper: SwiperType) => {
          swiperRef.current = swiper;
        }}
        freeMode={true}
        modules={[FreeMode, Navigation, A11y]}
        className='box'
      >

        {timeline.events.map((event: TimelineEvent, idx: number) =>
          <SwiperSlide key={event.year}>
            <EventItem event={event} active={idx === currentIndex} />
          </SwiperSlide>
        )}
      </Swiper>

      <SwiperButtonPrev swiperRef={swiperRef} disabled={currentIndex === 0} />
      <SwiperButtonNext swiperRef={swiperRef} disabled={currentIndex === timeline.events.length - 3} />

    </Container >
  )
}
