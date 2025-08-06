import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { create, verify } from "https://deno.land/x/djwt@v2.8/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const JWT_SECRET = Deno.env.get('JWT_SECRET') || 'your-super-secret-jwt-key-change-this-in-production';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Fetch admin user from database using service role to bypass RLS
    const { data: adminUser, error: fetchError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    console.log('Admin user lookup:', { email, found: !!adminUser, error: fetchError });

    if (fetchError || !adminUser) {
      console.log('Admin user not found or error:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Verify password
    let passwordValid = false;
    
    try {
      console.log('Verifying password for user:', adminUser.email);
      console.log('Password hash starts with $2b$:', adminUser.password_hash?.startsWith('$2b$'));
      
      // Check if user has bcrypt hashed password
      if (adminUser.password_hash && adminUser.password_hash.startsWith('$2b$')) {
        // Use bcrypt for secure passwords
        passwordValid = await bcrypt.compare(password, adminUser.password_hash);
        console.log('Password verification with bcrypt:', passwordValid);
      } else {
        // Temporary compatibility with plaintext passwords
        passwordValid = password === adminUser.password_hash;
        console.log('Password verification with plaintext:', passwordValid);
        console.log('Expected:', adminUser.password_hash, 'Received:', password);
        
        // If login successful with plaintext password, upgrade to hashed password
        if (passwordValid) {
          console.log('Upgrading password to bcrypt hash');
          const hashedPassword = await bcrypt.hash(password, 12);
          
          await supabase
            .from('admin_users')
            .update({ 
              password_hash: hashedPassword,
              password_iterations: 12,
              updated_at: new Date().toISOString()
            })
            .eq('id', adminUser.id);
          
          console.log('Password upgraded to bcrypt hash successfully');
        }
      }
    } catch (error) {
      console.error('Password verification error:', error);
      passwordValid = false;
    }

    if (!passwordValid) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Generate secure JWT
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(JWT_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign", "verify"]
    );

    const payload = {
      email: adminUser.email,
      role: 'admin',
      adminId: adminUser.id,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    };

    const token = await create({ alg: "HS256", typ: "JWT" }, payload, key);

    // Update last login
    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', adminUser.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        token,
        user: { 
          email: adminUser.email, 
          role: 'admin',
          name: adminUser.name
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Admin auth error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});