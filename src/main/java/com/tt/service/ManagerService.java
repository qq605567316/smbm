package com.tt.service;


import com.tt.entity.Manager;

import java.util.List;

public interface ManagerService {
    Manager login(String username, String password);

    boolean register(Manager manager);

    void editManager(Manager manager);

    void delManager(int mid);

    List<Manager> queryall();
}
