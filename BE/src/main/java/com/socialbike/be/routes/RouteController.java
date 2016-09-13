package com.socialbike.be.routes;

import com.socialbike.be.coordinates.AddCoordinateRequest;
import com.socialbike.be.coordinates.Coordinate;
import com.socialbike.be.coordinates.CoordinateRepository;
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
    private CoordinateRepository coordinateRepository;

    public RouteController(RouteRepository routeRepository, UserRepository userRepository, CoordinateRepository coordinateRepository) {
        this.routeRepository = routeRepository;
        this.userRepository =  userRepository;
        this.coordinateRepository = coordinateRepository;
    }

    @RequestMapping(method = RequestMethod.GET, value="/{userId}")
    public List<Route> getAllUserRoutes(@PathVariable long userId){
        return routeRepository.findByUser(userRepository.findOne(userId));
    }

    @RequestMapping(method = RequestMethod.POST, value="/{userId}")
    public void addRoute(@PathVariable long userId, @RequestBody AddRouteRequest addRouteRequest){
        Route route = new Route();


        //region Coordinate Initialisation
        AddCoordinateRequest startPointRequest = addRouteRequest.getStartPoint();
        Coordinate startPoint = new Coordinate();
        startPoint.setLatitude(startPointRequest.getLatitude());
        startPoint.setLongitud(startPointRequest.getLongitud());

        AddCoordinateRequest endPointRequest = addRouteRequest.getEndPoint();
        Coordinate endPoint = new Coordinate();
        endPoint.setLatitude(endPointRequest.getLatitude());
        endPoint.setLongitud(endPointRequest.getLongitud());

        startPoint = coordinateRepository.save(startPoint);
        endPoint = coordinateRepository.save(endPoint);

        coordinateRepository.flush();
        //endregion

        route.setUser(userRepository.findOne(userId));
        route.setStartPoint(startPoint);
        route.setEndPoint(endPoint);

        routeRepository.save(route);
    }
}
