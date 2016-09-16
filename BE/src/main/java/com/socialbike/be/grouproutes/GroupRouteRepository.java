package com.socialbike.be.grouproutes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by SAN on 15/09/2016.
 */
@Repository
public interface GroupRouteRepository extends JpaRepository<GroupRoute, Long> {

}
