INSERT INTO Users
(auth_id, name, img)
VALUES ( $1, '', '' )
RETURNING *;