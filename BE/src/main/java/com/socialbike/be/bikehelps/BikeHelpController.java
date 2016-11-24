package com.socialbike.be.bikehelps;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by jfsan on 08-Nov-16.
 */
@RestController
@RequestMapping("/bikehelps")
public class BikeHelpController {

    private BikeHelpRepository bikeHelpRepository;

    public BikeHelpController(BikeHelpRepository bikeHelpRepository){
        this.bikeHelpRepository = bikeHelpRepository;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity addGroupRoute(@RequestBody AddBikeHelp addBikeHelpRequest) {
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
    public List<BikeHelp> getAllGroupRoute() {
        return this.bikeHelpRepository.findAll();
    }
}
