// Google Analytics 4 (GA4) via Google Tag (GTM-5DXQS669 -> G-XCLSC79NY5)

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const TEST_PHONES = new Set([
  '0931212321',
  '0328238348',
  '0123456789',
  '0900000000',
  '0999999999',
]);

export function isAnalyticsTestInput(phone = '', text = ''): boolean {
  const cleanPhone = String(phone).replace(/[\s.\-()]/g, '');
  if (cleanPhone && TEST_PHONES.has(cleanPhone)) return true;
  return /(\[test|\btest\b|kiểm tra hệ thống|tin nhắn test|nháp|demo\b)/i.test(text);
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', eventName, params);
  } catch {
    // Ignore analytics errors so UI never breaks
  }
}

export function trackLeadConversion(params: {
  source: 'contact_form' | 'chatbot';
  topic?: string;
  phone?: string;
  textContext?: string;
  isTest?: boolean;
}): void {
  if (params.isTest || isAnalyticsTestInput(params.phone, params.textContext)) {
    return;
  }

  const eventPayload = {
    lead_source: params.source,
    topic: params.topic || (params.source === 'chatbot' ? 'Chatbot AI Khánh Vân' : 'Form Liên Hệ'),
    currency: 'VND',
    value: 1,
  };

  // Fire standard GA4 lead event + pre-configured GA4 Key Event (qualify_lead)
  trackEvent('generate_lead', eventPayload);
  trackEvent('qualify_lead', eventPayload);
}
