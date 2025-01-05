export declare namespace ISchedule {
  interface Weekday {
    id: number
    title: {
      full: string
      short: string
    }
    selected: boolean
  }

  interface NearDay {
    startFromId: number
    width: number
  }
}
