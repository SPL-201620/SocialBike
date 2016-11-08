package com.socialbike.be.bikehelps;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by jfsan on 08-Nov-16.
 */
@RestController
@RequestMapping("/bikehelp")
public class BikeHelpController {

    private BikeHelpRepository bikeHelpRepository;

    public BikeHelpController(BikeHelpRepository bikeHelpRepository){
        this.bikeHelpRepository = bikeHelpRepository;
    }

    @RequestMapping(method = RequestMethod.POST)
    public void addGroupRoute(@RequestBody AddBikeHelp addBikeHelpRequest) {
        BikeHelp bikeHelp = new BikeHelp();
        bikeHelp.setName(addBikeHelpRequest.getName());
        bikeHelp.setPrice(addBikeHelpRequest.getPrice());
        bikeHelp.setStartPointLat(addBikeHelpRequest.getStartPointLat());
        bikeHelp.setStartPointLon(addBikeHelpRequest.getStartPointLon());
        bikeHelp.setType(addBikeHelpRequest.getType());
    }
}
