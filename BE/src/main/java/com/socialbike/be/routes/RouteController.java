package com.socialbike.be.routes;

import com.socialbike.be.users.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @RequestMapping(method = RequestMethod.GET, value="/{userId}")
    public List<Route> getAllUserRoutes(@PathVariable long userId){
        return null;
    }

    @RequestMapping(method = RequestMethod.POST)
    public void addRoute(@RequestBody AddRouteRequest addRouteRequest){
        Route route = new Route();

        route.setUser(userRepository.findOne(addRouteRequest.getUserId()));
        route.setStartPointLon(addRouteRequest.getStartPointLon());
        route.setStartPointLat(addRouteRequest.getStartPointLat());
        route.setEndPointLon(addRouteRequest.getEndPointLon());
        route.setEndPointLat(addRouteRequest.getEndPointLat());

        routeRepository.save(route);
    }
}
