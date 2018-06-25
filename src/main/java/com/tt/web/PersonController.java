package com.tt.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tt.entity.Manager;
import com.tt.entity.Person;
import com.tt.entity.Supermarket;
import com.tt.service.PersonService;
import com.tt.service.SupermarketService;
import com.tt.util.HttpServletRequestUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.jws.Oneway;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/person")
public class PersonController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private PersonService personService;

    @Autowired
    private SupermarketService supermarketService;

    @RequestMapping(value = "/list")
    private String listPerson(){
        return "person/list";}

    @RequestMapping(value = "/getbysid", method = RequestMethod.GET)
    @ResponseBody
    private Map<String,Object> getPersonBySid(HttpServletRequest request)
    {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        Manager manager = (Manager) request.getSession().getAttribute("manager");
        Integer sid = manager.getSid();
        int now = HttpServletRequestUtil.getInt(request,"now");
        if(sid>-1){
            try{
                List<Person> allpersonList = personService.queryBySid(sid);
                //总的数据数量
                int total = allpersonList.size();
                //第一条数据下标
                int firstData = 5*(now-1);
                //判断结束时的条件
                int endData = total;
                if(endData-firstData>=5){
                    endData = 5*now;
                }
                modelMap.put("total",total);
                List<Person> personList = new ArrayList<Person>();
                //取出需要的5个数据
                for (int i = firstData;i<endData;i++){
                    personList.add(allpersonList.get(i));
                }
                modelMap.put("personList",personList);
                modelMap.put("success",true);
            }catch (Exception e){
                modelMap.put("success",false);
                modelMap.put("errMsg",e.getMessage());
            }
        }else {
            modelMap.put("success",false);
            modelMap.put("errMsg","sid 为空");
        }
        return modelMap;
    }

    @RequestMapping(value = "/del",method = RequestMethod.GET)
    private Map<String,Object> delPersonById(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<String, Object>();
        Integer pid = HttpServletRequestUtil.getInt(request,"pid");
        personService.deleteById(pid);
        modelMap.put("success",true);
        return modelMap;
    }

    @RequestMapping(value = "/getall", method = RequestMethod.GET)
    @ResponseBody
    private Map<String,Object> getAllPerson(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        int now = HttpServletRequestUtil.getInt(request,"now");
        List<Person> personList = personService.queryAll(5*(now-1),5);
        //总的数据数量
        int total = personService.total();
        List<Supermarket> supermarketList = supermarketService.getList();
        modelMap.put("supermarketList",supermarketList);
        modelMap.put("total",total);
        modelMap.put("personList",personList);
        modelMap.put("success",true);
        return modelMap;
    }

    @RequestMapping(value = "/add",method = RequestMethod.POST)
    @ResponseBody//该注解将map转化为json
    private Map<String,Object> addPerson(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        //1.接受并转化相应的信息
        String personStr = HttpServletRequestUtil.getString(request,"personStr");
        System.out.println(personStr);
        ObjectMapper mapper = new ObjectMapper();
        Person person = null;
        try{
            person = mapper.readValue(personStr,Person.class);
        }catch (Exception e){
            modelMap.put("success",false);
            modelMap.put("errMsg",e.getMessage());
            return modelMap;
        }
        //2.添加员工
        Manager manager = (Manager) request.getSession().getAttribute("manager");
        if (manager.getLevel() != 0){
            person.setSid(manager.getSid());
        }
        personService.insertPerson(person);
        modelMap.put("success",true);
        return modelMap;
    }

    @RequestMapping(value = "/edit",method = RequestMethod.POST)
    @ResponseBody//该注解将map转化为json
    private Map<String,Object> editPerson(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        //1.接受并转化相应的参数，包括商品信息及图片信息
        String personStr = HttpServletRequestUtil.getString(request,"personStr");
        ObjectMapper mapper = new ObjectMapper();
        Person person = null;
        System.out.println(personStr);
        try{
            person = mapper.readValue(personStr,Person.class);
        }catch (Exception e){
            modelMap.put("success",false);
            modelMap.put("errorMsg",e.getMessage());
            return modelMap;
        }
        //2.修改信息
        if (person!=null){
            System.out.println(person.getPname());
            System.out.println(person.getSid());
            personService.update(person);
            modelMap.put("success",true);
        }else {
            modelMap.put("success",false);
            modelMap.put("errMsg","请输入完整的商品信息特别是gid");
        }
        return modelMap;
    }


}
