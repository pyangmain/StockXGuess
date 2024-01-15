package com.example.demo.sneaker;

import jakarta.persistence.*;

@Entity
@Table
public class Sneaker {
    @Id
    @SequenceGenerator(
            name = "sneaker_sequence",
            sequenceName = "sneaker_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "sneaker_sequence"
    )
    private Long db_id;
    private String objId;
    private String sneakerName;
    private String imgUrl;
    private String sneakerUrl;
    private Long price;

    public Sneaker() {
    }

    public Sneaker(String objId, String sneakerName, String imgUrl, String sneakerUrl, long price) {
        this.objId = objId;
        this.sneakerName = sneakerName;
        this.imgUrl = imgUrl;
        this.sneakerUrl = sneakerUrl;
        this.price = price;
    }

    public Sneaker(long db_id, String objId, String sneakerName, String imgUrl, String sneakerUrl, long price) {
        this.db_id = db_id;
        this.objId = objId;
        this.sneakerName = sneakerName;
        this.imgUrl = imgUrl;
        this.sneakerUrl = sneakerUrl;
        this.price = price;
    }

    public long getDb_id() {
        return db_id;
    }

    public void setDb_id(long db_id) {
        this.db_id = db_id;
    }

    public String getObjId() {
        return objId;
    }

    public void setObjId(String objId) {
        this.objId = objId;
    }

    public String getSneakerName() {
        return sneakerName;
    }

    public void setSneakerName(String sneakerName) {
        this.sneakerName = sneakerName;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String getSneakerUrl() {
        return sneakerUrl;
    }

    public void setSneakerUrl(String sneakerUrl) {
        this.sneakerUrl = sneakerUrl;
    }

    public long getPrice() {
        return price;
    }

    public void setPrice(long price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Sneaker{" +
                "db_id=" + db_id +
                ", objId='" + objId + '\'' +
                ", sneakerName='" + sneakerName + '\'' +
                ", imgUrl='" + imgUrl + '\'' +
                ", sneakerUrl='" + sneakerUrl + '\'' +
                ", price=" + price +
                '}';
    }
}
