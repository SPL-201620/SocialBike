package com.socialbike.be.achivements;

import javax.persistence.*;
import java.util.List;

/**
 * Created by SAN on 27/11/2016.
 */
@Entity
public class InitialAchievement extends Achievement{

    public InitialAchievement(String name, int initialValue, String activation, int activationValue, List<String> tags) {
        super(name, initialValue, activation, activationValue, tags);
    }
}
