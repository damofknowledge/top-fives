INSERT INTO artists ("artistId", name) VALUES
    ('3NZE8jDD2cCzd4vUyZ5CQQ', 'Spacehog')
    ON CONFLICT (name) DO NOTHING;
