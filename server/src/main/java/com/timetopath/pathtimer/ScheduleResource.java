package com.timetopath.pathtimer;

import com.codahale.metrics.annotation.Timed;
import com.example.helloworld.core.Saying;
import com.google.common.base.Optional;
import com.google.inject.Inject;
import com.google.inject.name.Named;
import com.sun.jersey.api.core.HttpContext;
import com.sun.jersey.api.core.HttpRequestContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PreDestroy;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import java.util.concurrent.atomic.AtomicLong;

@Path("/schedule")
@Produces(MediaType.APPLICATION_JSON)
public class ScheduleResource {

	final Logger logger = LoggerFactory.getLogger(ScheduleResource.class);

  @GET
  @Timed
  public ScheduleResponse getSchedule(@QueryParam("from") String from, @QueryParam("to") String to) {

  }
}