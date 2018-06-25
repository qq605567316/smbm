package com.tt.dao;

import com.tt.BaseTest;
import com.tt.entity.Supermarket;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class SupermarketDaoTest extends BaseTest {
    @Autowired
    private SupermarketDao supermarketDao;

    @Test
    public void testQueryById() throws Exception {
        int sid = 1;
        Supermarket supermarket = supermarketDao.queryById(sid);
        System.out.println(supermarket.getSid()+"-----"+supermarket.getSname()+"----"+supermarket.getSaddress());
    }

    @Test
    public void testUpdate() throws Exception{
        Supermarket supermarket = new Supermarket();
        supermarket.setSid(1);
        supermarket.setSname("麦德好公司总部");
        supermarket.setSaddress("成都");
        supermarketDao.update(supermarket);
    }

    @Test
    public void testInsert() throws Exception{
        Supermarket supermarket = new Supermarket();
        supermarket.setSname("麦德好超市德阳店");
        supermarket.setSaddress("德阳");
        supermarketDao.insert(supermarket);
    }
}
