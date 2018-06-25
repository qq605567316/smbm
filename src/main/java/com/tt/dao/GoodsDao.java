package com.tt.dao;

import com.tt.entity.Goods;

import java.util.List;

public interface GoodsDao {
    /**
     * 通过ID查询单
     *
     * @param gid
     * @return
     */
    Goods queryById(Integer gid);

    /**
     * 通过ID查询单
     *
     * @param sid
     * @return
     */
    List<Goods> queryBySid(Integer sid);

    /**
     * 查询所有
     *
     * @return
     */
    List<Goods> queryAll();

    /**
     * 更新记录
     *
     * @param goods
     * @return 如果影响行数等于>1，表示更新的记录行数
     */
    int update(Goods goods);

    /**
     * 插入记录
     *
     * @param goods
     */
    int insert(Goods goods);

    /**
     * 删除记录
     *
     * @param gid
     */
    void delete(Integer gid);
}
