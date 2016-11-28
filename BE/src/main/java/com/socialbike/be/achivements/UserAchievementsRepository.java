package com.socialbike.be.achivements;

import com.socialbike.be.grouproutes.GroupRoute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by SAN on 15/09/2016.
 */
@Repository
public interface UserAchievementsRepository extends JpaRepository<UserAchievements, Long> {
    List<UserAchievements> findByUserId(long user_id);
}
