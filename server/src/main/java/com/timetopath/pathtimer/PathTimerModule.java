package com.timetopath.pathtimer;

import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import com.google.inject.name.Named;
import com.timetopath.pathtimer.scheduler.SchedulerProvider;
import org.joda.time.Duration;
import org.quartz.Scheduler;
import org.quartz.SchedulerFactory;
import org.quartz.impl.StdSchedulerFactory;

import javax.inject.Singleton;

class PathTimerModule extends AbstractModule {

  @Provides
  @Named("fetchInterval")
  public Duration fetchInterval(PathTimerConfiguration configuration) {
    return Duration.standardHours(configuration.getFetchIntervalHours());
  }

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
