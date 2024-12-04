export interface ITunesResponse {
  resultCount: number
  results: ITunesTrack[]
}

export interface ITunesTrack {
  artistName: string
  artworkUrl30: string
  artworkUrl60: string
  artworkUrl100: string
  previewUrl: string
  trackId: number
  trackName: string
}
