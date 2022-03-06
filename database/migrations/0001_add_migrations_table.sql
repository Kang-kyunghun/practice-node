CREATE TABLE migrations (
    id varchar(32) NOT NULL,
    name varchar(1000) NOT NULL, 
    applied_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
)