package com.timetopath.pathtimer.schedule;

import com.timetopath.pathtimer.schedule.models.Schedule;
import org.quartz.Scheduler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class ScheduleManager {

	private static final Logger LOG = LoggerFactory.getLogger(ScheduleManager.class);

  private final ScheduleFetcher fetcher;

	private final Scheduler scheduler;

	private Schedule schedule; // storing the latest schedule in memory for now

	@Inject
	public ScheduleManager(ScheduleFetcher fetcher, Scheduler scheduler) {
		this.fetcher = fetcher;
		this.scheduler = scheduler;
	}

	public void start() {
		try {
			this.schedule = fetcher.fetch();
		} catch (ScheduleFetcherException e) {
			e.printStackTrace();
		}
	}

	public Schedule getSchedule() {
		return schedule;
	}

	public void stop() {
	}
}