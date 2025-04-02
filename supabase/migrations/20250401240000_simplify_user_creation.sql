-- Drop all existing triggers and functions
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.handle_user_update();

-- Create a simpler function for handling new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Log the incoming data for debugging
  RAISE NOTICE 'Creating new user with data: id=%, email=%, metadata=%', NEW.id, NEW.email, NEW.raw_user_meta_data;

  -- Insert into public.users with minimal required fields
  INSERT INTO public.users (
    id,
    email,
    full_name,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.created_at,
    NEW.updated_at
  );

  -- Log successful insertion
  RAISE NOTICE 'Successfully created user in public.users';
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Log any errors that occur
  RAISE NOTICE 'Error creating user: %, SQLSTATE: %', SQLERRM, SQLSTATE;
  RETURN NEW;
END;
$$;

-- Create a simpler function for handling user updates
CREATE OR REPLACE FUNCTION public.handle_user_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update public.users with minimal required fields
  UPDATE public.users
  SET
    email = NEW.email,
    full_name = COALESCE(NEW.raw_user_meta_data->>'full_name', full_name),
    updated_at = NEW.updated_at
  WHERE id = NEW.id;

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'Error updating user: %', SQLERRM;
  RETURN NEW;
END;
$$;

-- Create trigger for user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create trigger for user updates
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_user_update();

-- Verify triggers exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_trigger 
    WHERE tgname = 'on_auth_user_created'
  ) THEN
    RAISE EXCEPTION 'Trigger on_auth_user_created does not exist!';
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_trigger 
    WHERE tgname = 'on_auth_user_updated'
  ) THEN
    RAISE EXCEPTION 'Trigger on_auth_user_updated does not exist!';
  END IF;
END;
$$; 