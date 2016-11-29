
public class DerivatorFrontManager {

	public static void setConfigurations() {
		
		
		String[] totalConfigFile = new String[4];
		String socialMediaFeature = "export const socialMediaFeature = false;";
		String bikeConfiguratorFeature = "export const bikeConfiguratorFeature = false;";
		String bikeHelpsFeature = "export const bikeHelpsFeature = false;";
		String achivmentsFeature = "export const achivementsFeature = false;";
		
		DerivatorFrontFile derivator = new DerivatorFrontFile();
		String output[] = derivator.readConfigFile();
		
		for (int i = 0; i < output.length - 1; i++) {
			if (output[i].contains("ShareOn") || output[i].contains("Facebook")  || output[i].contains("Twitter")) {
				socialMediaFeature = "export const socialMediaFeature = true;";
			}
			if (output[i].contains("BikeConfigurator")) {
				bikeConfiguratorFeature = "export const bikeConfiguratorFeature = true;";
			}
			if (output[i].contains("BikeAids")) {
				bikeHelpsFeature = "export const bikeHelpsFeature = true;";
			}
			if (output[i].contains("Achivements")) {
				achivmentsFeature = "export const achivementsFeature = true;";
			}		
		}
		totalConfigFile[0] = socialMediaFeature;
		totalConfigFile[1] = bikeConfiguratorFeature;
		totalConfigFile[2] = bikeHelpsFeature;
		totalConfigFile[3] = achivmentsFeature;
		derivator.storeFrontConfigFile(totalConfigFile);
	}

}
