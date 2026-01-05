export type EstadoClub = 'pendiente' | 'aprobado' | 'rechazado';
export type EstadoPartido = 'programado' | 'en_vivo' | 'finalizado' | 'reprogramado';

export interface Categoria {
  id: string;
  nombre: string;
  rama: 'Masculino' | 'Femenino' | 'Mixto';
  descripcion?: string;
}

export interface Club {
  id: string;
  nombre: string;
  email_oficial: string;
  // password_hash is typically not exposed to the frontend
  logo_url?: string;
  personas_autorizadas: {
    nombre: string;
    telefono: string;
  }[];
  estado: EstadoClub;
  created_at: string;
  updated_at: string;
}

export interface Jugador {
  id: string;
  club_id: string;
  dni: string;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string; // ISO Date string
  foto_url?: string;
  altura?: number; // cm
  posicion?: string;
  genero?: string;
  created_at: string;
  updated_at: string;
}

export interface InscripcionAnual {
  id: string;
  jugador_id: string;
  anio: number;
  categoria_id: string;
  estado: 'activo' | 'inactivo' | 'suspendido';
  created_at: string;
}

export interface Torneo {
  id: string;
  nombre: string;
  fecha_inicio?: string;
  fecha_fin?: string;
  activo: boolean;
  created_at: string;
}

export interface Partido {
  id: string;
  torneo_id: string;
  categoria_id: string;
  equipo_local_id: string;
  equipo_visitante_id: string;
  fecha_hora: string; // ISO Timestamp
  cancha?: string;
  estado: EstadoPartido;
  resultado_sets: string[]; // e.g., ["25-20", "20-25"]
  ganador_id?: string;
  max_sets: number;
  created_at: string;
  updated_at: string;
}

export interface PlanillaPartido {
  id: string;
  partido_id: string;
  jugador_id: string;
  es_mvp: boolean;
  created_at: string;
}

// Frontend specific types / DTOs
export interface MatchScore {
  local: number;
  visitor: number;
}
