export const LOAN_PLANS = [
  {
    id: 'adelanto-sueldo',
    name: 'Adelanto de Sueldo',
    monthlyRate: 4.0, // 4.0% mensual
    minAmount: 500,
    maxAmount: 3000,
    defaultAmount: 1500,
    minTerm: 1,
    maxTerm: 6,
    defaultTerm: 3,
    stepAmount: 100,
    stepTerm: 1,
    popular: false,
    tagline: 'Liquidez inmediata para emergencias del mes',
    description: 'Solución rápida para cubrir gastos imprevistos antes de fin de mes, con mínimos requisitos y desembolso expedito.',
    requirements: [
      'Cédula de identidad vigente (original y fotocopia)',
      'Contrato o constancia laboral vigente',
      'Última boleta de pago o extracto bancario salarial'
    ]
  },
  {
    id: 'personal',
    name: 'Préstamo Personal',
    monthlyRate: 3.0, // 3.0% mensual
    minAmount: 1000,
    maxAmount: 20000,
    defaultAmount: 8000,
    minTerm: 6,
    maxTerm: 24,
    defaultTerm: 12,
    stepAmount: 500,
    stepTerm: 1,
    popular: true,
    tagline: 'El crédito más elegido para proyectos personales y familiares',
    description: 'Financiamiento versátil para estudios, viajes, mejoras del hogar o gastos médicos con cómodas cuotas fijas.',
    requirements: [
      'Cédula de identidad vigente',
      'Factura reciente de luz o agua (comprobante de domicilio)',
      'Comprobante de ingresos de los últimos 3 meses (boletas o extractos)'
    ]
  },
  {
    id: 'refinanciamiento',
    name: 'Refinanciamiento de Deudas',
    monthlyRate: 2.8, // 2.8% mensual
    minAmount: 2000,
    maxAmount: 30000,
    defaultAmount: 12000,
    minTerm: 6,
    maxTerm: 36,
    defaultTerm: 18,
    stepAmount: 500,
    stepTerm: 3,
    popular: false,
    tagline: 'Unifica tus obligaciones y reduce tu carga mensual',
    description: 'Consolida varias deudas en una sola cuota accesible con menor tasa y cronograma unificado para recuperar tu tranquilidad.',
    requirements: [
      'Cédula de identidad vigente',
      'Detalle y saldos de las deudas vigentes a consolidar',
      'Comprobante de ingresos formales o independientes de 3 meses'
    ]
  },
  {
    id: 'emprendedor',
    name: 'Préstamo Emprendedor',
    monthlyRate: 2.5, // 2.5% mensual
    minAmount: 5000,
    maxAmount: 50000,
    defaultAmount: 20000,
    minTerm: 12,
    maxTerm: 36,
    defaultTerm: 24,
    stepAmount: 1000,
    stepTerm: 3,
    popular: false,
    tagline: 'Capital de trabajo e inversión para tu negocio',
    description: 'Impulsa tu microempresa, renueva inventario o adquiere maquinaria con la tasa preferencial más baja de nuestro portafolio.',
    requirements: [
      'Cédula de identidad del titular y/o cónyuge',
      'Licencia de funcionamiento, NIT o registro comercial',
      'Cuaderno de ventas, facturas o movimientos bancarios de los últimos 6 meses'
    ]
  }
];

export const COMPANY_INFO = {
  name: 'Mi Préstamo Digital',
  subheading: 'Préstamos Personales con Cronograma Claro',
  phone: '+591 712 34567',
  whatsappNumber: '59171234567',
  email: 'contacto@miprestamodigital.com',
  address: 'Av. 6 de Agosto #2170, Edificio Torre Empresarial, Piso 4, La Paz, Bolivia',
  schedule: 'Lunes a Viernes: 08:30 - 18:30 | Sábados: 09:00 - 13:00',
  stats: [
    { value: '2.400+', label: 'Préstamos Otorgados' },
    { value: '12 Años', label: 'Acompañando Familias' },
    { value: '98%', label: 'Pagos al Día' },
    { value: '24 Horas', label: 'Tiempo de Respuesta' },
  ]
};
