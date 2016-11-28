package com.socialbike.be.achivements;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by SAN on 15/09/2016.
 */
@Repository
public interface AchievementPropertyRepository extends JpaRepository<AchievementProperty, Long> {

}
