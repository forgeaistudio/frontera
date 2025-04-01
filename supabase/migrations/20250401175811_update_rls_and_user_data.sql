-- Add user_id column to all tables if not exists
ALTER TABLE tracts ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id);
ALTER TABLE inventory ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id);
ALTER TABLE resources ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id);

-- Enable RLS on all tables
ALTER TABLE tracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own tracts" ON tracts;
DROP POLICY IF EXISTS "Users can insert their own tracts" ON tracts;
DROP POLICY IF EXISTS "Users can update their own tracts" ON tracts;
DROP POLICY IF EXISTS "Users can delete their own tracts" ON tracts;

DROP POLICY IF EXISTS "Users can view their own inventory" ON inventory;
DROP POLICY IF EXISTS "Users can insert their own inventory" ON inventory;
DROP POLICY IF EXISTS "Users can update their own inventory" ON inventory;
DROP POLICY IF EXISTS "Users can delete their own inventory" ON inventory;

DROP POLICY IF EXISTS "Users can view their own resources" ON resources;
DROP POLICY IF EXISTS "Users can insert their own resources" ON resources;
DROP POLICY IF EXISTS "Users can update their own resources" ON resources;
DROP POLICY IF EXISTS "Users can delete their own resources" ON resources;

-- Create policies for tracts
CREATE POLICY "Users can view their own tracts"
ON tracts FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tracts"
ON tracts FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tracts"
ON tracts FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tracts"
ON tracts FOR DELETE
USING (auth.uid() = user_id);

-- Create policies for inventory
CREATE POLICY "Users can view their own inventory"
ON inventory FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own inventory"
ON inventory FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own inventory"
ON inventory FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own inventory"
ON inventory FOR DELETE
USING (auth.uid() = user_id);

-- Create policies for resources
CREATE POLICY "Users can view their own resources"
ON resources FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own resources"
ON resources FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own resources"
ON resources FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own resources"
ON resources FOR DELETE
USING (auth.uid() = user_id);

-- Function to get user ID from email
CREATE OR REPLACE FUNCTION get_user_id_from_email(user_email text)
RETURNS uuid AS $$
BEGIN
    RETURN (SELECT id FROM auth.users WHERE email = user_email LIMIT 1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Associate existing data with the user
DO $$ 
DECLARE
    target_user_id uuid;
BEGIN
    target_user_id := get_user_id_from_email('allanbcrawford@gmail.com');
    
    IF target_user_id IS NOT NULL THEN
        UPDATE tracts SET user_id = target_user_id WHERE user_id IS NULL;
        UPDATE inventory SET user_id = target_user_id WHERE user_id IS NULL;
        UPDATE resources SET user_id = target_user_id WHERE user_id IS NULL;
    END IF;
END $$; 