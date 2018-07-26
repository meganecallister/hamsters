DROP TABLE IF EXISTS Skills;

CREATE TABLE Skills (
    skills_id SERIAL PRIMARY KEY,
    skills TEXT
);

INSERT INTO Skills ( skills )
VALUES
('Kung Fu'),
('Painting'),
('Rock Climbing'),
('Fencing'),
('Cooking'),
('Netflix Binging'),
('Flirting'),
('Doing Nothing');