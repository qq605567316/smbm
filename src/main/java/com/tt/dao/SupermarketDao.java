package com.tt.dao;

import com.tt.entity.Supermarket;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface SupermarketDao {
    /**
     * 通过ID查询单
     *
     * @param sid
     * @return
     */
    Supermarket queryById(int sid);

    /**
     * 查询所有
     *
     * @param offset 查询起始位置
     * @param limit  查询条数
     * @return
     */
    List<Supermarket> queryAll(@Param("offset") int offset, @Param("limit") int limit);

    /**
     * 更新记录
     *
     * @param supermarket
     * @return 如果影响行数等于>1，表示更新的记录行数
     */
    int update(Supermarket supermarket);

    /**
     * 插入记录
     *
     * @param supermarket
     */
    void insert(Supermarket supermarket);

    /**
     * 删除记录
     *
     * @param sid
     */
    void delete(int sid);
}
