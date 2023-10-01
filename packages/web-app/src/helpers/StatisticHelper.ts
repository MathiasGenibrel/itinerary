import { Travel } from "@shared/contract/travel.ts";
import { Statistic } from "../components/dashboard/Card/StatCard.tsx";

export class StatisticHelper {
  public static calculateTotalDistance(travels: Travel[]): Statistic {
    const totalDistanceInMeters = travels.reduce(
      StatisticHelper.reduceDistanceCallback(),
      0,
    );

    return {
      unit: "km",
      value: StatisticHelper.transformMetersToKilometers(totalDistanceInMeters),
    };
  }

  public static calculateTotalTime(travels: Travel[]): Statistic {
    const totalTimeInMinutes = travels.reduce(
      StatisticHelper.reduceTimeCallback(),
      0,
    );

    if (totalTimeInMinutes < 60)
      return {
        unit: "min",
        value: totalTimeInMinutes,
      };

    return {
      unit: "h",
      value: StatisticHelper.transformMinutesToHours(totalTimeInMinutes),
    };
  }

  private static reduceDistanceCallback() {
    return (accumulator: number, currentValue: Travel) => {
      if (!Number(currentValue.distance))
        throw new Error("Current distance is not a number");
      return accumulator + Number(currentValue.distance);
    };
  }

  private static reduceTimeCallback() {
    return (accumulator: number, currentValue: Travel) =>
      accumulator + currentValue.time;
  }

  private static transformMetersToKilometers(meters: number): number {
    const kilometers = meters / 1e3;

    console.log("KILOMETERS: ", kilometers);

    if (kilometers < 10) return Number(kilometers.toFixed(2));
    if (kilometers < 100) return Number(kilometers.toFixed(1));
    return Number(kilometers.toFixed(0));
  }

  private static transformMinutesToHours(minutes: number): number {
    const hours = minutes / 60; // Divide by 60 minutes to transform in hour

    console.log("HOUR: ", hours);

    if (hours > 10) return Number(hours.toFixed(0));
    return Number(hours.toFixed(1));
  }
}
