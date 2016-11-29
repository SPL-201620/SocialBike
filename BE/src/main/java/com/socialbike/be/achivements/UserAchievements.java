package com.socialbike.be.achivements;

import com.socialbike.be.users.User;

import javax.persistence.*;
import java.util.List;

/**
 * Created by SAN on 27/11/2016.
 */
@Entity
public class UserAchievements {
    @Id
    @GeneratedValue
    private Long id;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "USER_ID")
    private User user;
    @OneToMany(cascade = CascadeType.ALL, targetEntity = Achievement.class, fetch = FetchType.EAGER)
    @JoinTable
            (
                    name = "USER_ACHIEVEMENT_ACHIEVEMENT",
                    joinColumns = {@JoinColumn(name = "USER_ACHIEVEMENT_ID")},
                    inverseJoinColumns = {@JoinColumn(name = "ACHIEVEMENT_ID")}
            )
    private List<Achievement> achievements;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Achievement> getAchievements() {
        return achievements;
    }

    public void setAchievements(List<Achievement> achievements) {
        this.achievements = achievements;
    }
}
