package com.timetopath.pathtimer.schedule;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

class ScheduleFactory {

  public static Schedule createFromCSV(Path zipPath) throws IOException {
    List<Trip> trips = Files.lines(zipPath)
        .map(ScheduleFactory::addTrip)
        .collect(Collectors.toList());

    return new Schedule(trips);
  }

  private static Trip addTrip(String line) {
    List<String> components = Arrays.asList(line.split(","));
    Trip trip = new Trip();
    trip.setTripId(components.get(0));
    trip.setArrivalTime(components.get(1));
    trip.setDepartureTime(components.get(2));
    trip.setStopId(components.get(3));
    trip.setStopSequence(components.get(4));
    trip.setStopHeadSign(components.get(5));
    trip.setPickupType(components.get(6));
    trip.setDropOffType(components.get(7));
    trip.setShapeDistTraveled(components.get(8));
    return trip;
  }

  private ScheduleFactory() {}
}
