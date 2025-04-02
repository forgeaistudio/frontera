-- Delete any existing user with this email
DELETE FROM auth.users WHERE email = 'allanbcrawford@gmail.com';
DELETE FROM public.users WHERE email = 'allanbcrawford@gmail.com';

-- Insert the user into auth.users
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_user_meta_data
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '4d49fbc2-3bc3-45ac-b997-728d1465002b',
    'authenticated',
    'authenticated',
    'allanbcrawford@gmail.com',
    crypt('password123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"],"full_name":"Allan Crawford","avatar_url":null}'
);

-- Insert the user into public.users
INSERT INTO public.users (
    id,
    email,
    full_name,
    created_at,
    updated_at
) VALUES (
    '4d49fbc2-3bc3-45ac-b997-728d1465002b',
    'allanbcrawford@gmail.com',
    'Allan Crawford',
    now(),
    now()
);

-- Insert mock inventory items
INSERT INTO public.inventory
    (name, category, quantity, unit, location, expiry_date, description, user_id)
VALUES
    ('Water Filter System', 'Water', 1, 'unit', 'Garage', '2025-12-31', 'Berkey water filtration system with 2 Black Berkey elements', '4d49fbc2-3bc3-45ac-b997-728d1465002b'),
    ('Emergency Water', 'Water', 20, 'gallons', 'Basement', '2024-12-31', 'Stored drinking water in food-grade containers', '4d49fbc2-3bc3-45ac-b997-728d1465002b'),
    ('Canned Vegetables', 'Food', 24, 'cans', 'Pantry', '2025-06-30', 'Assorted vegetables for emergency food supply', '4d49fbc2-3bc3-45ac-b997-728d1465002b'),
    ('First Aid Kit', 'Medical', 1, 'kit', 'Kitchen', NULL, 'Comprehensive first aid kit with manual', '4d49fbc2-3bc3-45ac-b997-728d1465002b'),
    ('Portable Generator', 'Energy', 1, 'unit', 'Garage', NULL, '2000W portable generator with fuel stabilizer', '4d49fbc2-3bc3-45ac-b997-728d1465002b'),
    ('Emergency Radio', 'Communication', 2, 'units', 'Office', NULL, 'Hand-crank emergency radio with NOAA weather alerts', '4d49fbc2-3bc3-45ac-b997-728d1465002b');

-- Insert mock tracts
INSERT INTO public.tracts
    (name, description, location, member_count, size, tags, user_id)
VALUES
    ('Water Purification', 'Discussion on water filtration, purification, and storage techniques', 'Portland, OR', 64, 'Medium', ARRAY['water', 'filtration', 'storage'], '4d49fbc2-3bc3-45ac-b997-728d1465002b'),
    ('Food Storage', 'Long-term food storage and preservation methods', 'Portland, OR', 42, 'Small', ARRAY['food', 'storage', 'preservation'], '4d49fbc2-3bc3-45ac-b997-728d1465002b'),
    ('Emergency Response', 'Community emergency response team coordination', 'Portland, OR', 128, 'Large', ARRAY['emergency', 'response', 'community'], '4d49fbc2-3bc3-45ac-b997-728d1465002b');

-- Insert mock resources
INSERT INTO public.resources
    (title, type, description, category, url, author, rating, bookmarked, user_id)
VALUES
    ('Water Filtration Guide', 'Article', 'Comprehensive guide to water filtration methods', 'Water', 'https://example.com/water-filtration', 'Water Expert', 5, true, '4d49fbc2-3bc3-45ac-b997-728d1465002b'),
    ('Food Preservation Basics', 'Video', 'Learn the basics of food preservation', 'Food', 'https://example.com/food-preservation', 'Food Scientist', 4, false, '4d49fbc2-3bc3-45ac-b997-728d1465002b'),
    ('Emergency Response Training', 'Course', 'Complete emergency response training course', 'Emergency', 'https://example.com/emergency-response', 'Emergency Trainer', 5, true, '4d49fbc2-3bc3-45ac-b997-728d1465002b');
