package com.tt.service.impl;

import com.tt.dao.ManagerDao;
import com.tt.entity.Manager;
import com.tt.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManagerServiceImpl implements ManagerService {
    @Autowired
    private ManagerDao managerDao;

    @Override
    public Manager login(String username, String password) {
        return managerDao.login(username, password);
    }

    @Override
    public boolean register(Manager manager) {
        if (managerDao.querybyusername(manager.getUsername()) != 0) {
            return false;
        } else {
            managerDao.insert(manager);
            return true;
        }
    }

    @Override
    public void editManager(Manager manager) {
        managerDao.update(manager);
    }

    @Override
    public void delManager(int mid) {
        managerDao.delete(mid);
    }

    @Override
    public List<Manager> queryall() {
        return managerDao.queryAll();
    }
}
