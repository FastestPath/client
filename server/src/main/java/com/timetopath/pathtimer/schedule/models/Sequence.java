package com.timetopath.pathtimer.schedule.models;

import java.util.LinkedList;
import java.util.List;

public class Sequence {

  private final LinkedList<Arrival> arrivals;

  public Sequence() {
    this.arrivals = new LinkedList<>();
  }

  public Sequence(LinkedList<Arrival> arrivals) {
    this.arrivals = arrivals;
  }

  public Sequence(List<Arrival> arrivals) {
    this.arrivals = new LinkedList<>(arrivals);
  }

  public void addArrival(Arrival arrival) {
    arrivals.add(arrival);
  }

  public LinkedList<Arrival> getArrivals() {
    return arrivals;
  }
}
