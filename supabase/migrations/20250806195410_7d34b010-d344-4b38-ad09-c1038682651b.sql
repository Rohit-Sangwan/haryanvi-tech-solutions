-- Critical Security Fix: Enable RLS on admin_users and products tables
-- This is a critical security vulnerability fix

-- Enable RLS on admin_users table (was disabled, critical security issue)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Enable RLS on products table (was disabled, critical security issue) 
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Fix existing RLS policies on admin_users to be more secure
DROP POLICY IF EXISTS "Allow all access" ON public.admin_users;
DROP POLICY IF EXISTS "Service role and admins can manage admin users" ON public.admin_users;

-- Create secure RLS policy for admin_users
CREATE POLICY "Admins can manage admin users"
ON public.admin_users
FOR ALL
TO authenticated
USING (is_admin_or_service_role())
WITH CHECK (is_admin_or_service_role());

-- Fix existing RLS policies on products to be more secure
DROP POLICY IF EXISTS "Products are viewable by everyone" ON public.products;
DROP POLICY IF EXISTS "Public can view products" ON public.products;
DROP POLICY IF EXISTS "Service role and admins can manage products" ON public.products;

-- Create secure RLS policies for products
CREATE POLICY "Anyone can view active products"
ON public.products
FOR SELECT
USING (status = 'active');

CREATE POLICY "Admins can manage all products"
ON public.products
FOR ALL
TO authenticated
USING (is_admin_or_service_role())
WITH CHECK (is_admin_or_service_role());

-- Update the admin password to a properly hashed version
-- The secure-admin-auth function will upgrade this to bcrypt on first login
UPDATE public.admin_users 
SET password_hash = 'admin123'
WHERE email = 'admin@haryanvideveloper.com';

-- Add missing search_path to security definer functions for better security
ALTER FUNCTION public.is_admin_user() SET search_path = 'public';
ALTER FUNCTION public.generate_download_token(text, uuid) SET search_path = 'public';
ALTER FUNCTION public.verify_admin_password(text, text) SET search_path = 'public';
ALTER FUNCTION public.is_admin_or_service_role() SET search_path = 'public';