-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ENUMS for status (Good practice to ensure data integrity)
CREATE TYPE estado_club AS ENUM ('pendiente', 'aprobado', 'rechazado');
CREATE TYPE estado_partido AS ENUM ('programado', 'en_vivo', 'finalizado', 'reprogramado');

-- 1. Table: categorias (Implicitly required for foreign keys)
CREATE TABLE categorias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre TEXT NOT NULL,
    rama TEXT CHECK (rama IN ('Masculino', 'Femenino', 'Mixto')),
    descripcion TEXT
);

-- 2. Table: clubes
CREATE TABLE clubes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre TEXT NOT NULL,
    email_oficial TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL, -- Note: Ideally use Supabase Auth (auth.users), this is for the custom requirement.
    logo_url TEXT,
    personas_autorizadas JSONB DEFAULT '[]'::JSONB, -- Structure: [{ "nombre": "...", "telefono": "..." }]
    estado estado_club DEFAULT 'pendiente',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table: jugadores
CREATE TABLE jugadores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    club_id UUID REFERENCES clubes(id) ON DELETE SET NULL,
    dni TEXT UNIQUE NOT NULL,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    foto_url TEXT,
    altura INTEGER, -- in cm
    posicion TEXT,
    genero TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Table: inscripciones_anuales
CREATE TABLE inscripciones_anuales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    jugador_id UUID REFERENCES jugadores(id) ON DELETE CASCADE,
    anio INTEGER NOT NULL,
    categoria_id UUID REFERENCES categorias(id) ON DELETE RESTRICT,
    estado TEXT DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo', 'suspendido')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(jugador_id, anio)
);

-- 5. Table: torneos
CREATE TABLE torneos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre TEXT NOT NULL,
    fecha_inicio DATE,
    fecha_fin DATE,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Table: partidos
CREATE TABLE partidos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    torneo_id UUID REFERENCES torneos(id) ON DELETE CASCADE,
    categoria_id UUID REFERENCES categorias(id) ON DELETE SET NULL,
    equipo_local_id UUID REFERENCES clubes(id) ON DELETE CASCADE,
    equipo_visitante_id UUID REFERENCES clubes(id) ON DELETE CASCADE,
    fecha_hora TIMESTAMPTZ NOT NULL,
    cancha TEXT,
    estado estado_partido DEFAULT 'programado',
    resultado_sets JSONB DEFAULT '[]'::JSONB, -- Array of strings e.g. ["25-20", "20-25"] or objects
    ganador_id UUID REFERENCES clubes(id) ON DELETE SET NULL,
    max_sets INTEGER DEFAULT 5, -- To distinguish between 3 or 5 set matches logic
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Table: planilla_partido
CREATE TABLE planilla_partido (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partido_id UUID REFERENCES partidos(id) ON DELETE CASCADE,
    jugador_id UUID REFERENCES jugadores(id) ON DELETE CASCADE,
    es_mvp BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE clubes ENABLE ROW LEVEL SECURITY;
ALTER TABLE jugadores ENABLE ROW LEVEL SECURITY;
ALTER TABLE inscripciones_anuales ENABLE ROW LEVEL SECURITY;
ALTER TABLE torneos ENABLE ROW LEVEL SECURITY;
ALTER TABLE partidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE planilla_partido ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;

-- Basic Policies (Examples - adjust based on actual Auth implementation)

-- Public Read Access
CREATE POLICY "Public Read Clubes" ON clubes FOR SELECT USING (true);
CREATE POLICY "Public Read Jugadores" ON jugadores FOR SELECT USING (true);
CREATE POLICY "Public Read Torneos" ON torneos FOR SELECT USING (true);
CREATE POLICY "Public Read Partidos" ON partidos FOR SELECT USING (true);
CREATE POLICY "Public Read Categorias" ON categorias FOR SELECT USING (true);

-- Admin Only Write Access (assuming a claim or specific role check)
-- For simplicity in this schema, we leave write policies restrictive or tied to user ID if we were using auth.users
-- Example: CREATE POLICY "Admin Write" ON torneos FOR ALL USING (auth.jwt() ->> 'role' = 'admin');


-- BUSINESS LOGIC FUNCTIONS

-- Function to Calculate Points based on Sets
CREATE OR REPLACE FUNCTION calcular_puntos(
    sets_local INT,
    sets_visitante INT,
    max_sets INT
)
RETURNS TABLE (puntos_local INT, puntos_visitante INT)
LANGUAGE plpgsql
AS $$
BEGIN
    IF max_sets = 3 THEN
        IF sets_local = 2 AND sets_visitante = 0 THEN
            RETURN QUERY SELECT 3, 0;
        ELSIF sets_local = 2 AND sets_visitante = 1 THEN
            RETURN QUERY SELECT 2, 1;
        ELSIF sets_visitante = 2 AND sets_local = 0 THEN
            RETURN QUERY SELECT 0, 3;
        ELSIF sets_visitante = 2 AND sets_local = 1 THEN
            RETURN QUERY SELECT 1, 2;
        ELSE
             -- Draw or incomplete (should not happen in volleyball usually but handled)
             RETURN QUERY SELECT 0, 0;
        END IF;
    ELSIF max_sets = 5 THEN
        IF sets_local = 3 AND (sets_visitante = 0 OR sets_visitante = 1) THEN
            RETURN QUERY SELECT 3, 0;
        ELSIF sets_local = 3 AND sets_visitante = 2 THEN
            RETURN QUERY SELECT 2, 1;
        ELSIF sets_visitante = 3 AND (sets_local = 0 OR sets_local = 1) THEN
            RETURN QUERY SELECT 0, 3;
        ELSIF sets_visitante = 3 AND sets_local = 2 THEN
            RETURN QUERY SELECT 1, 2;
        ELSE
            RETURN QUERY SELECT 0, 0;
        END IF;
    ELSE
        RETURN QUERY SELECT 0, 0;
    END IF;
END;
$$;

-- Trigger to update updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_clubes_modtime BEFORE UPDATE ON clubes FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_jugadores_modtime BEFORE UPDATE ON jugadores FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_partidos_modtime BEFORE UPDATE ON partidos FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
