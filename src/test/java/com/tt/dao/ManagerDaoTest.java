package com.tt.dao;

import com.tt.BaseTest;
import com.tt.entity.Manager;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class ManagerDaoTest extends BaseTest {

    @Autowired
    private ManagerDao managerDao;

    @Test
    public void insert(){
        Manager manager = new Manager();
        manager.setSid(2);
        manager.setMname("张三");
        manager.setMtel("13540621534");
        manager.setMsalary(6300);
        manager.setUsername("qwe");
        manager.setPassword("123");
        manager.setLevel(1);
        managerDao.insert(manager);
    }
}
