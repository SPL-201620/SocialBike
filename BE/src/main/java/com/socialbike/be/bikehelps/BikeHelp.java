package com.socialbike.be.bikehelps;

import javax.persistence.*;

/**
 * Created by jfsan on 08-Nov-16.
 */
@Entity
public class BikeHelp {
    @Id
    @GeneratedValue
    private long id;
    private double pointLon;
    private double pointLat;
    private String name;
    @Enumerated(EnumType.STRING)
    private BikeHelpType type;
    private int lowerPrice;
    private int upperPrice;
    @Transient
    private double distance;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getPointLon() {
        return pointLon;
    }

    public void setPointLon(double pointLon) {
        this.pointLon = pointLon;
    }

    public double getPointLat() {
        return pointLat;
    }

    public void setPointLat(double pointLat) {
        this.pointLat = pointLat;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BikeHelpType getType() {
        return type;
    }

    public void setType(BikeHelpType type) {
        this.type = type;
    }

    public int getLowerPrice() {
        return lowerPrice;
    }

    public void setLowerPrice(int lowerPrice) {
        this.lowerPrice = lowerPrice;
    }

    public int getUpperPrice() {
        return upperPrice;
    }

    public void setUpperPrice(int upperPrice) {
        this.upperPrice = upperPrice;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }
}
