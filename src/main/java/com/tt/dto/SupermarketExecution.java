package com.tt.dto;

import com.tt.entity.Supermarket;

import java.util.List;

public class SupermarketExecution {

    //结果状态
    private int state;

    //状态标识
    private String stateInfo;

    //店铺数量
    private int count;

    //操作的shop(增删改店铺用到)
    private Supermarket supermarket;

    //superlarket列表（查询时候用）
    private List<Supermarket> superList;

    public SupermarketExecution() {

    }


}
