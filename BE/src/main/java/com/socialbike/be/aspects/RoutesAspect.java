package com.socialbike.be.aspects;

import com.socialbike.be.achivements.Achieve;
import com.socialbike.be.routes.AddRouteRequest;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import java.util.Arrays;

/**
 * Created by SAN on 28/11/2016.
 */
@Aspect
@Component
public class RoutesAspect {
    @After(value = "execution(* addRoute(com.socialbike.be.routes.AddRouteRequest)) && args(route)")
    public void afterNewRoute(AddRouteRequest route) {
        System.out.println(route);
        Achieve.addValue(route.getUserId(),1 , Arrays.asList("route"));
    }
}
