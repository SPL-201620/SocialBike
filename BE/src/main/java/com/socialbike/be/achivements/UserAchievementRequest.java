package com.socialbike.be.achivements;

/**
 * Created by SAN on 28/11/2016.
 */
public class UserAchievementRequest {
    public String name;
    public int value;
    public boolean unlocked;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public boolean isUnlocked() {
        return unlocked;
    }

    public void setUnlocked(boolean unlocked) {
        this.unlocked = unlocked;
    }
}
