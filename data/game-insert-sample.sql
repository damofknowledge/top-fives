INSERT INTO artists ("artistId", name) VALUES
    ('5MspMQqdVbdwP6ax3GXqum', 'Annie Lennox')
    ON CONFLICT (name) DO NOTHING;

update artists set "artistId" = '0KydPQPUUoTNhmiHKOg5Er', name = 'Neon Indian' where id = 854;

ALTER SEQUENCE artists_id_seq RESTART WITH 719;
