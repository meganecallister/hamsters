INSERT INTO Users
(auth_id, name, img)
VALUES ( $1, 'Name', 'https://www.google.com/search?biw=1517&bih=746&tbm=isch&sa=1&ei=RfD1Wp2IF9H00wKL04P4DQ&q=hamster+clipart+black+and+white&oq=hamster+clipart+black+and+white&gs_l=img.3...39524.42442.0.42592.0.0.0.0.0.0.0.0..0.0....0...1.1.64.img..0.0.0....0.LQ9MSQhEGog#imgrc=Q4CpW2W5IlSsNM:' )
RETURNING *;