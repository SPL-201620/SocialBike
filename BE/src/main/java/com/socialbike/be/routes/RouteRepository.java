package com.socialbike.be.routes;

import com.socialbike.be.users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by SAN on 12/09/2016.
 */
@Repository
public interface RouteRepository extends JpaRepository<Route, Long>{

    //List<Route> findByUser(User user);
}
