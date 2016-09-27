package com.timetopath.pathtimer;

import com.google.inject.AbstractModule;
import com.timetopath.pathtimer.scheduler.SchedulerProvider;
import org.quartz.Scheduler;
import org.quartz.SchedulerFactory;
import org.quartz.impl.StdSchedulerFactory;

import javax.inject.Singleton;

class PathTimerModule extends AbstractModule {

  @Override
  protected void configure() {
    bind(SchedulerFactory.class)
        .to(StdSchedulerFactory.class)
        .in(Singleton.class);

    bind(Scheduler.class)
        .toProvider(SchedulerProvider.class)
        .in(Singleton.class);
  }
}
