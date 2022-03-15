-- migrate:up
CREATE TABLE reservation_status (
    id INT NOT NULL AUTO_INCREMENT,
    status VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE reservations (
    id INT NOT NULL AUTO_INCREMENT,
    reservation_code VARCHAR(36) NOT NULL,
    reservation_status_id INT NOT NULL,
    listing_id INT NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    num_adults TINYINT NOT NULL,
    num_children TINYINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    CONSTRAINT reservations_reservation_status_id_key FOREIGN KEY (reservation_status_id) REFERENCES reservation_status(id),
    CONSTRAINT reservations_reservation_listing_id_key FOREIGN KEY (listing_id) REFERENCES listings(id),
    PRIMARY KEY(id)
);

-- migrate:down
DROP TABLE reservations;
DROP TABLE reservation_status;