DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    auth_id TEXT,
    name TEXT,
    img TEXT
);

INSERT INTO Users ( auth_id, name, img )
VALUES
('1234', 'Cutsie', 'https://i.ytimg.com/vi/xkxjNZComZg/maxresdefault.jpg'),
('2345', 'Mitsy', 'https://i.amz.mshcdn.com/vZ_SBZAS-HjH0iWqay5kJYHlvSY=/1200x630/2017%2F07%2F12%2Faf%2F5ee9a826a4f5430190681a4f6eb6fbed.93444.jpg'),
('3456', 'Boopsy', 'http://petattack.com/wp-content/uploads/2014/07/HamsterREX_468x362.jpg'),
('4567', 'Sammy', 'https://media.proprofs.com/images/QM/user_images/1754155/1473066764.jpg'),
('5678', 'Tootsie', 'https://cdn.omlet.co.uk/images/originals/Holding-a-hamster.jpg'),
('6789', 'Libby', 'http://thehamsterhouse.com/wp-content/uploads/2015/07/Hamster-Finger-300.jpg'),
('7890', 'Bobby', 'http://pethamstercare.com/wp-content/uploads/2009/10/hamster-1.jpg'),
('8901', 'Nibbles', 'https://d1alt1wkdk73qo.cloudfront.net/images/guide/e8c4903c250c4b5ab32d074d17e08963/640x478_ac.jpg');

