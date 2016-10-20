package com.timetopath.pathtimer.schedule.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import com.timetopath.pathtimer.schedule.models.Stop.Builder;

@JsonDeserialize(builder = Builder.class)
public class Stop {

  private final String name;

  private final String id;

  private final String code;

  private final String platform;

  private final String desc;

  private final String lat;

  private final String lon;

  private final String zoneId;

  private final String url;

  private final String locationType;

  private final String parentStation;

  private final String timeZone;

  private Stop(Builder builder) {
    name = builder.name;
    id = builder.id;
    code = builder.code;
    platform = builder.platform;
    desc = builder.desc;
    lat = builder.lat;
    lon = builder.lon;
    zoneId = builder.zoneId;
    url = builder.url;
    locationType = builder.locationType;
    parentStation = builder.parentStation;
    timeZone = builder.timeZone;
  }

  public String getName() {
    return name;
  }

  public String getId() {
    return id;
  }

  public String getCode() {
    return code;
  }

  public String getPlatform() {
    return platform;
  }

  public String getDesc() {
    return desc;
  }

  public String getLat() {
    return lat;
  }

  public String getLon() {
    return lon;
  }

  public String getZoneId() {
    return zoneId;
  }

  public String getUrl() {
    return url;
  }

  public String getLocationType() {
    return locationType;
  }

  public String getParentStation() {
    return parentStation;
  }

  public String getTimeZone() {
    return timeZone;
  }

  @JsonPOJOBuilder(withPrefix = "")
  public static final class Builder {

    @JsonProperty("stop_name")
    private String name;

    @JsonProperty("stop_id")
    private String id;

    @JsonProperty("stop_code")
    private String code;

    @JsonProperty("platform_code")
    private String platform;

    @JsonProperty("stop_desc")
    private String desc;

    @JsonProperty("stop_lat")
    private String lat;

    @JsonProperty("stop_lon")
    private String lon;

    @JsonProperty("zone_id")
    private String zoneId;

    @JsonProperty("stop_url")
    private String url;

    @JsonProperty("location_type")
    private String locationType;

    @JsonProperty("parent_station")
    private String parentStation;

    @JsonProperty("stop_timezone")
    private String timeZone;

    public Builder() {
    }

    public Builder name(String val) {
      name = val;
      return this;
    }

    public Builder id(String val) {
      id = val;
      return this;
    }

    public Builder code(String val) {
      code = val;
      return this;
    }

    public Builder platform(String val) {
      platform = val;
      return this;
    }

    public Builder desc(String val) {
      desc = val;
      return this;
    }

    public Builder lat(String val) {
      lat = val;
      return this;
    }

    public Builder lon(String val) {
      lon = val;
      return this;
    }

    public Builder zoneId(String val) {
      zoneId = val;
      return this;
    }

    public Builder url(String val) {
      url = val;
      return this;
    }

    public Builder locationType(String val) {
      locationType = val;
      return this;
    }

    public Builder parentStation(String val) {
      parentStation = val;
      return this;
    }

    public Builder timeZone(String val) {
      timeZone = val;
      return this;
    }

    public Stop build() {
      return new Stop(this);
    }
  }
}
