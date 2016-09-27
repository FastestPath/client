package com.timetopath.pathtimer.schedule;

import org.quartz.Scheduler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class ScheduleManager {

	final Logger LOG = LoggerFactory.getLogger(ScheduleManager.class);

  private final ScheduleFetcher fetcher;

	private final Scheduler scheduler;

	private Schedule schedule;

	@Inject
	public ScheduleManager(ScheduleFetcher fetcher, Scheduler scheduler) {
		this.fetcher = fetcher;
		this.scheduler = scheduler;
	}

	public void start() {
    fetcher.fetch();
	}

	public void stop() {

	}
}