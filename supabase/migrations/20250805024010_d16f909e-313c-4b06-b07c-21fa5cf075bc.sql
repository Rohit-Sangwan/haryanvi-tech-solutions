-- Phase 1: Fix admin_users table security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check admin role safely
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.admin_users 
    WHERE email = ((current_setting('request.jwt.claims', true))::json ->> 'email')
    AND id IS NOT NULL
  );
$$;

-- Create admin-only policies for admin_users table
CREATE POLICY "Admins can view admin users" 
ON public.admin_users 
FOR SELECT 
USING (public.is_admin_user());

CREATE POLICY "Admins can update admin users" 
ON public.admin_users 
FOR UPDATE 
USING (public.is_admin_user());

CREATE POLICY "Admins can insert admin users" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (public.is_admin_user());

CREATE POLICY "Admins can delete admin users" 
ON public.admin_users 
FOR DELETE 
USING (public.is_admin_user());

-- Phase 2: Fix products table policies - remove overpermissive access
DROP POLICY IF EXISTS "Authenticated users can manage products" ON public.products;

-- Create proper admin-only CRUD policies for products
CREATE POLICY "Admins can manage products" 
ON public.products 
FOR ALL 
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- Phase 3: Fix orders table policies - add proper customer access
CREATE POLICY "Customers can view their own orders" 
ON public.orders 
FOR SELECT 
USING (customer_email = ((current_setting('request.jwt.claims', true))::json ->> 'email'));

-- Phase 4: Create secure download verification system
CREATE TABLE public.download_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  product_id UUID NOT NULL REFERENCES public.products(id),
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '1 hour'),
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.download_tokens ENABLE ROW LEVEL SECURITY;

-- Users can only access their own download tokens
CREATE POLICY "Users can view their own download tokens" 
ON public.download_tokens 
FOR SELECT 
USING (user_email = ((current_setting('request.jwt.claims', true))::json ->> 'email'));

-- Function to generate secure download tokens
CREATE OR REPLACE FUNCTION public.generate_download_token(
  p_user_email TEXT,
  p_product_id UUID
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
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

-- Phase 5: Add password hashing to admin_users
ALTER TABLE public.admin_users 
ADD COLUMN IF NOT EXISTS password_salt TEXT,
ADD COLUMN IF NOT EXISTS password_iterations INTEGER DEFAULT 10000;

-- Create function to verify admin passwords (will be used by edge function)
CREATE OR REPLACE FUNCTION public.verify_admin_password(
  p_email TEXT,
  p_password TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
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