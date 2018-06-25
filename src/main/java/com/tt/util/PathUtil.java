package com.tt.util;

public class PathUtil {

    //获取当前系统 分隔符
    private static String seperator = System.getProperty("file.separator");

    //获取当前系统 存放图片的路径
    public static String getImgBasePath(){
        //获取当前是什么系统
        String os = System.getProperty("os.name");
        String basePath = "";
        //如果是 windows
        if(os.toLowerCase().startsWith("win")){
            basePath = "D:/supermarket/image/";
        }else {
            basePath = "/home/supermarket/image/";
        }
        basePath = basePath.replace("/",seperator);
        return basePath;
    }

}
