package com.socialbike.be.achivements;

import javax.persistence.*;
import java.util.List;

/**
 * Created by SAN on 27/11/2016.
 */
@Entity
public class InitialAchievement{

    @Id
    @GeneratedValue
    private long id;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ACHIEVEMENT_ID")
    private Achievement achievement;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Achievement getAchievement() {
        return achievement;
    }

    public void setAchievement(Achievement achievement) {
        this.achievement = achievement;
    }
}
