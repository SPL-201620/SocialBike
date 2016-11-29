import java.io.*;

public class DerivatorFrontFile {
	public String[] configurations = new String[20];
	
	public DerivatorFrontFile() {
		
	}
	
	public String[] readConfigFile() 
	{
		File configurationFile = null;
		FileReader fr = null;
		BufferedReader br = null;
		
		try {
			// Apertura del archivo y creacion de BufferedReader
			configurationFile = new File ("./configs/Product.config");
			fr = new FileReader (configurationFile);
			br = new BufferedReader(fr);

			String linea;
			int i = 0;
			while((linea=br.readLine())!=null)
				configurations[i++] = linea;
			}
		catch(Exception e){
			e.printStackTrace();
		}finally{
			try{                    
				if( null != fr ){   
					fr.close();     
				}                  
			}catch (Exception e2){ 
		            e2.printStackTrace();
			}
		}
		return configurations;
	}
	
	public void storeFrontConfigFile(String stream[]) 
	{
		FileWriter configurationFile = null;
		PrintWriter pw = null;
		
		
		try {
			// Apertura del archivo y creacion de Writer
			configurationFile = new FileWriter("../FE/src/shared/variabilityconst.ts");
			pw = new PrintWriter(configurationFile);
			 for (int i = 0; i < stream.length; i++) {
	             pw.println(stream[i]);
			 }
		} catch (Exception e) {
            e.printStackTrace();
        } finally {
           try {
        	   if (null != configurationFile)
        		   configurationFile.close();
           	} catch (Exception e2) {
           		e2.printStackTrace();
           	}
        }
	}
	
}
