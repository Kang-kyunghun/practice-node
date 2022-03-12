CREATE TABLE users (
    id int  NOT NULL AUTO_INCREMENT,
    username varchar(200) NOT NULL,
    email varchar(100) NOT NULL UNIQUE, 
    password varchar(200) NOT NULL,
    mobile_number varchar(100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
)