package com.timetopath.pathtimer.schedule.models;

public class Departure {

  private static final Departure EMPTY = new Departure();

  private final Sequence sequence;

  public static Departure empty() {
    return EMPTY;
  }

  private Departure() {
    this.sequence = new Sequence();
  }

  public Departure(Sequence sequence) {
    this.sequence = sequence;
  }
}
