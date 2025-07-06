import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Welcome to <span className="text-primary">Haryanvi Developer</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Secure software solutions, productivity tools, and IT services for small businesses and developers. 
            We specialize in creating reliable, efficient, and user-friendly technology solutions.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/services">
              <Button size="lg" className="px-8">
                Our Services
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="px-8">
                Get Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Haryanvi Developer?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine technical expertise with business understanding to deliver solutions that drive results
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <CardTitle>Secure & Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  All our solutions are built with robust security measures and undergo rigorous testing to ensure reliable performance.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <CardTitle>Fast & Efficient</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  We deliver high-performance solutions that enhance productivity and streamline your business operations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 11-.176 19.499c-.07 0-.141-.01-.213-.01" />
                  </svg>
                </div>
                <CardTitle>24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Our dedicated support team is always ready to assist you with any questions or technical issues.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Core Services</h2>
            <p className="text-muted-foreground">Professional IT solutions tailored to your business needs</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-lg border hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-foreground mb-2">Developer APIs</h3>
              <p className="text-sm text-muted-foreground">Custom API development and integration services</p>
            </div>
            <div className="text-center p-6 rounded-lg border hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-foreground mb-2">Automation Dashboards</h3>
              <p className="text-sm text-muted-foreground">Interactive dashboards and reporting tools</p>
            </div>
            <div className="text-center p-6 rounded-lg border hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-foreground mb-2">Utility Tools</h3>
              <p className="text-sm text-muted-foreground">Specialized software tools for productivity</p>
            </div>
            <div className="text-center p-6 rounded-lg border hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-foreground mb-2">IT Consulting</h3>
              <p className="text-sm text-muted-foreground">Professional consulting for tech optimization</p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/services">
              <Button variant="outline">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your project requirements and how we can help you achieve your technology goals.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/contact">
              <Button size="lg">Contact Us Today</Button>
            </Link>
            <Button variant="outline" size="lg">Request Demo</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
