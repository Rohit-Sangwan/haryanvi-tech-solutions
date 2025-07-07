import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              Get in touch with our team for support, inquiries, or project discussions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6" onSubmit={(e) => {
                    e.preventDefault();
                    // Form submission logic will be implemented here
                    alert('Thank you for your message! We will get back to you soon.');
                  }}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="What is this regarding?"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Describe your inquiry or project requirements..."
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Email</h4>
                    <p className="text-muted-foreground">info@haryanvideveloper.tech</p>
                    <p className="text-muted-foreground">support@haryanvideveloper.tech</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Phone</h4>
                    <p className="text-muted-foreground">+919991028855</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Business Hours</h4>
                    <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                    <p className="text-muted-foreground">Saturday: 10:00 AM - 4:00 PM IST</p>
                    <p className="text-muted-foreground">Sunday: Closed</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Custom Software Development</li>
                    <li>• API Development & Integration</li>
                    <li>• Automation Solutions</li>
                    <li>• IT Consulting Services</li>
                    <li>• Technical Support</li>
                    <li>• Project Management</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-muted-foreground">
                    <p><strong>General Inquiries:</strong> Within 24 hours</p>
                    <p><strong>Technical Support:</strong> Within 4-8 hours</p>
                    <p><strong>Project Consultations:</strong> Within 48 hours</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
