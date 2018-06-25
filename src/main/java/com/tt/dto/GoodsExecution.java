package com.tt.dto;

import com.tt.entity.Goods;
import com.tt.enums.GoodsStateEnum;

import java.util.List;

public class GoodsExecution {
    //结果状态
    private int state;
    //状态标识
    private String stateInfo;
    //商品数量
    private int Count;
    //操作商品（增删改的时候用到）
    private Goods goods;
    //goods列表（查询的时候用到）
    private List<Goods> goodsList;

    public GoodsExecution(){

    }

    //针对操作失败情况创建的构造器
    public GoodsExecution(GoodsStateEnum stateEnum){
        this.state = stateEnum.getState();
        this.stateInfo = stateEnum.getStateInfo();
    }

    //针对操作成功情况创建的构造器
    public GoodsExecution(GoodsStateEnum stateEnum,Goods goods){
        this.state = stateEnum.getState();
        this.stateInfo = stateEnum.getStateInfo();
        this.goods = goods;
    }

    //针对操作成功情况创建的构造器
    public GoodsExecution(GoodsStateEnum stateEnum,List<Goods> goodsList){
        this.state = stateEnum.getState();
        this.stateInfo = stateEnum.getStateInfo();
        this.goodsList = goodsList;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public String getStateInfo() {
        return stateInfo;
    }

    public void setStateInfo(String stateInfo) {
        this.stateInfo = stateInfo;
    }

    public Goods getGoods() {
        return goods;
    }

    public void setGoods(Goods goods) {
        this.goods = goods;
    }

    public int getCount() {
        return Count;
    }

    public void setCount(int count) {
        Count = count;
    }

    public List<Goods> getGoodsList() {
        return goodsList;
    }

    public void setGoodsList(List<Goods> goodsList) {
        this.goodsList = goodsList;
    }
}
