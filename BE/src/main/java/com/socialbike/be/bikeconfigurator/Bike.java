package com.socialbike.be.bikeconfigurator;

import java.io.Serializable;

public interface Bike extends Serializable {

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
