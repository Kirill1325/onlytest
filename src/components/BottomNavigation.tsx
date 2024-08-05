import { data } from '../data'
import { useAppDispatch } from '../store/store'
import { setTimelineId, TimelineId } from '../store/timelineSlice'
import styled from 'styled-components'

interface BottomNavigationProps {
  currentTimelineId: TimelineId['timelineId']
}

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 5em;
  order: 2;
  padding-bottom: 2em;
  position: relative;
  @media (min-width: 767px) {
    position: static;
    padding-top: 3em;
    order: 1;
  }
`

export const Button = styled.button<{ disabled?: boolean; $right?: boolean; }>`
  /* Adapt the colors based on primary prop */
  backgroung-color: white;
  outline: none;
  background: transparent;

  opacity: ${props => props.disabled ? 0.6 : 1};
  cursor: ${props => props.disabled ? 'auto' : 'pointer'};

  display: flex;
  align-items: center;
  justify-content: center;

  width: 2em;
  height: 2em;
  font-size: 1em;
  border: 2px solid lightgray;
  border-radius: 50%;
  position: relative;

  &:hover{
    background: white;
  }

  &:before{
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    display: block;
    border-left: .1em solid #42567A;
    border-top: .1em solid #42567A;
    width: .5em;
    height: .5em;
    float: right;
    transform: 
      ${props => props.$right
    ? 'translate(-120%, -45%) rotate(135deg)'
    : 'translate(-80%, -50%) rotate(-45deg)'
  };
  }
  @media (min-width: 767px) {
    width: 3em;
    height: 3em;
    
    &:before{
        border-left: .2em solid #42567A;
        border-top: .2em solid #42567A;
        transform: 
          ${props => props.$right
            ? 'translate(-160%, -45%) rotate(135deg)'
            : 'translate(-140%, -50%) rotate(-45deg)'
          };
    }
  }
`;

const DotsContainer = styled.div`
  position: absolute;
  left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto; 
  display: flex;
  gap: 1em;
  justify-content: center;
  @media (min-width: 767px) {
    display: none
  }
`

const Dot = styled.span<{ $active?: boolean }>`
  background: ${props => props.$active ? "black" : "#bbb"};
  height: 8px;
  width: 8px;
  border-radius: 50%;
  display: inline-block;
  @media (min-width: 767px) {
    display: none
  }
`

const DateTypography = styled.p`
  font-size: 1em;
  font-weight: 400;
`

export const BottomNavigation = ({ currentTimelineId }: BottomNavigationProps) => {

  const dispatch = useAppDispatch()

  return (
    <Container >

      <div style={{  display: 'flex', flexDirection: 'column', gap: '.5em'  }}>
        <DateTypography>0{currentTimelineId}/0{data.length}</DateTypography>
        <div style={{ display: 'flex', gap: '1em' }}>
          <Button
            disabled={currentTimelineId === 1}
            onClick={() => dispatch(setTimelineId(currentTimelineId - 1))}
          >
          </Button>
          <Button
            $right
            disabled={currentTimelineId === data.length}
            onClick={() => dispatch(setTimelineId(currentTimelineId + 1))}
          >
          </Button>
        </div>
      </div>

      <DotsContainer>
        {data.map((timeline, index) => (
          <Dot
            key={timeline.id}
            $active={index + 1 === currentTimelineId}
            onClick={() => dispatch(setTimelineId(index + 1))}
          />
        ))}
      </DotsContainer>

    </Container>

  )
}
