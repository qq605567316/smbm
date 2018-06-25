package com.tt.enums;

public enum GoodsStateEnum {
    SUCCESS(1,"成功"),FALSE(0,"失败");

    private int state;
    private String stateInfo;

    private GoodsStateEnum(int state, String stateInfo){
        this.state = state;
        this.stateInfo = stateInfo;
    }


    public static GoodsStateEnum stateOf(int state){
        for(GoodsStateEnum stateEnum :values()){
            if(stateEnum.getState() == state){
                return stateEnum;
            }
        }
        return null;
    }


    public int getState() {
        return state;
    }

    public String getStateInfo() {
        return stateInfo;
    }

}
