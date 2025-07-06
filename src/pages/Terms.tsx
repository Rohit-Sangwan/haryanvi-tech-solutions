import Navbar from "@/components/Navbar";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Use</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-muted-foreground mb-6">
              <strong>Effective Date:</strong> January 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using the services provided by Haryanvi Developer, you accept and agree 
                to be bound by the terms and provision of this agreement. If you do not agree to abide 
                by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Use License</h2>
              <p className="text-muted-foreground mb-4">
                Permission is granted to temporarily use our services for personal, non-commercial 
                transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Use the services for any illegal or unauthorized purpose</li>
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on our platform</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Prohibited Uses</h2>
              <p className="text-muted-foreground mb-4">You may not use our services:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Service Availability</h2>
              <p className="text-muted-foreground mb-4">
                We strive to provide reliable services, but we do not guarantee that our services will be 
                available at all times. Services may be temporarily unavailable due to maintenance, 
                updates, or circumstances beyond our control.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Payment and Refund Policy</h2>
              <p className="text-muted-foreground mb-4">
                <strong>Payment Terms:</strong>
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>All payments are processed securely through authorized payment gateways</li>
                <li>Prices are subject to change without notice</li>
                <li>Payment is due at the time of service or as specified in the service agreement</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                <strong>Refund Policy:</strong>
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Refunds are considered on a case-by-case basis</li>
                <li>Service-related refunds must be requested within 30 days of purchase</li>
                <li>Custom development projects are non-refundable once work has commenced</li>
                <li>Refund requests should be submitted to support@haryanvideveloper.tech</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Tool Usage Rules</h2>
              <p className="text-muted-foreground mb-4">When using our tools and services:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Use tools only for their intended purpose</li>
                <li>Do not attempt to circumvent security measures</li>
                <li>Report any bugs or security vulnerabilities immediately</li>
                <li>Respect rate limits and usage quotas</li>
                <li>Maintain the confidentiality of your access credentials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Disclaimer</h2>
              <p className="text-muted-foreground mb-4">
                The materials on Haryanvi Developer's website are provided on an 'as is' basis. 
                Haryanvi Developer makes no warranties, expressed or implied, and hereby disclaims 
                and negates all other warranties including without limitation, implied warranties or 
                conditions of merchantability, fitness for a particular purpose, or non-infringement 
                of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Limitations</h2>
              <p className="text-muted-foreground mb-4">
                In no event shall Haryanvi Developer or its suppliers be liable for any damages 
                (including, without limitation, damages for loss of data or profit, or due to business 
                interruption) arising out of the use or inability to use our services, even if Haryanvi 
                Developer or a Haryanvi Developer authorized representative has been notified orally or 
                in writing of the possibility of such damage.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Use, please contact us at:
              </p>
              <p className="text-muted-foreground">
                Email: legal@haryanvideveloper.tech<br />
                Address: [Your Business Address]
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Changes to Terms</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to revise these terms of service at any time without notice. 
                By using this website, you are agreeing to be bound by the then current version of 
                these terms of service.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;