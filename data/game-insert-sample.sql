INSERT INTO artists ("artistId", name) VALUES
    ('4FZ3j1oH43e7cukCALsCwf', 'Jack White')
    ON CONFLICT (name) DO NOTHING;
