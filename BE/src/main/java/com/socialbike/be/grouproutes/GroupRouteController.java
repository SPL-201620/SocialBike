package com.socialbike.be.grouproutes;
import com.socialbike.be.routes.Route;
import com.socialbike.be.routes.RouteRepository;
import com.socialbike.be.users.User;
import com.socialbike.be.users.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by SAN on 15/09/2016.
 */
@RestController
@RequestMapping("/grouproute")
public class GroupRouteController  {

    private GroupRouteRepository groupRouteRepository;
    private UserRepository userRepository;
    private RouteRepository routeRepository;

    public GroupRouteController(GroupRouteRepository groupRouteRepository, UserRepository userRepository, RouteRepository routeRepository) {
        this.groupRouteRepository = groupRouteRepository;
        this.userRepository = userRepository;
        this.routeRepository = routeRepository;
    }

    @RequestMapping(method= RequestMethod.GET)
    public List<GroupRoute> getAllGroupRoutes(){
        return groupRouteRepository.findAll();
    }

    @RequestMapping(method= RequestMethod.GET, value="/{userId}")
    public List<GroupRoute> getAllGroupRoutesByUser(@PathVariable long userId){
        return null;
    }

    @RequestMapping(method = RequestMethod.POST)
    public void addGroupRoute(@RequestBody AddGroupRouteRequest addGroupRouteRequest){
        GroupRoute groupRoute = new GroupRoute();
        groupRoute.setName(addGroupRouteRequest.getName());
        groupRoute.setCreatedBy(userRepository.findOne(addGroupRouteRequest.getCreatedById()));
        List<User> users = new ArrayList<>();
        users.add(userRepository.findOne(addGroupRouteRequest.getCreatedById()));
        for (Long userId : addGroupRouteRequest.getUsers()) {
            User user = userRepository.getOne(userId);
            users.add(user);
        }
        groupRoute.setUsers(users);
        groupRoute.setCreatedDate(new Date());
        groupRoute.setStartDate(addGroupRouteRequest.getStartDate());
        groupRoute.setRecurrent(addGroupRouteRequest.isRecurrent());
        groupRoute.setRoute(addGroupRouteRequest.getRoute());
        groupRoute.setMonday(addGroupRouteRequest.isMonday());
        groupRoute.setTuesday(addGroupRouteRequest.isTuesday());
        groupRoute.setWednesday(addGroupRouteRequest.isWednesday());
        groupRoute.setThursday(addGroupRouteRequest.isThursday());
        groupRoute.setFriday(addGroupRouteRequest.isFriday());
        groupRoute.setSaturday(addGroupRouteRequest.isSaturday());
        groupRoute.setSunday(addGroupRouteRequest.isSunday());

        groupRouteRepository.save(groupRoute);
    }

    @RequestMapping(method = RequestMethod.GET, value="/addUserToGroup/{groupRouteId}/{userId}")
    public void addUserToGroup(@PathVariable long groupRouteId, @PathVariable long userId){
        User user = userRepository.getOne(userId);
        GroupRoute groupRoute = groupRouteRepository.findOne(groupRouteId);
        List<User> users = groupRoute.getUsers();
        users.add(user);
        groupRoute.setUsers(users);
        groupRouteRepository.save(groupRoute);
        Route route = new Route();
        route.setUser(user);
        route.setUser(userRepository.findOne(userId));
        route.setStartPointLon(groupRoute.getRoute().getStartPointLon());
        route.setStartPointLat(groupRoute.getRoute().getStartPointLat());
        route.setStartPointName(groupRoute.getRoute().getStartPointName());
        route.setEndPointLon(groupRoute.getRoute().getEndPointLon());
        route.setEndPointLat(groupRoute.getRoute().getEndPointLat());
        route.setEndPointName(groupRoute.getRoute().getEndPointName());
        route.setCalories(groupRoute.getRoute().getCalories());
        route.setSpeed(groupRoute.getRoute().getSpeed());
        route.setDistance(groupRoute.getRoute().getDistance());
        route.setStartTime(groupRoute.getRoute().getStartTime());
        route.setEndTime(groupRoute.getRoute().getEndTime());
        route.setFinished(groupRoute.getRoute().isFinished());

        routeRepository.save(route);
    }
}
