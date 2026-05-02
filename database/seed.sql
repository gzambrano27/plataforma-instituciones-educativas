INSERT INTO edu_roles (code, name, is_system)
VALUES
('superadmin', 'Superadministrador', TRUE),
('admin_institucional', 'Administrador institucional', TRUE),
('docente', 'Docente', TRUE),
('estudiante', 'Estudiante', TRUE),
('representante', 'Representante', TRUE)
ON CONFLICT (code) DO NOTHING;

INSERT INTO edu_institutions (
  id,
  name,
  slug,
  institution_type,
  contact_email,
  contact_phone,
  address,
  active_school_year_label
)
VALUES (
  '10000000-0000-0000-0000-000000000001',
  'Unidad Educativa Demo Educa',
  'unidad-educativa-demo-educa',
  'privada',
  'info@educa.demo',
  '+593000000000',
  'Quito, Ecuador',
  '2026-2027'
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO edu_users (
  id,
  institution_id,
  full_name,
  email,
  password_hash,
  status
)
VALUES (
  '20000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  'Guiller JR',
  'admin@educa.local',
  crypt('Educa2026!', gen_salt('bf')),
  'active'
)
ON CONFLICT (email) DO NOTHING;

INSERT INTO edu_user_roles (user_id, role_id)
SELECT '20000000-0000-0000-0000-000000000001', r.id
FROM edu_roles r
WHERE r.code = 'superadmin'
ON CONFLICT DO NOTHING;
