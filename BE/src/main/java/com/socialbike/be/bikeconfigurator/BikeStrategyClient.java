package com.socialbike.be.bikeconfigurator;

public class BikeStrategyClient {
	BikeStrategy bikeStrategy;
	
	protected void setStrategy(BikeStrategy theStrategy) {
		this.bikeStrategy = theStrategy;
	}
	
	protected Bike getBikeConfiguration(Bike selectedBike) {
		return bikeStrategy.getBikeConfiguration(selectedBike);
	}

}
