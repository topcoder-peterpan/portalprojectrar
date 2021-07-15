import { EventInput } from '@fullcalendar/react'

let eventGuid = 0
const todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
export const createEventId = () => String(eventGuid++)
export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211101T12:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211101T13:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211101T14:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211101T15:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211101T16:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211108T12:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211108T13:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211108T14:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211108T15:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211108T16:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211115T12:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211115T13:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211115T14:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211115T15:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211115T16:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211122T12:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211122T13:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211122T14:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211122T15:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211122T16:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211129T12:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211129T13:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211129T14:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211129T15:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211129T16:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211206T12:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211206T13:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211206T14:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211206T15:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '20211206T16:00:00'
  },
]
