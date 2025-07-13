import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">About Haryanvi Developer</h1>
            <p className="text-xl text-muted-foreground">
              A secure IT tools company dedicated to providing reliable software solutions
            </p>
          </div>

          <div className="grid md:grid-cols-1 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                <p className="mb-4">
                  Rohit Sangwan, Founder and CEO of Haryanvi Developer, is a secure IT tools company specializing in developing reliable, 
                  efficient, and user-friendly software solutions for businesses and individual developers. 
                  We are committed to delivering high-quality products that enhance productivity and 
                  streamline operations.
                </p>
                <p className="mb-4">
                  Our expertise lies in creating custom APIs, automation dashboards, utility tools, 
                  and comprehensive IT services that meet the evolving needs of the modern digital landscape. 
                  We prioritize security, performance, and user experience in every solution we deliver.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Our Values</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span><strong>Security First:</strong> All our solutions are built with robust security measures</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span><strong>Quality Assurance:</strong> Rigorous testing ensures reliable performance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span><strong>Customer Focus:</strong> Client satisfaction drives our development process</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span><strong>Innovation:</strong> Continuous improvement and modern technology adoption</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Why Choose Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Experienced development team</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Proven track record of successful projects</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Competitive pricing and transparent billing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Ongoing support and maintenance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Compliance with industry standards</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-6">
              Ready to discuss your next project? We'd love to hear from you.
            </p>
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
              Contact Us Today
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
