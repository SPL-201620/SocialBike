package com.socialbike.be.bikeconfigurator;

public interface Bike {
	public String getBikeType();
	public String getFrameType();
	public int getWheeleSize();
	public int getGearControl();
	public double getMatchRate();
	public void setMatchRate(double matchRate);
	public int hashCode();
	
}
