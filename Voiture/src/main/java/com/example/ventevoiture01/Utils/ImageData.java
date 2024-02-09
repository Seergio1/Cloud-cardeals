package com.example.ventevoiture01.Utils;

public class ImageData {
    private Data data;
    private boolean success;
    private int status;

    public Data getData() {
        return data;
    }

    public void setData(Data data) {
        this.data = data;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    // Getters and setters...

    public static class Data {
        private String id;
        private String title;
        private String url;
        private int width;
        private int height;
        private ImageInfo image;
        private ThumbInfo thumb;
        private String delete_url;

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }

        public int getWidth() {
            return width;
        }

        public void setWidth(int width) {
            this.width = width;
        }

        public int getHeight() {
            return height;
        }

        public void setHeight(int height) {
            this.height = height;
        }

        public ImageInfo getImage() {
            return image;
        }

        public void setImage(ImageInfo image) {
            this.image = image;
        }

        public ThumbInfo getThumb() {
            return thumb;
        }

        public void setThumb(ThumbInfo thumb) {
            this.thumb = thumb;
        }

        public String getDelete_url() {
            return delete_url;
        }

        public void setDelete_url(String delete_url) {
            this.delete_url = delete_url;
        }

        // Getters and setters...
    }

    public static class ImageInfo {
        private String filename;
        private String name;
        private String mime;
        private String extension;
        private String url;

        public String getFilename() {
            return filename;
        }

        public void setFilename(String filename) {
            this.filename = filename;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getMime() {
            return mime;
        }

        public void setMime(String mime) {
            this.mime = mime;
        }

        public String getExtension() {
            return extension;
        }

        public void setExtension(String extension) {
            this.extension = extension;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }

        // Getters and setters...
    }

    public static class ThumbInfo {
        private String filename;
        private String name;
        private String mime;
        private String extension;
        private String url;

        public String getFilename() {
            return filename;
        }

        public void setFilename(String filename) {
            this.filename = filename;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getMime() {
            return mime;
        }

        public void setMime(String mime) {
            this.mime = mime;
        }

        public String getExtension() {
            return extension;
        }

        public void setExtension(String extension) {
            this.extension = extension;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }

        // Getters and setters...
    }
}
