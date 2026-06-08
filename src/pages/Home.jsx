import { Link, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const FloatingShape = ({ style }) => (
  <div style={{
    position: 'absolute',
    borderRadius: '50%',
    opacity: 0.07,
    pointerEvents: 'none',
    ...style,
  }} />
);

const StepConnector = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 4px',
  }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gray-300)" strokeWidth="2" strokeLinecap="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  </div>
);

const Home = () => {
  const { user } = useContext(AuthContext);

  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <>
      {/* HERO */}
      <div className="hero-section" style={{ position: 'relative', overflow: 'hidden' }}>
        <FloatingShape style={{ width: 500, height: 500, top: '-15%', left: '-10%', background: 'var(--primary)' }} />
        <FloatingShape style={{ width: 400, height: 400, bottom: '-10%', right: '-8%', background: 'var(--accent)', animationDelay: '2s' }} />
        <FloatingShape style={{ width: 200, height: 200, top: '20%', right: '15%', background: 'var(--purple)', animationDelay: '4s' }} />

        <div className="hero-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            AI-Powered Waste Management
        </div>

        <h1 className="hero-title" style={{ maxWidth: '800px' }}>
          Turn <span>Waste</span> Into <span>Impact</span>
        </h1>

        <p className="hero-subtitle" style={{ maxWidth: '580px' }}>
          Snap a photo of your sorted waste, get instant AI-powered analysis,
          earn eco-points, and start Plant Quests to track real growth.
        </p>

        <div className="hero-actions">
          <Link to="/register" className="btn btn-primary btn-lg" style={{ gap: '10px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            Let's Go
          </Link>
          <Link to="/login" className="btn btn-secondary btn-lg">
            Sign In
          </Link>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-value">100%</div>
            <div className="hero-stat-label">Free to Use</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">AI</div>
            <div className="hero-stat-label">Powered Analysis</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">24/7</div>
            <div className="hero-stat-label">Available</div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="features-section">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            background: 'var(--primary-50)',
            border: '1px solid var(--primary-200)',
            borderRadius: 'var(--radius-full)',
            fontSize: '12px',
            fontWeight: 700,
            color: 'var(--primary-700)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '16px',
          }}>
            Simple Process
          </div>
          <h2 className="features-section-title">How It Works</h2>
          <p className="features-section-subtitle">Three simple steps to make a difference</p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap',
        }}>
          {[
            {
              num: '1',
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              ),
              title: 'Snap & Sort',
              desc: 'Take a photo of your sorted waste and upload it with drag & drop',
              color: 'var(--primary)',
              bg: 'var(--primary-50)',
            },
            {
              num: '2',
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              ),
              title: 'Analyze',
              desc: 'AI scans, detects objects, evaluates segregation & scores you out of 100',
              color: 'var(--accent)',
              bg: 'var(--accent-50)',
            },
            {
              num: '3',
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                  <path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" />
                </svg>
              ),
              title: 'Redeem',
              desc: 'Earn eco-points for good segregation and redeem them for real rewards',
              color: 'var(--purple)',
              bg: 'var(--purple-bg)',
            },
          ].map((step, i) => (
            <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '260px',
                padding: '32px 24px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xl)',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = step.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto 16px',
                  background: step.bg,
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: step.color,
                }}>
                  {step.icon}
                </div>
                <div style={{
                  display: 'inline-flex',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: step.color,
                  color: 'white',
                  fontSize: '13px',
                  fontWeight: 800,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px',
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: 'var(--gray-900)' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--gray-500)', lineHeight: '1.6' }}>{step.desc}</p>
              </div>
              {i < 2 && <StepConnector />}
            </div>
          ))}
        </div>
      </div>

      {/* LEVEL SYSTEM SHOWCASE */}
      <div style={{
        padding: '80px 24px',
        maxWidth: '1000px',
        margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            background: 'var(--warning-bg)',
            border: '1px solid var(--warning-border)',
            borderRadius: 'var(--radius-full)',
            fontSize: '12px',
            fontWeight: 700,
            color: '#92400e',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '16px',
          }}>
            Gamification
          </div>
          <h2 className="features-section-title">Level Up Your Impact</h2>
          <p className="features-section-subtitle">Progress through 6 levels as you make the planet greener</p>
        </div>

        <div style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          padding: '8px 0 16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {[
            { icon: '🌱', name: 'Seedling', gp: '0 GP', color: '#86efac' },
            { icon: '🌿', name: 'Sprout', gp: '50 GP', color: '#4ade80' },
            { icon: '♻️', name: 'Green Worker', gp: '150 GP', color: '#22c55e' },
            { icon: '⚔️', name: 'Eco Warrior', gp: '350 GP', color: '#16a34a' },
            { icon: '🛡️', name: 'Earth Guardian', gp: '700 GP', color: '#15803d' },
            { icon: '🌍', name: 'Planet Savior', gp: '1200 GP', color: '#166534' },
          ].map((lvl, i) => (
            <div key={lvl.name} style={{
              textAlign: 'center',
              padding: '20px 16px',
              background: 'var(--surface)',
              border: '2px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              minWidth: '130px',
              transition: 'all 0.3s ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 8px 20px ${lvl.color}30`;
              e.currentTarget.style.borderColor = lvl.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{lvl.icon}</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gray-800)' }}>{lvl.name}</div>
              <div style={{ fontSize: '11px', color: 'var(--gray-400)', marginTop: '4px' }}>{lvl.gp}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES GRID */}
      <div className="features-section" style={{ background: 'var(--gray-50)', borderRadius: '0', marginTop: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            background: 'var(--accent-50)',
            border: '1px solid var(--accent-100)',
            borderRadius: 'var(--radius-full)',
            fontSize: '12px',
            fontWeight: 700,
            color: 'var(--accent-dark)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '16px',
          }}>
            Why GreenPulse
          </div>
          <h2 className="features-section-title">Built for the Planet</h2>
          <p className="features-section-subtitle">Everything you need to make waste segregation a rewarding habit</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          {[
            { icon: '🤖', title: 'AI Classification', desc: 'Advanced AI instantly classifies your waste as Good, Medium, or Bad with detailed feedback' },
            { icon: '📊', title: 'Score & Feedback', desc: 'Get a detailed score out of 100 with specific suggestions to improve your segregation' },
            { icon: '🏆', title: 'Level System', desc: 'Progress through 6 levels from Seedling to Planet Savior as you earn more eco-points' },
            { icon: '🎟️', title: 'Real Rewards', desc: 'Redeem your eco-points for discount coupons and rewards from partner brands' },
            { icon: '📸', title: 'Snap & Sort', desc: 'Snap a photo of your waste and get instant AI-powered segregation analysis' },
            { icon: '⚡', title: 'Plant Quest', desc: 'Start a plant growth journey — upload stage photos, verify growth, earn GP' },
          ].map((f) => (
            <div key={f.title} style={{
              padding: '28px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              transition: 'all 0.3s ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>{f.icon}</div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', color: 'var(--gray-900)' }}>{f.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--gray-500)', lineHeight: '1.6' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA — ORBITING AVATARS */}
      <div style={{
        padding: '80px 24px 100px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, var(--gray-50) 0%, var(--bg) 40%, var(--primary-50) 100%)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Orbiting ring */}
        <div style={{
          position: 'relative',
          width: '280px',
          height: '280px',
          margin: '0 auto 40px',
        }}>
          {/* Pulsing glow behind center */}
          <div style={{
            position: 'absolute',
            inset: '30px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
            opacity: 0.12,
            animation: 'pulse 3s ease-in-out infinite',
          }} />

          {/* Outer ring */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px dashed var(--primary-200)',
            animation: 'spin 20s linear infinite',
          }} />

          {/* Inner ring */}
          <div style={{
            position: 'absolute',
            inset: '40px',
            borderRadius: '50%',
            border: '2px solid var(--accent-200)',
            animation: 'spin 14s linear infinite reverse',
          }} />

          {/* Center avatar */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 0 6px rgba(34,197,94,0.15), 0 20px 40px -10px rgba(34,197,94,0.3)',
            zIndex: 2,
          }}>
            <span style={{ fontSize: '44px' }}>⚡</span>
          </div>

          {/* Orbiting avatar 1 */}
          <div style={{
            position: 'absolute',
            top: '-14px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #bbf7d0, #86efac)',
            border: '3px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            animation: 'orbit-first 20s linear infinite',
            transformOrigin: '50% 154px',
            zIndex: 1,
          }}>
            <span style={{ fontSize: '20px' }}>📸</span>
          </div>

          {/* Orbiting avatar 2 */}
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '-14px',
            transform: 'translateY(-50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #bfdbfe, #93c5fd)',
            border: '3px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            animation: 'orbit-second 20s linear infinite',
            transformOrigin: '-154px 50%',
            zIndex: 1,
          }}>
            <span style={{ fontSize: '20px' }}>📊</span>
          </div>

          {/* Orbiting avatar 3 */}
          <div style={{
            position: 'absolute',
            bottom: '-14px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #fde68a, #fbbf24)',
            border: '3px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            animation: 'orbit-third 20s linear infinite',
            transformOrigin: '-50% -154px',
            zIndex: 1,
          }}>
            <span style={{ fontSize: '20px' }}>🏆</span>
          </div>

          {/* Orbiting avatar 4 */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '-14px',
            transform: 'translateY(-50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #e9d5ff, #c084fc)',
            border: '3px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            animation: 'orbit-fourth 20s linear infinite',
            transformOrigin: '154px 50%',
            zIndex: 1,
          }}>
            <span style={{ fontSize: '20px' }}>⚡</span>
          </div>

          {/* Floating particles */}
          {[
            { x: 20, y: 30, size: 6, color: 'var(--primary)', delay: 0 },
            { x: 240, y: 60, size: 5, color: 'var(--accent)', delay: 1 },
            { x: 50, y: 220, size: 4, color: 'var(--purple)', delay: 2 },
            { x: 220, y: 200, size: 7, color: 'var(--primary)', delay: 0.5 },
            { x: 130, y: 10, size: 4, color: '#fbbf24', delay: 1.5 },
            { x: 10, y: 140, size: 5, color: 'var(--accent)', delay: 2.5 },
          ].map((p, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: p.color,
              opacity: 0.35,
              animation: `float-particle 4s ease-in-out ${p.delay}s infinite`,
            }} />
          ))}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '36px',
          fontWeight: 900,
          color: 'var(--gray-900)',
          marginBottom: '12px',
          letterSpacing: '-1px',
        }}>
          Join the Eco-Revolution
        </h2>
        <p style={{
          fontSize: '17px',
          color: 'var(--gray-500)',
          marginBottom: '36px',
          lineHeight: '1.7',
          maxWidth: '500px',
          margin: '0 auto 36px',
        }}>
          Thousands of eco-warriors are already earning rewards.
          Start your journey today — it&apos;s free!
        </p>

        {/* Mini user avatars stack */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', marginBottom: '28px' }}>
          {['🧑‍🌾', '👩‍🔬', '🧑‍💻', '👨‍🌾', '👩‍🏫'].map((emoji, i) => (
            <div key={i} style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${['#bbf7d0','#bfdbfe','#fde68a','#e9d5ff','#fecaca'][i]}, ${['#86efac','#93c5fd','#fbbf24','#c084fc','#f87171'][i]})`,
              border: '3px solid white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: i > 0 ? '-12px' : '0',
              fontSize: '18px',
              zIndex: 5 - i,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}>
              {emoji}
            </div>
          ))}
          <div style={{
            marginLeft: '-12px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'var(--primary)',
            border: '3px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: 800,
            zIndex: 0,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}>
            +3k
          </div>
        </div>

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" className="btn btn-primary btn-lg" style={{ gap: '10px', fontSize: '17px', padding: '16px 36px' }}>
            Start Your Eco-Quest
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--gray-400)', marginTop: '16px' }}>
          No credit card required · Free forever
        </p>

        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.12; } 50% { transform: scale(1.15); opacity: 0.18; } }
          @keyframes orbit-first { from { transform: translateX(-50%) rotate(0deg); } to { transform: translateX(-50%) rotate(360deg); } }
          @keyframes orbit-second { from { transform: translateY(-50%) rotate(0deg); } to { transform: translateY(-50%) rotate(360deg); } }
          @keyframes orbit-third { from { transform: translateX(-50%) rotate(0deg); } to { transform: translateX(-50%) rotate(360deg); } }
          @keyframes orbit-fourth { from { transform: translateY(-50%) rotate(0deg); } to { transform: translateY(-50%) rotate(360deg); } }
          @keyframes float-particle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        `}</style>
      </div>
    </>
  );
};

export default Home;
