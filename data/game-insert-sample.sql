INSERT INTO artists ("artistId", name) VALUES
    ('5isqImG0rLfAgBJSPMEVXF', 'Blonde Redhead')
    ON CONFLICT (name) DO NOTHING;

update artists set artistId = '2m62cc253Xvd9qYQ8d2X3d', name = 'The Alan Parsons Project' where id = 483;

ALTER SEQUENCE artists_id_seq RESTART WITH 719;
