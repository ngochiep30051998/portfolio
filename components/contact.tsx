"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import SubmitBtn from "./submit-btn";
import type { LandingConfig } from "@/lib/config/landing";
import { emailService } from "@/services/api/email.service";
import toast from "react-hot-toast";

interface ContactProps {
  config: LandingConfig['contact'];
}

export default function Contact({ config }: ContactProps) {
  const { ref } = useSectionInView("Contact");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{
        opacity: 0,
        y: 100,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.175,
      }}
    >
      <SectionHeading>Contact me</SectionHeading>

      <p className="text-gray-700 -mt-6 dark:text-white/80">
        {config.description}
      </p>

      <form
        className="mt-10 flex flex-col dark:text-black"
        action={async (formData) => {
          setIsSubmitting(true);
          try {
            const result = await emailService.sendEmail({
              senderEmail: formData.get('senderEmail') as string,
              message: formData.get('message') as string,
            });

            if (result.success) {
              toast.success('Message sent successfully!');
              formData.set('senderEmail', '');
              formData.set('message', '');
            } else {
              toast.error('Failed to send message. Please try again.');
            }
          } catch (error) {
            toast.error('An error occurred. Please try again.');
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        <input
          className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
        />
        <textarea
          className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="message"
          placeholder="Your message"
          required
          maxLength={5000}
        />
        <SubmitBtn isSubmitting={isSubmitting} />
      </form>
    </motion.section>
  );
}
