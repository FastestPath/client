package com.timetopath.pathtimer.schedule.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Map;

public class Station {

  private final String name;

  @JsonIgnore
  private final Map<String, Stop> stopIdMap;

  private Station(Builder builder) {
    name = builder.name;
    stopIdMap = builder.stopIdMap;
  }

  public String getName() {
    return name;
  }

  public Map<String, Stop> getStopIdMap() {
    return stopIdMap;
  }

  public static final class Builder {
    private String name;
    private Map<String, Stop> stopIdMap;

    public Builder() {
    }

    public Builder name(String val) {
      name = val;
      return this;
    }

    public Builder stopIdMap(Map<String, Stop> val) {
      stopIdMap = val;
      return this;
    }

    public Station build() {
      return new Station(this);
    }
  }
}

