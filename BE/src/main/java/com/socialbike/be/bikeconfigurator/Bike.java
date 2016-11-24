package com.socialbike.be.bikeconfigurator;

import java.io.Serializable;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;


/**
 * Created by Gabriel on 22/11/16.
 * Interfaz para manejar varios tipos de bicicleta
 */



@JsonDeserialize(using = BikeDeserializer.class)
public interface Bike {

	String bikeType = "";
	String frameType = "";
	int	wheeleSize = 0;
	int gearControl = 0;

	String getBikeType();
	String getFrameType();
	int getWheeleSize();
	int getGearControl();
	double getMatchRate();
	void setMatchRate(double matchRate);
	int hashCode();
	
}
