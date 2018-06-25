package com.tt.service;

import com.tt.BaseTest;
import com.tt.entity.Supermarket;
import com.tt.service.SupermarketService;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class SupermarketServiceTest extends BaseTest {

    @Autowired
    private SupermarketService supermarketService;

    @Test
    public void testGetById() throws Exception{
        int sid = 1;
        Supermarket supermarket = supermarketService.getById(sid);
        System.out.println(supermarket.getSid()+"---"+supermarket.getSname()+"---"+supermarket.getSaddress());

    }
}
