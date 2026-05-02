INSERT INTO edu_roles (code, name, is_system)
VALUES
('superadmin', 'Superadministrador', TRUE),
('admin_institucional', 'Administrador institucional', TRUE),
('docente', 'Docente', TRUE),
('estudiante', 'Estudiante', TRUE),
('representante', 'Representante', TRUE)
ON CONFLICT (code) DO NOTHING;
