package com.timetopath.pathtimer.schedule.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import com.timetopath.pathtimer.schedule.models.Arrival.Builder;
import org.joda.time.DateTime;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@JsonDeserialize(builder = Builder.class)
public class Arrival {

  private final String tripId;

  private final Instant arrivalTime;

  private final Instant departureTime;

  private final String stopId;

  private final String stopSequence;

  @JsonIgnore
  private final String stopHeadSign;

  @JsonIgnore
  private final String pickupType;

  @JsonIgnore
  private final String dropOffType;

  private final String shapeDistTraveled;

  private Station station;

  private Arrival(Builder builder) {
    tripId = builder.tripId;
    arrivalTime = builder.arrivalTime;
    departureTime = builder.departureTime;
    stopId = builder.stopId;
    stopSequence = builder.stopSequence;
    stopHeadSign = builder.stopHeadSign;
    pickupType = builder.pickupType;
    dropOffType = builder.dropOffType;
    shapeDistTraveled = builder.shapeDistTraveled;
  }

  public String getTripId() {
    return tripId;
  }

  public Instant getArrivalTime() {
    return arrivalTime;
  }

  public Instant getDepartureTime() {
    return departureTime;
  }

  public String getStopId() {
    return stopId;
  }

  public String getStopSequence() {
    return stopSequence;
  }

  public String getStopHeadSign() {
    return stopHeadSign;
  }

  public String getPickupType() {
    return pickupType;
  }

  public String getDropOffType() {
    return dropOffType;
  }

  public String getShapeDistTraveled() {
    return shapeDistTraveled;
  }

  public Station getStation() {
    return station;
  }

  public void setStation(Station station) {
    this.station = station;
  }

  @JsonPOJOBuilder(withPrefix = "")
  public static final class Builder {

    @JsonIgnore
    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("HH:mm:ss");

    @JsonProperty("trip_id")
    private String tripId;

    @JsonProperty("arrival_time")
    private Instant arrivalTime;

    @JsonProperty("departure_time")
    private Instant departureTime;

    @JsonProperty("stop_id")
    private String stopId;

    @JsonProperty("stop_sequence")
    private String stopSequence;

    @JsonProperty("stop_headsign")
    private String stopHeadSign;

    @JsonProperty("pickup_type")
    private String pickupType;

    @JsonProperty("drop_off_type")
    private String dropOffType;

    @JsonProperty("shape_dist_traveled")
    private String shapeDistTraveled;

    private static Instant timestampToInstant(String timestamp) {
      Date hms;
      try {
        hms = DATE_FORMAT.parse(timestamp);
      } catch (ParseException e) {
        throw new RuntimeException("Unable to parse timestamp, " + timestamp, e);
      }

      Date startOfDay = new DateTime().withTimeAtStartOfDay().toDate();

      return startOfDay.toInstant()
          .plus(hms.getHours(), ChronoUnit.HOURS)
          .plus(hms.getMinutes(), ChronoUnit.MINUTES)
          .plus(hms.getSeconds(), ChronoUnit.SECONDS);
    }

    public Builder() {
    }

    public Builder tripId(String val) {
      tripId = val;
      return this;
    }

    public Builder arrivalTime(String val) {
      arrivalTime = timestampToInstant(val);
      return this;
    }

    public Builder departureTime(String val) {
      departureTime = timestampToInstant(val);
      return this;
    }

    public Builder stopId(String val) {
      stopId = val;
      return this;
    }

    public Builder stopSequence(String val) {
      stopSequence = val;
      return this;
    }

    public Builder stopHeadSign(String val) {
      stopHeadSign = val;
      return this;
    }

    public Builder pickupType(String val) {
      pickupType = val;
      return this;
    }

    public Builder dropOffType(String val) {
      dropOffType = val;
      return this;
    }

    public Builder shapeDistTraveled(String val) {
      shapeDistTraveled = val;
      return this;
    }

    public Arrival build() {
      return new Arrival(this);
    }
  }
}
