import { useEffect } from "react"
import { Timeline } from "../App"
import { data } from "../data"

export const useTimelineDates = (timeline: Timeline) => {
    const timelineDates:number[] = []

    timelineDates[0] = timeline?.events[0].year
    timelineDates[1] = timeline?.events.at(-1)!.year

    return timelineDates
}