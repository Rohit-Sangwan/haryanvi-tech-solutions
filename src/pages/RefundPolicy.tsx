import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Refund Policy</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-muted-foreground mb-6">
              <strong>Effective Date:</strong> January 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Our Commitment</h2>
              <p className="text-muted-foreground mb-4">
                At Haryanvi Developer, we stand behind the quality of our services and want you to be 
                completely satisfied with your purchase. This refund policy outlines the terms and 
                conditions for requesting refunds on our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Refund Eligibility</h2>
              <p className="text-muted-foreground mb-4">You may be eligible for a refund under the following conditions:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Service does not meet the agreed specifications</li>
                <li>Technical issues that cannot be resolved within reasonable time</li>
                <li>Request is made within 30 days of service delivery</li>
                <li>No substantial work has been completed on custom projects</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Non-Refundable Services</h2>
              <p className="text-muted-foreground mb-4">The following services are non-refundable:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Custom development projects where work has commenced</li>
                <li>Consulting services already delivered</li>
                <li>API integration services that have been successfully implemented</li>
                <li>Training and support services already provided</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Refund Process</h2>
              <ol className="list-decimal list-inside text-muted-foreground space-y-2 mb-4">
                <li>Contact our support team at refunds@haryanvideveloper.tech</li>
                <li>Provide your order number and reason for refund request</li>
                <li>We will review your request within 5-7 business days</li>
                <li>If approved, refunds will be processed within 10-14 business days</li>
                <li>Refunds will be issued to the original payment method</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Partial Refunds</h2>
              <p className="text-muted-foreground mb-4">
                In some cases, we may offer partial refunds based on:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Percentage of work completed</li>
                <li>Resources already allocated to your project</li>
                <li>Third-party costs incurred on your behalf</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Cancellation Policy</h2>
              <p className="text-muted-foreground mb-4">
                You may cancel services before work begins for a full refund. Once development or 
                consulting work has started, cancellation fees may apply based on work completed.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                For refund requests or questions about this policy:
              </p>
              <p className="text-muted-foreground">
                Email: refunds@haryanvideveloper.tech<br />
                Support Email: support@haryanvideveloper.tech<br />
                Response Time: 24-48 hours
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RefundPolicy;