INSERT INTO artists ("artistId", name) VALUES
    ('7G1GBhoKtEPnP86X2PvEYO', 'Nina Simone')
    ON CONFLICT (name) DO NOTHING;

update artists set artistId = '2m62cc253Xvd9qYQ8d2X3d', name = 'The Alan Parsons Project' where id = 483;
 