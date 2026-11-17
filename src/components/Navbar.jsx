import React, { useState } from 'react';
import { 
  Building2, 
  Calculator, 
  FileText, 
  Search, 
  PhoneCall, 
  Menu, 
  X, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { COMPANY_INFO } from '../data/plans';

export default function Navbar({ currentView, setView, selectedPlan, setSelectedPlan }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (view, sectionId = null) => {
    setView(view);
    setMobileMenuOpen(false);
    if (view === 'home' && sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs">
      {/* Top emergency / contact banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Financiamiento privado con contrato claro y cronograma por escrito en La Paz, Bolivia</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span>Atención: {COMPANY_INFO.schedule}</span>
            <a 
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-medium transition"
            >
              WhatsApp: {COMPANY_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo */}
          <div 
            onClick={() => navigateTo('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight block leading-tight">
                Solvent<span className="text-blue-600">ia</span>
              </span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Solvencia Financiera
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => navigateTo('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                currentView === 'home' 
                  ? 'text-blue-600 bg-blue-50 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Inicio
            </button>

            <button
              onClick={() => navigateTo('simulador')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition ${
                currentView === 'simulador' 
                  ? 'text-blue-600 bg-blue-50 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calculator className="w-4 h-4 text-blue-600" />
              Simulador
            </button>

            <button
              onClick={() => navigateTo('home', 'planes')}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            >
              Planes y Tasas
            </button>

            <button
              onClick={() => navigateTo('home', 'como-funciona')}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            >
              Cómo Funciona
            </button>

            <button
              onClick={() => navigateTo('seguimiento')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition ${
                currentView === 'seguimiento' 
                  ? 'text-blue-600 bg-blue-50 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Search className="w-4 h-4 text-slate-500" />
              Seguimiento
            </button>

            <button
              onClick={() => navigateTo('home', 'contacto')}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            >
              Contacto
            </button>
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigateTo('solicitud')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-95"
            >
              <span>Solicitar Préstamo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => navigateTo('solicitud')}
              className="bg-blue-600 text-white text-xs font-semibold px-3 py-2 rounded-lg"
            >
              Solicitar
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          <button
            onClick={() => navigateTo('home')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Inicio
          </button>
          <button
            onClick={() => navigateTo('simulador')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-blue-600 bg-blue-50 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Simulador de Cuotas
            </span>
            <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">En vivo</span>
          </button>
          <button
            onClick={() => navigateTo('home', 'planes')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Planes y Tasas
          </button>
          <button
            onClick={() => navigateTo('home', 'como-funciona')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Cómo Funciona
          </button>
          <button
            onClick={() => navigateTo('seguimiento')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Consultar Préstamo Vigente
          </button>
          <button
            onClick={() => navigateTo('home', 'contacto')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Oficinas y Contacto
          </button>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('solicitud')}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold text-sm py-3 rounded-xl shadow-md"
            >
              <span>Comenzar Solicitud</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
