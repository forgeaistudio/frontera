-- Add necessary columns first
ALTER TABLE tracts ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';
ALTER TABLE tracts ADD COLUMN IF NOT EXISTS member_count integer DEFAULT 0;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS type text;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS author text;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS rating decimal(3,2);
ALTER TABLE resources ADD COLUMN IF NOT EXISTS bookmarked boolean DEFAULT false;

-- Add mock data for tracts
INSERT INTO tracts (id, name, description, created_at, updated_at)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Urban Preppers', 'Preparing for emergencies in urban environments', NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222222', 'Rural Homesteaders', 'Self-sufficiency and sustainable living', NOW(), NOW()),
  ('33333333-3333-3333-3333-333333333333', 'Mountain Survival', 'High-altitude survival techniques', NOW(), NOW()),
  ('44444444-4444-4444-4444-444444444444', 'Coastal Defense', 'Coastal area emergency preparedness', NOW(), NOW());

-- Add tags for each tract
UPDATE tracts 
SET tags = ARRAY['urban', 'emergency', 'community']
WHERE id = '11111111-1111-1111-1111-111111111111';

UPDATE tracts 
SET tags = ARRAY['rural', 'farming', 'sustainability']
WHERE id = '22222222-2222-2222-2222-222222222222';

UPDATE tracts 
SET tags = ARRAY['mountain', 'wilderness', 'survival']
WHERE id = '33333333-3333-3333-3333-333333333333';

UPDATE tracts 
SET tags = ARRAY['coastal', 'marine', 'weather']
WHERE id = '44444444-4444-4444-4444-444444444444';

-- Update member count for each tract
UPDATE tracts SET member_count = 150 WHERE id = '11111111-1111-1111-1111-111111111111';
UPDATE tracts SET member_count = 75 WHERE id = '22222222-2222-2222-2222-222222222222';
UPDATE tracts SET member_count = 45 WHERE id = '33333333-3333-3333-3333-333333333333';
UPDATE tracts SET member_count = 90 WHERE id = '44444444-4444-4444-4444-444444444444';

-- Add mock data for inventory
INSERT INTO inventory (id, name, category, quantity, unit, expiry_date, location, created_at, updated_at)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Emergency Water', 'Water', 100, 'gallons', '2025-12-31', 'Storage Room A', NOW(), NOW()),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Canned Food', 'Food', 200, 'cans', '2026-06-30', 'Pantry B', NOW(), NOW()),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'First Aid Kit', 'Medical', 10, 'kits', '2027-01-15', 'Medical Cabinet', NOW(), NOW()),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Solar Panels', 'Energy', 5, 'panels', NULL, 'Equipment Room', NOW(), NOW()),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Emergency Radio', 'Communication', 15, 'units', NULL, 'Command Center', NOW(), NOW());

-- Add mock data for resources
INSERT INTO resources (id, title, type, description, author, category, rating, bookmarked, created_at, updated_at)
VALUES
  ('55555555-5555-5555-5555-555555555555', 'Emergency Preparedness Guide', 'Document', 'Comprehensive guide for emergency situations', 'John Smith', 'Guides', 4.8, true, NOW(), NOW()),
  ('66666666-6666-6666-6666-666666666666', 'Water Purification Methods', 'Video', 'Tutorial on different water purification techniques', 'Sarah Johnson', 'Water', 4.5, false, NOW(), NOW()),
  ('77777777-7777-7777-7777-777777777777', 'Basic First Aid Manual', 'Document', 'Essential first aid procedures and techniques', 'Dr. Michael Brown', 'Medical', 4.9, true, NOW(), NOW()),
  ('88888888-8888-8888-8888-888888888888', 'Food Storage Basics', 'Article', 'Tips for long-term food storage', 'Emily Wilson', 'Food', 4.2, false, NOW(), NOW());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tracts_tags ON tracts USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_inventory_category ON inventory (category);
CREATE INDEX IF NOT EXISTS idx_resources_type ON resources (type);
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources (category);
CREATE INDEX IF NOT EXISTS idx_resources_rating ON resources (rating);

-- Add RLS policies for the new columns
ALTER TABLE resources ENABLE ROW LEVEL SECURITY; 