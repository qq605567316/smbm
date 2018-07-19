package com.tt.util;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;


import net.coobird.thumbnailator.Thumbnails;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

public class ImageUtil {

    private static final SimpleDateFormat sDateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
    private static final Random r = new Random();

    public static String generateThumbnail(CommonsMultipartFile thumbnail) {
        String realFileName = getRandomFileName();
        String extension = getFileExtension(thumbnail);
        String relativeAddr = realFileName + extension;
        File dest = new File(PathUtil.getImgBasePath() + relativeAddr);
        try {
            Thumbnails.of(thumbnail.getInputStream()).size(200, 200).outputQuality(0.8f).toFile(dest);
        } catch (IOException e) {
            throw new RuntimeException("创建缩略图失败：" + e.toString());
        }
        return relativeAddr;
    }

    //生成随机的文件名  当前年月日时分秒+五位随机数
    public static String getRandomFileName() {
        //获取随机的五位数
        int rannum = r.nextInt(89999) + 10000;
        String nowTimeStr = sDateFormat.format(new Date());
        return nowTimeStr + rannum;
    }

    //删除原来的图片
    public static void deleteFile(String storePath) {
        File file = new File(PathUtil.getImgBasePath() + storePath);
        if (file.exists()) {
            file.delete();
        }
    }

    //获取输入文件的扩展名
    private static String getFileExtension(CommonsMultipartFile cFile) {
        String originalFileName = cFile.getOriginalFilename();
        return originalFileName.substring(originalFileName.lastIndexOf("."));
    }
}
