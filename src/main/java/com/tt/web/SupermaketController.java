package com.tt.web;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.tt.entity.Manager;
import com.tt.entity.Supermarket;
import com.tt.service.SupermarketService;
import com.tt.util.HttpServletRequestUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


@Controller
@RequestMapping("/supermarket") // url:/模块/资源/{id}/细分 /seckill/list
public class SupermaketController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private SupermarketService supermarketService;

    @RequestMapping(value = "/list")
    private String listSupermarket(){
        return "supermarket/list";// WEB-INF/jsp/"supermarket/list".jsp
    }

    @RequestMapping(value = "/del",method = RequestMethod.GET)
    private Map<String,Object> delSupermarketById(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<String, Object>();
        Integer sid = HttpServletRequestUtil.getInt(request,"sid");
        supermarketService.delSupermarketById(sid);
        modelMap.put("success",true);
        return modelMap;
    }

    @RequestMapping(value = "/getall", method = RequestMethod.GET)
    @ResponseBody
    private Map<String,Object> getAllSupermarket(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        int now = HttpServletRequestUtil.getInt(request,"now");
        List<Supermarket> allsupermarketList = supermarketService.getList();
        if(now == -1){
            modelMap.put("allsupermarketList",allsupermarketList);
            modelMap.put("success",true);
        }else{
            //总的数据数量
            int total = allsupermarketList.size();
            //第一条数据下标
            int firstData = 5*(now-1);
            //判断结束时的条件
            int endData = total;
            if(endData-firstData>=5){
                endData = 5*now;
            }
            modelMap.put("total",total);
            List<Supermarket> supermarketList = new ArrayList<Supermarket>();
            //取出需要的5个数据
            for (int i = firstData;i<endData;i++){
                supermarketList.add(allsupermarketList.get(i));
            }
            modelMap.put("supermarketList",supermarketList);
            modelMap.put("success",true);
        }
        return modelMap;
    }

    @RequestMapping(value = "/add",method = RequestMethod.POST)
    private Map<String,Object> addSupermarket(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        //1. 接受并转化相应的参数,supermarketStr为和前端约定好的参数
        String supermarketStr = HttpServletRequestUtil.getString(request,"supermarketStr");
        ObjectMapper mapper = new ObjectMapper();
        Supermarket supermarket = null;
        try{
            supermarket = mapper.readValue(supermarketStr,Supermarket.class);
        }catch (Exception e){
            e.printStackTrace();
            modelMap.put("success",false);
            modelMap.put("ereMsg",e.getMessage());
            return modelMap;
        }
        //2. 添加超市
        if(supermarket!=null){
            supermarketService.addSupermarket(supermarket);
            modelMap.put("success",true);
        }else {
            modelMap.put("success",false);
            modelMap.put("ereMsg","请输入超市信息！");
        }
        //3. 返回结果
        return modelMap;
    }

    @RequestMapping(value = "/get", method = RequestMethod.GET)
    @ResponseBody
    private Map<String,Object> get(){
        logger.info("===start===");
        long startTime = System.currentTimeMillis();
        Map<String,Object> map = new HashMap<String, Object>();
        List<Supermarket> list = new ArrayList<Supermarket>();
        try{
            list = supermarketService.getList();
            map.put("rows",list);
            map.put("total",list.size());
        }catch (Exception e){
            e.printStackTrace();
        }
        long endTime = System.currentTimeMillis();
        logger.error("test error!");
        logger.debug("costTime:[{}ms]",endTime-startTime);
        logger.info("===end===");
        // operation.jsp + model = ModelAndView
        return map;// WEB-INF/jsp/"list".jsp
    }

    @RequestMapping(value = "/edit",method = RequestMethod.POST)
    @ResponseBody//该注解将map转化为json
    private Map<String,Object> editSupermarket(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        //1.接受并转化相应的参数
        String supermarketStr = HttpServletRequestUtil.getString(request,"supermarketStr");
        ObjectMapper mapper = new ObjectMapper();
        Supermarket supermarket = null;
        try{
            supermarket = mapper.readValue(supermarketStr,Supermarket.class);
        }catch (Exception e){
            modelMap.put("success",false);
            modelMap.put("errorMsg",e.getMessage());
            return modelMap;
        }

        //2.修改超市
        if (supermarket!=null && supermarket.getSid()!=null){
            //Session TODO
            supermarketService.editSupermarket(supermarket);
            modelMap.put("success",true);
        }else {
            modelMap.put("success",false);
            modelMap.put("errMsg","请输入完整的商品信息特别是gid");
        }
        return modelMap;
    }

}
