package com.tt.service;

import com.tt.entity.Person;

import java.util.List;

public interface PersonService {
    List<Person> queryAll(int offset,int limit);

    List<Person> queryBySid(int sid);

    void deleteById(int pid);

    void insertPerson(Person person);

    void update(Person person);

    int total();
}
