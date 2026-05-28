// Karnataka districts + helpers for the DBoss Fan Army.
// Coordinates are roughly normalized to a 1000x1000 viewBox of Karnataka.

export const DISTRICTS = [
  "Bagalkot","Ballari","Belagavi","Bengaluru Rural","Bengaluru Urban",
  "Bidar","Chamarajanagar","Chikballapur","Chikkamagaluru","Chitradurga",
  "Dakshina Kannada","Davanagere","Dharwad","Gadag","Hassan",
  "Haveri","Kalaburagi","Kodagu","Kolar","Koppal",
  "Mandya","Mysuru","Raichur","Ramanagara","Shivamogga",
  "Tumakuru","Udupi","Uttara Kannada","Vijayanagara","Vijayapura","Yadgir",
] as const;

export type District = (typeof DISTRICTS)[number];

// Approximate (x,y) markers across a stylized Karnataka outline (0..1000).
export const DISTRICT_POSITIONS: Record<string, { x: number; y: number }> = {
  "Bidar":             { x: 720, y: 60  },
  "Kalaburagi":        { x: 660, y: 130 },
  "Yadgir":            { x: 690, y: 210 },
  "Raichur":           { x: 660, y: 280 },
  "Vijayapura":        { x: 470, y: 130 },
  "Bagalkot":          { x: 430, y: 220 },
  "Belagavi":          { x: 280, y: 230 },
  "Gadag":             { x: 430, y: 320 },
  "Dharwad":           { x: 330, y: 320 },
  "Haveri":            { x: 380, y: 400 },
  "Koppal":            { x: 530, y: 320 },
  "Ballari":           { x: 600, y: 380 },
  "Vijayanagara":      { x: 540, y: 400 },
  "Uttara Kannada":    { x: 220, y: 380 },
  "Shivamogga":        { x: 320, y: 480 },
  "Davanagere":        { x: 470, y: 470 },
  "Chitradurga":       { x: 530, y: 530 },
  "Udupi":             { x: 200, y: 510 },
  "Chikkamagaluru":    { x: 320, y: 580 },
  "Tumakuru":          { x: 560, y: 620 },
  "Chikballapur":      { x: 640, y: 640 },
  "Kolar":             { x: 700, y: 690 },
  "Bengaluru Rural":   { x: 620, y: 710 },
  "Bengaluru Urban":   { x: 600, y: 740 },
  "Ramanagara":        { x: 560, y: 740 },
  "Mandya":            { x: 500, y: 760 },
  "Hassan":            { x: 400, y: 670 },
  "Dakshina Kannada":  { x: 230, y: 640 },
  "Kodagu":            { x: 320, y: 720 },
  "Mysuru":            { x: 420, y: 790 },
  "Chamarajanagar":    { x: 470, y: 870 },
};

// Stylized SVG path approximating the Karnataka outline.
export const KARNATAKA_PATH =
  "M540 30 L760 50 L800 130 L760 240 L720 320 L740 400 L680 460 L620 520 L600 600 L660 680 L700 760 L640 830 L540 880 L450 920 L380 880 L320 800 L250 720 L210 620 L180 540 L170 450 L210 360 L250 280 L230 200 L290 140 L370 90 L460 50 Z";

export const DBOSS_BIRTHDAY_MONTH = 2; // Feb (1-indexed)
export const DBOSS_BIRTHDAY_DAY = 16;

export function nextBirthday(now = new Date()): Date {
  const year = now.getFullYear();
  const candidate = new Date(year, DBOSS_BIRTHDAY_MONTH - 1, DBOSS_BIRTHDAY_DAY, 0, 0, 0);
  if (candidate.getTime() <= now.getTime()) {
    candidate.setFullYear(year + 1);
  }
  return candidate;
}

export const POST_TYPE_LABEL: Record<string, string> = {
  photo: "Photo",
  video: "Video",
  message: "Message",
  edit: "Fan Edit",
  birthday: "Birthday Wish",
};
