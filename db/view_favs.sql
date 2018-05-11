SELECT food, hobby, f.id
FROM Favs f
JOIN Users u ON u.id = f.id
WHERE u.id = $1;