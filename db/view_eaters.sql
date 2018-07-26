SELECT name
FROM Users
WHERE id IN (
    SELECT id
    FROM Favs
    WHERE eatOrSleep = 'eat');