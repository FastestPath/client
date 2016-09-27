package com.timetopath.pathtimer;

import com.timetopath.pathtimer.schedule.ScheduleManager;
import io.dropwizard.lifecycle.Managed;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class PathTimer implements Managed {

  private final ScheduleManager scheduleManager;

  @Inject
  public PathTimer(ScheduleManager scheduleManager) {
    this.scheduleManager = scheduleManager;
  }

  @Override
  public void start() throws Exception {
    scheduleManager.start();
  }

  @Override
  public void stop() throws Exception {
    scheduleManager.stop();
  }
}
