import { PointGPS } from './pdf'

export interface Itinerary {
    id: number;
    name: string;
    points: PointGPS[];
}

export interface ItineraryRequestEdit {
    id: number;
    name: string;
    points: PointGPS[];
}

export interface ItineraryRequestDelete {
    id: number;
}