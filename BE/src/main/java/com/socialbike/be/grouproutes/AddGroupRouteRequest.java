package com.socialbike.be.grouproutes;

import java.util.Date;
import java.util.List;

/**
 * Created by SAN on 15/09/2016.
 */
public class AddGroupRouteRequest {

    private long createdById;
    private List<Long> users;
    private double startPointLon;
    private double startPointLat;
    private double endPointLon;
    private double endPointLat;
    private List<Date> recurrentOn;
    private String channelId;

    public long getCreatedById() {
        return createdById;
    }

    public void setCreatedById(long createdById) {
        this.createdById = createdById;
    }

    public List<Long> getUsers() {
        return users;
    }

    public void setUsers(List<Long> users) {
        this.users = users;
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
