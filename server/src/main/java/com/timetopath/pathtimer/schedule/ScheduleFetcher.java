package com.timetopath.pathtimer.schedule;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Singleton;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Locale;
import java.util.Optional;

@Singleton
class ScheduleFetcher {

	final Logger LOG = LoggerFactory.getLogger(ScheduleFetcher.class);

	private static final String PATH_DIRECTORY = "http://data.trilliumtransit.com/gtfs/path-nj-us/";

  private static final String ELEMENT_SELECTOR = "tr > td:eq(2)";

  private static final DateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd mm:ss", Locale.ENGLISH);

	public Optional<Schedule> fetch() {
    Document document;
    try {
      document = Jsoup.connect(PATH_DIRECTORY).get();
    } catch (IOException e) {
      LOG.error("Failed to read PATH directory at {}", PATH_DIRECTORY);
      return Optional.empty();
    }

    Element element = document.select(ELEMENT_SELECTOR).get(1);
    String modifiedOnString = element.text();
    Instant modifiedOn;
    try {
      modifiedOn = DATE_FORMAT.parse(modifiedOnString).toInstant();
    } catch (ParseException e) {
      LOG.error("Unable to parse date, {}", modifiedOnString);
      return Optional.empty();
    }

    return Optional.empty();
  }
}