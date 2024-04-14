INSERT INTO artists ("artistId", name) VALUES
    ('2RQXRUsr4IW1f3mKyKsy4B', 'Noah Kahan')
    ON CONFLICT (name) DO NOTHING;

update artists set artistId = '2m62cc253Xvd9qYQ8d2X3d', name = 'The Alan Parsons Project' where id = 483;
 