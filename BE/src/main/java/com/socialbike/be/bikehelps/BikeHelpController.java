package com.socialbike.be.bikehelps;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by jfsan on 08-Nov-16.
 */
@RestController
@RequestMapping("/bikehelps")
public class BikeHelpController {

    private BikeHelpRepository bikeHelpRepository;

    public BikeHelpController(BikeHelpRepository bikeHelpRepository) {
        this.bikeHelpRepository = bikeHelpRepository;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity addBikeHelp(@RequestBody AddBikeHelp addBikeHelpRequest) {
        BikeHelp bikeHelp = new BikeHelp();
        bikeHelp.setName(addBikeHelpRequest.getName());
        bikeHelp.setLowerPrice(addBikeHelpRequest.getLowerPrice());
        bikeHelp.setUpperPrice(addBikeHelpRequest.getUpperPrice());
        bikeHelp.setPointLat(addBikeHelpRequest.getPointLat());
        bikeHelp.setPointLon(addBikeHelpRequest.getPointLon());
        bikeHelp.setType(addBikeHelpRequest.getType());
        bikeHelpRepository.save(bikeHelp);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<BikeHelp> getAllBikeHelps() {
        return this.bikeHelpRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/distance")
    public List<BikeHelp> getBikeHelpsByDistance(@RequestParam(value = "range") int range,
                                                 @RequestParam(value = "latFrom") double latFrom,
                                                 @RequestParam(value = "lonFrom") double lonFrom) {
        List<BikeHelp> allBikeHelps = this.bikeHelpRepository.findAll();
        List<BikeHelp> bikeHelpsOnRange = new ArrayList<>();
        for (BikeHelp bikeHelp : allBikeHelps) {
            if (isBikeHelpOnRage(bikeHelp, latFrom, lonFrom, range)) {
                bikeHelp.setDistance(roundDistance(getDistanceBtwTwoPoints(latFrom, bikeHelp.getPointLat(), lonFrom, bikeHelp.getPointLon())));
                bikeHelpsOnRange.add(bikeHelp);
            }
        }
        return bikeHelpsOnRange;
    }

    private double roundDistance(double distance) {
        distance = distance*100;
        distance = Math.round(distance);
        distance = distance /100;

        return distance;
    }

    private boolean isBikeHelpOnRage(BikeHelp bikeHelp, double latFrom, double lonFrom, int range) {
        double distance = getDistanceBtwTwoPoints(latFrom, bikeHelp.getPointLat(), lonFrom, bikeHelp.getPointLon());
        return range >= distance;
    }

    private double getDistanceBtwTwoPoints(double lat1, double lat2, double lon1, double lon2) {

        final int R = 6371; // Radius of the earth

        Double latDistance = Math.toRadians(lat2 - lat1);
        Double lonDistance = Math.toRadians(lon2 - lon1);
        Double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        Double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = R * c;

        distance = Math.pow(distance, 2);

        return Math.sqrt(distance);
    }

}
