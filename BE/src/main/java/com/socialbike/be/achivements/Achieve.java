package com.socialbike.be.achivements;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by SAN on 27/11/2016.
 */
public class Achieve {
    public static final String ACTIVE_IF_GREATER_THAN = ">";
    public static final String ACTIVE_IF_LESS_THAN = "<";

    private Map<String, AchievementProperty> properties;
    private Map<String, Achievement> achievements;

    public Achieve() {
        this.properties = new HashMap<>();
        this.achievements = new HashMap<>();
    }

    public void defineProperty(String name, int initialValue, String activationMode, int value, List<String> tags) {
        this.properties.put(name, new AchievementProperty(name, initialValue, activationMode, value, tags));
    }

    public void defineAchievement(String name, List<String> relatedProperties) throws Exception {
        if (checkPropertyExists(relatedProperties)) {
            this.achievements.put(name, new Achievement(name, relatedProperties));
        } else {
            throw new Exception("Related Properties don't exist");
        }
    }

    public int getValue(String propertyName) throws Exception {
        if (this.properties.containsKey(propertyName))
            return this.properties.get(propertyName).getValue();
        else
            throw new Exception("Check that property exist");
    }

    public void addValue(String propertyName, int value) throws Exception {
        if (this.properties.containsKey(propertyName))
            this.properties.get(propertyName).setValue(this.properties.get(propertyName).getValue() + value);
        else
            throw new Exception("Check that property exist");
    }

    public void setValue(String propertyName, int value, boolean ignoreActivation) throws Exception {
        doSetValue(propertyName, value, ignoreActivation);
    }

    private void doSetValue(String propertyName, int value, boolean ignoreActivation) throws Exception {
        if (this.properties.containsKey(propertyName)) {
            if (!ignoreActivation) {
                switch (this.properties.get(propertyName).getActivation()) {
                    case Achieve.ACTIVE_IF_GREATER_THAN:
                        value = value > this.properties.get(propertyName).getValue() ? value : this.properties.get(propertyName).getValue();
                        break;
                    case Achieve.ACTIVE_IF_LESS_THAN:
                        value = value < this.properties.get(propertyName).getValue() ? value : this.properties.get(propertyName).getValue();
                        break;
                }
            }

            this.properties.get(propertyName).setValue(value);
        } else {
            throw new Exception("Check that property exist");
        }
    }

    private boolean checkPropertyExists(List<String> properties) {
        boolean propertyExist = true;
        for (String propName : properties) {
            propertyExist = propertyExist && this.properties.containsKey(propName);
        }
        return propertyExist;
    }

    public void resetProperties(String[] tags) {
        if (tags.length > 0) {
            for (Map.Entry<String, AchievementProperty> entry : this.properties.entrySet()) {
                AchievementProperty value = entry.getValue();
                if (hasTag(value, tags))
                    value.reset();
            }
        }
    }

    private boolean hasTag(AchievementProperty achievementProperty, String[] tags) {
        boolean hasTag = false;

        for (int i = 0; i < tags.length; i++) {
            if (achievementProperty.getTags().contains(tags[i])) {
                hasTag = true;
                break;
            }
        }
        return hasTag;
    }

    public List<Achievement> getAchievements(String[] tags) {
        List<Achievement> achievementsFound = new ArrayList<>();

        for (Map.Entry<String, Achievement> entry : this.achievements.entrySet()) {
            Achievement achievement = entry.getValue();

            if (!achievement.isUnlocked()) {
                int activeProperties = 0;
                List<String> properties = achievement.getProperties();
                for (String propName : properties) {
                    AchievementProperty achievementProperty = this.properties.get(propName);

                    if (hasTag(achievementProperty, tags) && achievementProperty.isActive()) {
                        activeProperties++;
                    }
                }

                if (activeProperties == achievement.getProperties().size()) {
                    achievement.setUnlocked(true);
                    achievementsFound.add(achievement);
                }
            }
        }

        return achievementsFound;
    }

    public String dumpProperties() {
        String ret = "";

        for (Map.Entry<String, AchievementProperty> entry : this.properties.entrySet()) {
            String name = entry.getKey();
            AchievementProperty achievementProperty = entry.getValue();
            ret += name + "=" + achievementProperty.getValue() + ", ";
        }

        return ret.substring(0, ret.length() - 2);
    }
}
