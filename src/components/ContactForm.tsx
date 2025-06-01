"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { OWNER_WHATSAPP_NUMBER, BUSINESS_NAME } from "@/lib/constants";
import { Phone, User, Mail, MessageSquare } from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  productInquiry: z.string().optional(), // Hidden field for service/product context
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  productName?: string; // Can be service name
}

export default function ContactForm({ productName }: ContactFormProps) {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: productName ? `I'm interested in the service: ${productName}. ` : "",
      productInquiry: productName,
    },
  });

  function onSubmit(data: ContactFormValues) {
    let prefilledMessage = `Hello ${BUSINESS_NAME},\n\nName: ${data.name}\nEmail: ${data.email}\n`;
    if (data.phone) {
      prefilledMessage += `Phone: ${data.phone}\n`;
    }
    if (data.productInquiry) {
      prefilledMessage += `Inquiry about: ${data.productInquiry}\n`;
    }
    prefilledMessage += `Message: ${data.message}`;

    const whatsappUrl = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(prefilledMessage)}`;
    
    const newWindow = window.open(whatsappUrl, '_blank');

    if (newWindow) {
      toast({
        title: "Redirecting to WhatsApp...",
        description: "If you are not redirected, please ensure WhatsApp is installed or check your popup blocker.",
      });
      form.reset();
    } else {
       toast({
        variant: "destructive",
        title: "Could not open WhatsApp",
        description: "Please check your popup blocker settings or try contacting us directly.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-8 border rounded-lg shadow-lg bg-card">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center"><User className="mr-2 h-4 w-4 text-primary" />Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center"><Mail className="mr-2 h-4 w-4 text-primary" />Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your.email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center"><Phone className="mr-2 h-4 w-4 text-primary" />Phone Number (Optional)</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         {productName && (
          <FormItem>
            <FormLabel>Inquiring about</FormLabel>
            <FormControl>
              <Input type="text" readOnly value={productName} className="bg-muted cursor-not-allowed" />
            </FormControl>
          </FormItem>
        )}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center"><MessageSquare className="mr-2 h-4 w-4 text-primary" />Your Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please describe your inquiry or project needs..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" size="lg">
          Send via WhatsApp
        </Button>
      </form>
    </Form>
  );
}
