package com.timetopath.pathtimer.schedule;

import com.timetopath.pathtimer.schedule.models.Departure;
import com.timetopath.pathtimer.schedule.models.Schedule;
import com.timetopath.pathtimer.schedule.models.Sequence;
import com.timetopath.pathtimer.schedule.models.StationName;
import org.apache.commons.lang3.ObjectUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.time.Instant;
import java.util.Optional;

@Singleton
public class ScheduleManager {

	private static final Logger LOG = LoggerFactory.getLogger(ScheduleManager.class);

  private final ScheduleFetcher fetcher;

	private Schedule schedule; // storing the latest schedule in memory for now

  private boolean isFetching;

	@Inject
	public ScheduleManager(ScheduleFetcher fetcher) {
		this.fetcher = fetcher;
	}

	public void start() {
    LOG.info("Starting scheduler...");
    this.isFetching = true;
		try {
      this.schedule = fetcher.fetch().get();
		} catch (ScheduleFetcherException e) {
      LOG.error("Unable to fetch schedule.", e);
		} finally {
      this.isFetching = false;
    }
	}

	public void fetchLatest() {
    if (isFetching) {
      LOG.info("Unable to fetch schedule, a fetch is already in progress.");
      return;
    }

    this.isFetching = true;
    Instant currentModifiedOn = schedule == null ? null : schedule.getModifiedOn();
    Optional<Schedule> latest;
    try {
      latest = fetcher.fetch(currentModifiedOn);
    } catch (ScheduleFetcherException e) {
      LOG.error("Unable to fetch schedule.", e);
      return;
    } finally {
      this.isFetching = false;
    }

    // latest will be empty if up-to-date
    if (latest.isPresent()) {
      this.schedule = latest.get();
    }
  }

  public Departure getDeparture(StationName from, StationName to, Instant departAt) {
    departAt = ObjectUtils.defaultIfNull(departAt, Instant.now());
    Optional<Sequence> sequence = schedule.getSequence(from, to, departAt);

    if (!sequence.isPresent()) {
      return Departure.empty();
    }

    return new Departure(sequence.get());
  }
}