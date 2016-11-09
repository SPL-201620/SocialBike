package com.socialbike.be.bikehelps;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by jfsan on 08-Nov-16.
 */
@Repository
public interface BikeHelpRepository extends JpaRepository<BikeHelp, Long> {
}
