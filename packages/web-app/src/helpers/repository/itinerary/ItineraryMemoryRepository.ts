import { ItineraryRequestDelete, ItineraryRequestEdit, Itinerary } from '@shared/contract/itinerary';
import { ItineraryRepository } from './ItineraryRepository';

export class ItineraryMemoryRepository implements ItineraryRepository {
  private readonly timeout: number = 2e3;
  private readonly percentageSuccessRating: number = 1;

  public async edit(itinerary : ItineraryRequestEdit): Promise<Itinerary> {
    await this.delay();

    const isSuccessfulRequest = Math.random() < this.percentageSuccessRating;

    if (!isSuccessfulRequest) throw new Error("This username is already used");
    return {
        id : itinerary.id,
        name : itinerary.name,
        points: itinerary.points
    }
  }

  public async delete(itinerary : ItineraryRequestDelete): Promise<void> {
    await this.delay();

    const isSuccessfulRequest = Math.random() < this.percentageSuccessRating;

    if (!isSuccessfulRequest) throw new Error("This username is already used");
  }

  private delay(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, this.timeout);
    });
  }
}