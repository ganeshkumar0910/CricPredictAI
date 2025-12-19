
export interface PredictionInputs {
  batsmanName: string;
  opponentTeam: string;
  ground: string;
  conditions: string;
  matchFormat: string;
  battingOrder: number;
  tossContext: string;
  recentForm: string;
  // New Inputs
  pitchNature: string;
  matchType: string;
  playerRole: string;
  pressureLevel: string;
}

export interface PredictionResult {
  expectedRuns: { min: number; max: number; avg: number };
  strikeRate: number;
  probabilityOfFifty: number;
  probabilityOfHundred: number;
  probabilityOfThirty: number;
  performanceAgainstPace: number;
  performanceAgainstSpin: number;
  primaryThreat: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  keyInsights: string[];
  phasedAnalysis: {
    phase: string;
    expectedRuns: number;
    intensity: number; // 0-100
  }[];
  technicalAdvice: string;
}

export const COMMON_TEAMS = [
  'India', 'Australia', 'England', 'South Africa', 'New Zealand', 
  'Pakistan', 'Sri Lanka', 'West Indies', 'Bangladesh', 'Afghanistan'
];

export const COMMON_CONDITIONS = ['Clear Skies', 'Overcast', 'Humid', 'Rainy Forecast', 'Windy'];
export const MATCH_FORMATS = ['T20 International', 'ODI', 'Test Match', 'T20 League'];
export const TOSS_CONTEXTS = ['Batting First', 'Batting Second (Chasing)'];
export const FORM_LEVELS = ['Excellent', 'Good', 'Average', 'Poor'];

// New Constants
export const PITCH_NATURES = ['Green (Pace/Swing)', 'Flat (Batting Paradise)', 'Dusty (Spin)', 'Bouncy (Hard)', 'Slow (Low Bounce)'];
export const MATCH_TYPES = ['Day Match', 'Day/Night (Floodlights)'];
export const PLAYER_ROLES = ['Aggressive Opener', 'Top-Order Anchor', 'Middle-Order Finisher', 'Lower-Order Hitter'];
export const PRESSURE_LEVELS = ['Normal (League)', 'High (Qualifier/Semi)', 'Extreme (Final)'];
