/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package furniture.app.repo;

import furniture.app.model.Kategori;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 *
 * @author PROSIA
 */
public interface KategoriRepo extends JpaRepository<Kategori, Integer>, JpaSpecificationExecutor<Kategori> {

    public Kategori findTop1ByNamaKategoriAndStatus(String namaKategori, Kategori.Status s);
    
    public Kategori findTop1ByNamaKategori(String namaKategori);
    
    public List<Kategori> findAllByStatusOrderByNamaKategoriAsc(Kategori.Status s);
}
