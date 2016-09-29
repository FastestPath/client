package com.timetopath.pathtimer.schedule.models;

import java.util.LinkedList;

public class Sequence {

  private final LinkedList<Arrival> arrivals;

  public Sequence() {
    this.arrivals = new LinkedList<>();
  }

  public Sequence(LinkedList<Arrival> arrivals) {
    this.arrivals = arrivals;
  }

  public void addArrival(Arrival arrival) {
    arrivals.add(arrival);
  }

  public LinkedList<Arrival> getArrivals() {
    return arrivals;
  }
}
