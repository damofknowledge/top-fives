INSERT INTO artists ("artistId", name) VALUES
    ('2kucQ9jQwuD8jWdtR9Ef38', 'Sam Hunt')
    ON CONFLICT (name) DO NOTHING;
