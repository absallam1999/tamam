import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Home, Headset } from 'lucide-react';

const Terms = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const sections = ['acceptance', 'account', 'use', 'privacy', 'payments', 'termination', 'liability'];

  return (
    <div style={{ minHeight: '100vh', padding: '80px 24px' }}>
      
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* Title */}
        <p style={{ fontSize: '10px', fontWeight: 600, color: 'var(--accent-500)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px' }}>
          {t('nav.legal')}
        </p>
        <h1 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '16px' }}>
          {t('terms.title')}
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '56px', maxWidth: '520px' }}>
          {t('terms.intro')}
        </p>

        {/* Sections */}
        {sections.map((key) => (
          <div key={key} style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>
              {t(`terms.${key}.title`)}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {t(`terms.${key}.content`)}
            </p>
          </div>
        ))}

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'var(--border-light)', margin: '60px 0 32px' }} />

        {/* Contact */}
        <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          {t('faq.stillHaveQuestions')}
        </p>
        <div style={{ textAlign: 'center' }}>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              backgroundColor: 'var(--accent-500)',
              color: '#fff',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <Headset size={16} />
            <span>{t('faq.contactSupport')}</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Terms;