import styled from 'styled-components';
import { BottomNavigation } from './components/BottomNavigation';
import { Dates } from './components/Dates';
import { EventList } from './components/EventList';
import { data } from './data';
import { useAppSelector } from './store/store';
import './App.css'

export type TimelineEvent = {
  year: number,
  info: string
}

export type Timeline = {
  id: number,
  title: string,
  events: TimelineEvent[]
}

const Header = styled.h1`
  flex-basis: 40%;
  display: flex;
  flex-direction: column-reverse;
  font-size: 1.5em;
  font-weight: 700;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 3.2em;
    bottom: 0;
    left: 0;
    height: 2.4em;
    width: 5px;
    display: none;
    background: linear-gradient(180deg, #3877EE -5%, #EF5DA8 85%);
    @media only screen and (min-width: 767px) {
      display: flex;    
    }
  }
  @media only screen and (min-width: 380px) {
    font-size: 2em;
  }
  @media only screen and (min-width: 767px) {
    font-size: 2.5em;
    padding: 1em 0 1em 2em;
  }
  @media only screen and (min-width: 960px) {
    padding: 3em 0 0 3em;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.5em;
  height: 100vh;
  border: none;
  @media (min-width: 767px) {
    margin: 0 5em 0 8em;
    padding: 0;
    border: 1px solid #bbb;
  }
    
`;

export const Typography = styled.p`
  font-size: 1.2em;
  font-weight: 400;
  
`

const TimelineTypography = styled(Typography)`
  flex-basis: 5%;
  @media (min-width: 767px) {
    display: none
  }
`

const Divider = styled.hr`
  border-top: 1px solid #bbb;
  margin: 1.5em 0;
  @media (min-width: 767px) {
    display: none
  }
`

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  flex-basis: 50%;
  justify-content: space-between; 
  @media (min-width: 767px) {
    justify-content: flex-start; 
    padding: 0 3em;
  }
  @media (min-width: 960px) {
    padding: 0 7.5em;
  }
`

function App() {

  const { timelineId } = useAppSelector(state => state.timelineSlice)

  const currentTimeline: Timeline = data[timelineId - 1]

  const timelineStart = currentTimeline.events[0].year
  const timelineEnd = currentTimeline.events.at(-1)!.year

  return (
    <Container>

      <div style={{flexBasis: '50%', display: 'flex', flexDirection: 'column'}}>
        <Header>
          Исторические <br /> даты
        </Header>

        <Dates timelineStart={timelineStart} timelineEnd={timelineEnd} currentTimelineId={timelineId} />

        <TimelineTypography>
          {currentTimeline.title}
        </TimelineTypography>
      </div>

      <Divider />

      <BottomContainer>
        <EventList timeline={currentTimeline} />
        <BottomNavigation currentTimelineId={timelineId} />
      </BottomContainer>

    </Container>
  );
}

export default App;
