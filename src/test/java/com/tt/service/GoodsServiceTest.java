package com.tt.service;

import com.tt.BaseTest;
import com.tt.entity.Goods;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class GoodsServiceTest extends BaseTest {
    @Autowired
    private GoodsService goodsService;

    @Test
    public void testGetAllGoods(){
        List<Goods> goodsList = goodsService.getAllGoods();
        System.out.println(goodsList);
    }
}
