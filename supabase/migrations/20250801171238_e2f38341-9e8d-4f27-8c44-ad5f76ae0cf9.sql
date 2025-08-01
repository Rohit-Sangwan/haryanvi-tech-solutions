-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER,
  rating DECIMAL(2,1) DEFAULT 0.0,
  downloads INTEGER DEFAULT 0,
  technologies TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  product_id UUID REFERENCES public.products(id),
  amount INTEGER NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_id TEXT,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  customer_email TEXT,
  customer_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin_users table for admin authentication
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for products (public read, admin write)
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

CREATE POLICY "Admin can manage products" 
ON public.products 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
));

-- Create policies for orders (admin only)
CREATE POLICY "Admin can view all orders" 
ON public.orders 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
));

CREATE POLICY "Orders can be created by anyone" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

-- Create policies for admin_users (admin only)
CREATE POLICY "Admin can view admin users" 
ON public.admin_users 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for products and orders
ALTER TABLE public.products REPLICA IDENTITY FULL;
ALTER TABLE public.orders REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;

-- Insert sample admin user (password: admin123)
INSERT INTO public.admin_users (email, password_hash, name) VALUES 
('admin@haryanvideveloper.com', '$2b$10$K8BbXXRGQ5Y1J8J8J8J8JeF8F8F8F8F8F8F8F8F8F8F8F8F8F8F8F8', 'Admin User');

-- Insert sample products
INSERT INTO public.products (title, description, category, price, original_price, rating, downloads, technologies, features) VALUES 
('React E-commerce Dashboard', 'Complete admin dashboard with analytics, user management, and product catalog', 'react-apps', 2999, 4999, 4.8, 245, ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Chart.js'], ARRAY['Admin Dashboard', 'User Management', 'Analytics', 'Responsive Design']),
('Node.js REST API Boilerplate', 'Production-ready Node.js API with authentication, validation, and documentation', 'backend', 1999, NULL, 4.9, 189, ARRAY['Node.js', 'Express', 'MongoDB', 'JWT'], ARRAY['JWT Authentication', 'API Documentation', 'Error Handling', 'Rate Limiting']),
('Vue.js SPA Template', 'Modern single page application template with routing and state management', 'vue-apps', 1599, 2499, 4.7, 156, ARRAY['Vue.js', 'Vuex', 'Vue Router', 'Tailwind'], ARRAY['SPA Architecture', 'State Management', 'Routing', 'Mobile Responsive']);