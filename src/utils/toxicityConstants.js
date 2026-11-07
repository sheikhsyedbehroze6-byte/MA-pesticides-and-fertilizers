/**
 * CIBRC Statutory Toxicity Classifications (Insecticides Act, 1968)
 * Standard Indian Agrochemical Warning Color System
 */
export const CIBRC_TOXICITY_CLASSES = {
  RED: {
    label: 'Extremely Toxic (Class I-A)',
    color: '#dc2626',
    bg: '#fef2f2',
    border: '#fca5a5',
    urdu: 'انتہائی زہریلا (شدید احتیاط)',
    symbol: 'Skull & Crossbones',
    oralLd50: '1 - 50 mg/kg',
    description: 'Requires mandatory full-face respirator, chemical-resistant rubber gloves, and zero unauthorized exposure.'
  },
  YELLOW: {
    label: 'Highly Toxic (Class I-B)',
    color: '#d97706',
    bg: '#fffbeb',
    border: '#fcd34d',
    urdu: 'بہت زیادہ زہریلا (خطرہ)',
    symbol: 'Danger / Poison',
    oralLd50: '51 - 500 mg/kg',
    description: 'Strict waiting period required before orchard re-entry. Keep completely away from water canals and livestock.'
  },
  BLUE: {
    label: 'Moderately Toxic (Class II)',
    color: '#2563eb',
    bg: '#eff6ff',
    border: '#93c5fd',
    urdu: 'معتدل زہریلا (احتیاط ضروری)',
    symbol: 'Danger / Caution',
    oralLd50: '501 - 5000 mg/kg',
    description: 'Common orchard fungicides and broad-spectrum protectors. Use standard spray suit, goggles, and eye wash.'
  },
  GREEN: {
    label: 'Slightly Toxic / Bio (Class III)',
    color: '#16a34a',
    bg: '#f0fdf4',
    border: '#86efac',
    urdu: 'کم زہریلا / نامیاتی (محفوظ)',
    symbol: 'Caution',
    oralLd50: '> 5000 mg/kg',
    description: 'Plant tonics, bio-stimulants, and microbial preparations. Low toxicity to mammals; safe for beneficial orchard pollinators.'
  }
};

/**
 * Helper to determine approximate CIBRC class from product data
 */
export function getProductToxicity(product) {
  if (!product) return CIBRC_TOXICITY_CLASSES.GREEN;
  const type = (product.type || '').toLowerCase();
  const name = (product.name || '').toLowerCase();
  const comp = (product.composition || '').toLowerCase();

  if (comp.includes('chlorpyrifos') || comp.includes('monocrotophos') || name.includes('cyclone 505')) {
    return CIBRC_TOXICITY_CLASSES.YELLOW;
  }
  if (type.includes('bio-stimulant') || type.includes('plant tonic') || type.includes('bio-fertilizer') || name.includes('tingo')) {
    return CIBRC_TOXICITY_CLASSES.GREEN;
  }
  if (type.includes('insecticide') || comp.includes('lambda-cyhalothrin') || comp.includes('thiamethoxam')) {
    return CIBRC_TOXICITY_CLASSES.YELLOW;
  }
  // Default for agricultural fungicides (Propineb, Dodine, Hexaconazole, etc.)
  return CIBRC_TOXICITY_CLASSES.BLUE;
}

