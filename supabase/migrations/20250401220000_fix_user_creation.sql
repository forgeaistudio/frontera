-- Drop existing triggers and functions
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.handle_user_update();

-- Create new function for handling user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  _full_name text;
  _first_name text;
  _last_name text;
BEGIN
  -- Get full name from metadata or email
  _full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1));
  
  -- Split full name into first and last name
  _first_name := split_part(_full_name, ' ', 1);
  _last_name := CASE 
    WHEN position(' ' in _full_name) > 0 
    THEN substring(_full_name from position(' ' in _full_name) + 1)
    ELSE NULL 
  END;

  INSERT INTO public.users (
    id,
    email,
    full_name,
    first_name,
    last_name,
    username,
    avatar_url,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    NEW.email,
    _full_name,
    _first_name,
    _last_name,
    LOWER(REGEXP_REPLACE(NEW.email, '@.*$', '')),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NULL),
    NEW.created_at,
    NEW.updated_at
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'Error in handle_new_user: %', SQLERRM;
  RETURN NEW;
END;
$$;

-- Create new function for handling user updates
CREATE OR REPLACE FUNCTION public.handle_user_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  _full_name text;
  _first_name text;
  _last_name text;
BEGIN
  -- Get full name from metadata or keep existing
  _full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1));
  
  -- Split full name into first and last name
  _first_name := split_part(_full_name, ' ', 1);
  _last_name := CASE 
    WHEN position(' ' in _full_name) > 0 
    THEN substring(_full_name from position(' ' in _full_name) + 1)
    ELSE NULL 
  END;

  UPDATE public.users
  SET
    email = NEW.email,
    full_name = _full_name,
    first_name = _first_name,
    last_name = _last_name,
    username = COALESCE(username, LOWER(REGEXP_REPLACE(NEW.email, '@.*$', ''))),
    avatar_url = COALESCE(NEW.raw_user_meta_data->>'avatar_url', avatar_url),
    updated_at = NOW()
  WHERE id = NEW.id;
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'Error in handle_user_update: %', SQLERRM;
  RETURN NEW;
END;
$$;

-- Create new trigger for user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create new trigger for user updates
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_user_update();

-- Ensure auth schema exists
CREATE SCHEMA IF NOT EXISTS auth;

-- Update auth configuration
UPDATE auth.config SET
  enable_signup = true,
  enable_email_signup = true,
  enable_email_autoconfirm = true,
  mailer_autoconfirm = true,
  smtp_max_frequency = 0;

-- Ensure RLS is enabled on auth.users
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated; 