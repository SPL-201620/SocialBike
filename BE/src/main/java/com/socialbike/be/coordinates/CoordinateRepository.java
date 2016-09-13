package com.socialbike.be.coordinates;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by SAN on 12/09/2016.
 */
@Repository
public interface CoordinateRepository extends JpaRepository<Coordinate, Long>{

}
