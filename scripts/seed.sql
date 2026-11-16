-- =========================================================================
-- SQL SEED SCRIPT FOR AHMED QOMPOZ PORTFOLIO (NEON POSTGRESQL)
-- Inserts or updates the top 6 production platforms directly into the DB.
-- You can copy-paste and run this in Neon Console > SQL Editor.
-- =========================================================================

INSERT INTO projects (
  id,
  title,
  description,
  image_url,
  live_url,
  github_url,
  tags,
  gallery,
  featured,
  created_at,
  updated_at
) VALUES 
(
  'ofuq-smart-cafe',
  'Ofuq Cloud POS & Real-Time QR Ordering',
  'منظومة سحابية لحظية لإدارة طلبات الطاولات عبر الـ QR ونقاط البيع السحابية مع مزامنة فورية للمطبخ والكاشير. | ⚡ مزامنة لحظية في أقل من 150ms وانعدام تام لفقدان الطلبات وقت الذروة',
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=500&fit=crop',
  'https://ofuq.cafe',
  'https://github.com/ahmedqompoz/ofuq-pos',
  'Real-time, Next.js, WebSockets, PostgreSQL, Tailwind CSS',
  '["https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=500&fit=crop","https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&h=500&fit=crop"]',
  true,
  NOW(),
  NOW()
),
(
  'kafaah-logistics-erp',
  'Kafa''ah Logistics & Gov-Integrated ERP',
  'محرك لإدارة العمليات واللوجستيات مرتبط بالأنظمة الحكومية الرسمية عبر Webhooks موثقة بـ HMAC وتتبع لحظي. | 🏢 أتمتة 90% من عمليات الشحن وسجل تدقيق مشفر غير قابل للتلاعب',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop',
  'https://kafaah.app',
  'https://github.com/ahmedqompoz/kafaah-erp',
  'Gov Integration, Next.js, TypeScript, Drizzle ORM, HMAC / Static IP',
  '["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop","https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&h=500&fit=crop"]',
  true,
  NOW(),
  NOW()
),
(
  'aact-secure-evoting',
  'AACT Cryptographic E-Voting Platform',
  'منظومة اقتراع إلكتروني مشفرة تضمن سرية اقتراع الناخب مع سجل تدقيق شفاف غير قابل للتعديل (Tamper-Proof). | 🔒 إدارة 10,000+ ناخب متزامن موثق مع صفر حالات تلاعب',
  'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&h=500&fit=crop',
  'https://aact-vote.org',
  'https://github.com/ahmedqompoz/aact-voting',
  'Enterprise & Security, Next.js, PostgreSQL, RBAC, Cryptography',
  '["https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&h=500&fit=crop"]',
  true,
  NOW(),
  NOW()
),
(
  'canaan-real-estate',
  'Canaan Real Estate Marketplace & CRM',
  'بوابة عقارية سحابية بمحرك بحث مكاني متقدم، إدارة عقود ومعاينات فورية، ونظام CRM متكامل للوسطاء. | 🏡 بحث مكاني أسرع بـ 4 أضعاف وإدارة أكثر من 350 عقار معتمد',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop',
  'https://canaan-estate.com',
  'https://github.com/ahmedqompoz/canaan-estate',
  'Real Estate, React, Tailwind CSS, PostgreSQL, Spatial Search',
  '["https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop"]',
  true,
  NOW(),
  NOW()
),
(
  'orchida-ai-edtech',
  'Orchida AI Adaptive Learning & Tutoring',
  'منصة تعليمية ذكية تولد اختبارات تفاعلية وشروحات موجهة لحظياً بناءً على تقييم مستوى الطالب ونقاط ضعفه. | 🧠 توليد الأسئلة في أقل من 1.2 ثانية وتحسين استيعاب الطلاب بنسبة 42%',
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop',
  'https://orchida.ai',
  'https://github.com/ahmedqompoz/orchida-ai',
  'AI & EdTech, Next.js, Gemini API, PostgreSQL, Drizzle ORM',
  '["https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop"]',
  true,
  NOW(),
  NOW()
),
(
  'prescripto-medical-saas',
  'Prescripto Telehealth & Clinic Appointments SaaS',
  'نظام سحابي لحجز المواعيد الطبية يمنع تضارب الحجوزات مع إدارة ذكية لجداول الأطباء وسجلات المرضى. | 🏥 منع كامل لتضارب المواعيد وحجز مؤتمت للمرضى على مدار 24 ساعة',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop',
  'https://prescripto-health.vercel.app',
  'https://github.com/ahmedqompoz/prescripto',
  'Healthcare, Next.js, TypeScript, Tailwind CSS, Slot Sync',
  '["https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop"]',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  live_url = EXCLUDED.live_url,
  github_url = EXCLUDED.github_url,
  tags = EXCLUDED.tags,
  gallery = EXCLUDED.gallery,
  featured = EXCLUDED.featured,
  updated_at = NOW();
