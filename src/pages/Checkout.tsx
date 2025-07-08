import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PaytmPayment from "@/components/PaytmPayment";
import RazorpayPayment from "@/components/RazorpayPayment";
import { useToast } from "@/components/ui/use-toast";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPayment, setSelectedPayment] = useState<"paytm" | "razorpay">("razorpay");
  
  // Get product details from navigation state
  const { product } = location.state || { 
    product: { 
      name: "Basic Plan", 
      price: 999, 
      features: ["API Development", "Basic Support"] 
    } 
  };

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: "",
    company: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setCustomerDetails(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentSuccess = () => {
    toast({
      title: "Order Confirmed!",
      description: "Thank you for your purchase. You will receive a confirmation email shortly.",
    });
    navigate("/");
  };

  const handlePaymentError = (error: any) => {
    console.error("Payment error:", error);
  };

  const isFormValid = customerDetails.name && customerDetails.email && customerDetails.phone;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Customer Details */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Customer Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={customerDetails.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerDetails.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerDetails.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input
                      id="company"
                      value={customerDetails.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      placeholder="Enter your company name"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="razorpay"
                        checked={selectedPayment === "razorpay"}
                        onChange={(e) => setSelectedPayment(e.target.value as "razorpay")}
                        className="text-primary"
                      />
                      <span>Razorpay (Credit/Debit Card, UPI, Net Banking)</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="paytm"
                        checked={selectedPayment === "paytm"}
                        onChange={(e) => setSelectedPayment(e.target.value as "paytm")}
                        className="text-primary"
                      />
                      <span>Paytm Wallet</span>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">{product.name}</span>
                    <span>₹{product.price}</span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="font-medium">Includes:</p>
                    {product.features.map((feature: string, index: number) => (
                      <p key={index}>• {feature}</p>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{product.price}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>GST (18%)</span>
                    <span>₹{Math.round(product.price * 0.18)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{Math.round(product.price * 1.18)}</span>
                  </div>
                  
                  <div className="space-y-3 mt-6">
                    {!isFormValid ? (
                      <Button disabled className="w-full">
                        Please fill all required fields
                      </Button>
                    ) : selectedPayment === "razorpay" ? (
                      <RazorpayPayment
                        amount={Math.round(product.price * 1.18)}
                        productName={product.name}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                      />
                    ) : (
                      <PaytmPayment
                        amount={Math.round(product.price * 1.18)}
                        productName={product.name}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                      />
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Secure payment powered by SSL encryption
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;