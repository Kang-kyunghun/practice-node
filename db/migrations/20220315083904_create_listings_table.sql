-- migrate:up
CREATE TABLE listing_types (
    id INT  NOT NULL AUTO_INCREMENT,
    type VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE listings (
    id int  NOT NULL AUTO_INCREMENT,
    listing_type_id INT NOT NULL,
    host_id INT NOT NULL,
    title VARCHAR(300) NOT NULL,
    description TEXT,
    price DECIMAL(9,2) NOT NULL,
    num_guests INT NOT NULL,
    num_beds INT NOT NULL,
    num_baths INT NOT NULL,
    country VARCHAR(50) NOT NULL,
    region VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    address VARCHAR(300) NOT NULL,
    latitude DECIMAL(7,5) NOT NULL,
    longtitude DECIMAL(7,5) NULL NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    CONSTRAINT listings_listing_type_id_key FOREIGN KEY (listing_type_id) REFERENCES listing_types(id),
    CONSTRAINT listings_host_id_key FOREIGN KEY (host_id) REFERENCES hosts(id)
);

CREATE TABLE listing_images (
    id int  NOT NULL AUTO_INCREMENT,
    listing_id INT NOT NULL,
    image_url VARCHAR(2000) NOT NULL,
    sequence INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT listing_images_listing_id_key FOREIGN KEY (listing_id) REFERENCES listings(id)
);


-- migrate:down
DROP TABLE listing_images;
DROP TABLE listings;
DROP TABLE listing_types;

