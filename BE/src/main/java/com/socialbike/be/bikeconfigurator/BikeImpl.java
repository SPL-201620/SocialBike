package com.socialbike.be.bikeconfigurator;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@JsonDeserialize(as = BikeImpl.class)
public class BikeImpl implements Bike {
	private String bikeType;
	private String frameType;
	private int	wheeleSize;
	private int gearControl;
	private double matchRate = 0;


	public BikeImpl() {}

	public BikeImpl(String bikeType, String frameType, int wheeleSize, int gearControl) {
		super();
		this.bikeType = bikeType;
		this.frameType = frameType;
		this.wheeleSize = wheeleSize;
		this.gearControl = gearControl;
	}
	
	public String getBikeType() {
		return bikeType;
	}
	public void setBikeType(String bikeType) {
		this.bikeType = bikeType;
	}
	
	public String getFrameType() {
		return frameType;
	}
	public void setFrameType(String frameType) {
		this.frameType = frameType;
	}
	public int getWheeleSize() {
		return wheeleSize;
	}
	public void setWheeleSize(int wheeleSize) {
		this.wheeleSize = wheeleSize;
	}
	public int getGearControl() {
		return gearControl;
	}
	public void setGearControl(int gearControl) {
		this.gearControl = gearControl;
	}
	
	public double getMatchRate() {
		return matchRate;
	}

	public void setMatchRate(double matchRate) {
		this.matchRate = matchRate;
	}

	@Override
    public int hashCode() {
        int hash = 1;
        hash = hash * 17 + bikeType.hashCode();
        hash = hash * 37 + frameType.hashCode();
        hash = hash * 31 + wheeleSize;
        hash = hash * 11 + gearControl;
        return hash;
    }
	

}
