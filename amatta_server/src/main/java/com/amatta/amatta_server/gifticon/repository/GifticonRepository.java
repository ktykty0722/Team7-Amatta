package com.amatta.amatta_server.gifticon.repository;

import com.amatta.amatta_server.gifticon.model.Gifticon;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface GifticonRepository extends CrudRepository<Gifticon, Long> {
    @Query("SELECT LAST_INSERT_ID()")
    long findLastInsertId();

    @Query("SELECT * FROM gifticon WHERE barcode = :barcode")
    Optional<Gifticon> findByBarcode(@Param("barcode") String barcode);

    @Query("SELECT " +
            "id, " +
            "uid, " +
            "itemName, " +
            "brandName, " +
            "image,  " +
            "barcode, " +
            "price, " +
            "expiresAt, " +
            "usedAt, " +
            "price FROM gifticon WHERE id = :id")
    Optional<Gifticon> findById(@Param("id") long id);

    @Modifying
    @Query("INSERT INTO gifticon(uid, image, brandName, itemName, barcode, expiresAt, usedAt, price)" +
            " VALUES (:uid, :image, :brandName, :itemName, :barcode, :expiresAt, :usedAt, :price)")
    void addGifticon(
            @Param("uid")       long uid,
            @Param("image")     byte[] image,
            @Param("brandName") String brandName,
            @Param("itemName")  String itemName,
            @Param("barcode")   String barcode,
            @Param("expiresAt") LocalDate expiresAt,
            @Param("usedAt")    LocalDate usedAt,
            @Param("price")     int price
    );

    @Query("SELECT " +
            "id, " +
            "uid, " +
            "itemName, " +
            "brandName, " +
            "image,  " +
            "barcode, " +
            "price, " +
            "expiresAt, " +
            "usedAt, " +
            "price FROM gifticon WHERE uid = :uid")
    List<Gifticon> findByUid(@Param("uid") long uid);

    @Modifying
    @Query( "UPDATE gifticon SET usedAt = :usedAt WHERE uid = :uid")
    void useGifticon(@Param("uid") long uid, @Param("usedAt") LocalDate usedAt);
}
