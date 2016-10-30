package com.timetopath.pathtimer.scheduler;

import com.google.inject.Provider;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;

public class SchedulerProvider implements Provider<Scheduler> {

  private static final Logger LOG = LoggerFactory.getLogger(SchedulerProvider.class);

  private final SchedulerFactory schedulerFactory;

  private final GuiceJobFactory jobFactory;

  @Inject
  public SchedulerProvider(SchedulerFactory schedulerFactory, GuiceJobFactory jobFactory) {
    this.schedulerFactory = schedulerFactory;
    this.jobFactory = jobFactory;
  }

  @Override
  public Scheduler get() {
    try {
      Scheduler scheduler = schedulerFactory.getScheduler();
      scheduler.setJobFactory(jobFactory);
      return scheduler;
    } catch (SchedulerException e) {
      LOG.error("Failed to get scheduler instance.", e);
      return null;
    }
  }
}
