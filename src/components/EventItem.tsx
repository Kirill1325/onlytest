import { TimelineEvent, Typography } from '../App'
import styled from 'styled-components'

interface EventItemProps {
  event: TimelineEvent,
  active: boolean
}

const Year = styled.div`
  font-size: 1.3em;
  font-weight: 600;
  color: #3877EE;
  margin-bottom: 0.5em
`

const Container = styled.div<{ $active?: boolean }>`
  opacity: ${props => props.$active ? 1 : 0.5};
  @media (min-width: 767px) {
    opacity: 1
  }
`

export const EventItem = ({ event, active }: EventItemProps) => {
  return (
    <Container $active={active} >
      <Year>{event.year}</Year>
      <Typography>{event.info}</Typography>
    </Container>
  )
}
