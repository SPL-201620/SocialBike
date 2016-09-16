package com.socialbike.be.routes;



import java.util.Date;

/**
 * Created by SAN on 12/09/2016.
 */
public class AddRouteRequest {

    private long userId;
    private double startPointLon;
    private double startPointLat;
    private double endPointLon;
    private double endPointLat;

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
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
}
