import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      title: "Developer APIs",
      description: "Custom API development and integration services for seamless data exchange and application connectivity.",
      features: ["REST API Development", "GraphQL Implementation", "Third-party Integrations", "API Documentation"]
    },
    {
      title: "Automation Dashboards",
      description: "Interactive dashboards and reporting tools to streamline business processes and data visualization.",
      features: ["Real-time Analytics", "Custom Reporting", "Process Automation", "Data Visualization"]
    },
    {
      title: "Utility Tools",
      description: "Specialized software tools designed to enhance productivity and solve specific business challenges.",
      features: ["Data Processing Tools", "File Management Systems", "Security Utilities", "Performance Monitors"]
    },
    {
      title: "IT Consulting",
      description: "Professional IT consulting services to help businesses optimize their technology infrastructure.",
      features: ["System Architecture", "Technology Strategy", "Security Assessment", "Performance Optimization"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Secure software solutions, productivity tools, and IT services for small businesses and developers
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <CardTitle className="text-primary">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6">Contact us to discuss your project requirements</p>
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
            Request Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;