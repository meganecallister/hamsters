INSERT INTO Favs
(id, food, hobby)
VALUES ($1, '', '')
RETURNING *;