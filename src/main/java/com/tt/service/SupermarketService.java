package com.tt.service;

import com.tt.entity.Supermarket;

import java.util.List;


/**
 * * 业务接口：站在"使用者"角度设计接口 三个方面：方法定义粒度，参数，返回类型（return 类型/异常）
 */
public interface SupermarketService {
    /**
     * 查询一个超市
     *
     * @param sid
     * @return
     */
    Supermarket getById(int sid);

    /**
     * 查询所有超市
     *
     * @return
     */
    List<Supermarket> getList();

    /**
     * 添加超市
     */
    void addSupermarket(Supermarket supermarket);

    /**
     * 更新超市
     */
    void editSupermarket(Supermarket supermarket);

    /**
     * 删除超市
     */
    void delSupermarketById(int sid);
}
