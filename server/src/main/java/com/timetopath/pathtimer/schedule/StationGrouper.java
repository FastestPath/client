package com.timetopath.pathtimer.schedule;

import com.google.common.collect.ArrayListMultimap;
import com.timetopath.pathtimer.schedule.models.Station;
import com.timetopath.pathtimer.schedule.models.Stop;

import javax.inject.Singleton;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Singleton
public class StationGrouper {

  public List<Station> groupByStation(List<Stop> stops) {
    ArrayListMultimap<String, Stop> nameMap = ArrayListMultimap.create();

    // group stops by name
    stops.forEach((stop) -> nameMap.put(stop.getName(), stop));

    return nameMap.keySet().stream()
        .map((name) -> createStation(name, nameMap))
        .collect(Collectors.toList());
  }

  private static Station createStation(String name, ArrayListMultimap<String, Stop> nameMap) {
    List<Stop> stopsInStation = nameMap.get(name);
    Map<String, Stop> stopIdMap = new HashMap<>(stopsInStation.size());

    // group stops by id
    stopsInStation.forEach((stop) -> stopIdMap.put(stop.getId(), stop));

    return new Station.Builder()
        .name(name)
        .stopIdMap(stopIdMap)
        .build();
  }
}
