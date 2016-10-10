package com.socialbike.be.routes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by SAN on 12/09/2016.
 */
@Repository
public interface RouteRepository extends JpaRepository<Route, Long>{

    List<Route> findByUserId(long user_id);
}
