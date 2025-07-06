import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$299",
      period: "per project",
      description: "Perfect for small businesses and startups",
      features: [
        "Basic API Integration",
        "Simple Dashboard Setup",
        "Email Support",
        "30-day Support Period",
        "Basic Documentation"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$799",
      period: "per project",
      description: "Most popular for growing businesses",
      features: [
        "Custom API Development",
        "Advanced Dashboard with Analytics",
        "Priority Support",
        "90-day Support Period",
        "Complete Documentation",
        "Source Code Included",
        "Basic Training Session"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$1,999",
      period: "per project",
      description: "For large-scale implementations",
      features: [
        "Full-Stack Development",
        "Multi-platform Integration",
        "24/7 Priority Support",
        "1-year Support Period",
        "Comprehensive Documentation",
        "Full Source Code & Rights",
        "Dedicated Training Sessions",
        "Ongoing Maintenance Options"
      ],
      popular: false
    }
  ];

  const additionalServices = [
    { name: "Additional API Endpoint", price: "$50" },
    { name: "Custom Report Design", price: "$150" },
    { name: "Extended Support (per month)", price: "$99" },
    { name: "Training Session (per hour)", price: "$75" },
    { name: "Maintenance Package (monthly)", price: "$199" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Pricing Plans</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your business needs. All plans include our commitment to quality and security.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary ring-2 ring-primary/20' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
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
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">Additional Services</h2>
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Add-On Services</CardTitle>
                <CardDescription>Enhance your project with these additional services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {additionalServices.map((service, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                      <span className="text-foreground">{service.name}</span>
                      <span className="text-primary font-semibold">{service.price}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center bg-muted/30 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Need a Custom Solution?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Every business is unique. Contact us for a personalized quote based on your specific requirements.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg">Request Custom Quote</Button>
            <Button variant="outline" size="lg">Schedule Consultation</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;