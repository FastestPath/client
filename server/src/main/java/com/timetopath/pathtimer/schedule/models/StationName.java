package com.timetopath.pathtimer.schedule.models;

public enum StationName {

  HOBOKEN("Hoboken"),
  CHRISTOPHER_STREET("Christopher Street"),
  NINTH_STREET("9th Street"),
  FOURTEENTH_STREET("14th Street"),
  TWENTY_THIRD_STREET("23rd Street"),
  THIRTY_THIRD_STREET("33rd Street"),
  NEWPORT("Newport"),
  EXCHANGE_PLACE("Exchange Place"),
  NEWARK("Newark"),
  JOURNAL_SQUARE("Journal Square"),
  GROVE_STREET("Grove Street"),
  WORLD_TRADE_CENTER("World Trade Center"),
  HARRISON("Harrison");

  private final String value;

  StationName(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }
}
