INSERT INTO artists ("artistId", name) VALUES
    ('2f9ZiYA2ic1r1voObUimdd', 'Grace Jones')
    ON CONFLICT (name) DO NOTHING;

update artists set "artistId" = '0KydPQPUUoTNhmiHKOg5Er', name = 'Neon Indian' where id = 854;

ALTER SEQUENCE artists_id_seq RESTART WITH 719;
