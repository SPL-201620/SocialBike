package com.socialbike.be.achivements;

/**
 * Created by SAN on 28/11/2016.
 */
public class UserAchievementRequest {
    public String name;
    public int value;
    public int valueToUnlock;
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

    public int getValueToUnlock() {
        return valueToUnlock;
    }

    public void setValueToUnlock(int valueToUnlock) {
        this.valueToUnlock = valueToUnlock;
    }

    public boolean isUnlocked() {
        return unlocked;
    }

    public void setUnlocked(boolean unlocked) {
        this.unlocked = unlocked;
    }
}
