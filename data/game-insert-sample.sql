INSERT INTO artists ("artistId", name) VALUES
    ('7dGJo4pcD2V6oG8kP0tJRR', 'Eminem')
    ON CONFLICT (name) DO NOTHING;

update artists set "artistId" = '1Z8ODXyhEBi3WynYw0Rya6', name = 'De La Soul' where id = 567;

ALTER SEQUENCE artists_id_seq RESTART WITH 719;
