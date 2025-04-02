-- Add new columns to users table
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT,
ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;

-- Update the users table to split existing full_name into first_name and last_name
UPDATE public.users
SET 
  first_name = SPLIT_PART(full_name, ' ', 1),
  last_name = SUBSTRING(full_name FROM POSITION(' ' IN full_name) + 1),
  username = LOWER(REGEXP_REPLACE(email, '@.*$', ''))
WHERE full_name IS NOT NULL;

-- Add a trigger to ensure username uniqueness and auto-generation
CREATE OR REPLACE FUNCTION public.ensure_username()
RETURNS trigger AS $$
BEGIN
  IF NEW.username IS NULL THEN
    NEW.username := LOWER(REGEXP_REPLACE(NEW.email, '@.*$', ''));
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER ensure_username_trigger
  BEFORE INSERT OR UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.ensure_username(); 