package com.socialbike.be.routes;

import com.socialbike.be.users.User;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by SAN on 12/09/2016.
 */
@Entity
public class Route {
    @Id
    @GeneratedValue
    private long id;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "USER_ID")
    private User user;
    private double startPointLon;
    private double startPointLat;
    private double endPointLon;
    private double endPointLat;
    private Date startTime;
    private Date endTime;
    private double speed;
    private double calories;
    private double distance;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public double getStartPointLon() {
        return startPointLon;
    }

    public void setStartPointLon(double startPointLon) {
        this.startPointLon = startPointLon;
    }

    public double getStartPointLat() {
        return startPointLat;
    }

    public void setStartPointLat(double startPointLat) {
        this.startPointLat = startPointLat;
    }

    public double getEndPointLon() {
        return endPointLon;
    }

    public void setEndPointLon(double endPointLon) {
        this.endPointLon = endPointLon;
    }

    public double getEndPointLat() {
        return endPointLat;
    }

    public void setEndPointLat(double endPointLat) {
        this.endPointLat = endPointLat;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public double getSpeed() {
        return speed;
    }

    public void setSpeed(double speed) {
        this.speed = speed;
    }

    public double getCalories() {
        return calories;
    }

    public void setCalories(double calories) {
        this.calories = calories;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }
}
