package com.timetopath.pathtimer;

import io.dropwizard.Configuration;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.NotEmpty;

public class PathTimerConfiguration extends Configuration {

  @NotEmpty
  @JsonProperty
  private String template;

  @NotEmpty
  @JsonProperty
  private String defaultName = "Stranger";

  public String getTemplate() {
                              return template;
                                              }

  public String getDefaultName() {
        return defaultName;
    }
}
