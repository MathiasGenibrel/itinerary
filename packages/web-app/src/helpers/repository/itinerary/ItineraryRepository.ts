import { ItineraryRequestEdit, ItineraryRequestDelete, Itinerary } from '@shared/contract/itinerary';

export interface ItineraryRepository {
  edit: (itinerary: ItineraryRequestEdit) => Promise<Itinerary>;
  delete: (itinerary: ItineraryRequestDelete) => Promise<void>;
}
