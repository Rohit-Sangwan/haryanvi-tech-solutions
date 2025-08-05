-- Update admin user with proper hashed password for "admin123"
-- This is a bcrypt hash of "admin123" with salt rounds 12
UPDATE public.admin_users 
SET 
  password_hash = '$2b$12$LQv3c1yqBwLFaT.1TLRqreAqOX/YZhGBJKJGgOp3G5qO6QUKqaXqG',
  password_salt = '$2b$12$LQv3c1yqBwLFaT.1TLRqre',
  password_iterations = 12,
  updated_at = now()
WHERE email = 'admin@haryanvideveloper.com';

-- If no admin user exists, create one
INSERT INTO public.admin_users (email, name, password_hash, password_salt, password_iterations, role)
SELECT 
  'admin@haryanvideveloper.com',
  'Admin User',
  '$2b$12$LQv3c1yqBwLFaT.1TLRqreAqOX/YZhGBJKJGgOp3G5qO6QUKqaXqG',
  '$2b$12$LQv3c1yqBwLFaT.1TLRqre',
  12,
  'admin'
WHERE NOT EXISTS (
  SELECT 1 FROM public.admin_users WHERE email = 'admin@haryanvideveloper.com'
);