import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface RazorpayPaymentProps {
  amount: number;
  productName: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

const RazorpayPayment = ({ amount, productName, onSuccess, onError }: RazorpayPaymentProps) => {
  const { toast } = useToast();

  const handlePayment = () => {
    // Live Razorpay Integration
    const options = {
      key: "rzp_live_7cQdAYcNQ4176q", // Replace with your live Razorpay key
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      name: "Source Code Marketplace",
      description: productName,
      image: "/favicon.ico",
      order_id: "", // This should be generated from your backend
      handler: function (response: any) {
        // Payment successful
        toast({
          title: "Payment Successful!",
          description: `Payment of ₹${amount} completed successfully`,
        });
        onSuccess?.();
      },
      prefill: {
        name: "",
        email: "",
        contact: ""
      },
      theme: {
        color: "#3399cc"
      },
      modal: {
        ondismiss: function() {
          toast({
            title: "Payment Cancelled",
            description: "Payment was cancelled by user",
            variant: "destructive",
          });
          onError?.("Payment cancelled");
        }
      }
    };

    // Load Razorpay script if not already loaded
    if (!(window as any).Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      };
      script.onerror = () => {
        toast({
          title: "Error",
          description: "Failed to load payment gateway",
          variant: "destructive",
        });
        onError?.("Failed to load payment gateway");
      };
      document.body.appendChild(script);
    } else {
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    }
  };

  return (
    <Button 
      onClick={handlePayment}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
    >
      Pay with Razorpay - ₹{amount}
    </Button>
  );
};

export default RazorpayPayment;
