package com.socialbike.be.bikeconfigurator;

/**
 * Created by Gabriel on 23/11/16.
 */
public class BikeFacade {
    private BikeStrategyClient bikeStrategy = new BikeStrategyClient();
    private BikeStrategy strategy;

    protected Bike getBikeConfiguration(Bike selectedBike) {
        String bikeType = selectedBike.getBikeType();
        switch (bikeType) {
            case "Mountain":
                strategy = new ConcreteStrategyMountain();
                break;
            case "Street":
                strategy = new ConcreteStrategyStreet();
                break;
            case "Speed":
                strategy = new ConcreteStrategySpeed();
                break;
        }
        bikeStrategy.setStrategy(strategy);
        return bikeStrategy.getBikeConfiguration(selectedBike);
    }
}
