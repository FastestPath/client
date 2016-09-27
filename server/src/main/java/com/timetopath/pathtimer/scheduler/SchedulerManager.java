package com.timetopath.pathtimer.scheduler;

import io.dropwizard.lifecycle.Managed;
import org.quartz.Scheduler;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class SchedulerManager implements Managed {

  private final Scheduler scheduler;

  @Inject
  public SchedulerManager(Scheduler scheduler) {
    this.scheduler = scheduler;
  }

  @Override
  public void start() throws Exception {
    scheduler.start();
  }

  @Override
  public void stop() throws Exception {
    scheduler.shutdown(false);
  }
}
