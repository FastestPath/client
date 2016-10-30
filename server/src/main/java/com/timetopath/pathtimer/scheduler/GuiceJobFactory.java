package com.timetopath.pathtimer.scheduler;

import com.google.inject.Injector;
import org.quartz.Job;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.spi.JobFactory;
import org.quartz.spi.TriggerFiredBundle;

import javax.inject.Inject;

class GuiceJobFactory implements JobFactory {

  private final Injector guice;

  @Inject
  public GuiceJobFactory(Injector guice) {
    this.guice = guice;
  }

  @Override
  public Job newJob(TriggerFiredBundle triggerFiredBundle, Scheduler scheduler) throws SchedulerException {
    JobDetail jobDetail = triggerFiredBundle.getJobDetail();
    Class<? extends Job> jobClass = jobDetail.getJobClass();
    return guice.getInstance(jobClass);
  }
}
