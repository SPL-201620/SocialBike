import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException{
        System.out.println("Press return to continue.");
        BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
        in.read();

        DerivatorFrontManager derivator = new DerivatorFrontManager();
        derivator.setConfigurations();

    }

    public void ReadConfiguration(String path){
    	
    }
}