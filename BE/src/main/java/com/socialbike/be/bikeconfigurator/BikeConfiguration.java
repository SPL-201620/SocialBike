package com.socialbike.be.bikeconfigurator;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.csvreader.CsvReader;
import com.socialbike.be.bikeconfigurator.BikeImpl;

/*
Creado Gabriel
Singleton para leer las configuraciones de las bicicletas del archivo plano
Simulando un arbol de Features
*/
public class BikeConfiguration {
	private static BikeConfiguration instance = null;
	
	protected BikeConfiguration() {}
	
	public static BikeConfiguration getInstance() {
		if(instance == null) {
	         instance = new BikeConfiguration();
	    }
		return instance;
	}
	
	public List<Bike> getConfigurations(String file) {
		Bike bike;
		try {
	         
	        List<Bike> bikes = new ArrayList<Bike>();
	         
	        CsvReader bikeImport = new CsvReader(file);
	        bikeImport.readHeaders();
	         
	        while (bikeImport.readRecord())
	        {
	        	String bikeType = bikeImport.get(0);
	        	String frameType = bikeImport.get(1);
	            String wheeleSize = bikeImport.get(2);
	            String gearControl = bikeImport.get(3);
	            //Reemplazar por Injection o factory
	            bike = new BikeImpl(bikeType, frameType, Integer.parseInt(wheeleSize), Integer.parseInt(gearControl));
	            bikes.add(bike);    
	        }
	         
	        bikeImport.close();
	        return bikes;
		} catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
		return null;
	}
		
	

}
