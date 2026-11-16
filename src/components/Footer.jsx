import React from 'react';
import { Building2, Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { COMPANY_INFO } from '../data/plans';

export default function Footer({ setView }) {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight block">
                  Mi Préstamo Digital
                </span>
                <span className="text-xs text-slate-400">Préstamos personales en Bolivia</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Financiamiento privado responsable. Garantizamos transparencia total mediante contratos privados legalmente respaldados y cronogramas de pago fijos sin penalidades por cancelación anticipada.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Contratos con validez jurídica</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase text-[11px]">
              Navegación Rápida
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setView('simulador'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition"
                >
                  Simulador de Cuotas en Vivo
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setView('solicitud'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition"
                >
                  Solicitud de Crédito Digital
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setView('seguimiento'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition"
                >
                  Consulta de Estado y Cronograma
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact details */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase text-[11px]">
              Atención y Oficinas
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white transition">
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition">
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.schedule}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Transparency Disclaimer */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Compromiso de Claridad
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Todas nuestras operaciones financieras se formalizan mediante contrato privado con reconocimiento de firmas o presencia legal. No solicitamos depósitos por adelantado bajo ningún concepto de apertura.
            </p>
            <div className="pt-2 border-t border-slate-800">
              <a 
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-2 px-3 rounded-lg transition"
              >
                Atención Inmediata por WhatsApp
              </a>
            </div>
          </div>

        </div>

        {/* Bottom legal line */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-6">
            <span>Privacidad y Confidencialidad</span>
            <span>Términos y Condiciones</span>
            <span>Contrato Modelo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
