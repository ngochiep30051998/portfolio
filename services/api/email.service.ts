'use client';

import { createClient } from '@/lib/supabase/client';

interface EmailData {
  senderEmail: string;
  message: string;
}

export const emailService = {
  async sendEmail(data: EmailData) {
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            sender_email: data.senderEmail,
            message: data.message,
            status: 'pending'
          }
        ]);
      await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.senderEmail,
          message: data.message
        }),
      });

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }
  }
}; 