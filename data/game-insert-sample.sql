INSERT INTO artists ("artistId", name) VALUES
    ('2rBcvLKWCZs9w1qIWv560v', 'Charlotte Gainsbourg')
    ON CONFLICT (name) DO NOTHING;
