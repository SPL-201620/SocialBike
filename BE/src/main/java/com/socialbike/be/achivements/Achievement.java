package com.socialbike.be.achivements;

import javax.persistence.*;
import java.util.List;

/**
 * Created by SAN on 27/11/2016.
 */
@Entity
public class Achievement
{
    @Id
    @GeneratedValue
    private long id;
    private String name;
    private int value;
    private String activation;
    private int activationValue;
    private int initialValue;
    @ElementCollection
    @CollectionTable(
            name="ACHIEVEMENT_TAGS",
            joinColumns=@JoinColumn(name="ACHIEVEMENT_ID")
    )
    @Column(name="TAG")
    private List<String> tags;
    private boolean unlocked;

    public Achievement() {
    }

    public boolean isActive() {
        boolean active = false;

        switch (this.activation) {
            case Achieve.ACTIVE_IF_GREATER_THAN:
                active = this.value > this.activationValue;
                break;
            case Achieve.ACTIVE_IF_LESS_THAN:
                active = this.value < this.activationValue;
                break;
        }

        return active;
    }

    public void reset() {
        this.value = this.initialValue;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

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

    public String getActivation() {
        return activation;
    }

    public void setActivation(String activation) {
        this.activation = activation;
    }

    public int getActivationValue() {
        return activationValue;
    }

    public void setActivationValue(int activationValue) {
        this.activationValue = activationValue;
    }

    public int getInitialValue() {
        return initialValue;
    }

    public void setInitialValue(int initialValue) {
        this.initialValue = initialValue;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public boolean isUnlocked() {
        return unlocked;
    }

    public void setUnlocked(boolean unlocked) {
        this.unlocked = unlocked;
    }
}
