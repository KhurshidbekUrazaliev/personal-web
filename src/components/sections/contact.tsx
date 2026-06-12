'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, Send, Instagram } from 'lucide-react';
import { useState } from 'react';

const CONTACT_METHODS = [
  { icon: Mail,      label: 'Email',     value: 'khurshidbekurazaliev@gmail.com', href: 'mailto:khurshidbekurazaliev@gmail.com', color: '#C9A84C' },
  { icon: Linkedin,  label: 'LinkedIn',  value: 'linkedin.com/in/khurshidbekurazaliev', href: 'https://www.linkedin.com/in/khurshidbekurazaliev', color: '#7AB8F5' },
  { icon: Github,    label: 'GitHub',    value: 'KhurshidbekUrazaliev', href: 'https://github.com/KhurshidbekUrazaliev', color: '#A8D5A2' },
  { icon: Instagram, label: 'Instagram', value: '@ummah_x_', href: 'https://www.instagram.com/ummah_x_/', color: '#E8A87C' },
  { icon: MapPin,    label: 'Location',  value: 'Busan, South Korea 🇰🇷', href: null, color: '#3D8A5A' },
];

const COLLAB_AREAS = [
  { title: 'AI & ML',          desc: 'Intelligent apps, automation, data-driven tools', tags: ['Python', 'TensorFlow', 'OpenAI', 'Data Analysis'] },
  { title: 'Web Development',  desc: 'Full-stack modern web applications',              tags: ['React', 'Next.js', 'TypeScript', 'Node.js'] },
  { title: 'SAT Tutoring',     desc: 'Math and English prep, 200+ point improvement',   tags: ['SAT Math', 'SAT English', 'Strategy', 'Curriculum'] },
  { title: 'Language Coaching',desc: 'Uzbek, English, Korean, Russian, Arabic',         tags: ['Uzbek', 'English', 'Korean', 'Multilingual'] },
];

type FormStatus = 'idle' | 'sending' | 'sent';

export function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => { setStatus('sent'); setForm({ name: '', email: '', subject: '', message: '' }); }, 1800);
  };

  const inputStyle = {
    background: 'rgba(10,26,15,0.8)',
    border: '1px solid var(--brand-border)',
    color: 'var(--brand-text)',
    borderRadius: 8,
    padding: '10px 14px',
    width: '100%',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.15s',
  };

  return (
    <section id="contact" className="py-28" style={{ background: 'var(--brand-bg)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: 'var(--brand-gold)', fontFamily: 'var(--font-mono,monospace)', letterSpacing: '0.2em' }}>
            06 / Contact
          </p>
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
              {CONTACT_METHODS.map((m, i) => (
                <motion.div key={m.label}
                  initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.15 + i * 0.07 }} viewport={{ once: true }}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${m.href ? 'cursor-pointer hover:-translate-y-0.5' : ''}`}
                  style={{ background: 'rgba(15,33,21,0.7)', border: '1px solid var(--brand-border)' }}
                  onClick={() => m.href && window.open(m.href, '_blank')}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${m.color}18`, border: `1px solid ${m.color}33` }}>
                    <m.icon className="h-4.5 w-4.5" style={{ color: m.color, width: 18, height: 18 }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs mb-0.5" style={{ color: 'var(--brand-muted)' }}>{m.label}</p>
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--brand-text)' }}>{m.value}</p>
                  </div>
                </motion.div>
              ))}
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
                className="rounded-2xl p-10 text-center"
                style={{ background: 'rgba(61,138,90,0.12)', border: '1px solid rgba(61,138,90,0.3)' }}>
                <div className="text-4xl mb-3">✅</div>
                <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--brand-text)' }}>Message sent!</h4>
                <p className="text-sm" style={{ color: 'var(--brand-muted)' }}>I&apos;ll reply within 24 hours.</p>
                <button onClick={() => setStatus('idle')} className="mt-6 text-xs px-4 py-2 rounded-lg transition-all hover:scale-105"
                  style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid var(--brand-border)', color: 'var(--brand-gold)' }}>
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: 'var(--brand-muted)' }}>Name</label>
                    <input type="text" required value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your name" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = 'rgba(201,168,76,0.5)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--brand-border)')} />
                  </div>
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: 'var(--brand-muted)' }}>Email</label>
                    <input type="email" required value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="you@example.com" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = 'rgba(201,168,76,0.5)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--brand-border)')} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: 'var(--brand-muted)' }}>Subject</label>
                  <input type="text" required value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    placeholder="What's this about?" style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'rgba(201,168,76,0.5)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--brand-border)')} />
                </div>
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: 'var(--brand-muted)' }}>Message</label>
                  <textarea required rows={6} value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Tell me about your project, idea, or how we can work together…"
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(201,168,76,0.5)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--brand-border)')} />
                </div>
                <button type="submit" disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all hover:scale-[1.02] disabled:opacity-60"
                  style={{ background: 'var(--brand-gold)', color: 'var(--brand-bg)' }}>
                  {status === 'sending' ? (
                    <><div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />Sending…</>
                  ) : (
                    <><Send className="h-4 w-4" />Send Message</>
                  )}
                </button>
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
                From a 19-year-old in Busan chasing 1600 SAT and 2000 ELO — I build fast, think hard, and care about the work.
              </p>
              <a href="mailto:khurshidbekurazaliev@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                style={{ background: 'var(--brand-gold)', color: 'var(--brand-bg)' }}>
                <Mail className="h-4 w-4" />
                Start a Conversation
              </a>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
