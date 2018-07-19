package com.tt.service;

import com.tt.BaseTest;
import com.tt.entity.Manager;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class ManagerServiceTest extends BaseTest {
    @Autowired
    private ManagerService managerService;

    @Test
    public void login() {
        Manager manager = managerService.login("qwe", "123");
        System.out.println(manager.getMname());
    }
}
