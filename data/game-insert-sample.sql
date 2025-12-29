INSERT INTO artists ("artistId", name, id) VALUES
    ('5mFKYdmiYwNJTDtSzgFyQx', 'Andy Shauf', 1246),
    ('6hnWRPzGGKiapVX1UCdEAC', 'Sam Cooke', 1247),
    ('38euc5ce2q2MMzaoJcPstz', 'Josh Rouse', 1248);

update artists set "artistId" = '6bI8H2TnlKYGJSo52wcTP4', name = 'Taylor Hawkins' where id = 1120;

ALTER SEQUENCE artists_id_seq RESTART WITH 719;

