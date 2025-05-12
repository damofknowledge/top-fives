INSERT INTO artists ("artistId", name) VALUES
    ('1cXi8ALPQCBHZbf0EgP4Ey', 'Misfits')
    ON CONFLICT (name) DO NOTHING;

update artists set "artistId" = '0KydPQPUUoTNhmiHKOg5Er', name = 'Neon Indian' where id = 854;

ALTER SEQUENCE artists_id_seq RESTART WITH 719;
