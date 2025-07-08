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
    // Demo payment - In production, this would integrate with Razorpay
    toast({
      title: "Payment Processing",
      description: `Processing payment of ₹${amount} for ${productName} via Razorpay...`,
    });

    // Simulate payment processing
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success rate for demo
      
      if (success) {
        toast({
          title: "Payment Successful!",
          description: `Payment of ₹${amount} completed successfully via Razorpay`,
        });
        onSuccess?.();
      } else {
        toast({
          title: "Payment Failed",
          description: "Payment failed. Please try again.",
          variant: "destructive",
        });
        onError?.("Payment failed");
      }
    }, 2000);
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