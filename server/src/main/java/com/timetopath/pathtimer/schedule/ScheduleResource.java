package com.timetopath.pathtimer.schedule;

import com.codahale.metrics.annotation.Timed;
import com.timetopath.pathtimer.schedule.models.Schedule;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

@Path("/schedule")
@Produces(MediaType.APPLICATION_JSON)
public class ScheduleResource {

  private static final Logger LOG = LoggerFactory.getLogger(ScheduleResource.class);

  private final ScheduleManager scheduleManager;

  @Inject
  public ScheduleResource(ScheduleManager scheduleManager) {
    this.scheduleManager = scheduleManager;
  }

  @GET
  @Timed
  public Schedule getSchedule(@QueryParam("from") String from, @QueryParam("to") String to) {
    return scheduleManager.getSchedule();
  }
}