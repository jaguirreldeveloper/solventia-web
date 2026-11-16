/**
 * Servicio de conexión con la API de Laravel (mi-prestamo-digital-api).
 * Soporta fallback automático a almacenamiento y cálculo local si el backend no está activo.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export async function fetchPlans() {
  try {
    const res = await fetch(`${API_BASE_URL}/plans`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (err) {
    console.warn('API de Laravel no disponible, usando catálogo local.');
  }
  return null;
}

export async function simulateLoanApi(amount, monthlyRate, termMonths) {
  try {
    const res = await fetch(`${API_BASE_URL}/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: Number(amount),
        monthly_rate: Number(monthlyRate),
        term_months: Number(termMonths),
      }),
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (err) {
    console.warn('API de simulación no disponible, usando cálculo local.');
  }
  return null;
}

export async function submitApplicationApi(applicationData) {
  try {
    const res = await fetch(`${API_BASE_URL}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: applicationData.fullName,
        ci: applicationData.ci,
        ci_exp: applicationData.ciExp || 'LP',
        phone: applicationData.phone,
        email: applicationData.email,
        city: applicationData.city || 'La Paz',
        address: applicationData.address,
        employment_type: applicationData.employmentType,
        company_name: applicationData.companyName,
        monthly_income: Number(applicationData.monthlyIncome || 0),
        plan_id: applicationData.planId,
        plan_name: applicationData.planName,
        monthly_rate: Number(applicationData.monthlyRate),
        amount: Number(applicationData.amount),
        term: Number(applicationData.term),
        destination: applicationData.destination,
        preferred_channel: applicationData.preferredChannel,
      }),
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (err) {
    console.warn('API de solicitudes no disponible, guardando solicitud en localStorage.');
  }
  return null;
}

export async function getTrackingApi(code) {
  try {
    const res = await fetch(`${API_BASE_URL}/tracking/${encodeURIComponent(code)}`, {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (err) {
    console.warn('API de tracking no disponible, buscando en base local.');
  }
  return null;
}

export async function submitContactApi(contactData) {
  try {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData),
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('API de contacto no disponible.');
  }
  return null;
}
