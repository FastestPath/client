package com.timetopath.pathtimer.schedule;

import com.timetopath.pathtimer.schedule.models.Arrival;
import com.timetopath.pathtimer.schedule.models.Sequence;
import com.timetopath.pathtimer.schedule.models.Station;

import javax.inject.Singleton;
import java.util.*;

@Singleton
public class SequenceJoiner {

  public List<Sequence> joinArrivals(List<Arrival> arrivals, List<Station> stations) {
    Map<String, Station> stationMap = createStationMap(stations);
    return groupTripsBySequence(arrivals, stationMap);
  }

  private Map<String,Station> createStationMap(List<Station> stations) {
    Map<String, Station> stationMap = new HashMap<>();
    stations.forEach((station) -> {
      Set<String> stopIds = station.getStopIdMap().keySet();
      stopIds.forEach((stopId) -> stationMap.put(stopId, station));
    });
    return stationMap;
  }

  private List<Sequence> groupTripsBySequence(List<Arrival> arrivals, Map<String, Station> stationMap) {
    List<Sequence> sequences = new ArrayList<>();
    Sequence sequence = new Sequence();
    Arrival prev = null;
    for (Arrival arrival : arrivals) {
      if (prev == null || arrival.getStopSequence().compareTo(prev.getStopSequence()) > 0) {
        prev = arrival;
      } else {
        sequences.add(sequence);
        sequence = new Sequence();
        prev = null;
      }

      // add the station to the arrival
      Station station = stationMap.get(arrival.getStopId());
      arrival.setStation(station);

      sequence.addArrival(arrival);
    }
    return sequences;
  }
}
