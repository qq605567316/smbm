package com.tt.service;

import com.tt.dto.GoodsExecution;
import com.tt.entity.Goods;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.util.List;


public interface GoodsService {
    GoodsExecution addGoods(Goods goods, CommonsMultipartFile gPic) throws RuntimeException;

    GoodsExecution editGoods(Goods goods, CommonsMultipartFile gPic) throws RuntimeException;

    List<Goods> getAllGoods();

    void delGoodsById(Integer id);

    Goods getByGoodsId(Integer gid);

    List<Goods> getAllBySid(Integer sid);
}
