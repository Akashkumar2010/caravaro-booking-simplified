
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We offer a comprehensive range of car services including car wash, driver hire, and car rental services. Each service is delivered by professional and experienced staff."
    },
    {
      question: "How can I book a service?",
      answer: "You can book our services easily through our online platform. Simply select the service you need, choose your preferred date and time, and complete the booking process."
    },
    {
      question: "What are your operating hours?",
      answer: "We operate 24/7 to ensure we can meet your car service needs at any time. However, certain services might have specific operating hours."
    },
    {
      question: "Do you offer emergency services?",
      answer: "Yes, we provide emergency services for urgent situations. Please contact our customer support for immediate assistance."
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight heading-gradient sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Find answers to common questions about our services
          </p>
        </div>
        <div className="mt-12 mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
