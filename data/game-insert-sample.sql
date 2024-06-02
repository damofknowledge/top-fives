INSERT INTO artists ("artistId", name) VALUES
    ('0LIll5i3kwo5A3IDpipgkS', 'Squirrel Nut Zippers')
    ON CONFLICT (name) DO NOTHING;

update artists set artistId = '2m62cc253Xvd9qYQ8d2X3d', name = 'The Alan Parsons Project' where id = 483;

ALTER SEQUENCE artists_id_seq RESTART WITH 719;
