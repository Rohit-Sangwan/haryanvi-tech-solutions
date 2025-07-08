import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Shield, Zap, Clock } from "lucide-react";

const Pricing = () => {
  const navigate = useNavigate();
  
  const pricingPlans = [
    {
      name: "Starter",
      price: "₹4,999",
      period: "/project",
      description: "Perfect for small businesses and startups",
      features: [
        "Custom API Development",
        "Basic Dashboard",
        "Email Support",
        "1 Month Free Support",
        "Basic Documentation",
        "Source Code Included"
      ],
      popular: false,
      cta: "Get Started",
      originalPrice: 4999
    },
    {
      name: "Professional", 
      price: "₹9,999",
      period: "/project",
      description: "Ideal for growing businesses with advanced needs",
      features: [
        "Advanced API Development",
        "Interactive Dashboard",
        "Priority Support",
        "3 Months Free Support",
        "Complete Documentation",
        "Source Code + Deployment",
        "Database Integration",
        "Third-party Integrations"
      ],
      popular: true,
      cta: "Choose Professional",
      originalPrice: 9999
    },
    {
      name: "Enterprise",
      price: "₹19,999",
      period: "/project",
      description: "Comprehensive solution for large organizations",
      features: [
        "Full-Stack Development",
        "Advanced Analytics Dashboard",
        "24/7 Premium Support",
        "6 Months Free Support",
        "Technical Documentation",
        "Complete Deployment Setup",
        "Custom Integrations",
        "Security Implementation",
        "Performance Optimization",
        "Training Sessions"
      ],
      popular: false,
      cta: "Contact Sales",
      originalPrice: 19999
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Pricing Plans</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your business needs. All plans include our commitment to quality and security.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex justify-center items-center gap-8 mb-8 flex-wrap">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Zap className="w-5 h-5 text-blue-600" />
              <span className="text-sm">Instant Activation</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-5 h-5 text-purple-600" />
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => navigate('/checkout', { 
                    state: { 
                      product: { 
                        name: plan.name, 
                        price: plan.originalPrice, 
                        features: plan.features 
                      } 
                    } 
                  })}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>


        <div className="text-center bg-muted/30 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Need a Custom Solution?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Every business is unique. Contact us for a personalized quote based on your specific requirements.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" onClick={() => navigate('/contact')}>
              Request Custom Quote
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/contact')}>
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;