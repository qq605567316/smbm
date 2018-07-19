package com.tt.dao;

import com.tt.entity.Person;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface PersonDao {
    /**
     * 通过ID查询单
     *
     * @param pid
     * @return
     */
    Person queryById(int pid);

    /**
     * 查询所有
     *
     * @param offset 查询起始位置
     * @param limit  查询条数
     * @return
     */
    List<Person> queryAll(@Param("offset") int offset, @Param("limit") int limit);


    /**
     * 查询sid超市的所有员工
     */
    List<Person> queryBySid(int sid);


    /**
     * 更新记录
     *
     * @param person
     * @return 如果影响行数等于>1，表示更新的记录行数
     */
    void update(Person person);

    /**
     * 插入记录
     *
     * @param person
     */
    void insert(Person person);

    /**
     * 删除记录
     *
     * @param pid
     */
    void delete(int pid);

    /**
     * 查询共有多少条记录
     */
    int count();
}
