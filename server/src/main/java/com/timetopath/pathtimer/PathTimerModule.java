package com.timetopath.pathtimer;

import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvParser.Feature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
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

  private final CsvMapper CSV_MAPPER = new CsvMapper();

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

    CSV_MAPPER.registerModule(new JavaTimeModule());
    CSV_MAPPER.enable(Feature.WRAP_AS_ARRAY);
    bind(CsvMapper.class).toInstance(CSV_MAPPER);
  }
}
