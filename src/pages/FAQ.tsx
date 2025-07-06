import Navbar from "@/components/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What services does Haryanvi Developer offer?",
      answer: "We specialize in secure software solutions including Developer APIs, Automation Dashboards, Utility Tools, and IT Consulting services. Our focus is on creating reliable, efficient, and user-friendly technology solutions for small businesses and developers."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on complexity and requirements. Simple API integrations typically take 1-2 weeks, while complex dashboard development can take 4-8 weeks. We provide detailed timelines during our initial consultation."
    },
    {
      question: "Do you provide ongoing support after project completion?",
      answer: "Yes, all our plans include different levels of post-delivery support. Starter plans include 30 days of support, Professional plans include 90 days, and Enterprise plans include 1 year of support. Extended support packages are also available."
    },
    {
      question: "What programming languages and technologies do you use?",
      answer: "We work with modern web technologies including React, Node.js, Python, PHP, and various database systems. We choose the best technology stack based on your specific requirements and existing infrastructure."
    },
    {
      question: "Can you integrate with existing systems?",
      answer: "Absolutely! We specialize in API integrations and can connect with most existing systems including CRMs, ERPs, payment gateways, and third-party services. We ensure seamless integration with your current workflow."
    },
    {
      question: "What is your refund policy?",
      answer: "We offer refunds within 30 days of service delivery if the work doesn't meet agreed specifications or if technical issues cannot be resolved. Custom projects where substantial work has been completed may not be eligible for full refunds. Please check our detailed Refund Policy page."
    },
    {
      question: "Do you sign NDAs for confidential projects?",
      answer: "Yes, we understand the importance of confidentiality in business projects. We're happy to sign Non-Disclosure Agreements (NDAs) before discussing your project details. Data security and client confidentiality are our top priorities."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including bank transfers, UPI, and major payment gateways. For international clients, we accept PayPal and wire transfers. Payment terms are typically 50% upfront and 50% upon completion."
    },
    {
      question: "Can you provide training for our team?",
      answer: "Yes, we offer training sessions as part of our Professional and Enterprise plans. Additional training sessions can be purchased separately. We provide comprehensive documentation and hands-on training to ensure your team can effectively use the delivered solutions."
    },
    {
      question: "Do you offer maintenance services?",
      answer: "Yes, we provide ongoing maintenance packages to keep your systems updated, secure, and running smoothly. Our maintenance services include regular updates, security patches, performance monitoring, and technical support."
    },
    {
      question: "How do you ensure data security?",
      answer: "We follow industry-standard security practices including encrypted data transmission, secure coding practices, regular security audits, and compliance with data protection regulations. All our solutions are built with security as a primary consideration."
    },
    {
      question: "Can you work with tight deadlines?",
      answer: "We understand that some projects have urgent timelines. For rush projects, we offer expedited development services with additional charges. Contact us to discuss your specific timeline requirements and we'll do our best to accommodate."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about our services, processes, and policies
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center bg-muted/30 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
                Contact Support
              </button>
              <button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-md transition-colors">
                Schedule Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;