INSERT INTO artists ("artistId", name) VALUES
    ('1anyVhU62p31KFi8MEzkbf', 'Metro Boomin')
    ON CONFLICT (name) DO NOTHING;
