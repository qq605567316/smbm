package com.tt.dao;

import com.tt.BaseTest;
import com.tt.entity.Person;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class PersonDaoTest extends BaseTest {

    @Autowired
    private PersonDao personDao;

    @Test
    public void testQueryAll() {
        List<Person> personList = personDao.queryAll(5, 5);
        for (Person person : personList) {
            System.out.println(person.getPid());
        }
    }

    @Test
    public void testQueryBySid() {
        List<Person> personList = personDao.queryBySid(2);
        for (Person person : personList) {
            System.out.println(person.getPid());
        }
    }

    @Test
    public void testCount() {
        System.out.println(personDao.count());
    }
}
