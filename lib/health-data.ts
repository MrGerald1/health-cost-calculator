// Health diagnosis data extracted from the provided JSON
export interface Procedure {
  name: string
  cost: number
}

export interface Diagnosis {
  id: string
  label: string
  layLabel: string
  coverageCategory: string
  procedures: Procedure[]
  suggestedRelations: string[]
}

export interface State {
  slug: string
  name: string
  multiplier: number
}

// Aggregated diagnosis data from the provided procedures JSON
export const DIAGNOSES: Diagnosis[] = [
  {
    id: "MAL",
    label: "Malaria",
    layLabel: "Malaria",
    coverageCategory: "Outpatient & Diagnostics",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Malaria test", cost: 1230 },
      { name: "Malaria medicine", cost: 2370 },
      { name: "Paracetamol", cost: 340 },
    ],
    suggestedRelations: ["FEVER", "TEST"],
  },
  {
    id: "FEVER",
    label: "Fever",
    layLabel: "Fever",
    coverageCategory: "Hospital Care",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Blood test", cost: 2880 },
      { name: "Urine test", cost: 1330 },
      { name: "Malaria test", cost: 1230 },
      { name: "Paracetamol", cost: 340 },
    ],
    suggestedRelations: ["MAL", "COLD"],
  },
  {
    id: "COLD",
    label: "Common Cold / Pharyngitis",
    layLabel: "Cold & Cough",
    coverageCategory: "Outpatient & Diagnostics",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Paracetamol", cost: 340 },
      { name: "Allergy tablet", cost: 400 },
      { name: "Throat lozenge", cost: 1130 },
      { name: "Antibiotic", cost: 1590 },
    ],
    suggestedRelations: ["COUGH", "FEVER"],
  },
  {
    id: "TYPHOID",
    label: "Typhoid and Salmonella Infections",
    layLabel: "Typhoid",
    coverageCategory: "Hospital Care",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Blood test", cost: 2880 },
      { name: "Typhoid antibiotic", cost: 430 },
      { name: "Paracetamol", cost: 340 },
    ],
    suggestedRelations: [],
  },
  {
    id: "ULCER",
    label: "Peptic Ulcer Disease",
    layLabel: "Ulcer",
    coverageCategory: "Specialist Care",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Ulcer test", cost: 2400 },
      { name: "Ulcer medicine", cost: 1200 },
      { name: "Antibiotic", cost: 1590 },
      { name: "Antacid tablet", cost: 760 },
    ],
    suggestedRelations: [],
  },
  {
    id: "PREG",
    label: "Pregnancy and Related Conditions",
    layLabel: "Antenatal Care",
    coverageCategory: "Family & Maternity",
    procedures: [
      { name: "Antenatal check-up", cost: 2550 },
      { name: "Pregnancy test", cost: 1500 },
      { name: "Blood count test", cost: 2880 },
      { name: "Urine test", cost: 1330 },
      { name: "Iron supplement", cost: 7050 },
      { name: "Folic acid tablet", cost: 290 },
      { name: "Prenatal multivitamin", cost: 710 },
    ],
    suggestedRelations: [],
  },
  {
    id: "COUGH",
    label: "Cough",
    layLabel: "Cough",
    coverageCategory: "Outpatient & Diagnostics",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Chest X-ray", cost: 5000 },
      { name: "Cough syrup", cost: 3620 },
      { name: "Expectorant syrup", cost: 1450 },
      { name: "Asthma/cough tablet", cost: 640 },
    ],
    suggestedRelations: ["COLD"],
  },
  {
    id: "PAIN",
    label: "Pain (Low Back Pain, Tension Headache)",
    layLabel: "Pain & Headaches",
    coverageCategory: "Outpatient & Diagnostics",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Pain relief tablet", cost: 980 },
      { name: "Paracetamol", cost: 340 },
      { name: "Pain relief gel", cost: 3610 },
    ],
    suggestedRelations: ["MUSCLE"],
  },
  {
    id: "GI",
    label: "Gastrointestinal Disorders",
    layLabel: "Stomach Issues",
    coverageCategory: "Outpatient & Diagnostics",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Rehydration salts", cost: 850 },
      { name: "Diarrhea medicine", cost: 330 },
      { name: "Zinc supplement", cost: 540 },
      { name: "Antibiotic", cost: 1180 },
      { name: "IV fluid", cost: 3620 },
    ],
    suggestedRelations: ["DEHYDRATION"],
  },
  {
    id: "UTI",
    label: "Urinary Tract Infections",
    layLabel: "UTI",
    coverageCategory: "Outpatient & Diagnostics",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Urine test", cost: 1330 },
      { name: "Urine culture test", cost: 4750 },
    ],
    suggestedRelations: [],
  },
  {
    id: "HTN",
    label: "Hypertension",
    layLabel: "High Blood Pressure",
    coverageCategory: "Specialist Care",
    procedures: [
      { name: "Blood pressure check", cost: 2550 },
      { name: "Blood sugar test", cost: 1300 },
      { name: "Blood pressure medicine", cost: 700 },
      { name: "Water tablet", cost: 1440 },
    ],
    suggestedRelations: [],
  },
  {
    id: "SKIN",
    label: "Skin Conditions & Rashes",
    layLabel: "Skin Rash",
    coverageCategory: "Outpatient & Diagnostics",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Antibiotic", cost: 4900 },
      { name: "Pain relief tablet", cost: 870 },
      { name: "Wound dressing", cost: 2440 },
    ],
    suggestedRelations: [],
  },
  {
    id: "ANEMIA",
    label: "Anemia",
    layLabel: "Anemia",
    coverageCategory: "Specialist Care",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Vitamin B supplement", cost: 120 },
      { name: "Blood count test", cost: 2880 },
      { name: "Iron tablet", cost: 210 },
    ],
    suggestedRelations: [],
  },
  {
    id: "DIABETES",
    label: "Diabetes Mellitus",
    layLabel: "Diabetes",
    coverageCategory: "Specialist Care",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Blood sugar test", cost: 1300 },
      { name: "Urine sugar test", cost: 1330 },
    ],
    suggestedRelations: [],
  },
  {
    id: "WOUND",
    label: "Open Wounds / Injuries",
    layLabel: "Wound",
    coverageCategory: "Hospital Care",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Wound dressing", cost: 2440 },
      { name: "Tetanus injection", cost: 970 },
      { name: "Antibiotic", cost: 1590 },
    ],
    suggestedRelations: [],
  },
  {
    id: "MUSCLE",
    label: "Muscle Related Issues",
    layLabel: "Muscle Pain",
    coverageCategory: "Specialist Care",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Pain relief tablet", cost: 980 },
      { name: "Joint/muscle pain gel", cost: 3610 },
      { name: "Pain relief gel", cost: 1530 },
    ],
    suggestedRelations: ["PAIN"],
  },
  {
    id: "CHECKUP",
    label: "Routine Health Examinations",
    layLabel: "Health Checkup",
    coverageCategory: "Wellness & Preventive",
    procedures: [
      { name: "Health check-up", cost: 2550 },
      { name: "Blood count test", cost: 2880 },
      { name: "Blood sugar test", cost: 1300 },
      { name: "Urine test", cost: 1330 },
    ],
    suggestedRelations: [],
  },
  {
    id: "ASTHMA",
    label: "Asthma",
    layLabel: "Asthma",
    coverageCategory: "Specialist Care",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Asthma tablet", cost: 640 },
      { name: "Allergy tablet", cost: 400 },
      { name: "Steroid tablet", cost: 300 },
    ],
    suggestedRelations: [],
  },
  {
    id: "ALLERGY",
    label: "Allergic Reactions",
    layLabel: "Allergies",
    coverageCategory: "Specialist Care",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Allergy tablet", cost: 400 },
      { name: "Piriton tablet", cost: 140 },
      { name: "Nose spray", cost: 13530 },
    ],
    suggestedRelations: [],
  },
  {
    id: "PNEUMONIA",
    label: "Pneumonia",
    layLabel: "Pneumonia",
    coverageCategory: "Hospital Care",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Chest X-ray", cost: 5000 },
      { name: "Blood test", cost: 2880 },
      { name: "Antibiotic", cost: 1590 },
      { name: "Paracetamol", cost: 340 },
    ],
    suggestedRelations: [],
  },
  {
    id: "PID",
    label: "Female Pelvic Inflammatory Disease",
    layLabel: "PID",
    coverageCategory: "Family & Maternity",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Antibiotic", cost: 1180 },
    ],
    suggestedRelations: [],
  },
  {
    id: "CANDIDA",
    label: "Candidiasis (Vaginal)",
    layLabel: "Yeast Infection",
    coverageCategory: "Family & Maternity",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Antifungal cream", cost: 2750 },
      { name: "Vaginal tablet", cost: 3830 },
      { name: "Pessary", cost: 2560 },
      { name: "Oral antifungal", cost: 2170 },
    ],
    suggestedRelations: [],
  },
  {
    id: "CONJUNCTIVITIS",
    label: "Conjunctivitis (Pink Eye)",
    layLabel: "Pink Eye",
    coverageCategory: "Outpatient & Diagnostics",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Eye drop", cost: 640 },
      { name: "Eye ointment", cost: 820 },
    ],
    suggestedRelations: [],
  },
  {
    id: "OTITIS",
    label: "Otitis Media (Ear Infection)",
    layLabel: "Ear Infection",
    coverageCategory: "Outpatient & Diagnostics",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Pain relief tablet", cost: 870 },
      { name: "Antibiotic", cost: 1590 },
    ],
    suggestedRelations: [],
  },
  {
    id: "SPRAIN",
    label: "Sprains and Strains",
    layLabel: "Sprain",
    coverageCategory: "Outpatient & Diagnostics",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Pain relief gel", cost: 1530 },
      { name: "Pain relief tablet", cost: 870 },
    ],
    suggestedRelations: [],
  },
  {
    id: "DEHYDRATION",
    label: "Dehydration",
    layLabel: "Dehydration",
    coverageCategory: "Hospital Care",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Blood test", cost: 2880 },
      { name: "Rehydration salts", cost: 850 },
      { name: "IV line insertion", cost: 440 },
      { name: "IV fluid", cost: 3620 },
    ],
    suggestedRelations: [],
  },
  {
    id: "VERTIGO",
    label: "Vertigo / Dizziness",
    layLabel: "Dizziness",
    coverageCategory: "Outpatient & Diagnostics",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Dizziness tablet", cost: 1090 },
    ],
    suggestedRelations: [],
  },
  {
    id: "SICKLE",
    label: "Sickle-Cell Disorders",
    layLabel: "Sickle Cell",
    coverageCategory: "Specialist Care",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Blood test", cost: 2880 },
      { name: "Folic acid tablet", cost: 290 },
      { name: "Pain relief tablet", cost: 870 },
      { name: "Malaria prevention tablet", cost: 2620 },
      { name: "Malaria prevention medicine", cost: 1970 },
      { name: "Pain/fever relief", cost: 340 },
    ],
    suggestedRelations: [],
  },
  {
    id: "HEMORRHOID",
    label: "Hemorrhoids",
    layLabel: "Hemorrhoids",
    coverageCategory: "Specialist Care",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Hemorrhoid suppository", cost: 2600 },
      { name: "Vein strength tablet", cost: 1740 },
      { name: "Stool softener", cost: 1050 },
    ],
    suggestedRelations: [],
  },
  {
    id: "VAGINITIS",
    label: "Vaginitis and Vulvitis",
    layLabel: "Vaginal Infection",
    coverageCategory: "Family & Maternity",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Antibiotic", cost: 1180 },
      { name: "Antifungal cream", cost: 2750 },
      { name: "Vaginal infection tablet", cost: 3830 },
    ],
    suggestedRelations: [],
  },
  {
    id: "CONSTIPATION",
    label: "Constipation",
    layLabel: "Constipation",
    coverageCategory: "Outpatient & Diagnostics",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Laxative tablet", cost: 430 },
      { name: "Constipation suppository", cost: 1010 },
      { name: "Stool softener", cost: 1050 },
    ],
    suggestedRelations: [],
  },
  {
    id: "SPASM",
    label: "Muscle Spasms",
    layLabel: "Muscle Spasm",
    coverageCategory: "Outpatient & Diagnostics",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Pain relief tablet", cost: 870 },
    ],
    suggestedRelations: [],
  },
  {
    id: "VIRAL",
    label: "Viral Infections",
    layLabel: "Viral Infection",
    coverageCategory: "Wellness & Preventive",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Paracetamol", cost: 340 },
      { name: "Vitamin C tablet", cost: 400 },
      { name: "Allergy tablet", cost: 400 },
      { name: "Multivitamin tablet", cost: 710 },
    ],
    suggestedRelations: [],
  },
  {
    id: "HYPOTENSION",
    label: "Hypotension (Low Blood Pressure)",
    layLabel: "Low Blood Pressure",
    coverageCategory: "Hospital Care",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "IV line insertion", cost: 440 },
      { name: "IV fluid", cost: 3620 },
      { name: "Blood test", cost: 2880 },
    ],
    suggestedRelations: [],
  },
  {
    id: "DYSMENORRHEA",
    label: "Painful Periods",
    layLabel: "Period Pain",
    coverageCategory: "Family & Maternity",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Pain relief tablet", cost: 870 },
    ],
    suggestedRelations: [],
  },
  {
    id: "TINEA",
    label: "Tinea Infections (Ringworm)",
    layLabel: "Ringworm",
    coverageCategory: "Outpatient & Diagnostics",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Antifungal cream", cost: 2750 },
      { name: "Antifungal tablet", cost: 910 },
      { name: "Antifungal lotion", cost: 2080 },
    ],
    suggestedRelations: [],
  },
  {
    id: "GOUT",
    label: "Gout",
    layLabel: "Gout",
    coverageCategory: "Specialist Care",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Pain relief tablet", cost: 870 },
    ],
    suggestedRelations: [],
  },
  {
    id: "EARWAX",
    label: "Ear Wax Blockage",
    layLabel: "Ear Wax",
    coverageCategory: "Outpatient & Diagnostics",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Ear wax remover", cost: 10500 },
      { name: "Ear drops", cost: 9650 },
    ],
    suggestedRelations: [],
  },
  {
    id: "SUPERFICIAL",
    label: "Superficial Injuries",
    layLabel: "Minor Injury",
    coverageCategory: "Hospital Care",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Wound dressing", cost: 2440 },
    ],
    suggestedRelations: [],
  },
  {
    id: "NUTRITION",
    label: "Nutritional Deficiencies",
    layLabel: "Nutritional Deficiency",
    coverageCategory: "Wellness & Preventive",
    procedures: [
      { name: "Doctor's consultation", cost: 2550 },
      { name: "Blood test", cost: 2880 },
      { name: "Iron supplement", cost: 7050 },
      { name: "Multivitamin tablet", cost: 710 },
      { name: "Vitamin C tablet", cost: 400 },
      { name: "Vitamin B complex", cost: 120 },
    ],
    suggestedRelations: [],
  },
]

export const DIAGNOSIS_EMOJIS: Record<string, string> = {
  MAL: "🦟",
  PAIN: "🤕",
  PREG: "🤰",
  COLD: "🤧",
  GI: "🤢",
  UTI: "💧",
  HTN: "❤️",
  SKIN: "🩹",
  ULCER: "🔥",
  TYPHOID: "🌡️",
  ANEMIA: "🩸",
  DIABETES: "🍬",
  WOUND: "🩼",
  MUSCLE: "💪",
  FEVER: "🌡️",
  ASTHMA: "💨",
  ALLERGY: "🤧",
  PNEUMONIA: "🫁",
  PID: "⚕️",
  CANDIDA: "🧴",
  CONJUNCTIVITIS: "👁️",
  OTITIS: "👂",
  SPRAIN: "🦵",
  DEHYDRATION: "💧",
  VERTIGO: "🌀",
  COUGH: "🤐",
  CHECKUP: "✅",
  SICKLE: "🩸",
  HEMORRHOID: "🚽",
  VAGINITIS: "⚕️",
  CONSTIPATION: "🚽",
  SPASM: "⚡",
  VIRAL: "🦠",
  HYPOTENSION: "📉",
  DYSMENORRHEA: "🩸",
  TINEA: "🍄",
  GOUT: "🦶",
  EARWAX: "👂",
  SUPERFICIAL: "🩹",
  NUTRITION: "🥗",
}

export const STATES: State[] = [
  { slug: "lagos", name: "Lagos", multiplier: 1.15 },
  { slug: "ogun", name: "Ogun", multiplier: 0.95 },
  { slug: "oyo", name: "Oyo", multiplier: 0.92 },
  { slug: "osun", name: "Osun", multiplier: 0.9 },
  { slug: "ondo", name: "Ondo", multiplier: 0.88 },
  { slug: "ekiti", name: "Ekiti", multiplier: 0.85 },
  { slug: "kwara", name: "Kwara", multiplier: 0.88 },
  { slug: "kogi", name: "Kogi", multiplier: 0.85 },
  { slug: "abuja", name: "Abuja (FCT)", multiplier: 1.1 },
  { slug: "nasarawa", name: "Nasarawa", multiplier: 0.82 },
  { slug: "plateau", name: "Plateau", multiplier: 0.8 },
  { slug: "kaduna", name: "Kaduna", multiplier: 0.9 },
  { slug: "katsina", name: "Katsina", multiplier: 0.78 },
  { slug: "kano", name: "Kano", multiplier: 0.92 },
  { slug: "jigawa", name: "Jigawa", multiplier: 0.75 },
  { slug: "bauchi", name: "Bauchi", multiplier: 0.8 },
  { slug: "gombe", name: "Gombe", multiplier: 0.78 },
  { slug: "yobe", name: "Yobe", multiplier: 0.75 },
  { slug: "borno", name: "Borno", multiplier: 0.72 },
  { slug: "adamawa", name: "Adamawa", multiplier: 0.8 },
  { slug: "taraba", name: "Taraba", multiplier: 0.78 },
  { slug: "benue", name: "Benue", multiplier: 0.85 },
  { slug: "cross_river", name: "Cross River", multiplier: 0.88 },
  { slug: "akwa_ibom", name: "Akwa Ibom", multiplier: 0.95 },
  { slug: "rivers", name: "Rivers", multiplier: 1.05 },
  { slug: "bayelsa", name: "Bayelsa", multiplier: 1.0 },
  { slug: "delta", name: "Delta", multiplier: 0.98 },
  { slug: "edo", name: "Edo", multiplier: 0.92 },
  { slug: "enugu", name: "Enugu", multiplier: 0.9 },
  { slug: "ebonyi", name: "Ebonyi", multiplier: 0.82 },
  { slug: "abia", name: "Abia", multiplier: 0.88 },
  { slug: "imo", name: "Imo", multiplier: 0.85 },
  { slug: "anambra", name: "Anambra", multiplier: 0.9 },
  { slug: "akwa_ibom", name: "Akwa Ibom", multiplier: 0.95 },
]

export const AVERAGE_MALARIA_SPEND = 7800
export const AVERAGE_NIGERIAN_ANNUAL_HEALTHCARE = 36000
export const AVERAGE_NIGERIAN_SPENDING = 36000
export const NIGERIAN_MINIMUM_WAGE = 70000

export interface CalculationItem {
  diagnosisId: string
  frequency: number
  costOverride: number | null
}

export interface CalculationResult {
  id: string
  state: string
  items: Array<{
    diagnosisId: string
    layLabel: string
    frequency: number
    unitCost: number
    stateUnitCost: number
    total: number
  }>
  totalAnnual: number
  savingsIfCovered80Pct: number
  percentOfMonthlyIncome: number
  createdAt: string
}

export function calculateHealthCost(
  items: CalculationItem[],
  state: string,
  monthlyIncome = 120000,
): CalculationResult {
  const stateData = STATES.find((s) => s.slug === state) || STATES[0]
  const multiplier = stateData.multiplier

  const calculatedItems = items
    .filter((item) => item.frequency > 0)
    .map((item) => {
      const diagnosis = DIAGNOSES.find((d) => d.id === item.diagnosisId)
      if (!diagnosis) return null

      const avgCost = diagnosis.procedures.reduce((sum, p) => sum + p.cost, 0) / diagnosis.procedures.length
      const unitCost = item.costOverride || avgCost
      const stateUnitCost = Math.round(unitCost * multiplier)
      const costWithBuffer = Math.round(stateUnitCost * 1.1)
      const total = costWithBuffer * item.frequency

      return {
        diagnosisId: item.diagnosisId,
        layLabel: diagnosis.layLabel,
        frequency: item.frequency,
        unitCost: Math.round(unitCost),
        stateUnitCost,
        total,
      }
    })
    .filter((item) => item !== null) as CalculationResult["items"]

  const totalAnnual = calculatedItems.reduce((sum, item) => sum + item.total, 0)
  const savingsIfCovered80Pct = Math.round(totalAnnual * 0.8)
  const percentOfMonthlyIncome = Math.round((totalAnnual / monthlyIncome) * 100 * 10) / 10

  return {
    id: `calc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    state,
    items: calculatedItems,
    totalAnnual,
    savingsIfCovered80Pct,
    percentOfMonthlyIncome,
    createdAt: new Date().toISOString(),
  }
}
