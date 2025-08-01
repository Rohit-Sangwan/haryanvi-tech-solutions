import { useCart } from '@/components/CartContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CartDialog = () => {
  const { cart, removeFromCart, clearCart, getTotalPrice, getItemCount } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 1) {
      // Single item checkout
      navigate('/checkout', {
        state: {
          product: {
            name: cart[0].title,
            price: cart[0].price,
            features: cart[0].features
          }
        }
      });
    } else if (cart.length > 1) {
      // Multiple items checkout
      navigate('/checkout', {
        state: {
          product: {
            name: `Bundle of ${cart.length} items`,
            price: getTotalPrice(),
            features: cart.flatMap(item => item.features).slice(0, 5)
          }
        }
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="w-4 h-4" />
          {getItemCount() > 0 && (
            <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs">
              {getItemCount()}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart ({getItemCount()} items)
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {item.features.slice(0, 3).map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        <p className="font-bold text-primary">₹{item.price}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total: ₹{getTotalPrice()}</span>
                  <Button variant="outline" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Button onClick={handleCheckout} className="w-full">
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};