package com.timetopath.pathtimer.jackson;


import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.time.Instant;

public class InstantSerializer extends JsonSerializer<Instant> {
  @Override
  public void serialize(Instant value, JsonGenerator jgen, SerializerProvider provider) throws IOException {
    if (value == null) {
      jgen.writeNull();
    } else {
      jgen.writeString(value.toString());
    }
  }
}
