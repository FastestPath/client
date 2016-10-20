package com.timetopath.pathtimer.schedule.models;

import com.google.common.collect.Multimap;

import java.time.Instant;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class Schedule {

  private final Multimap<String, Sequence> departureMap;

  private final Instant modifiedOn;

  public Schedule(Multimap<String, Sequence> departureMap, Instant modifiedOn) {
    this.departureMap = departureMap;
    this.modifiedOn = modifiedOn;
  }

  public Optional<Sequence> getSequence(StationName from, StationName to, Instant departAt) {
    Collection<Sequence> departures = departureMap.get(from.getValue());
    Optional<Sequence> sequenceOptional = departures.stream()
        .filter((departure) -> isBeforeDeparture(departure, departAt))
        .filter((departure) -> isDestinationPresent(departure, to))
        .findFirst();

    if (!sequenceOptional.isPresent()) {
      return Optional.empty();
    }

    Sequence sequence = sequenceOptional.get();
    LinkedList<Arrival> allArrivals = sequence.getArrivals();
    int destinationIndex = sequence.getArrivals().stream()
        .map((arrival) -> arrival.getStation().getName())
        .collect(Collectors.toList())
        .indexOf(to.getValue());

    List<Arrival> arrivals = allArrivals.subList(0, destinationIndex + 1);
    return Optional.of(new Sequence(arrivals));
  }

  public Instant getModifiedOn() {
    return modifiedOn;
  }

  private static boolean isBeforeDeparture(Sequence departure, Instant departAt) {
    return departure.getArrivals().get(0).getDepartureTime().isBefore(departAt);
  }

  private static boolean isDestinationPresent(Sequence origin, StationName destination) {
    return origin.getArrivals().stream()
        .map((arrival) -> arrival.getStation().getName())
        .filter((stationName) -> stationName.equals(destination.getValue()))
        .findFirst()
        .isPresent();
  }
}

