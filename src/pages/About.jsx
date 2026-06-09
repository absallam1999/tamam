import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Download, Users, Star, Headset, Target, Eye, Heart } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: Download, value: t('about.stats.downloads') },
    { icon: Users, value: t('about.stats.users') },
    { icon: Star, value: t('about.stats.rating') },
  ];

  const values = [
    { icon: Target, key: 'mission' },
    { icon: Eye, key: 'vision' },
    { icon: Heart, key: 'team' },
  ];

  return (
    <div style={{ minHeight: '100vh', padding: 'clamp(60px, 8vw, 100px) 20px' }}>
      
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Hero */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '40px', 
          marginBottom: 'clamp(48px, 6vw, 80px)',
          alignItems: 'flex-start'
        }}>
          
          {/* Text */}
          <div style={{ width: '100%' }}>
            <p style={{ fontSize: '10px', fontWeight: 600, color: 'var(--accent-500)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>
              {t('nav.about')}
            </p>
            <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '16px' }}>
              {t('about.title')}
            </h1>
            <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '560px' }}>
              {t('about.subtitle')}
            </p>
          </div>

          {/* Stats */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
            gap: '10px', 
            width: '100%' 
          }}>
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '14px', 
                  padding: 'clamp(14px, 2vw, 20px) clamp(16px, 2vw, 24px)', 
                  borderRadius: '14px', 
                  border: '1px solid var(--border-light)', 
                  backgroundColor: 'var(--bg-secondary)' 
                }}>
                  <div style={{ width: 'clamp(40px, 5vw, 48px)', height: 'clamp(40px, 5vw, 48px)', borderRadius: '12px', backgroundColor: 'var(--accent-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={20} style={{ color: 'var(--accent-500)' }} />
                  </div>
                  <p style={{ fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>{stat.value}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Values */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '14px', 
          marginBottom: 'clamp(48px, 6vw, 80px)' 
        }}>
          {values.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} style={{ 
                padding: 'clamp(22px, 3vw, 28px) clamp(18px, 2vw, 24px)', 
                borderRadius: '14px', 
                border: '1px solid var(--border-light)', 
                backgroundColor: 'var(--bg-secondary)', 
                textAlign: 'center' 
              }}>
                <div style={{ width: 'clamp(40px, 5vw, 48px)', height: 'clamp(40px, 5vw, 48px)', borderRadius: '12px', backgroundColor: 'var(--accent-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto clamp(12px, 2vw, 16px)' }}>
                  <Icon size={20} style={{ color: 'var(--accent-500)' }} />
                </div>
                <h2 style={{ fontSize: 'clamp(15px, 2vw, 17px)', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {t(`about.${item.key}`)}
                </h2>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'var(--border-light)', marginBottom: '40px' }} />

        {/* Contact */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 'clamp(13px, 1.5vw, 14px)', color: 'var(--text-secondary)', marginBottom: '14px' }}>
            {t('faq.stillHaveQuestions')}
          </p>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: 'clamp(10px, 1.5vw, 14px) clamp(16px, 2vw, 24px)',
              backgroundColor: 'var(--accent-500)',
              color: '#fff',
              borderRadius: '12px',
              fontSize: 'clamp(13px, 1.5vw, 14px)',
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

export default About;