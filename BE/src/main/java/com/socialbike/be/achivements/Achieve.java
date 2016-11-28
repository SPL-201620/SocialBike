package com.socialbike.be.achivements;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by SAN on 27/11/2016.
 */
public class Achieve {

    private UserAchievementsRepository userAchievementsRepository;
    private AchievementRepository achievementRepository;
    public static final String ACTIVE_IF_GREATER_THAN = ">";
    public static final String ACTIVE_IF_LESS_THAN = "<";

    public Achieve(UserAchievementsRepository userAchievementsRepository, AchievementRepository achievementRepository){
        this.userAchievementsRepository = userAchievementsRepository;
        this.achievementRepository = achievementRepository;
    }

    public void addValue(long userId, int value, List<String> tags){
        UserAchievements userAchievement = this.userAchievementsRepository.findByUserId(userId).get(0);
        List<Achievement> achievements = getAchievementsByTags(userAchievement.getAchievements(), tags);
        for (Achievement achievement : achievements) {
            achievement.setValue(achievement.getValue() + value);
            achievement.setUnlocked(unlockAchievement(achievement));
        }
        this.achievementRepository.save(achievements);
    }

    private boolean unlockAchievement(Achievement achievement) {
        boolean unlock = false;
        switch (achievement.getActivation()) {
            case Achieve.ACTIVE_IF_GREATER_THAN:
                unlock = achievement.getValue() > achievement.getActivationValue();
                break;
            case Achieve.ACTIVE_IF_LESS_THAN:
                unlock = achievement.getValue() < achievement.getActivationValue();
                break;
        }
        return unlock;
    }

    private List<Achievement> getAchievementsByTags(List<Achievement> achievements, List<String> tags){
        List<Achievement> achievementsFound = new ArrayList<>();
        for(Achievement achievement : achievements){
            if(hasTag(achievement, tags))
                achievementsFound.add(achievement);
        }
        return achievementsFound;
    }

    private boolean hasTag(Achievement achievement, List<String> tags) {
        boolean hasTag = false;

        for (String tag : tags) {
            if (achievement.getTags().contains(tag)) {
                hasTag = true;
                break;
            }
        }

        return hasTag;
    }
}
