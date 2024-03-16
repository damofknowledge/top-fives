INSERT INTO artists ("artistId", name) VALUES
    ('3QgSmABpItIdj908ek80n5', 'Morphine')
    ON CONFLICT (name) DO NOTHING;
