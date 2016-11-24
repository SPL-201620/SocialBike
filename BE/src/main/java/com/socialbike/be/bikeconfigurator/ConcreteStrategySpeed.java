package com.socialbike.be.bikeconfigurator;

import java.util.List;

import com.socialbike.be.bikeconfigurator.BikeConfiguration;

public class ConcreteStrategySpeed implements BikeStrategy {
	List<Bike> bikes = BikeConfiguration.getInstance().getConfigurations("BikeConfigRes/speed.csv");
	Bike mostSimilar = null;
	double matchFactor = 0;
	double acutalMatch = 0;
	final double PERFECT_MATCH = 1.0;
	
	@Override
	public Bike getBikeConfiguration(Bike selectedBike) {
		// TODO Auto-generated method stub
		for(Bike singleBike : bikes){
			acutalMatch = (double)singleBike.hashCode() / (double)selectedBike.hashCode();
			if (selectedBike.hashCode() == singleBike.hashCode())  {
				selectedBike.setMatchRate(PERFECT_MATCH);
				return selectedBike;
			}
			
			if (Math.abs(PERFECT_MATCH - acutalMatch) <  Math.abs(PERFECT_MATCH - matchFactor)) {
				mostSimilar = singleBike;
				matchFactor = acutalMatch;
				mostSimilar.setMatchRate(matchFactor);
			}
        }
		return mostSimilar;
	}

}
