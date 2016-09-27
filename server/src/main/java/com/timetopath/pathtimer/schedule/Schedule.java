package com.timetopath.pathtimer.schedule;

import com.fasterxml.jackson.annotation.JsonUnwrapped;

import java.util.List;

class Schedule {

  @JsonUnwrapped
  private List<Trip> trips;

  public Schedule(List<Trip> trips) {
    this.trips = trips;
  }

  public List<Trip> getTrips() {
    return trips;
  }
}

