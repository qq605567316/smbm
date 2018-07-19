package com.tt.dao;

import com.tt.BaseTest;
import com.tt.entity.Goods;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class GoodsDaoTest extends BaseTest {
    @Autowired
    private GoodsDao goodsDao;

    @Test
    public void testInsert() {
        Goods goods = new Goods();
        goods.setSid(1);
        goods.setGname("可乐");
        goods.setGnum(320);
        goods.setGprice(3.00d);
        goods.setGpic("test");
        goodsDao.insert(goods);
    }

    @Test
    public void update() {
        Goods goods = new Goods();
        goods.setGnum(500);
        goods.setGid(2);
        goods.setGname("可乐");
        goods.setGprice(3.50d);
        goods.setGpic("test update");
        goodsDao.update(goods);
    }

    @Test
    public void testQueryById() {
        int gid = 1;
        Goods good = goodsDao.queryById(gid);
        System.out.println(good.getGname());
    }

    @Test
    public void testQueryAll() {
        List<Goods> list = new ArrayList<Goods>();
        list = goodsDao.queryAll();
        System.out.println(list);
    }

    @Test
    public void testQueryBySid() {
        List<Goods> list = new ArrayList<Goods>();
        list = goodsDao.queryBySid(3);
        for (Goods goods : list) {
            System.out.println(goods.getGname());
        }
    }

}
