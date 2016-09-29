package com.timetopath.pathtimer.schedule;

import com.timetopath.pathtimer.schedule.models.Schedule;
import net.lingala.zip4j.core.ZipFile;
import net.lingala.zip4j.exception.ZipException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.net.ssl.HttpsURLConnection;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Locale;

@Singleton
class ScheduleFetcher {

  private static final Logger LOG = LoggerFactory.getLogger(ScheduleFetcher.class);

  private static final String RESOURCES = "src/main/resources";
  private static final String PATH_DIRECTORY = "http://data.trilliumtransit.com/gtfs/path-nj-us/";
  private static final String ZIP_FILENAME = "path-nj-us.zip";
  private static final String STOP_IDS = "stops.txt";
  private static final String STOP_TIMES = "stop_times.txt";
  private static final String ELEMENT_SELECTOR = "tr > td:eq(2)";

  private static final Path ZIP_PATH = Paths.get(RESOURCES + "/" + ZIP_FILENAME);
  private static final Path CSV_STOP_IDS = Paths.get(RESOURCES + "/" + STOP_IDS);
  private static final Path CSV_STOP_TIMES = Paths.get(RESOURCES + "/" + STOP_TIMES);

  private static final DateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd mm:ss", Locale.ENGLISH);

  private static final URL ZIP_URL = createUrl();

  private final ScheduleFactory scheduleFactory;

  @Inject
  public ScheduleFetcher(ScheduleFactory scheduleFactory) {
    this.scheduleFactory = scheduleFactory;
  }

  public Schedule fetch() throws ScheduleFetcherException {

    try {
      HttpURLConnection connection = (HttpURLConnection) ZIP_URL.openConnection();
      int responseCode = connection.getResponseCode();
      if (responseCode != HttpsURLConnection.HTTP_OK) {
        throw new ScheduleFetcherException("Bad response code when fetching zip, " + responseCode);
      }

      try (InputStream inputStream = connection.getInputStream()) {
        Files.copy(inputStream, ZIP_PATH);
      }
    } catch (IOException e) {
      throw new ScheduleFetcherException("Unable to open a connection to " + ZIP_URL.toString(), e);
    }

    try {
      ZipFile zipFile = new ZipFile(ZIP_PATH.toString());
      zipFile.extractFile(STOP_IDS, RESOURCES);
      zipFile.extractFile(STOP_TIMES, RESOURCES);
    } catch (ZipException e) {
      throw new ScheduleFetcherException("Failed to unzip stop times.", e);
    }

    try {
      Files.delete(ZIP_PATH);
    } catch (IOException e) {
      throw new ScheduleFetcherException("Failed to delete zip.", e);
    }


    Schedule schedule;
    try {
      schedule = scheduleFactory.createFromCSV(CSV_STOP_IDS, CSV_STOP_TIMES);
      Files.delete(CSV_STOP_IDS);
      Files.delete(CSV_STOP_TIMES);
    } catch (IOException e) {
      throw new ScheduleFetcherException("Failed to read csv.", e);
    }

    return schedule;
  }

  private static Instant fetchModifiedOn() throws ScheduleFetcherException {
    Document document;
    try {
      document = Jsoup.connect(PATH_DIRECTORY).get();
    } catch (IOException e) {
      throw new ScheduleFetcherException("Failed to read PATH directory at " + PATH_DIRECTORY, e);
    }

    Element element = document.select(ELEMENT_SELECTOR).get(1);
    String modifiedOnString = element.text();
    Instant modifiedOn;
    try {
      modifiedOn = DATE_FORMAT.parse(modifiedOnString).toInstant();
    } catch (ParseException e) {
      throw new ScheduleFetcherException("Unable to parse date, " +  modifiedOnString, e);
    }

    return modifiedOn;
  }

  private static URL createUrl() {
    String url = PATH_DIRECTORY + "/" + ZIP_FILENAME;
    try {
      return new URL(url);
    } catch (MalformedURLException e) {
      throw new RuntimeException("Malformed URL to path zip " + url, e);
    }
  }
}