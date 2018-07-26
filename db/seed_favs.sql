DROP TABLE IF EXISTS Favs;

CREATE TABLE Favs (
    id SERIAL PRIMARY KEY,
    food TEXT,
    hobby TEXT,
    eatOrSleep TEXT
);

INSERT INTO Favs ( food, hobby, eatOrSleep )
VALUES
('Carrots', 'Napping', 'eat'),
('Lettuce', 'Climbing', 'sleep'),
('Seeds', 'Burrowing', 'eat'),
('Apples', 'Exploring', 'eat'),
('Spinach', 'Running', 'sleep'),
('Celery', 'Cuddling', 'eat'),
('Pellets', 'People watching', 'sleep'),
('Cucumbers', 'Nibbling', 'sleep');