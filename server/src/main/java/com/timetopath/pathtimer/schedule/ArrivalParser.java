package com.timetopath.pathtimer.schedule;

import com.timetopath.pathtimer.schedule.models.Arrival;
import com.timetopath.pathtimer.schedule.models.Sequence;
import com.timetopath.pathtimer.schedule.models.Station;

import javax.inject.Singleton;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Singleton
public class ArrivalParser {

  public Map<Station, List<Sequence>> groupByStation(List<Arrival> arrivals, List<Station> stations) {
    Map<Station, List<Sequence>> arrivalMap = new HashMap<>();
    return null;
  }
}
