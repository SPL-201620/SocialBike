package com.socialbike.be.routes;

import com.socialbike.be.coordinates.AddCoordinateRequest;

import java.util.Date;

/**
 * Created by SAN on 12/09/2016.
 */
public class AddRouteRequest {

    private AddCoordinateRequest startPoint;
    private AddCoordinateRequest endPoint;

    public AddCoordinateRequest getStartPoint() {
        return startPoint;
    }

    public void setStartPoint(AddCoordinateRequest startPoint) {
        this.startPoint = startPoint;
    }

    public AddCoordinateRequest getEndPoint() {
        return endPoint;
    }

    public void setEndPoint(AddCoordinateRequest endPoint) {
        this.endPoint = endPoint;
    }

}
