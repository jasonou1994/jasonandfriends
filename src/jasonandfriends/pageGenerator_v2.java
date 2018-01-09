package jasonandfriends;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class pageGenerator_v2 {
	public static void main(String[] args) throws IOException {
		
		String allSettingsString = readFile("/users/jasonou/documents/jasonandfriends/generatorSettings2.txt",
				Charset.defaultCharset());
		
		String[] allSettings= allSettingsString.split("###");
		
		for(int i = 1; i< allSettings.length;i++)
		{
			generateHTML(allSettings[i]);
		}
		
	}
	
	static String readFile(String path, Charset encoding) throws IOException 
	{
	  byte[] encoded = Files.readAllBytes(Paths.get(path));
	  return new String(encoded, encoding);
	}
	
	static void generateHTML(String pageString) throws IOException
	{
		//split by all new lines to get header info
		String[] pageLines = pageString.split("\n");
		
		String pageTitle = "";
		String imageFolderName = "";
		String blackColor = "";
		
		for(int i = 1; i<pageLines.length;i++)
		{
			if (pageLines[i].contains("pageTitle=")) pageTitle= pageLines[i].split("pageTitle=")[1];
			else if (pageLines[i].contains("imageFolderName=")) imageFolderName= pageLines[i].split("imageFolderName=")[1];
			else if (pageLines[i].contains("blackColor=")) blackColor= pageLines[i].split("blackColor=")[1];
		}
		
		System.out.println(pageTitle);
		System.out.println(imageFolderName);
		System.out.println(blackColor);
		
		//split by %%% to get left right
		String[] center=pageString.split("%%%")[1].trim().split("\n");
		String[] left=pageString.split("%%%")[2].trim().split("\n");
		String[] right=pageString.split("%%%")[3].trim().split("\n");
	
		//read template info from file
		String content = readFile("/users/jasonou/documents/jasonandfriends/template.html", Charset.defaultCharset());
		
		//replace header info
		content=content.replaceAll("<title>Featured</title>", "<title>" + pageTitle+ "</title>");
		if(imageFolderName.equals("index"))
		{
			content=content.replaceAll("href=\"/" + "index.html" +  "\"", "href=\"/" + "index.html" +  "\"" + " style=\"" + blackColor + "\"" );
			
		}
		else{
			content=content.replaceAll("href=\"/" + imageFolderName +  "\"", "href=\"/" + imageFolderName +  "\"" + " style=\"" + blackColor + "\"" );
			content=content.replaceAll("PORTFOLIO & PHOTOGRAPHY", pageTitle.toUpperCase());
		}
		
		
		
		//read photo template info from file
		String photoTemplate = readFile("/users/jasonou/documents/jasonandfriends/photoTemplate.html", Charset.defaultCharset());
		
		//new blank left and right halves
		String centerphotos = "";
		String leftphotos = "";
		String rightphotos = "";
		
		//append photo to center piece
		for(int i =0; i<center.length;i++)
		{
			//photoMetaInfo is a comma delineated list of image name, camera info, and descrption
			String []photoMetaInfoList = center[i].split(";");
			
			String photoTemp = photoTemplate.replaceAll("photo1", photoMetaInfoList[0]);
			photoTemp = photoTemp.replaceAll("CAMERA_INFO_REPLACE", photoMetaInfoList[1]);
			photoTemp = photoTemp.replaceAll("DESCRIPTION_REPLACE", photoMetaInfoList[2]);
			photoTemp = photoTemp.replaceAll("TITLE_REPLACE", photoMetaInfoList[3]);
			
			System.out.println(Arrays.toString(photoMetaInfoList));
			
			centerphotos += photoTemp + "\n";
		}
		//append photos to left and right halves
		for(int i =0; i<left.length;i++)
		{
			//photoMetaInfo is a comma delineated list of image name, camera info, and descrption
			String []photoMetaInfoList = left[i].split(";");
			
			String photoTemp = photoTemplate.replaceAll("photo1", photoMetaInfoList[0]);
			photoTemp = photoTemp.replaceAll("CAMERA_INFO_REPLACE", photoMetaInfoList[1]);
			photoTemp = photoTemp.replaceAll("DESCRIPTION_REPLACE", photoMetaInfoList[2]);
			photoTemp = photoTemp.replaceAll("TITLE_REPLACE", photoMetaInfoList[3]);
			
			System.out.println(Arrays.toString(photoMetaInfoList));
			
			leftphotos += photoTemp + "\n";
		}
		for(int i =0; i<right.length;i++)
		{
			//photoMetaInfo is a comma delineated list of image name, camera info, and descrption
			String []photoMetaInfoList = right[i].split(";");
			
			String photoTemp = photoTemplate.replaceAll("photo1", photoMetaInfoList[0]);
			photoTemp = photoTemp.replaceAll("CAMERA_INFO_REPLACE", photoMetaInfoList[1]);
			photoTemp = photoTemp.replaceAll("DESCRIPTION_REPLACE", photoMetaInfoList[2]);
			photoTemp = photoTemp.replaceAll("TITLE_REPLACE", photoMetaInfoList[3]);
			
			System.out.println(Arrays.toString(photoMetaInfoList));
			
			rightphotos += photoTemp + "\n";
		}
		
		//add in left/right halves to template
		content=content.replaceAll("REPLACEME0", centerphotos);
		content=content.replaceAll("REPLACEME1", leftphotos);
		content=content.replaceAll("REPLACEME2", rightphotos);
		
		//final replace of image folder
		content=content.replaceAll("/images/index", "/images/" +imageFolderName);
		
		//write to file
		if (imageFolderName.equals("index"))
		{
			imageFolderName+=".html";
		}
		Files.write(Paths.get("/users/jasonou/documents/jasonandfriends/" + imageFolderName), content.getBytes());
		
	}


	
}
