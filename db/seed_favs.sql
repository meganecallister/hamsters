DROP TABLE IF EXISTS Favs;

CREATE TABLE Favs (
    id SERIAL PRIMARY KEY,
    food TEXT,
    hobby TEXT
);

INSERT INTO Favs ( food, hobby )
VALUES
('Carrots', 'Napping'),
('Lettuce', 'Climbing'),
('Seeds', 'Burrowing'),
('Apples', 'Exploring'),
('Spinach', 'Running'),
('Celery', 'Cuddling'),
('Pellets', 'People watching'),
('Cucumbers', 'Nibbling');