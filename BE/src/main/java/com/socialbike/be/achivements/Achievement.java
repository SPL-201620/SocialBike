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
    @ElementCollection
    @CollectionTable(
            name="ACHIEVEMENT_PROPERTIES",
            joinColumns=@JoinColumn(name="OWNER_ID")
    )
    @Column(name="PROPERTY_NAME")
    private List<String> properties;
    private boolean unlocked;

    public Achievement(String name, List<String> properties) {
        this.name 		= name;
        this.properties = properties;
        this.unlocked 	= false;
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

    public List<String> getProperties() {
        return properties;
    }

    public void setProperties(List<String> properties) {
        this.properties = properties;
    }

    public boolean isUnlocked() {
        return unlocked;
    }

    public void setUnlocked(boolean unlocked) {
        this.unlocked = unlocked;
    }

    public String toString(){
        return "[Achivement " + this.name + "]";
    }
}
