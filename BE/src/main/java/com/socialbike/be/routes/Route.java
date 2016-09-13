package com.socialbike.be.routes;

import com.socialbike.be.coordinates.Coordinate;
import com.socialbike.be.users.User;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by SAN on 12/09/2016.
 */
@Entity
public class Route {
    @Id
    @GeneratedValue
    private long id;
    @OneToOne
    private User user;
    @OneToOne
    @JoinColumn(name = "startPointId")
    private Coordinate startPoint;
    @OneToOne
    @JoinColumn(name = "endPointId")
    private Coordinate endPoint;
    @OneToMany
    private List<Coordinate> pints;
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

    public Coordinate getStartPoint() {
        return startPoint;
    }

    public void setStartPoint(Coordinate startPoint) {
        this.startPoint = startPoint;
    }

    public Coordinate getEndPoint() {
        return endPoint;
    }

    public void setEndPoint(Coordinate endPoint) {
        this.endPoint = endPoint;
    }

    public List<Coordinate> getPints() {
        return pints;
    }

    public void setPints(List<Coordinate> pints) {
        this.pints = pints;
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
