package com.timetopath.pathtimer.health;

import com.google.inject.Singleton;
import com.hubspot.dropwizard.guice.InjectableHealthCheck;

@Singleton
public class PathTimerHealthCheck extends InjectableHealthCheck {
    
    @Override
    protected Result check() throws Exception {
      return Result.healthy();
    }

    @Override
    public String getName() {
      return "PathTimerHealthCheck";
    }
}