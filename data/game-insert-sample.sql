INSERT INTO artists ("artistId", name) VALUES
    ('3WrFJ7ztbogyGnTHbHJFl2', 'The Beatles')
    ON CONFLICT (name) DO NOTHING;

update artists set artistId = '2m62cc253Xvd9qYQ8d2X3d', name = 'The Alan Parsons Project' where id = 483;
 