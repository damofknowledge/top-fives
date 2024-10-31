INSERT INTO artists ("artistId", name) VALUES
    ('5DGJC3n9DS0Y9eY5ul9y0O', 'Marika Hackman')
    ON CONFLICT (name) DO NOTHING;

update artists set "artistId" = '5DGJC3n9DS0Y9eY5ul9y0O', name = 'Marika Hackman' where id = 681;

ALTER SEQUENCE artists_id_seq RESTART WITH 719;
