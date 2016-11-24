package com.socialbike.be.bikeconfigurator;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;


import java.io.IOException;

/**
 * Created by Gabriel on 23/11/16.
 * Para manejar polimorfismo de las diferentes bicicletas el Bind de la clase se hace
 * Dependiendo de una regla
 */
public class BikeDeserializer extends JsonDeserializer<Bike> {

    @Override
    public Bike deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        ObjectMapper mapper = (ObjectMapper) jp.getCodec();
        ObjectNode root = (ObjectNode) mapper.readTree(jp);
        String bikeType = root.path("bikeType").asText();

        Class<? extends Bike> instanceClass = null;


        if(!bikeType.isEmpty()) {
            instanceClass = BikeImpl.class;
        }

        if (instanceClass == null){
            return null;
        }
        return mapper.readValue(root.toString(), instanceClass);
    }

    private boolean checkBikeCondition(String bikeType) {

        switch (bikeType) {
            case "Mountain":
                break;
            case "Street":
                break;
            case "Speed":
                break;
        }
        return true;
    }
}