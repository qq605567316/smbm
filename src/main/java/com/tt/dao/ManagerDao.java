package com.tt.dao;

import com.tt.entity.Manager;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ManagerDao {
    /**
     * 通过ID查询单
     *
     * @param mid
     * @return
     */
    Manager queryById(int mid);

    /**
     * 登录验证
     * @param username
     * @param password
     * @return
     */
    Manager login(@Param("username") String username,@Param("password") String password);

    /**
     * 查询所有
     *
     *
     * @return
     */
    List<Manager> queryAll();

    /**
     * 更新记录
     *
     * @param manager
     * @return 如果影响行数等于>1，表示更新的记录行数
     */
    int update(Manager manager);

    /**
     * 插入记录
     *
     * @param manager
     */
    void insert(Manager manager);

    /**
     * 删除记录
     *
     * @param mid
     */
    void delete(int mid);

    /**
     * 通过username查找管理员
     */
    int querybyusername(String username);
}
