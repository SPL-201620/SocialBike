package com.socialbike.be.bikeconfigurator;

public class BikeStrategyClient {
	BikeStrategy bikeStrategy;
	
	void setStrategy(BikeStrategy theStrategy) {
		this.bikeStrategy = theStrategy;
	}
	
	Bike getBikeConfiguration(Bike selectedBike) {
		return bikeStrategy.getBikeConfiguration(selectedBike);
	}

}
