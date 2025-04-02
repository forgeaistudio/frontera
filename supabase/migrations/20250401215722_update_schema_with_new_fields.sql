BEGIN;

-- Update inventory table
ALTER TABLE inventory
ADD COLUMN IF NOT EXISTS status TEXT;  -- For "Expiring Soon" status

-- Update tracts table
ALTER TABLE tracts
ADD COLUMN IF NOT EXISTS member_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS difficulty TEXT;  -- For "Beginner-Friendly", "Technical", etc.

-- Update resources table
ALTER TABLE resources
ADD COLUMN IF NOT EXISTS author TEXT,
ADD COLUMN IF NOT EXISTS type TEXT,  -- For "Guide", "Tutorial", "Checklist"
ADD COLUMN IF NOT EXISTS rating DECIMAL(2,1),
ADD COLUMN IF NOT EXISTS bookmarked BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS added_date TIMESTAMP WITH TIME ZONE DEFAULT NOW();

COMMIT;
