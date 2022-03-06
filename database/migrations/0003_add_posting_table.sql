CREATE TABLE postings (
    id int  NOT NULL AUTO_INCREMENT,
    title varchar(200) NOT NULL,
    content text NOT NULL, 
    user_id int NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    CONSTRAINT postings_user_id_key FOREIGN KEY (user_id) REFERENCES users(id)
)