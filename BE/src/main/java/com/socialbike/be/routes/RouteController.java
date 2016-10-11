package com.socialbike.be.routes;

import com.socialbike.be.users.User;
import com.socialbike.be.users.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * Created by SAN on 12/09/2016.
 */
@RestController
@RequestMapping("/routes")
public class RouteController {

    private RouteRepository routeRepository;
    private UserRepository userRepository;

    public RouteController(RouteRepository routeRepository, UserRepository userRepository) {
        this.routeRepository = routeRepository;
        this.userRepository =  userRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Route> getRoutes(){
        return routeRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, value="/routeId}")
    public Route getRouteById(@PathVariable long routeId){
        return routeRepository.getOne(routeId);
    }

    @RequestMapping(method = RequestMethod.GET, value="/ByUserId/{userId}")
    public List<Route> getAllUserRoutes(@PathVariable long userId){
        return routeRepository.findByUserId(userId);
    }

    @RequestMapping(method = RequestMethod.POST)
    public void addRoute(@RequestBody AddRouteRequest addRouteRequest){
        Route route = new Route();

        route.setUser(userRepository.findOne(addRouteRequest.getUserId()));
        route.setStartPointLon(addRouteRequest.getStartPointLon());
        route.setStartPointLat(addRouteRequest.getStartPointLat());
        route.setStartPointName(addRouteRequest.getStartPointName());
        route.setEndPointLon(addRouteRequest.getEndPointLon());
        route.setEndPointLat(addRouteRequest.getEndPointLat());
        route.setEndPointName(addRouteRequest.getEndPointName());
        route.setCalories(addRouteRequest.getCalories());
        route.setSpeed(addRouteRequest.getSpeed());
        route.setDistance(addRouteRequest.getDistance());
        route.setStartTime(addRouteRequest.getStartTime());
        route.setEndTime(addRouteRequest.getEndTime());
        route.setFinished(addRouteRequest.isFinished());

        routeRepository.save(route);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{routeId}")
    public List<Route> updateUser(@RequestBody AddRouteRequest addRouteRequest, @PathVariable("routeId") long routeId) {
        Route route = routeRepository.findOne(routeId);
        long milliseconds = (addRouteRequest.getEndTime().getTime() - addRouteRequest.getStartTime().getTime());
        long duration = TimeUnit.MILLISECONDS.toHours(milliseconds);
        double speed = (route.getDistance()/1000) / duration;
        route.setFinished(addRouteRequest.isFinished());
        route.setEndTime(addRouteRequest.getEndTime());
        route.setSpeed(speed);
        routeRepository.save(route);
        return routeRepository.findByUserId(route.getUser().getId());
    }
}
