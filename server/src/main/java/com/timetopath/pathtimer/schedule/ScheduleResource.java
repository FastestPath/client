package com.timetopath.pathtimer.schedule;

import com.codahale.metrics.annotation.Timed;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

@Path("/schedule")
@Produces(MediaType.APPLICATION_JSON)
public class ScheduleResource {

	final Logger logger = LoggerFactory.getLogger(ScheduleResource.class);

  @GET
  @Timed
  public ScheduleResponse getSchedule(@QueryParam("from") String from, @QueryParam("to") String to) {
    return null;
  }
}