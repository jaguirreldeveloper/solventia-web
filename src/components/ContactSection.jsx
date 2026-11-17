import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Building
} from 'lucide-react';
import { COMPANY_INFO } from '../data/plans';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Consulta general de préstamo',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: 'Consulta general de préstamo',
        message: ''
      });
    }, 5000);
  };

  return (
    <section id="contacto" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Canales de Atención
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contáctanos o Visítanos en Nuestra Oficina
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Estamos disponibles para asesorarte personalmente, revisar tu caso o coordinar la firma de tu contrato.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Office info & Direct WhatsApp CTA */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Oficina Central La Paz</h3>
                  <p className="text-xs text-slate-400">Atención presencial y administrativa</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block">Dirección:</span>
                    <span>{COMPANY_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                  <div>
                    <span className="text-white font-semibold block">Línea directa:</span>
                    <span>{COMPANY_INFO.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                  <div>
                    <span className="text-white font-semibold block">Correo electrónico:</span>
                    <span>{COMPANY_INFO.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block">Horario de atención:</span>
                    <span>{COMPANY_INFO.schedule}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Escribir por WhatsApp ahora</span>
                </a>
              </div>
            </div>

            {/* Quick notice box */}
            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs leading-relaxed">
              <strong>Nota sobre citas presenciales:</strong> Para agilizar tu trámite de firma y desembolso, te sugerimos completar previamente la solicitud en línea o enviar tus documentos por WhatsApp para precalificación.
            </div>

          </div>

          {/* Right Column: Web Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900">Envíanos un mensaje</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Responderemos tu consulta en un lapso no mayor a 2 horas hábiles.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3 animate-in fade-in">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">¡Mensaje enviado con éxito!</h4>
                  <p className="text-xs mt-1 text-emerald-700">
                    Gracias por comunicarte. Un asesor financiero de Solventia se pondrá en contacto contigo muy pronto.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Juan Carlos Mamani"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Teléfono o WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. +591 71234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Motivo de consulta
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                    >
                      <option value="Consulta general de préstamo">Consulta general de préstamo</option>
                      <option value="Duda sobre el simulador y cronograma">Duda sobre simulador y cronograma</option>
                      <option value="Estado de solicitud en trámite">Estado de solicitud en trámite</option>
                      <option value="Coordinación de firma presencial">Coordinación de firma presencial</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mensaje o consulta detallada *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Escribe aquí tu consulta o el monto que te interesa financiar..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Consulta</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
