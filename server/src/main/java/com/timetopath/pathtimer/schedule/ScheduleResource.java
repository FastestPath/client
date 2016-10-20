package com.timetopath.pathtimer.schedule;

import com.timetopath.pathtimer.schedule.models.StationName;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.time.Instant;

@Path("/schedule")
@Produces(MediaType.APPLICATION_JSON)
public class ScheduleResource {

  private final ScheduleManager scheduleManager;

  @Inject
  public ScheduleResource(ScheduleManager scheduleManager) {
    this.scheduleManager = scheduleManager;
  }

  @GET
  public Response getSchedule(@QueryParam("from") StationName from, @QueryParam("to") StationName to,
      @QueryParam("departAt") String departAt) {
    return Response.ok()
        .entity(scheduleManager.getDeparture(from, to, Instant.parse(departAt)))
        .build();
  }
}