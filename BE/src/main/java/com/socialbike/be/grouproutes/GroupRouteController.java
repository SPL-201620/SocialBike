package com.socialbike.be.grouproutes;
import com.socialbike.be.routes.RouteRepository;
import com.socialbike.be.users.User;
import com.socialbike.be.users.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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

    @RequestMapping(method= RequestMethod.GET, value="/{userId}")
    public List<GroupRoute> getAllGroupRoutesByUser(@PathVariable long userId){
        return null;
    }

    @RequestMapping(method = RequestMethod.POST)
    public void addGroupRoute(@RequestBody AddGroupRouteRequest addGroupRouteRequest){
        GroupRoute groupRoute = new GroupRoute();

        groupRoute.setCreatedBy(userRepository.findOne(addGroupRouteRequest.getCreatedById()));
        List<User> users = new ArrayList<>();
        for (Long userId : addGroupRouteRequest.getUsers()) {
            User user = userRepository.getOne(userId);
            users.add(user);
        }
        groupRoute.setUsers(users);
        groupRoute.setStartPointLon(addGroupRouteRequest.getStartPointLon());
        groupRoute.setStartPointLat(addGroupRouteRequest.getStartPointLat());
        groupRoute.setEndPointLon(addGroupRouteRequest.getEndPointLon());
        groupRoute.setEndPointLat(addGroupRouteRequest.getEndPointLat());
        groupRoute.setRecurrentOn(addGroupRouteRequest.getRecurrentOn());
        groupRoute.setChannelId(addGroupRouteRequest.getChannelId());

        groupRouteRepository.save(groupRoute);
    }
}
