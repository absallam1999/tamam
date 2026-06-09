import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Home, Headset } from 'lucide-react';

const Cookies = () => {
  const { t } = useTranslation();

  const sections = ['what', 'how', 'manage'];

  return (
    <div style={{ minHeight: '100vh', padding: '80px 24px' }}>
      
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* Title */}
        <p style={{ fontSize: '10px', fontWeight: 600, color: 'var(--accent-500)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px' }}>
          {t('nav.cookies')}
        </p>
        <h1 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '16px' }}>
          {t('cookies.title')}
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '56px', maxWidth: '520px' }}>
          {t('cookies.intro')}
        </p>

        {/* Cookie Types */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>
            {t('cookies.types.title')}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--border-light)', backgroundColor: 'var(--bg-secondary)' }}>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                {t('cookies.types.essential')}
              </p>
              <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>Required for the website to function</p>
            </div>
            <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--border-light)', backgroundColor: 'var(--bg-secondary)' }}>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                {t('cookies.types.analytics')}
              </p>
              <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>Help us understand how you use the site</p>
            </div>
            <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--border-light)', backgroundColor: 'var(--bg-secondary)' }}>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                {t('cookies.types.preferences')}
              </p>
              <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>Remember your language and region settings</p>
            </div>
          </div>
        </div>

        {/* Sections */}
        {sections.map((key) => (
          <div key={key} style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>
              {t(`cookies.${key}.title`)}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {t(`cookies.${key}.content`)}
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

export default Cookies;