/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package furniture.app.service;

import furniture.app.model.TrPenjualan;
import furniture.app.model.TrPenjualanDtl;
import furniture.app.repo.PenjualanDtlRepo;
import furniture.app.repo.PenjualanRepo;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author teg
 */
@Service
@Transactional(readOnly = true)
public class PenjualanService {

    @Autowired
    private PenjualanRepo penjualanRepo;
    private TrPenjualan penjualan;

    @Autowired
    private PenjualanDtlRepo penjualanDtlRepo;
    private List<TrPenjualanDtl> listenjualanDtl;
    private TrPenjualanDtl penjualanDtl;
    
    @Transactional(readOnly = false, rollbackFor = Exception.class)
    public void saveRecord() {
    
    }
}
