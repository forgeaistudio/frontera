-- Enable email/password authentication
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create auth schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS auth;

-- Create auth.config table if it doesn't exist
CREATE TABLE IF NOT EXISTS auth.config (
  id SERIAL PRIMARY KEY,
  enable_signup BOOLEAN DEFAULT true,
  enable_email_signup BOOLEAN DEFAULT true,
  enable_email_autoconfirm BOOLEAN DEFAULT true,
  mailer_autoconfirm BOOLEAN DEFAULT true,
  smtp_admin_email TEXT DEFAULT 'admin@example.com',
  smtp_host TEXT DEFAULT 'localhost',
  smtp_port TEXT DEFAULT '2500',
  smtp_user TEXT DEFAULT 'fake',
  smtp_pass TEXT DEFAULT 'fake',
  smtp_max_frequency INTEGER DEFAULT 0
);

-- Insert default config if not exists
INSERT INTO auth.config (
  enable_signup,
  enable_email_signup,
  enable_email_autoconfirm,
  mailer_autoconfirm,
  smtp_admin_email,
  smtp_host,
  smtp_port,
  smtp_user,
  smtp_pass,
  smtp_max_frequency
)
SELECT
  true,
  true,
  true,
  true,
  'admin@example.com',
  'localhost',
  '2500',
  'fake',
  'fake',
  0
WHERE NOT EXISTS (SELECT 1 FROM auth.config);

-- Enable email authentication
UPDATE auth.config SET
  enable_signup = true,
  enable_email_signup = true,
  enable_email_autoconfirm = true,
  mailer_autoconfirm = true,
  smtp_admin_email = 'admin@example.com',
  smtp_host = 'localhost',
  smtp_port = '2500',
  smtp_user = 'fake',
  smtp_pass = 'fake',
  smtp_max_frequency = 0;

-- Create functions for handling user creation and updates
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (
    id,
    email,
    full_name,
    avatar_url,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.created_at,
    NEW.updated_at
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_user_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  UPDATE public.users
  SET
    email = NEW.email,
    full_name = NEW.raw_user_meta_data->>'full_name',
    avatar_url = NEW.raw_user_meta_data->>'avatar_url',
    updated_at = NEW.updated_at
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create trigger for user updates
CREATE OR REPLACE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_user_update();
