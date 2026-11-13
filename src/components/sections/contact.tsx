'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, Send, Instagram } from 'lucide-react';
import { useState } from 'react';
import {
  EMAILS,
  LINKS,
  MAILTO_BOTH,
  SITE,
  WEB3FORMS_ACCESS_KEY,
} from '@/lib/site';

const CONTACT_METHODS = [
  { icon: Mail,      label: 'Email',     value: EMAILS.primary,                          href: `mailto:${EMAILS.primary}`,   color: '#C9A84C' },
  { icon: Mail,      label: 'Email',     value: EMAILS.secondary,                        href: `mailto:${EMAILS.secondary}`, color: '#C9A84C' },
  { icon: Send,      label: 'Telegram',  value: '@lu3frv',                               href: LINKS.telegram,               color: '#7AB8F5' },
  { icon: Linkedin,  label: 'LinkedIn',  value: 'linkedin.com/in/khurshidbekurazaliev',  href: LINKS.linkedin,               color: '#7AB8F5' },
  { icon: Github,    label: 'GitHub',    value: 'KhurshidbekUrazaliev',                  href: LINKS.github,                 color: '#A8D5A2' },
  { icon: Instagram, label: 'Instagram', value: '@cfarisc19',                            href: LINKS.instagram,              color: '#E8A87C' },
  { icon: MapPin,    label: 'Location',  value: `${SITE.location} 🇰🇷`,                   href: null,                         color: '#3D8A5A' },
];

const COLLAB_AREAS = [
  { title: 'AI & ML',          desc: 'Intelligent apps, automation, data-driven tools', tags: ['Python', 'TensorFlow', 'OpenAI', 'Data Analysis'] },
  { title: 'Web Development',  desc: 'Full-stack modern web applications',              tags: ['React', 'Next.js', 'TypeScript', 'Node.js'] },
  { title: 'SAT Tutoring',     desc: 'Math and English prep, 200+ point improvement',   tags: ['SAT Math', 'SAT English', 'Strategy', 'Curriculum'] },
  { title: 'Language Coaching',desc: 'Uzbek, English, Korean, Russian, Arabic',         tags: ['Uzbek', 'English', 'Korean', 'Multilingual'] },
];

/**
 * idle     – nothing sent yet
 * sending  – waiting for Web3Forms
 * sent     – Web3Forms confirmed the message
 * mail-app – no access key is set, so the visitor's mail app was opened
 * error    – the request failed
 */
type FormStatus = 'idle' | 'sending' | 'sent' | 'mail-app' | 'error';

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };
type FormValues = typeof EMPTY_FORM;

/** A ready-to-send draft in the visitor's own mail app, to both inboxes. */
function mailAppLink(form: FormValues) {
  const body = `${form.message}\n\n${form.name}\n${form.email}`;
  return `${MAILTO_BOTH}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
}

async function sendThroughWeb3Forms(form: FormValues) {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      from_name: `${SITE.domain} contact form`,
      subject: `[${SITE.domain}] ${form.subject}`,
      name: form.name,
      email: form.email,
      message: form.message,
    }),
  });
  const result: { success?: boolean } = await response.json();
  if (!result.success) throw new Error('Web3Forms did not accept the message');
}

export function Contact() {
  const [form, setForm]     = useState<FormValues>(EMPTY_FORM);
  const [status, setStatus] = useState<FormStatus>('idle');
  // A field people never see. Bots fill it in, and then nothing is sent.
  const [trap, setTrap]     = useState('');

  const update = (field: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (trap) { setStatus('sent'); return; }

    if (!WEB3FORMS_ACCESS_KEY) {
      window.open(mailAppLink(form), '_self');
      setStatus('mail-app');
      return;
    }

    setStatus('sending');
    try {
      await sendThroughWeb3Forms(form);
      setForm(EMPTY_FORM);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-28" style={{ background: 'var(--brand-bg)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: 'var(--brand-text)' }}>
            Let&apos;s <span className="text-gold-gradient">Collaborate</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed" style={{ color: 'var(--brand-muted)' }}>
            Building something meaningful? Reach out. I&apos;m open to projects, tutoring, and conversations worth having.
          </p>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">

          {/* Left: contact methods + collab areas */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>

            <h3 className="text-lg font-semibold mb-5" style={{ color: 'var(--brand-text)' }}>
              Get in Touch
            </h3>
            <div className="space-y-3 mb-10">
              {CONTACT_METHODS.map((m, i) => {
                const reveal = {
                  initial: { opacity: 0, x: -12 },
                  whileInView: { opacity: 1, x: 0 },
                  transition: { duration: 0.35, delay: 0.15 + i * 0.07 },
                  viewport: { once: true },
                  style: { background: 'rgba(15,33,21,0.7)', border: '1px solid var(--brand-border)' },
                };
                const content = (
                  <>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${m.color}18`, border: `1px solid ${m.color}33` }}>
                      <m.icon aria-hidden="true" style={{ color: m.color, width: 18, height: 18 }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs mb-0.5" style={{ color: 'var(--brand-muted)' }}>{m.label}</p>
                      <p className="text-sm font-medium truncate" style={{ color: 'var(--brand-text)' }}>{m.value}</p>
                    </div>
                  </>
                );

                if (!m.href) {
                  return (
                    <motion.div key={m.value} {...reveal} className="flex items-center gap-4 p-3 rounded-xl">
                      {content}
                    </motion.div>
                  );
                }

                // Web links open in a new tab; mail links hand over to the mail app.
                const newTab = m.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {};
                return (
                  <motion.a key={m.value} href={m.href} {...newTab} {...reveal}
                    className="flex items-center gap-4 p-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
                    {content}
                  </motion.a>
                );
              })}
            </div>

            <h3 className="text-lg font-semibold mb-5" style={{ color: 'var(--brand-text)' }}>
              Areas of Collaboration
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {COLLAB_AREAS.map((area, i) => (
                <motion.div key={area.title}
                  initial={{ opacity: 0, scale: 0.93 }} whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: 0.5 + i * 0.08 }} viewport={{ once: true }}
                  className="rounded-xl p-4"
                  style={{ background: 'rgba(15,33,21,0.7)', border: '1px solid var(--brand-border)' }}>
                  <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--brand-text)' }}>{area.title}</h4>
                  <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--brand-muted)' }}>{area.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {area.tags.map(t => (
                      <span key={t} className="text-xs px-1.5 py-0.5 rounded font-mono"
                        style={{ background: 'rgba(201,168,76,0.07)', color: 'var(--brand-gold)', border: '1px solid rgba(201,168,76,0.18)', fontFamily: 'var(--font-mono,monospace)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>

            <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--brand-text)' }}>
              Send a Message
            </h3>

            {status === 'sent' ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                role="status"
                className="rounded-2xl p-10 text-center"
                style={{ background: 'rgba(61,138,90,0.12)', border: '1px solid rgba(61,138,90,0.3)' }}>
                <div className="text-4xl mb-3" aria-hidden="true">✅</div>
                <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--brand-text)' }}>Message sent!</h4>
                <p className="text-sm" style={{ color: 'var(--brand-muted)' }}>Thank you. I will write back soon.</p>
                <button type="button" onClick={() => setStatus('idle')} className="mt-6 text-xs px-4 py-2 rounded-lg transition-all hover:scale-105"
                  style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid var(--brand-border)', color: 'var(--brand-gold)' }}>
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs mb-1.5" style={{ color: 'var(--brand-muted)' }}>Name</label>
                    <input id="contact-name" name="name" type="text" required autoComplete="name"
                      value={form.name} onChange={update('name')}
                      placeholder="Your name" className="field" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs mb-1.5" style={{ color: 'var(--brand-muted)' }}>Email</label>
                    <input id="contact-email" name="email" type="email" required autoComplete="email"
                      value={form.email} onChange={update('email')}
                      placeholder="you@example.com" className="field" />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block text-xs mb-1.5" style={{ color: 'var(--brand-muted)' }}>Subject</label>
                  <input id="contact-subject" name="subject" type="text" required
                    value={form.subject} onChange={update('subject')}
                    placeholder="What's this about?" className="field" />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs mb-1.5" style={{ color: 'var(--brand-muted)' }}>Message</label>
                  <textarea id="contact-message" name="message" required rows={6}
                    value={form.message} onChange={update('message')}
                    placeholder="Tell me about your project, idea, or how we can work together…"
                    className="field" style={{ resize: 'none' }} />
                </div>

                {/* Spam trap: off screen, skipped by keyboards and screen readers. */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                  <label htmlFor="contact-website">Leave this field empty</label>
                  <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off"
                    value={trap} onChange={e => setTrap(e.target.value)} />
                </div>

                <button type="submit" disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all hover:scale-[1.02] disabled:opacity-60"
                  style={{ background: 'var(--brand-gold)', color: 'var(--brand-bg)' }}>
                  {status === 'sending' ? (
                    <><div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />Sending…</>
                  ) : (
                    <><Send className="h-4 w-4" aria-hidden="true" />Send Message</>
                  )}
                </button>

                {status === 'mail-app' && (
                  <p role="status" className="text-sm leading-relaxed" style={{ color: 'var(--brand-muted)' }}>
                    Your mail app should now be open with this message ready to send.
                    If nothing opened, write to me at{' '}
                    <a href={`mailto:${EMAILS.primary}`} className="underline" style={{ color: 'var(--brand-gold)' }}>{EMAILS.primary}</a>.
                  </p>
                )}
                {status === 'error' && (
                  <p role="alert" className="text-sm leading-relaxed" style={{ color: '#FF8A80' }}>
                    The message could not be sent. Please try again, or write to me at{' '}
                    <a href={`mailto:${EMAILS.primary}`} className="underline" style={{ color: 'var(--brand-gold)' }}>{EMAILS.primary}</a>.
                  </p>
                )}
              </form>
            )}

            {/* CTA banner */}
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }} viewport={{ once: true }}
              className="mt-8 rounded-2xl p-6 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(26,61,38,0.8), rgba(15,33,21,0.9))', border: '1px solid var(--brand-border-hi)' }}>
              <h4 className="text-lg font-bold mb-2" style={{ color: 'var(--brand-text)' }}>
                Ready to build something that matters?
              </h4>
              <p className="text-xs mb-4" style={{ color: 'var(--brand-muted)' }}>
                I&apos;m a software engineer and student in Busan. I build fast, think hard, and care about the work.
              </p>
              <a href={MAILTO_BOTH}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                style={{ background: 'var(--brand-gold)', color: 'var(--brand-bg)' }}>
                <Mail className="h-4 w-4" aria-hidden="true" />
                Start a Conversation
              </a>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
