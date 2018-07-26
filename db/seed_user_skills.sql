DROP TABLE IF EXISTS User_Skills;

CREATE TABLE User_Skills (
    id SERIAL PRIMARY KEY,
    user_id int,
    skill_id int
);

INSERT INTO User_Skills ( user_id, skill_id )
VALUES
('1', '1'),
('1', '2'),
('1', '3'),
('2', '3'),
('3', '2'),
('3', '4'),
('4', '4'),
('4', '5'),
('5', '8'),
('5', '7'),
('6', '6'),
('7', '6'),
('7', '5'),
('8', '4');
