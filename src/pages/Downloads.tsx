import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Download, Search, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Purchase {
  id: string;
  product_id: string;
  customer_email: string;
  amount: number;
  payment_status: string;
  created_at: string;
  razorpay_payment_id?: string;
  customer_name?: string;
  user_id?: string;
  razorpay_order_id?: string;
  payment_id?: string;
  updated_at: string;
  product?: {
    title: string;
    description: string;
    image_url?: string;
    category: string;
    technologies?: string[];
    download_url?: string;
  } | null;
}

const Downloads = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState<string | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const { toast } = useToast();

  const searchPurchases = async () => {
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      setSearchAttempted(true);
      
      // First get the orders
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_email', email.toLowerCase())
        .eq('payment_status', 'completed')
        .order('created_at', { ascending: false });

      if (orderError) throw orderError;
      
      if (orderData && orderData.length > 0) {
        // Get unique product IDs
        const productIds = [...new Set(orderData.map(order => order.product_id))];
        
        // Fetch products separately
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .in('id', productIds);

        if (productError) throw productError;
        
        // Combine orders with their products
        const combinedData = orderData.map(order => ({
          ...order,
          product: productData?.find(product => product.id === order.product_id) || null
        }));
        
        setPurchases(combinedData);
      } else {
        setPurchases([]);
      }
      
      if (!orderData || orderData.length === 0) {
        toast({
          title: "No Purchases Found",
          description: "No verified purchases found for this email address",
        });
      }
    } catch (error) {
      console.error('Error fetching purchases:', error);
      toast({
        title: "Error",
        description: "Failed to load your purchases",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (purchase: Purchase) => {
    if (!purchase.product_id) {
      toast({
        title: "Download Not Available",
        description: "Product information is missing",
        variant: "destructive",
      });
      return;
    }

    try {
      setDownloadLoading(purchase.id);
      
      // Generate secure download token
      const { data: tokenData, error: tokenError } = await supabase
        .rpc('generate_download_token', {
          p_user_email: email.toLowerCase(),
          p_product_id: purchase.product_id
        });

      if (tokenError) {
        throw new Error('Failed to generate download token');
      }

      // Get secure download URL
      const { data: downloadData, error: downloadError } = await supabase.functions
        .invoke('secure-download', {
          body: {
            token: tokenData,
            user_email: email.toLowerCase()
          }
        });

      if (downloadError || !downloadData.success) {
        throw new Error(downloadData?.error || 'Failed to get download link');
      }

      // Open download in new tab
      window.open(downloadData.download_url, '_blank');
      
      toast({
        title: "Download Started",
        description: `${purchase.product?.title} download has begun. Link expires in 1 hour.`,
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: error instanceof Error ? error.message : "Unable to download file",
        variant: "destructive",
      });
    } finally {
      setDownloadLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/10 to-purple-500/10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Your Downloads
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Access your purchased source code files. Enter your email to view your download history.
          </p>
          
          {/* Email Search */}
          <div className="flex gap-4 justify-center items-center max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchPurchases()}
                className="pl-10"
                type="email"
              />
            </div>
            <Button 
              onClick={searchPurchases}
              disabled={loading}
              className="px-6"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                'Search'
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Searching for your purchases...</span>
              </div>
            </div>
          ) : purchases.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">
                  {purchases.length} Purchase{purchases.length !== 1 ? 's' : ''} Found
                </h2>
                <Button variant="outline" size="sm" onClick={searchPurchases}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchases.map((purchase) => (
                  <Card key={purchase.id} className="h-full hover:shadow-lg transition-all duration-300">
                    <div className="relative">
                      <img
                        src={purchase.product?.image_url || "/placeholder.svg"}
                        alt={purchase.product?.title || "Source Code"}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      {purchase.payment_status === 'completed' && (
                        <Badge className="absolute top-2 right-2 bg-green-500">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Paid
                        </Badge>
                      )}
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2">
                        {purchase.product?.title || "Source Code"}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {purchase.product?.description || "Source code download"}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Technologies */}
                      {purchase.product?.technologies && (
                        <div className="flex flex-wrap gap-1">
                          {purchase.product.technologies.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {purchase.product.technologies.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{purchase.product.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Purchase Info */}
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Purchased: {new Date(purchase.created_at).toLocaleDateString()}</p>
                        <p>Amount: ₹{purchase.amount}</p>
                        <p>Order ID: {purchase.id}</p>
                        {purchase.razorpay_payment_id && (
                          <p>Payment ID: {purchase.razorpay_payment_id}</p>
                        )}
                      </div>

                      {/* Download Button */}
                      <Button
                        onClick={() => handleDownload(purchase)}
                        className="w-full"
                        disabled={downloadLoading === purchase.id}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {downloadLoading === purchase.id ? "Generating Link..." : "Download Source Code"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : searchAttempted ? (
            <div className="text-center py-16">
              <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Purchases Found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any verified purchases for this email address.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Make sure you entered the correct email address</p>
                <p>• Purchases may take a few minutes to appear after payment</p>
                <p>• Contact support if you believe this is an error</p>
              </div>
              <Button 
                onClick={() => navigate('/marketplace')}
                className="mt-6"
              >
                Browse Marketplace
              </Button>
            </div>
          ) : (
            <div className="text-center py-16">
              <Download className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Enter Your Email</h3>
              <p className="text-muted-foreground">
                Enter your email address above to view your purchased source codes
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Downloads;