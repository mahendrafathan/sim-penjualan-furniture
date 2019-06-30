/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package furniture.app.repo;

import furniture.app.model.TrPenjualan;
import furniture.app.model.TrPenjualanDtl;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 *
 * @author teg
 */
@Repository
public interface PenjualanDtlRepo extends JpaRepository<TrPenjualanDtl, Integer>, JpaSpecificationExecutor<TrPenjualanDtl>{
    List<TrPenjualanDtl> findAllByTrPenjualan(TrPenjualan penjualan);
}
