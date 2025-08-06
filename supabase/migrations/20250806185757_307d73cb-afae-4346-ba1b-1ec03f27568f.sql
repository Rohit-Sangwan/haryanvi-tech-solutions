-- First, let's create a simple admin password (we'll hash it in the edge function)
-- This is temporary - the edge function will hash it properly on first login
UPDATE public.admin_users 
SET 
  password_hash = 'admin123',
  password_salt = NULL,
  password_iterations = NULL,
  updated_at = now()
WHERE email = 'admin@haryanvideveloper.com';

-- Fix database function security warnings
-- Update functions to have proper search_path security
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.admin_users 
    WHERE email = ((current_setting('request.jwt.claims', true))::json ->> 'email')
    AND id IS NOT NULL
  );
$$;

CREATE OR REPLACE FUNCTION public.generate_download_token(
  p_user_email TEXT,
  p_product_id UUID
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  token_value TEXT;
BEGIN
  -- Generate cryptographically secure token
  token_value := encode(gen_random_bytes(32), 'base64');
  
  -- Insert token record
  INSERT INTO public.download_tokens (user_email, product_id, token)
  VALUES (p_user_email, p_product_id, token_value);
  
  RETURN token_value;
END;
$$;

CREATE OR REPLACE FUNCTION public.verify_admin_password(
  p_email TEXT,
  p_password TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  stored_hash TEXT;
BEGIN
  SELECT password_hash INTO stored_hash 
  FROM public.admin_users 
  WHERE email = p_email;
  
  -- For now, return false for security (edge function will handle hashing)
  -- This function will be updated when we implement proper bcrypt hashing
  RETURN FALSE;
END;
$$;