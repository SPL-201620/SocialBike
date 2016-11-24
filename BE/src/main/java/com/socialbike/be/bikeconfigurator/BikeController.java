package com.socialbike.be.bikeconfigurator;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


/**
 * Created by Gabriel on 22/11/16.
 */

@RestController
@RequestMapping("/bikeconfigurator")
public class BikeController {

    BikeFacade bikeConfigFacade = new BikeFacade();
    Bike foundBike;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity getBikeConfiguration(@RequestBody Bike selectedBike) {

        foundBike = this.bikeConfigFacade.getBikeConfiguration(selectedBike);

        if(foundBike != null)
            return new ResponseEntity(foundBike, HttpStatus.OK);
        else
            return new ResponseEntity(HttpStatus.BAD_REQUEST);

    }
}
