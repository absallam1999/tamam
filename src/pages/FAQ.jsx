import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, Headset, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [openQuestions, setOpenQuestions] = useState({});

  const categories = [
    { id: 'all', key: 'all' },
    { id: 'general', key: 'general' },
    { id: 'orders', key: 'orders' },
    { id: 'payments', key: 'payments' },
    { id: 'account', key: 'account' },
    { id: 'support', key: 'support' },
  ];

  const allQuestions = [
    { id: 1, category: 'general', q: 'q1', a: 'a1' },
    { id: 2, category: 'orders', q: 'q2', a: 'a2' },
    { id: 3, category: 'general', q: 'q3', a: 'a3' },
    { id: 4, category: 'orders', q: 'q4', a: 'a4' },
    { id: 5, category: 'payments', q: 'q5', a: 'a5' },
    { id: 6, category: 'payments', q: 'q6', a: 'a6' },
    { id: 7, category: 'orders', q: 'q7', a: 'a7' },
    { id: 8, category: 'support', q: 'q8', a: 'a8' },
    { id: 9, category: 'account', q: 'q9', a: 'a9' },
    { id: 10, category: 'account', q: 'q10', a: 'a10' },
    { id: 11, category: 'support', q: 'q11', a: 'a11' },
    { id: 12, category: 'orders', q: 'q12', a: 'a12' },
    { id: 13, category: 'payments', q: 'q13', a: 'a13' },
    { id: 14, category: 'payments', q: 'q14', a: 'a14' },
    { id: 15, category: 'orders', q: 'q15', a: 'a15' },
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  const toggleQuestion = (id) => {
    setOpenQuestions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredQuestions = allQuestions.filter(q => {
    const matchesCategory = activeCategory === 'all' || q.category === activeCategory;
    const matchesSearch = searchTerm === '' ||
      t(`faq.questions.${q.q}`).toLowerCase().includes(searchTerm.toLowerCase()) ||
      t(`faq.questions.${q.a}`).toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ minHeight: '100vh', padding: '80px 24px' }}>
      
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* Title */}
        <p style={{ fontSize: '10px', fontWeight: 600, color: 'var(--accent-500)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px' }}>
          FAQ
        </p>
        <h1 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '16px' }}>
          {t('faq.title')}
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '40px', maxWidth: '520px' }}>
          {t('faq.description')}
        </p>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '32px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <input
            type="text"
            placeholder={t('faq.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 40px',
              borderRadius: '12px',
              border: '1px solid var(--border-light)',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 600,
                border: activeCategory === cat.id ? 'none' : '1px solid var(--border-light)',
                backgroundColor: activeCategory === cat.id ? 'var(--accent-500)' : 'transparent',
                color: activeCategory === cat.id ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 200ms',
              }}
            >
              {cat.key === 'all' ? t('faq.categories.general') ? 'All' : 'All' : t(`faq.categories.${cat.key}`)}
            </button>
          ))}
        </div>

        {/* Questions */}
        <div style={{ marginBottom: '60px' }}>
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q) => (
              <div
                key={q.id}
                style={{
                  marginBottom: '8px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-light)',
                  backgroundColor: 'var(--bg-secondary)',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => toggleQuestion(q.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span>{t(`faq.questions.${q.q}`)}</span>
                  <ChevronDown
                    size={16}
                    style={{
                      color: 'var(--text-tertiary)',
                      transform: openQuestions[q.id] ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 200ms',
                      flexShrink: 0,
                      marginLeft: '12px',
                    }}
                  />
                </button>
                {openQuestions[q.id] && (
                  <div style={{ padding: '0 20px 16px', borderTop: '1px solid var(--border-light)' }}>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, paddingTop: '12px' }}>
                      {t(`faq.questions.${q.a}`)}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <HelpCircle size={40} style={{ color: 'var(--text-tertiary)', marginBottom: '12px' }} />
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{t('faq.noResults')}</p>
            </div>
          )}
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

export default FAQ;