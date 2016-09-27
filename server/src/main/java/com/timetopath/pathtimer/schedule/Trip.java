package com.timetopath.pathtimer.schedule;

class Trip {

  private String tripId;

  private String arrivalTime;

  private String departureTime;

  private String stopId;

  private String stopSequence;

  private String stopHeadSign;

  private String pickupType;

  private String dropOffType;

  private String shapeDistTraveled;

  public String getTripId() {
    return tripId;
  }

  public void setTripId(String tripId) {
    this.tripId = tripId;
  }

  public String getArrivalTime() {
    return arrivalTime;
  }

  public void setArrivalTime(String arrivalTime) {
    this.arrivalTime = arrivalTime;
  }

  public String getDepartureTime() {
    return departureTime;
  }

  public void setDepartureTime(String departureTime) {
    this.departureTime = departureTime;
  }

  public String getStopId() {
    return stopId;
  }

  public void setStopId(String stopId) {
    this.stopId = stopId;
  }

  public String getStopSequence() {
    return stopSequence;
  }

  public void setStopSequence(String stopSequence) {
    this.stopSequence = stopSequence;
  }

  public String getStopHeadSign() {
    return stopHeadSign;
  }

  public void setStopHeadSign(String stopHeadSign) {
    this.stopHeadSign = stopHeadSign;
  }

  public String getPickupType() {
    return pickupType;
  }

  public void setPickupType(String pickupType) {
    this.pickupType = pickupType;
  }

  public String getDropOffType() {
    return dropOffType;
  }

  public void setDropOffType(String dropOffType) {
    this.dropOffType = dropOffType;
  }

  public String getShapeDistTraveled() {
    return shapeDistTraveled;
  }

  public void setShapeDistTraveled(String shapeDistTraveled) {
    this.shapeDistTraveled = shapeDistTraveled;
  }
}
