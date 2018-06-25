package com.tt.service.impl;

import com.tt.dao.PersonDao;
import com.tt.entity.Person;
import com.tt.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonServiceImpl implements PersonService {

    @Autowired
    private PersonDao personDao;

    @Override
    public List<Person> queryAll(int offset, int limit) {
        return personDao.queryAll(offset,limit);
    }

    @Override
    public List<Person> queryBySid(int sid) {
        return personDao.queryBySid(sid);
    }

    @Override
    public void deleteById(int pid) {
        personDao.delete(pid);
    }

    @Override
    public void insertPerson(Person person) {
        personDao.insert(person);
    }

    @Override
    public void update(Person person) {
        personDao.update(person);
    }

    @Override
    public int total() {
        return personDao.count();
    }
}
