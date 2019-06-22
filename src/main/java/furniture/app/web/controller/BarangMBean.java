/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package furniture.app.web.controller;

import furniture.app.model.Kategori;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.faces.application.FacesMessage;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;
import org.primefaces.context.RequestContext;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Controller;
import furniture.app.model.MstBarang;
import furniture.app.repo.BarangRepo;
import furniture.app.repo.KategoriRepo;
import furniture.app.web.util.AbstractManagedBean;
import static furniture.app.web.util.AbstractManagedBean.getRequestParam;
import static furniture.app.web.util.AbstractManagedBean.showGrowl;
import furniture.app.web.util.LazyDataModelFilterJPA;
import java.math.BigInteger;

/**
 *
 * @author furniture
 */
@Controller
@Scope("view")
@Data
public class BarangMBean extends AbstractManagedBean implements InitializingBean {

    @Autowired
    private BarangRepo barangRepo;
    private LazyDataModelFilterJPA<MstBarang> listBarang;
    private List<MstBarang> listBarang2;
    private MstBarang mstBarang;
    private MstBarang mstBarangCek;
    private String kodeBarang;
    private String dalogHeader;

    @Autowired
    private KategoriRepo kategoriRepo;
    private Kategori kategori;
    private List<Kategori> listKategori;

    public void init() {
        mstBarang = new MstBarang();
        kategori = new Kategori();
        listKategori = kategoriRepo.findAllByStatusOrderByNamaKategoriAsc(Kategori.Status.ACTIVE);
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        init();
        listBarang2 = new ArrayList<>();
        listBarang2 = barangRepo.findAllByStatusOrderByNamaBarangAsc(MstBarang.Status.ACTIVE);
        listBarang = new LazyDataModelFilterJPA(barangRepo) {
            @Override
            protected Page getDatas(PageRequest request, Map filters) {
                mstBarang.setNamaBarang((String) filters.get("namaBarang"));
                mstBarang.setKodeBarang((String) filters.get("kodeBarang"));
                kategori = (Kategori) filters.get("kategori");
                mstBarang.setHargaBeli((Integer) filters.get("hargaBeli"));
                mstBarang.setHargaJual((Integer) filters.get("hargaJual"));
                mstBarang.setStok((Integer) filters.get("stok"));
                return barangRepo.findAll(whereQuery(), request);
            }

            @Override
            protected long getDataSize(Map filters) {
                mstBarang.setNamaBarang((String) filters.get("namaBarang"));
                mstBarang.setKodeBarang((String) filters.get("kodeBarang"));
                kategori = (Kategori) filters.get("kategori");
                mstBarang.setHargaBeli((Integer) filters.get("hargaBeli"));
                mstBarang.setHargaJual((Integer) filters.get("hargaJual"));
                mstBarang.setStok((Integer) filters.get("stok"));
                return barangRepo.count(whereQuery());
            }
        };
    }

    public Specification<MstBarang> whereQuery() {
        List<Predicate> predicates = new ArrayList<>();
        return new Specification<MstBarang>() {
            @Override
            public Predicate toPredicate(Root<MstBarang> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                if (StringUtils.isNotBlank(mstBarang.getNamaBarang())) {
                    predicates.add(cb.like(cb.lower(root.<String>get("namaBarang")),
                            getLikePattern(mstBarang.getNamaBarang())));
                }
                if (StringUtils.isNotBlank(mstBarang.getKodeBarang())) {
                    predicates.add(cb.like(cb.lower(root.<String>get("kodeBarang")),
                            getLikePattern(mstBarang.getKodeBarang())));
                }
                if (kategori != null && kategori.getKategoriId() != null) {
                    predicates.add(cb.equal(root.<Kategori>get("kategori"), kategori));
                }
                if (mstBarang.getHargaBeli() != null) {
                    predicates.add(cb.equal(cb.lower(root.<String>get("hargaBeli")),
                            mstBarang.getHargaBeli()));
                }
                if (mstBarang.getHargaJual() != null) {
                    predicates.add(cb.equal(cb.lower(root.<String>get("hargaJual")),
                            mstBarang.getHargaJual()));
                }
//                if (mstBarang.getStok() != 0) {
//                    predicates.add(cb.equal(cont.<Integer>get("stok"), mstBarang.getHargaJual()));
//                }

                predicates.add(cb.equal(root.<BigInteger>get("status"), MstBarang.Status.ACTIVE));
                query.orderBy(cb.asc(root.<Integer>get("barangId")));
                return andTogether(predicates, cb);
            }

        };
    }

    private Predicate andTogether(List<Predicate> predicates, CriteriaBuilder cb) {
        return cb.and(predicates.toArray(new Predicate[0]));
    }

    private String getLikePattern(String searchTerm) {
        return new StringBuilder("%")
                .append(searchTerm.toLowerCase().replaceAll("\\*", "%"))
                .append("%")
                .toString();
    }

    public void showDialogAction() {
        mstBarangCek = (MstBarang) getRequestParam("barang");
        mstBarang = new MstBarang();
        if (mstBarangCek == null) {
            System.out.println("tambah");
            dalogHeader = "Tambah Barang";
        } else {
            System.out.println("update");
            dalogHeader = "Ubah Perwakilan";
            mstBarang = mstBarangCek;
            kodeBarang = mstBarangCek.getKodeBarang();
            System.out.println("kode barang : " + kodeBarang);
        }
        RequestContext.getCurrentInstance().reset("idDialocAct");
        RequestContext.getCurrentInstance().update("idDialocAct");
        RequestContext.getCurrentInstance().execute("PF('showDialocAct').show()");
    }

    public void saveRecord() throws InterruptedException {
        try {
            MstBarang br = barangRepo.findTop1ByKodeBarang(mstBarang.getKodeBarang().toUpperCase());
            System.out.println("br : " + br);
            if (br != null) {
                if (br.getStatus().equals(MstBarang.Status.ACTIVE)) {
                    showGrowl(FacesMessage.SEVERITY_ERROR,
                            "Barang dengan kode " + mstBarang.getKodeBarang().toUpperCase()
                            + " sudah ada", "");
                    return;
                } else {
                    mstBarang.setStatus(MstBarang.Status.INACTIVE);
                    mstBarang.setKodeBarang(kodeBarang);
                    barangRepo.save(mstBarang);
                    String namaBarang = mstBarang.getNamaBarang();
                    Integer hargaBeli = mstBarang.getHargaBeli();
                    Integer hargaJual = mstBarang.getHargaJual();
                    Integer stok = mstBarang.getStok();
                    Kategori kt = mstBarang.getKategori();
                    mstBarang = br;
                    mstBarang.setNamaBarang(namaBarang);
                    mstBarang.setHargaBeli(hargaBeli);
                    mstBarang.setHargaJual(hargaJual);
                    mstBarang.setStok(stok);
                    mstBarang.setKategori(kt);
                }
            }
            mstBarang.setStatus(MstBarang.Status.ACTIVE);
            barangRepo.save(mstBarang);
            showGrowl(FacesMessage.SEVERITY_INFO, "Informasi", "Data berhasil disimpan");
            RequestContext.getCurrentInstance().update("idList");
            RequestContext.getCurrentInstance().update("growl");
            RequestContext.getCurrentInstance().execute("PF('showDialocAct').hide()");
        } catch (Exception e) {
            log.error("error : {}", e);
            showGrowl(FacesMessage.SEVERITY_ERROR, "Peringatan", "Terjadi kesalahan simpan data");
            RequestContext.getCurrentInstance().update("growl");
        } finally {
            init();
        }
    }

    public void deleteRecord() throws InterruptedException {
        mstBarangCek = (MstBarang) getRequestParam("barang");
        mstBarangCek.setStatus(MstBarang.Status.INACTIVE);
        barangRepo.save(mstBarangCek);
        showGrowl(FacesMessage.SEVERITY_INFO, "Informasi", "Data berhasil dihapus");
        RequestContext.getCurrentInstance().update("idList");
        RequestContext.getCurrentInstance().update("growl");
    }

    public void showDialogCetak() {
        RequestContext.getCurrentInstance().reset("idDialogCetak");
        RequestContext.getCurrentInstance().update("idDialogCetak");
        RequestContext.getCurrentInstance().execute("PF('showDialogCetak').show()");
    }
}
