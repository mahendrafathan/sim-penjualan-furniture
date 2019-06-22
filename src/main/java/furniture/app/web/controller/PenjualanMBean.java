/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package furniture.app.web.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import javax.faces.application.FacesMessage;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import lombok.Data;
import org.primefaces.context.RequestContext;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Controller;
import furniture.app.model.MstBarang;
import furniture.app.model.MstPelanggan;
import furniture.app.model.TrPenjualan;
import furniture.app.model.TrPenjualanDtl;
import furniture.app.repo.BarangRepo;
import furniture.app.repo.PelangganRepo;
import furniture.app.repo.PenjualanDtlRepo;
import furniture.app.repo.PenjualanRepo;
import furniture.app.web.util.AbstractManagedBean;
import static furniture.app.web.util.AbstractManagedBean.showGrowl;
import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *
 * @author Owner
 */
@Controller
@Scope("view")
@Data
public class PenjualanMBean extends AbstractManagedBean implements InitializingBean {

    @Autowired
    private PenjualanRepo penjualanRepo;
    private TrPenjualan penjualan;
    private List<TrPenjualan> listPenjualan;

    @Autowired
    private PenjualanDtlRepo penjualanDtlRepo;
    private TrPenjualanDtl penjualanDtl;
    private List<TrPenjualanDtl> listPenjualanDtl;

    @Autowired
    private BarangRepo barangRepo;
    private MstBarang barang;
    private List<MstBarang> listBarang;

    @Autowired
    private PelangganRepo pelangganRepo;
    private MstPelanggan pelanggan;
    private List<MstPelanggan> listPelanggan;

    private String notaJual;
    
    private Integer bayar;
    private Integer kembali;

    SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");

    public void init() {
        penjualan = new TrPenjualan();
        penjualanDtl = new TrPenjualanDtl();
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        String tgl = dateFormat.format(new Date());
        System.out.println("tgl : " + tgl);
        TrPenjualan pPenjualan = penjualanRepo.findTop1ByStatusOrderByPenjualanIdDesc(TrPenjualan.Status.ACTIVE);
//        System.out.println("pPenjualan : " + pPenjualan);
        Integer nextPenjualanId = pPenjualan != null ? pPenjualan.getPenjualanId() + 1 : 1;
//        System.out.println("nextPenjualanId : " + nextPenjualanId);
//        System.out.println("nextPenjualanId size : " + nextPenjualanId.toString().length());
        notaJual = nextPenjualanId.toString().length() == 1 ? "NOT00".concat(nextPenjualanId.toString())
                : nextPenjualanId.toString().length() == 2 ? "NOT0".concat(nextPenjualanId.toString())
                : "NOT".concat(nextPenjualanId.toString());
//        System.out.println("notaJual : " + notaJual);
        init();
        penjualan.setNotaJual(notaJual);
        penjualan.setTglJual(new Date());

        listBarang = barangRepo.findAll();
        listPelanggan = pelangganRepo.findAll();

        listPenjualanDtl = new ArrayList<>();
        System.out.println("penjualanDtl : " + penjualanDtl);
        listPenjualanDtl.add(penjualanDtl);
    }

    public Specification<TrPenjualan> whereQuery() {
        List<Predicate> predicates = new ArrayList<>();
        return new Specification<TrPenjualan>() {
            @Override
            public Predicate toPredicate(Root<TrPenjualan> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                query.orderBy(cb.asc(root.<BigDecimal>get("penjualanId")));
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

    public void tambah() {
        barang = new MstBarang();
        TrPenjualan penjualanTmp = penjualanRepo.findTop1ByNotaJual(penjualan.getNotaJual());
        if (penjualanTmp != null) {
            showGrowl(FacesMessage.SEVERITY_INFO, "Informasi", "Data sudah ada, klik ubah");
            RequestContext.getCurrentInstance().update("idList");
            RequestContext.getCurrentInstance().update("growl");
            RequestContext.getCurrentInstance().execute("PF('showDialocAct').hide()");
            return;
        }
        penjualanRepo.save(penjualan);
        barangRepo.save(barang);
        init();
        showGrowl(FacesMessage.SEVERITY_INFO, "Informasi", "Data berhasil disimpan");
        RequestContext.getCurrentInstance().update("idList");
        RequestContext.getCurrentInstance().update("growl");
        RequestContext.getCurrentInstance().execute("PF('showDialocAct').hide()");
    }

    public void cari() {
        penjualan = penjualanRepo.findTop1ByNotaJual(penjualan.getNotaJual());
        if (penjualan == null) {
            penjualan = new TrPenjualan();
            showGrowl(FacesMessage.SEVERITY_INFO, "Informasi", "Data tidak ditemukan");
            RequestContext.getCurrentInstance().update("idList");
            RequestContext.getCurrentInstance().update("growl");
            RequestContext.getCurrentInstance().execute("PF('showDialocAct').hide()");
        }
    }

    public void ubah() {
        TrPenjualan penjualanTmp = penjualanRepo.findTop1ByNotaJual(penjualan.getNotaJual());
        if (penjualanTmp == null) {
            showGrowl(FacesMessage.SEVERITY_INFO, "Informasi", "Cari data terlebih dahulu");
            RequestContext.getCurrentInstance().update("idList");
            RequestContext.getCurrentInstance().update("growl");
            RequestContext.getCurrentInstance().execute("PF('showDialocAct').hide()");
            return;
        }
        penjualanRepo.save(penjualan);
        barangRepo.save(barang);
        init();
        showGrowl(FacesMessage.SEVERITY_INFO, "Informasi", "Data berhasil disimpan");
        RequestContext.getCurrentInstance().update("idList");
        RequestContext.getCurrentInstance().update("growl");
        RequestContext.getCurrentInstance().execute("PF('showDialocAct').hide()");
    }

    public void hapus() {
        TrPenjualan penjualanTmp = penjualanRepo.findTop1ByNotaJual(penjualan.getNotaJual());
        if (penjualanTmp == null) {
            showGrowl(FacesMessage.SEVERITY_INFO, "Informasi", "Cari data terlebih dahulu");
            RequestContext.getCurrentInstance().update("idList");
            RequestContext.getCurrentInstance().update("growl");
            RequestContext.getCurrentInstance().execute("PF('showDialocAct').hide()");
            return;
        }
        penjualanRepo.delete(penjualan);
        init();
        showGrowl(FacesMessage.SEVERITY_INFO, "Informasi", "Data berhasil dihapus");
        RequestContext.getCurrentInstance().update("idList");
        RequestContext.getCurrentInstance().update("growl");
        RequestContext.getCurrentInstance().execute("PF('showDialocAct').hide()");
    }

    public void cetak() {
        TrPenjualan penjualanTmp = penjualanRepo.findTop1ByNotaJual(penjualan.getNotaJual());
        if (penjualanTmp == null) {
            showGrowl(FacesMessage.SEVERITY_INFO, "Informasi", "Cari data terlebih dahulu");
            RequestContext.getCurrentInstance().update("idList");
            RequestContext.getCurrentInstance().update("growl");
            RequestContext.getCurrentInstance().execute("PF('showDialocAct').hide()");
            return;
        }
        RequestContext.getCurrentInstance().reset("idDialogCetak");
        RequestContext.getCurrentInstance().update("idDialogCetak");
        RequestContext.getCurrentInstance().execute("PF('showDialogCetak').show()");
    }

    public void totalHarga() {
        Integer subTotal = 0;
        Integer totalHarga = 0;
        if (penjualanDtl != null && penjualanDtl.getMstBarang() != null) {
            penjualanDtl.setHargaSatuan(penjualanDtl.getMstBarang().getHargaJual());
            if (penjualanDtl.getJumlahJual() != null) {
                subTotal = penjualanDtl.getJumlahJual() * penjualanDtl.getHargaSatuan();
                penjualanDtl.setSubTotal(BigInteger.valueOf(subTotal));
                for (TrPenjualanDtl pd : listPenjualanDtl) {
                    totalHarga += pd.getSubTotal().intValue();
                }
                penjualan.setTotalHarga(BigInteger.valueOf(totalHarga));
            }
        }
        System.out.println("subtotal : " + subTotal);
    }
    
    public void tambahBaris() {
        penjualanDtl = new TrPenjualanDtl();
        System.out.println("penjualanDtl : " + penjualanDtl);
        listPenjualanDtl.add(penjualanDtl);
    }
    
    public void onChangeBayar() {
        kembali = bayar - penjualan.getTotalHarga().intValue();
    }

    public void onChangeBarang() {
//        if (penjualan != null && penjualan.getKodeBarang() != null) {
//            penjualan.setNamaBarang(penjualan.getKodeBarang().getNamaBarang());
//            penjualan.setHargaSatuan(penjualan.getKodeBarang().getHargaJual());
//            penjualan.setStok(penjualan.getKodeBarang().getStok());
//        } else {
//            penjualan.setNamaBarang(null);
//            penjualan.setHargaSatuan(null);
//            penjualan.setStok(null);
//        }
    }

//    public void totalHarga() {
////        if (penjualan.getStok() != null && penjualan.getJumlahJual() != null) {
////            if (penjualan.getStok() - penjualan.getJumlahJual() < 0) {
////                showGrowl(FacesMessage.SEVERITY_INFO, "Informasi", "Stock habis");
////                RequestContext.getCurrentInstance().update("growl");
////                penjualan.setJumlahJual(penjualan.getStok());
////                penjualan.setStok(penjualan.getKodeBarang().getStok() - penjualan.getJumlahJual());
////            } else {
////                if (penjualan.getNoFaktur() != null) {
////                    TrPenjualan penjualanTmp = penjualanRepo.findTop1ByNoFaktur(penjualan.getNoFaktur());
////                    if (penjualan != null) {
////                        if (penjualanTmp.getJumlahJual() > penjualan.getJumlahJual()) {
////                            penjualan.setStok(penjualan.getKodeBarang().getStok() + Math.abs(penjualanTmp.getJumlahJual() - penjualan.getJumlahJual()));
////                        } else {
////                            penjualan.setStok(penjualan.getKodeBarang().getStok() - Math.abs(penjualanTmp.getJumlahJual() - penjualan.getJumlahJual()));
////                        }
////                    } else {
////                        penjualan.setStok(penjualan.getKodeBarang().getStok() - penjualan.getJumlahJual());
////                    }
////                } else {
////                    penjualan.setStok(penjualan.getKodeBarang().getStok() - penjualan.getJumlahJual());
////                }
////
////            }
////        }
////        if (penjualan.getHargaSatuan() != null && penjualan.getDiskon() != null && penjualan.getJumlahJual() != null) {
////            penjualan.setTotalHarga((penjualan.getHargaSatuan() * (100 - penjualan.getDiskon()) / 100) * penjualan.getJumlahJual());
////        }
//    }
}
