package com.socialbike.be.achivements;

import com.socialbike.be.bikehelps.AddBikeHelp;
import com.socialbike.be.bikehelps.BikeHelp;
import com.socialbike.be.bikehelps.BikeHelpRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by jfsan on 08-Nov-16.
 */
@RestController
@RequestMapping("/achievements")
public class UserAchievementController {

    private UserAchievementsRepository userAchievementsRepository;

    public UserAchievementController(UserAchievementsRepository userAchievementsRepository) {
        this.userAchievementsRepository = userAchievementsRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<UserAchievementRequest> getAllUserRoutes(@RequestParam(value = "userId") int userId){
        List<UserAchievements> userAchievements = userAchievementsRepository.findByUserId(userId);
        return userAchievements.size() > 0 ? transform(userAchievements.get(0)) : null;
    }

    private List<UserAchievementRequest> transform(UserAchievements userAchievements){
        List<UserAchievementRequest> transformed = new ArrayList<>();
        for (Achievement achievement: userAchievements.getAchievements()) {
            UserAchievementRequest userAchievementRequest = new UserAchievementRequest();
            userAchievementRequest.setName(achievement.getName());
            userAchievementRequest.setUnlocked(achievement.isUnlocked());
            userAchievementRequest.setValue(achievement.getValue());
            transformed.add(userAchievementRequest);
        }
        return transformed;
    }
}
