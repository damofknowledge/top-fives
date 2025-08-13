INSERT INTO artists ("artistId", name) VALUES
    ('5os0Ltvz8Q8BvXOPOd1frx', 'Inner Circle')
    ON CONFLICT (name) DO NOTHING;

update artists set "artistId" = '0KydPQPUUoTNhmiHKOg5Er', name = 'Neon Indian' where id = 854;

ALTER SEQUENCE artists_id_seq RESTART WITH 719;
