import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { token, user_email } = await req.json();

    if (!token || !user_email) {
      return new Response(
        JSON.stringify({ error: 'Token and email are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify download token
    const { data: tokenData, error: tokenError } = await supabase
      .from('download_tokens')
      .select('*, products(*)')
      .eq('token', token)
      .eq('user_email', user_email)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (tokenError || !tokenData) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired download token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Mark token as used
    await supabase
      .from('download_tokens')
      .update({ used: true })
      .eq('id', tokenData.id);

    // Increment download count
    await supabase
      .from('user_purchases')
      .update({ 
        download_count: supabase.rpc('increment_download_count', { 
          purchase_id: tokenData.product_id 
        })
      })
      .eq('product_id', tokenData.product_id)
      .eq('user_email', user_email);

    // Generate signed URL for secure download
    const { data: signedUrl, error: urlError } = await supabase.storage
      .from('source-codes')
      .createSignedUrl(
        tokenData.products.download_url || `${tokenData.products.title}.zip`,
        60 * 60 // 1 hour expiry
      );

    if (urlError) {
      console.error('Error generating signed URL:', urlError);
      return new Response(
        JSON.stringify({ error: 'Failed to generate download link' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        download_url: signedUrl.signedUrl,
        product_name: tokenData.products.title,
        expires_in: 3600
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Secure download error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});