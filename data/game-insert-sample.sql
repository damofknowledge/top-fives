INSERT INTO artists ("artistId", name) VALUES
    ('1BH45DVSTeGBvcYXNCd67g', 'M.O.P.'),
    ('4tuJ0bMpJh08umKkEXKUI5', 'Gracie Abrams'),
    ('0O5sXbPJPWbHKnbLfdLARS', 'Beulah'),
    ('0WKIRXNWr6cYlm8ZYVXD1I', 'Charo'),
    ('3IYUhFvPQItj6xySrBmZkd', 'Creedence Clearwater Revival'),
    ('4VMYDCV2IEDYJArk749S6m', 'Daddy Yankee');

update artists set "artistId" = '6bI8H2TnlKYGJSo52wcTP4', name = 'Taylor Hawkins' where id = 1120;

ALTER SEQUENCE artists_id_seq RESTART WITH 719;

