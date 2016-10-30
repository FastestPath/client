package com.timetopath.pathtimer;

import com.timetopath.pathtimer.schedule.ScheduleFetchJob;
import com.timetopath.pathtimer.schedule.ScheduleManager;
import io.dropwizard.lifecycle.Managed;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.Trigger;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.time.Instant;

@Singleton
public class PathTimer implements Managed {

  private static final int REPEAT_INTERVAL_HOURS = 6;

  private final ScheduleManager scheduleManager;

  private final Scheduler scheduler;

  @Inject
  public PathTimer(ScheduleManager scheduleManager, Scheduler scheduler) {
    this.scheduleManager = scheduleManager;
    this.scheduler = scheduler;
  }

  @Override
  public void start() throws Exception {
    JobDetail jobDetail = ScheduleFetchJob.createDetail();
    Trigger trigger = ScheduleFetchJob.createTrigger(REPEAT_INTERVAL_HOURS, Instant.now());
    scheduler.scheduleJob(jobDetail, trigger);
    scheduler.start();
  }

  @Override
  public void stop() throws Exception {
    scheduler.shutdown();
  }
}
