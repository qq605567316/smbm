package com.tt.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tt.entity.Manager;
import com.tt.entity.Supermarket;
import com.tt.service.ManagerService;
import com.tt.service.SupermarketService;
import com.tt.util.HttpServletRequestUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
@RequestMapping("/user")
public class ManagerController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private ManagerService managerService;

    @Autowired
    private SupermarketService supermarketService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    private String login(HttpServletRequest request) {
        String username = HttpServletRequestUtil.getString(request, "username");
        String password = HttpServletRequestUtil.getString(request, "password");
        Manager manager = managerService.login(username, password);
        if (manager == null) {
            request.setAttribute("tip", "用户名或密码错误！");
            return "loginerror";
        } else {
            request.getSession().setAttribute("manager", manager);
            return "main";
        }
    }

    @RequestMapping(value = "/exit", method = RequestMethod.GET)
    private String exit(HttpServletRequest request) {
        request.getSession().invalidate();
        return "/loginerror";
    }

    @RequestMapping(value = "/main")
    private String toMain() {
        return "/main";
    }

    @RequestMapping(value = "list")
    private String userList() {
        return "/user/register";
    }


    @RequestMapping(value = "operation")
    private String userOperation() {
        return "/user/operation";
    }

    @RequestMapping(value = "/getall", method = RequestMethod.GET)
    @ResponseBody
    private Map<String, Object> getAllManager(HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        int now = HttpServletRequestUtil.getInt(request, "now");
        List<Manager> allmanagerList = managerService.queryall();
        List<Supermarket> supermarketList = supermarketService.getList();
        modelMap.put("supermarketList", supermarketList);
        //总的数据数量
        int total = allmanagerList.size();
        //第一条数据下标
        int firstData = 5 * (now - 1);
        //判断结束时的条件
        int endData = total;
        if (endData - firstData >= 5) {
            endData = 5 * now;
        }
        modelMap.put("total", total);
        List<Manager> managerList = new ArrayList<Manager>();
        //取出需要的5个数据
        for (int i = firstData; i < endData; i++) {
            managerList.add(allmanagerList.get(i));
        }
        modelMap.put("managerList", managerList);
        modelMap.put("success", true);
        return modelMap;
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody//该注解将map转化为json
    private Map<String, Object> Register(HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        //1.接受并转化相应的信息
        String managerStr = HttpServletRequestUtil.getString(request, "managerStr");
        ObjectMapper mapper = new ObjectMapper();
        Manager manager = null;
        try {
            manager = mapper.readValue(managerStr, Manager.class);
        } catch (Exception e) {
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
            return modelMap;
        }
        //2.添加员工
        manager.setLevel(1);
        if (managerService.register(manager)) {
            modelMap.put("success", true);
        } else {
            modelMap.put("success", false);
            modelMap.put("errMsg", "用户名已被使用");
        }
        return modelMap;
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    @ResponseBody//该注解将map转化为json
    private Map<String, Object> editManager(HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        //1.接受并转化相应的信息
        String managerStr = HttpServletRequestUtil.getString(request, "managerStr");
        ObjectMapper mapper = new ObjectMapper();
        Manager manager = null;
        System.out.println(managerStr);
        try {
            manager = mapper.readValue(managerStr, Manager.class);
        } catch (Exception e) {
            modelMap.put("success", false);
            modelMap.put("errorMsg", e.getMessage());
            return modelMap;
        }
        //2.修改信息
        if (manager != null) {
            managerService.editManager(manager);
            modelMap.put("success", true);
        } else {
            modelMap.put("success", false);
            modelMap.put("errMsg", "请输入完整的管理员信息");
        }
        return modelMap;
    }

    @RequestMapping(value = "/del", method = RequestMethod.GET)
    @ResponseBody
    private Map<String, Object> delmanagerById(HttpServletRequest request) {
        Integer mid = HttpServletRequestUtil.getInt(request, "mid");
        managerService.delManager(mid);
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success", true);
        return modelMap;
    }
}
