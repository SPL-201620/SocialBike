package com.socialbike.be.grouproutes;

import com.socialbike.be.routes.Route;
import com.socialbike.be.users.User;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by SAN on 15/09/2016.
 */
@Entity
public class GroupRoute {

    @Id
    @GeneratedValue
    private long id;
    @OneToMany
    @JoinTable
            (
                    name="GROUP_ROUTE_USER",
                    joinColumns = {@JoinColumn(name="GROUP_ROUTE_ID", referencedColumnName = "ID")},
                    inverseJoinColumns = {@JoinColumn(name="USER_ID", referencedColumnName = "ID")}
            )
    private List<User> users;
    @OneToMany
    @JoinTable
            (
                    name="GROUP_ROUTE_ROUTE",
                    joinColumns = {@JoinColumn(name="GROUP_ROUTE_ID", referencedColumnName = "ID")},
                    inverseJoinColumns = {@JoinColumn(name="ROUTE_ID", referencedColumnName = "ID")}
            )
    private List<Route> route;
    @OneToOne(fetch = FetchType.EAGER)
    @PrimaryKeyJoinColumn
    private User createdBy;
    private Date createdDate;
    private double startPointLon;
    private double startPointLat;
    private double endPointLon;
    private double endPointLat;
    private Date startDate;
    private List<Date> recurrentOn;
    private String channelId;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<Route> getRoute() {
        return route;
    }

    public void setRoute(List<Route> route) {
        this.route = route;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
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

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public List<Date> getRecurrentOn() {
        return recurrentOn;
    }

    public void setRecurrentOn(List<Date> recurrentOn) {
        this.recurrentOn = recurrentOn;
    }

    public String getChannelId() {
        return channelId;
    }

    public void setChannelId(String channelId) {
        this.channelId = channelId;
    }
}
