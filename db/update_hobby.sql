UPDATE Favs
SET hobby = $1
FROM Users u
WHERE u.id = $2
AND u.id = Favs.id
RETURNING *;