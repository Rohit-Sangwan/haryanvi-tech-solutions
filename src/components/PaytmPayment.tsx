import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PaytmPaymentProps {
  amount: string;
  planName: string;
  onPaymentSuccess?: () => void;
  onPaymentFailure?: () => void;
}

const PaytmPayment = ({ amount, planName, onPaymentSuccess, onPaymentFailure }: PaytmPaymentProps) => {
  const handlePaytmPayment = () => {
    // Paytm Payment Gateway Integration Placeholder
    // This will be implemented after Paytm merchant approval
    
    // For now, we'll show a placeholder message
    alert(
      `Paytm Payment Gateway Integration Pending\n\n` +
      `Plan: ${planName}\n` +
      `Amount: ${amount}\n\n` +
      `This feature will be activated once we receive Paytm merchant approval. ` +
      `Please contact us directly for payment processing.`
    );
    
    // Uncomment this when Paytm integration is ready:
    /*
    const paytmParams = {
      MID: 'YOUR_MERCHANT_ID', // Will be provided by Paytm
      WEBSITE: 'WEBSTAGING', // WEBSTAGING for testing, DEFAULT for production
      CHANNEL_ID: 'WEB',
      INDUSTRY_TYPE_ID: 'Retail',
      ORDER_ID: `ORDER_${Date.now()}`,
      CUST_ID: `CUST_${Date.now()}`,
      TXN_AMOUNT: amount.replace('₹', '').replace(',', ''),
      CALLBACK_URL: `${window.location.origin}/payment/callback`,
    };
    
    // Initialize Paytm payment
    // This will require Paytm SDK integration
    */
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          Secure Payment with Paytm
        </CardTitle>
        <CardDescription>
          Pay securely using Paytm's trusted payment gateway
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
            <span className="font-medium">Plan: {planName}</span>
            <span className="text-lg font-bold text-primary">{amount}</span>
          </div>
          
          <div className="text-sm text-muted-foreground space-y-1">
            <p>✓ 256-bit SSL encryption</p>
            <p>✓ PCI DSS compliant</p>
            <p>✓ Multiple payment options</p>
            <p>✓ Instant confirmation</p>
          </div>
          
          <Button 
            onClick={handlePaytmPayment}
            className="w-full"
            size="lg"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm6 16H8a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h2v1a1 1 0 0 0 2 0V9h2v12a1 1 0 0 1-1 1z"/>
            </svg>
            Proceed to Paytm Payment
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            * Paytm integration pending merchant approval. 
            Contact us directly for immediate payment processing.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaytmPayment;