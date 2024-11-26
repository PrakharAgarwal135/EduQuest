import ContactDetails from "../components/core/ContactPage/ContactDetails";
import ContactForm from "../components/core/ContactPage/ContactForm";
import Footer from "../components/common/Footer";

export default function Contact() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto my-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row flex-grow">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </div>

      <Footer />
    </div>
  );
}
