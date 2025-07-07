import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Database, 
  Shield, 
  Zap, 
  Users, 
  BarChart3, 
  Cloud, 
  Smartphone,
  Globe,
  Headphones,
  BookOpen,
  Wrench
} from "lucide-react";

const AdditionalServices = () => {
  const services = [
    {
      category: "Development Services",
      icon: Code,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      items: [
        { name: "Additional API Endpoint", price: "₹199", description: "Custom API endpoint development" },
        { name: "Database Integration", price: "₹399", description: "Connect to external databases" },
        { name: "Third-party Integration", price: "₹299", description: "Integrate with external services" },
        { name: "Mobile App Development", price: "₹2,999", description: "React Native mobile application" },
      ]
    },
    {
      category: "Design & Analytics",
      icon: BarChart3,
      color: "text-green-600",
      bgColor: "bg-green-50",
      items: [
        { name: "Custom Report Design", price: "₹399", description: "Tailored business reports" },
        { name: "Dashboard Analytics", price: "₹599", description: "Advanced analytics dashboard" },
        { name: "UI/UX Enhancement", price: "₹799", description: "Professional design improvement" },
        { name: "Data Visualization", price: "₹499", description: "Interactive charts and graphs" },
      ]
    },
    {
      category: "Support & Training",
      icon: Headphones,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      items: [
        { name: "Extended Support (monthly)", price: "₹199", description: "Priority support for 30 days" },
        { name: "Training Session (per hour)", price: "₹149", description: "One-on-one training sessions" },
        { name: "Documentation Package", price: "₹299", description: "Comprehensive documentation" },
        { name: "Video Tutorials", price: "₹399", description: "Custom video training content" },
      ]
    },
    {
      category: "Infrastructure & Security",
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-50",
      items: [
        { name: "Cloud Deployment", price: "₹499", description: "Deploy to AWS/Azure/GCP" },
        { name: "Security Audit", price: "₹799", description: "Comprehensive security review" },
        { name: "Performance Optimization", price: "₹599", description: "Speed and efficiency improvements" },
        { name: "Backup Solutions", price: "₹299", description: "Automated backup systems" },
      ]
    },
    {
      category: "Maintenance & Updates",
      icon: Wrench,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      items: [
        { name: "Monthly Maintenance", price: "₹399", description: "Regular updates and bug fixes" },
        { name: "Feature Updates", price: "₹599", description: "New feature development" },
        { name: "Emergency Support", price: "₹999", description: "24/7 emergency assistance" },
        { name: "Version Migration", price: "₹799", description: "Upgrade to latest technologies" },
      ]
    }
  ];

  const packageDeals = [
    {
      name: "Startup Bundle",
      originalPrice: "₹2,999",
      discountPrice: "₹1,999",
      discount: "33% OFF",
      description: "Perfect for new businesses getting started",
      includes: [
        "Basic API Development",
        "Simple Dashboard",
        "1 Month Support",
        "Basic Documentation",
        "Email Support"
      ],
      popular: false
    },
    {
      name: "Business Bundle",
      originalPrice: "₹5,999",
      discountPrice: "₹3,999",
      discount: "33% OFF",
      description: "Complete solution for growing businesses",
      includes: [
        "Advanced API Development",
        "Analytics Dashboard",
        "3 Months Support",
        "Complete Documentation",
        "Priority Support",
        "Training Sessions",
        "Mobile App (Basic)"
      ],
      popular: true
    },
    {
      name: "Enterprise Bundle",
      originalPrice: "₹9,999",
      discountPrice: "₹6,999",
      discount: "30% OFF",
      description: "Full-featured solution for large organizations",
      includes: [
        "Full-Stack Development",
        "Advanced Analytics",
        "6 Months Support",
        "Comprehensive Documentation",
        "24/7 Priority Support",
        "Unlimited Training",
        "Mobile App (Advanced)",
        "Cloud Deployment",
        "Security Audit"
      ],
      popular: false
    }
  ];

  return (
    <div className="space-y-12">
      {/* Individual Services */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Additional Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enhance your project with our comprehensive range of additional services. 
            Each service is designed to add value and extend functionality.
          </p>
        </div>

        <div className="space-y-8">
          {services.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 ${category.bgColor} rounded-lg flex items-center justify-center`}>
                  <category.icon className={`w-5 h-5 ${category.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{category.category}</h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.items.map((service, serviceIndex) => (
                  <Card key={serviceIndex} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-sm font-medium">{service.name}</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {service.price}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-xs mb-3">
                        {service.description}
                      </CardDescription>
                      <Button size="sm" variant="outline" className="w-full text-xs">
                        Add to Quote
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Package Deals */}
      <div className="bg-muted/20 rounded-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Package Deals</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Save money with our bundled packages. Get more value with specially curated service combinations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {packageDeals.map((pkg, index) => (
            <Card key={index} className={`relative ${pkg.popular ? 'border-primary ring-2 ring-primary/20' : ''}`}>
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-2">
                  <Badge variant="destructive" className="text-xs">
                    {pkg.discount}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <CardDescription className="text-sm">{pkg.description}</CardDescription>
                
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl font-bold text-primary">{pkg.discountPrice}</span>
                    <span className="text-sm text-muted-foreground line-through">{pkg.originalPrice}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {pkg.includes.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full" 
                  variant={pkg.popular ? "default" : "outline"}
                >
                  Choose {pkg.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Custom Solutions CTA */}
      <div className="text-center bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-8">
        <h3 className="text-2xl font-semibold mb-4">Need Something Custom?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Don't see what you're looking for? We create custom solutions tailored to your specific business needs. 
          Contact us to discuss your requirements.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button size="lg">
            Request Custom Quote
          </Button>
          <Button variant="outline" size="lg">
            Schedule Consultation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalServices;