package com.socialbike.be.achivements;

import com.socialbike.be.users.User;
import com.socialbike.be.users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by SAN on 27/11/2016.
 */
@Component
public class Achieve {

    private static UserAchievementsRepository userAchievementsRepository;
    private static AchievementRepository achievementRepository;
    private static InitialAchievementsRepository initialAchievementsRepository;
    private static UserRepository userRepository;
    public static final String ACTIVE_IF_GREATER_THAN = ">";
    public static final String ACTIVE_IF_LESS_THAN = "<";

    @Autowired
    public Achieve(UserAchievementsRepository userAchievementsRepository, AchievementRepository achievementRepository, InitialAchievementsRepository initialAchievementsRepository, UserRepository userRepository){
        Achieve.userAchievementsRepository = userAchievementsRepository;
        Achieve.achievementRepository = achievementRepository;
        Achieve.initialAchievementsRepository = initialAchievementsRepository;
        Achieve.userRepository = userRepository;
    }

    public static void initializeUser(long userId){
        List<InitialAchievement> initialAchievements = initialAchievementsRepository.findAll();
        User user = userRepository.getOne(userId);
        List<Achievement> achievements = new ArrayList<>();
        for (InitialAchievement initialAchievement : initialAchievements) {
            Achievement achievementBase = initialAchievement.getAchievement();
            Achievement achievement =  new Achievement();
            achievement.setUnlocked(achievementBase.isUnlocked());
            achievement.setValue(achievementBase.getValue());
            achievement.setName(achievementBase.getName());
            achievement.setActivation(achievementBase.getActivation());
            achievement.setActivationValue(achievementBase.getActivationValue());
            achievement.setInitialValue(achievementBase.getInitialValue());
            List<String> tags = new ArrayList<>();
            for (String tag: achievementBase.getTags()) {
                tags.add(tag);
            }
            achievement.setTags(tags);
            achievements.add(achievement);
        }
        achievementRepository.save(achievements);
        UserAchievements userAchievements = new UserAchievements();
        userAchievements.setAchievements(achievements);
        userAchievements.setUser(user);
        userAchievementsRepository.save(userAchievements);
    }

    public static void addValue(long userId, int value, List<String> tags){
        List<UserAchievements> userAchievements = userAchievementsRepository.findByUserId(userId);
        if(userAchievements.size() > 0) {
            UserAchievements userAchievement = userAchievements.get(0);
            List<Achievement> achievements = getAchievementsByTags(userAchievement.getAchievements(), tags);
            for (Achievement achievement : achievements) {
                achievement.setValue(achievement.getValue() + value);
                achievement.setUnlocked(unlockAchievement(achievement));
            }
            achievementRepository.save(achievements);
        }else{
            initializeUser(userId);
            addValue(userId, value, tags);
        }
    }

    private static boolean unlockAchievement(Achievement achievement) {
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

    private static List<Achievement> getAchievementsByTags(List<Achievement> achievements, List<String> tags){
        List<Achievement> achievementsFound = new ArrayList<>();
        for(Achievement achievement : achievements){
            if(hasTag(achievement, tags))
                achievementsFound.add(achievement);
        }
        return achievementsFound;
    }

    private static boolean hasTag(Achievement achievement, List<String> tags) {
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
