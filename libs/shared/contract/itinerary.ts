import { PointGPS } from './pdf'

export interface Itinerary {
    id: number
    name: string
    startPoint: PointGPS
    endPoint: PointGPS
}

export interface ItineraryRequestEdit {
    id: number
    name: string
    points: PointGPS[]
    startPoint: PointGPS
    endPoint: PointGPS
}

export interface ItineraryRequestDelete {
    id: number;
}