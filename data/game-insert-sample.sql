INSERT INTO artists ("artistId", name) VALUES
    ('7oPgCQqMMXEXrNau5vxYZP', 'Tracy Chapman')
    ON CONFLICT (name) DO NOTHING;
