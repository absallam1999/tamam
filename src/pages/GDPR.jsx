import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Shield, Headset } from 'lucide-react';

const GDPR = () => {
  const { t } = useTranslation();

  const sections = ['rights', 'data_controller', 'consent', 'contact'];

  return (
    <div style={{ minHeight: '100vh', padding: '80px 24px' }}>
      
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* Title */}
        <p style={{ fontSize: '10px', fontWeight: 600, color: 'var(--accent-500)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px' }}>
          {t('nav.gdpr')}
        </p>
        <h1 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '16px' }}>
          {t('gdpr.title')}
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '56px', maxWidth: '520px' }}>
          {t('gdpr.intro')}
        </p>

        {/* Rights List */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>
            {t('gdpr.rights.title')}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              t('gdpr.rights.right1'),
              t('gdpr.rights.right2'),
              t('gdpr.rights.right3'),
              t('gdpr.rights.right4'),
              t('gdpr.rights.right5'),
              t('gdpr.rights.right6'),
            ].map((right, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '12px', border: '1px solid var(--border-light)', backgroundColor: 'var(--bg-secondary)' }}>
                <Shield size={16} style={{ color: 'var(--accent-500)', flexShrink: 0 }} />
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{right}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data Controller */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>
            {t('gdpr.data_controller.title')}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {t('gdpr.data_controller.content')}
          </p>
        </div>

        {/* Consent */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>
            {t('gdpr.consent.title')}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {t('gdpr.consent.content')}
          </p>
        </div>

        {/* Contact DPO */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>
            {t('gdpr.contact.title')}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {t('gdpr.contact.content')}
          </p>
        </div>

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

export default GDPR;