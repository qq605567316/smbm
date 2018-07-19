package com.tt.service.impl;

import com.tt.dao.SupermarketDao;
import com.tt.entity.Supermarket;
import com.tt.service.SupermarketService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupermarketSericeImpl implements SupermarketService {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    //注入service依赖
    @Autowired
    private SupermarketDao supermarketDao;

    @Override
    public Supermarket getById(int sid) {
        return supermarketDao.queryById(sid);
    }

    @Override
    public List<Supermarket> getList() {
        return supermarketDao.queryAll(0, 1000);
    }

    @Override
    public void addSupermarket(Supermarket supermarket) {
        if (supermarket == null) {
            throw new RuntimeException("超市信息为空");
        }
        supermarketDao.insert(supermarket);
    }

    @Override
    public void editSupermarket(Supermarket supermarket) {
        if (supermarket == null) {
            throw new RuntimeException("超市信息为空");
        }
        supermarketDao.update(supermarket);
    }

    @Override
    public void delSupermarketById(int sid) {
        supermarketDao.delete(sid);
    }
}
