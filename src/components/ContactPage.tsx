import React, { useState } from 'react';
import { DISPLAY_PHONE, CONTACT_EMAIL, FULL_ADDRESS, WORKING_HOURS } from '../data/storeData';
import { MessageCircle, Mail, MapPin, Clock, Send, Sparkles, Check, Phone } from 'lucide-react';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp';
import { BackButton } from './BackButton';

interface ContactPageProps {
  onBack?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Karachi');
  const [category, setCategory] = useState('MDF Photo Tiles');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const formattedText = `Hi FRAME HUB! New Contact Inquiry from Website:
*Name:* ${name}
*Phone:* ${phone}
*City:* ${city}
*Category:* ${category}
*Message:* ${message}`;

    window.open(createGeneralWhatsAppUrl(formattedText), '_blank');
  };

  return (
    <div className="py-16 sm:py-24 bg-[#111111] text-white font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <BackButton onBack={onBack} isLightBg={false} />
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-[#C8A96A] text-xs font-extrabold uppercase tracking-[0.2em] bg-[#1A1A1A] px-4 py-1.5 rounded-full border border-[#C8A96A]/30">
            <Sparkles className="w-4 h-4 text-[#C8A96A]" />
            <span>Customer Support &amp; Atelier Studio</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-white">
            Get in <span className="font-bold italic text-[#E2CD9F]">Touch</span>
          </h1>
          <div className="w-16 h-0.5 bg-[#C8A96A] mx-auto" />
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto">
            Have questions about dimensions, frame styles, photo resolution, or custom designs? Contact us directly or visit our studio atelier.
          </p>
        </div>

        {/* 4 Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* WhatsApp */}
          <div className="bg-[#181818] p-6 rounded-2xl border border-gray-800 hover:border-[#25D366] shadow-xl transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] flex items-center justify-center">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-white">WhatsApp Direct</h3>
                <p className="text-xs text-[#25D366] font-bold mt-1">{DISPLAY_PHONE}</p>
                <p className="text-[11px] text-gray-400 mt-1">Instant photo sharing &amp; digital proof approvals</p>
              </div>
            </div>
            <a
              href={createGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1faa51] text-white font-bold text-xs py-3 rounded-xl transition-transform group-hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Message on WhatsApp</span>
            </a>
          </div>

          {/* Email */}
          <div className="bg-[#181818] p-6 rounded-2xl border border-gray-800 hover:border-[#C8A96A] shadow-xl transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#C8A96A]/10 border border-[#C8A96A]/30 text-[#C8A96A] flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-white">Official Email</h3>
                <p className="text-xs text-[#C8A96A] font-bold mt-1">{CONTACT_EMAIL}</p>
                <p className="text-[11px] text-gray-400 mt-1">For corporate orders &amp; bespoke inquiries</p>
              </div>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#202020] text-white font-bold text-xs py-3 rounded-xl border border-gray-700 transition-transform group-hover:scale-[1.02]"
            >
              <Mail className="w-4 h-4 text-[#C8A96A]" />
              <span>Send Email</span>
            </a>
          </div>

          {/* Address */}
          <div className="bg-[#181818] p-6 rounded-2xl border border-gray-800 hover:border-[#C8A96A] shadow-xl transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#C8A96A]/10 border border-[#C8A96A]/30 text-[#C8A96A] flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-white">Studio Address</h3>
                <p className="text-xs text-gray-300 font-medium leading-relaxed mt-1">
                  {FULL_ADDRESS}
                </p>
              </div>
            </div>
            <div className="text-[11px] text-[#C8A96A] font-semibold border-t border-gray-800 pt-2 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>Karachi Workshop &amp; Studio</span>
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-[#181818] p-6 rounded-2xl border border-gray-800 hover:border-[#C8A96A] shadow-xl transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#C8A96A]/10 border border-[#C8A96A]/30 text-[#C8A96A] flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-white">Working Hours</h3>
                <p className="text-xs text-[#E2CD9F] font-bold mt-1">{WORKING_HOURS}</p>
                <p className="text-[11px] text-gray-400 mt-1">Sunday Closed (Online support active)</p>
              </div>
            </div>
            <div className="text-[11px] text-gray-400 border-t border-gray-800 pt-2">
              ✓ Fast response within 15 minutes
            </div>
          </div>
        </div>

        {/* Form & Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#181818] p-8 sm:p-10 rounded-3xl border border-gray-800 shadow-2xl space-y-6">
            <div className="border-b border-gray-800 pb-4 space-y-1">
              <span className="text-[#C8A96A] text-xs font-bold uppercase tracking-widest">
                Quick Inquiry
              </span>
              <h2 className="font-serif text-2xl font-bold text-white">
                Send Us a Message
              </h2>
              <p className="text-xs text-gray-400">
                Fill out the details below to generate an instant WhatsApp consultation message.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ali Ahmed"
                    className="w-full bg-[#111111] border border-gray-800 rounded-xl p-3.5 text-xs text-white focus:border-[#C8A96A] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0300 1234567"
                    className="w-full bg-[#111111] border border-gray-800 rounded-xl p-3.5 text-xs text-white focus:border-[#C8A96A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Karachi, Lahore, Islamabad, etc."
                    className="w-full bg-[#111111] border border-gray-800 rounded-xl p-3.5 text-xs text-white focus:border-[#C8A96A] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                    Product Interest
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#111111] border border-gray-800 rounded-xl p-3.5 text-xs text-white focus:border-[#C8A96A] focus:outline-none font-medium"
                  >
                    <option value="MDF Photo Tiles">MDF Photo Tiles (6×8 &amp; 8×12)</option>
                    <option value="Family Frames">Family Frames (Starting Rs. 349)</option>
                    <option value="Wedding Frames">Wedding Frames</option>
                    <option value="Islamic & Motivational Frames">Islamic &amp; Motivational Frame Set</option>
                    <option value="Photo Clip String Lights">Photo Clip String Lights</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                  Your Requirements / Message
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your wall space or custom size requirements..."
                  className="w-full bg-[#111111] border border-gray-800 rounded-xl p-3.5 text-xs text-white focus:border-[#C8A96A] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#1faa51] text-white font-bold text-xs uppercase tracking-[0.15em] py-4 rounded-xl shadow-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Submit Order Inquiry on WhatsApp</span>
              </button>
            </form>
          </div>

          {/* Google Map Panel (5 Cols) */}
          <div className="lg:col-span-5 bg-[#181818] p-6 rounded-3xl border border-gray-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C8A96A]" />
                  <span>Google Map Location</span>
                </h3>
                <p className="text-[11px] text-gray-400">Bohra Pir, Near SIUT, Karachi, Pakistan</p>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="w-full h-80 rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 shadow-inner">
              <iframe
                title="FRAME HUB Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.824701235483!2d67.0125!3d24.8625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e1000000001%3A0x1!2sBohra%20Pir%2C%20Karachi!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-4 bg-[#111111] rounded-2xl border border-gray-800 text-xs text-gray-300 space-y-1">
              <div className="font-bold text-[#C8A96A]">Full Studio Address:</div>
              <p className="text-gray-300 font-medium">{FULL_ADDRESS}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
