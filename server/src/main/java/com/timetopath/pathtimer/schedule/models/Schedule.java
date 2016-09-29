package com.timetopath.pathtimer.schedule.models;

import java.time.Instant;
import java.util.List;

public class Schedule {

  private Instant modifiedOn;

  private List<Arrival> links;

  public Schedule(Instant modifiedOn, List<Arrival> links) {
    this.modifiedOn = modifiedOn;
    this.links = links;
  }

  public List<Arrival> getLinks() {
    return links;
  }
}

