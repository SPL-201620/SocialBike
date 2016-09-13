package com.socialbike.be.coordinates;

/**
 * Created by SAN on 13/09/2016.
 */
public class AddCoordinateRequest {
    private double latitude;
    private double longitud;

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitud() {
        return longitud;
    }

    public void setLongitud(double longitud) {
        this.longitud = longitud;
    }
}
