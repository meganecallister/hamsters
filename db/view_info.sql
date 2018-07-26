SELECT food, hobby, f.id
FROM Favs f
JOIN Users u ON u.id = f.id
WHERE u.name = $1;