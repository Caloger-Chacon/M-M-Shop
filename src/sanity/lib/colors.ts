export const COLOR_MAP: Record<string, string> = {
  Negro: '#1a1a1a',
  Terracota: '#C67B5C',
  Beige: '#E8DCC8',
  Camel: '#C19A6B',
  Burdeos: '#641E36',
  Rosa: '#E8A7B8',
  Verde: '#4A7C59',
  Dorado: '#D4AF37',
  Plateado: '#C0C0C0',
  'Azul marino': '#1F3A5F',
  'Azul claro': '#ADD8E6',
  Café: '#6F4E37',
  Blanco: '#FFFFFF',
  Gris: '#808080',
  Rojo: '#C0392B',
  Marrón: '#8B4513',
}

export function getColorHex(color: string, fallback?: string) {
  return fallback || COLOR_MAP[color] || '#cccccc'
}