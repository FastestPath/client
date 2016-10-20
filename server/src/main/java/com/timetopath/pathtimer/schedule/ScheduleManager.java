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

	@Inject
	public ScheduleManager(ScheduleFetcher fetcher) {
		this.fetcher = fetcher;
	}

	public void start() {
		try {
			this.schedule = fetcher.fetch();
		} catch (ScheduleFetcherException e) {
      throw new RuntimeException("Unable to fetch schedule.", e);
		}
	}

  public void stop() {

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