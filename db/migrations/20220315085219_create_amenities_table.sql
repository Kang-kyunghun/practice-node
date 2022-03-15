-- migrate:up
CREATE TABLE amenity_types (
    id INT NOT NULL AUTO_INCREMENT,
    type VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE amenities (
    id INT NOT NULL AUTO_INCREMENT,
    amenity_type_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT amenities_amenity_type_id_key FOREIGN KEY (amenity_type_id) REFERENCES amenity_types(id)
);

CREATE TABLE listings_amenities (
    id INT NOT NULL AUTO_INCREMENT,
    amenity_id INT NOT NULL,
    listing_id INT NOT NULL, 
    PRIMARY KEY(id),
    CONSTRAINT listings_amenities_amenity_id_key FOREIGN KEY (amenity_id) REFERENCES amenities(id),
    CONSTRAINT listings_amenities_listing_id_key FOREIGN KEY (listing_id) REFERENCES listings(id)
);


-- migrate:down
DROP TABLE listings_amenities;
DROP TABLE amenities;
DROP TABLE amenity_types;
