import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TimelineId {
  timelineId: number
}

const initialState: TimelineId = {
  timelineId: 1
}

export const timelineSlice = createSlice({
  name: 'backdrop',
  initialState,
  reducers: {
    setTimelineId(state, action: PayloadAction<TimelineId['timelineId']>) {
      action.payload <= 6 ? state.timelineId = action.payload : state.timelineId = 1

    }
  }
})


const { actions, reducer } = timelineSlice

export const { setTimelineId } = actions

export default reducer


