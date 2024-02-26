-- User table
CREATE TABLE users(
    id INT PRIMARY KEY,
    email VARCHAR(128));

-- Friends table
-- Mapped both ways. (i.e. if a and b are friends, (a, b) + (b, a) will appear in the table)
CREATE TABLE friends(
    user_id INT FOREIGN KEY REFERENCES users(id),
    other_user_id INT FOREIGN KEY REFERENCES users(id));

-- Groups table
CREATE TABLE groups(
    id INT PRIMARY KEY,
    name VARCHAR(128),
    owner INT FOREIGN KEY REFERENCES users(id),
    curr_prompt VARCHAR(1024),
    last_updated_prompt DATETIME);

-- Recent group prompts table
CREATE TABLE recent_prompts(
    id INT FOREIGN KEY REFERENCES groups(id),
    prompt VARCHAR(1024));

-- Groups belonging to a user table
CREATE TABLE users_groups(
    user_id INT FOREIGN KEY REFERENCES users(id),
    group_id INT FOREIGN KEY REFERENCES groups(id));

-- Mosaic table
CREATE TABLE mosaics(
    id INT PRIMARY KEY,
    droup_id INT FOREIGN KEY REFERENCES groups(id),
    prompt VARCHAR(1024),
    data JSON);

-- Whiteboard table
CREATE TABLE whiteboards(
    id INT PRIMARY KEY,
    user_id INT FOREIGN KEY REFERENCES users(id),
    group_id INT FOREIGN KEY REFERENCES groups(id),
    prompt VARACHAR(1024),
    data JSON);