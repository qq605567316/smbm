package com.tt.service.impl;

import com.tt.dao.GoodsDao;
import com.tt.dto.GoodsExecution;
import com.tt.entity.Goods;
import com.tt.enums.GoodsStateEnum;
import com.tt.service.GoodsService;
import com.tt.util.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class GoodServiceImpl implements GoodsService {
    @Autowired
    private GoodsDao goodsDao;

    @Override
    @Transactional
    public GoodsExecution addGoods(Goods goods, CommonsMultipartFile gPic) throws RuntimeException{
        if(goods == null){
            return new GoodsExecution(GoodsStateEnum.FALSE);
        }
        try{
            //添加商品信息
            addGoodsImg(goods,gPic);
            int effectedNum = goodsDao.insert(goods);
            if(effectedNum <= 0){
                throw new RuntimeException("商品添加失败");
            }else {
                return new GoodsExecution(GoodsStateEnum.SUCCESS,goods);
            }
        }catch (Exception e){
            throw new RuntimeException("addGoods error:"+e.getMessage());
        }
    }

    @Override
    @Transactional
    public GoodsExecution editGoods(Goods goods, CommonsMultipartFile gPic) throws RuntimeException {
        if(goods == null || goods.getGid() == null){
            return new GoodsExecution(GoodsStateEnum.FALSE);
        }else {
            try {
                //1.判断图片有没有修改
                if (gPic != null) {
                    Goods tempGoods = goodsDao.queryById(goods.getGid());
                    if (tempGoods.getGpic() != null) {
                        //调用工具类删除原来的图片
                        ImageUtil.deleteFile(tempGoods.getGpic());
                    }
                    try {
                        addGoodsImg(goods, gPic);
                    } catch (IOException e) {
                        throw new RuntimeException("addGoods error:" + e.getMessage());
                    }
                }
                //2.更新商品信息
                int effectedNum = goodsDao.update(goods);
                if (effectedNum <= 0) {
                    return new GoodsExecution(GoodsStateEnum.FALSE);
                } else {
                    goods = goodsDao.queryById(goods.getGid());
                    return new GoodsExecution(GoodsStateEnum.SUCCESS, goods);
                }
            }catch (Exception e){
                throw new RuntimeException("editGoods error" + e.getMessage());
            }
        }
    }

    @Override
    public List<Goods> getAllGoods() {
        List<Goods> goodsList = goodsDao.queryAll();
        return goodsList;
    }

    @Override
    public void delGoodsById(Integer id) {
        goodsDao.delete(id);
    }

    @Override
    public Goods getByGoodsId(Integer gid) {
        return goodsDao.queryById(gid);
    }

    @Override
    public List<Goods> getAllBySid(Integer sid) {
        return goodsDao.queryBySid(sid);
    }

    private void addGoodsImg(Goods goods,CommonsMultipartFile gPic) throws IOException {
        //获取图片目录的相对值路径
        String goodsImgAddr = ImageUtil.generateThumbnail(gPic);
        goods.setGpic(goodsImgAddr);
    }


}
