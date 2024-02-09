package com.example.ventevoiture01.Utils;

import com.google.gson.Gson;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

public class FileHelper {
    public String uploadOnline(String base64Image) {
        String key = "key=" + "d567680c61012b15f93826b732ceefe4";
        try {
            String res = RequestAPI.sendFormData("https://api.imgbb.com/1/upload" + "?" + key, base64Image);

            //JsonResponse jsonResponse = (JsonResponse) Json.fromJson(res, JsonResponse.class);
            //Person person = gson.fromJson(json, Person.class);
            Gson gson = new Gson();
            ImageData imageData = (ImageData)gson.fromJson(res,ImageData.class);
            String url = imageData.getData().getUrl();
            return url;

        } catch (Exception e) {
            return e.getMessage();
        }

    }
    public static String convertImageToBase64(String imagePath) throws Exception {
        Path path = Paths.get(imagePath);
        byte[] imageBytes = Files.readAllBytes(path);

        // Encodage Base64
        return Base64.getEncoder().encodeToString(imageBytes);
    }
}
