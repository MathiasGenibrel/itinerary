export interface PointGPS {
  lat: string
  lon: string
}
export interface GeneratePDFRequest {
  itinerary: number
  name: string
  token: string
  points: PointGPS[]
}

export interface GetPDFRequest {
  token: string
}