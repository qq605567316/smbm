package com.tt.web;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.tt.dto.GoodsExecution;
import com.tt.entity.Goods;
import com.tt.entity.Manager;
import com.tt.service.GoodsService;
import com.tt.util.HttpServletRequestUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/goods")
public class GoodsController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private GoodsService goodsService;

    @RequestMapping(value = "/list")
    private String listGoods() {
        return "goods/list";// WEB-INF/jsp/"goods/list".jsp
    }

    @RequestMapping(value = "/getbyid", method = RequestMethod.GET)
    @ResponseBody
    private Map<String, Object> getGoodsById(HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        Integer gid = HttpServletRequestUtil.getInt(request, "gid");
        if (gid > -1) {
            try {
                Goods goods = goodsService.getByGoodsId(gid);
                modelMap.put("goods", goods);
                modelMap.put("success", true);
            } catch (Exception e) {
                modelMap.put("success", false);
                modelMap.put("errMsg", e.getMessage());
            }
        } else {
            modelMap.put("success", false);
            modelMap.put("errMsg", "gid 为空");
        }
        return modelMap;
    }

    @RequestMapping(value = "/del", method = RequestMethod.GET)
    @ResponseBody
    private Map<String, Object> delGoodsById(HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        Integer gid = HttpServletRequestUtil.getInt(request, "gid");
        goodsService.delGoodsById(gid);
        modelMap.put("success", true);
        return modelMap;
    }

    @RequestMapping(value = "/getall", method = RequestMethod.GET)
    @ResponseBody
    private Map<String, Object> getAllGoods(HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        Manager manager = (Manager) request.getSession().getAttribute("manager");
        int now = HttpServletRequestUtil.getInt(request, "now");
        List<Goods> allgoodsList = null;
        if (manager.getLevel() == 0) {
            allgoodsList = goodsService.getAllGoods();
        } else {
            int sid = manager.getSid();
            allgoodsList = goodsService.getAllBySid(sid);
        }
        //总的数据数量
        int total = allgoodsList.size();
        System.out.println(total);
        //第一条数据下标
        int firstData = 5 * (now - 1);
        //判断结束时的条件
        int endData = total;
        if (endData - firstData >= 5) {
            endData = 5 * now;
        }
        modelMap.put("total", total);
        List<Goods> goodsList = new ArrayList<Goods>();
        //取出需要的5个数据
        for (int i = firstData; i < endData; i++) {
            goodsList.add(allgoodsList.get(i));
            System.out.println(allgoodsList.get(i).getGname());
        }
        modelMap.put("goodsList", goodsList);
        modelMap.put("success", true);
        return modelMap;
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody//该注解将map转化为json
    private Map<String, Object> addGoods(HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        //1.接受并转化相应的参数，包括商品信息及图片信息
        String goodsStr = HttpServletRequestUtil.getString(request, "goodsStr");
        ObjectMapper mapper = new ObjectMapper();
        Goods goods = null;
        try {
            goods = mapper.readValue(goodsStr, Goods.class);
        } catch (Exception e) {
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
            return modelMap;
        }
        CommonsMultipartFile gPic = null;
        CommonsMultipartResolver cmr =
                new CommonsMultipartResolver(request.getSession().getServletContext());
        if (cmr.isMultipart(request)) {
            MultipartHttpServletRequest mhsr = (MultipartHttpServletRequest) request;
            gPic = (CommonsMultipartFile) mhsr.getFile("gPic");
        } else {
            modelMap.put("success", false);
            modelMap.put("errMsg", "图片为空");
            return modelMap;
        }

        //2.添加商品
        if (goods != null && gPic != null) {
            Manager manager = (Manager) request.getSession().getAttribute("manager");
            goods.setSid(manager.getSid());
            GoodsExecution ge = goodsService.addGoods(goods, gPic);
            modelMap.put("success", true);
        } else {
            modelMap.put("success", false);
            modelMap.put("errMsg", "请输入完整的商品信息");
        }
        return modelMap;
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    @ResponseBody//该注解将map转化为json
    private Map<String, Object> editGoods(HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        //1.接受并转化相应的参数，包括商品信息及图片信息
        String goodsStr = HttpServletRequestUtil.getString(request, "goodsStr");
        ObjectMapper mapper = new ObjectMapper();
        Goods goods = null;
        try {
            goods = mapper.readValue(goodsStr, Goods.class);
        } catch (Exception e) {
            modelMap.put("success", false);
            modelMap.put("errorMsg", e.getMessage());
            return modelMap;
        }
        CommonsMultipartFile gPic = null;
        CommonsMultipartResolver cmr =
                new CommonsMultipartResolver(request.getSession().getServletContext());
        if (cmr.isMultipart(request)) {
            MultipartHttpServletRequest mhsr = (MultipartHttpServletRequest) request;
            gPic = (CommonsMultipartFile) mhsr.getFile("gPic");
        }

        //2.修改商品
        if (goods != null && goods.getGid() != null) {
            //Session TODO
            GoodsExecution ge;
            if (gPic == null) {
                ge = goodsService.editGoods(goods, null);
            } else {
                ge = goodsService.editGoods(goods, gPic);
            }
            modelMap.put("success", true);
            return modelMap;
        } else {
            modelMap.put("success", false);
            modelMap.put("errMsg", "请输入完整的商品信息特别是gid");
            return modelMap;
        }
    }

//    private static void inputStreamToFile(InputStream ins,File file){
//        FileOutputStream os = null;
//        try {
//            os = new FileOutputStream(file);
//            int bytesRead = 0;
//            byte[] buffer = new byte[1024];
//            while((bytesRead = ins.read(buffer)) != -1){
//                os.write(buffer,0,bytesRead);
//            }
//        }catch (Exception e){
//            throw new RuntimeException("调用inputStreamToFile产生异常："+e.getMessage());
//        }finally {
//            try{
//                if(os != null){
//                    os.close();
//                }
//                if(ins != null){
//                    ins.close();
//                }
//            }catch (IOException e){
//                throw new RuntimeException("调用inputStreamToFile关闭IO产生异常："+e.getMessage());
//            }
//        }
//    }

}
