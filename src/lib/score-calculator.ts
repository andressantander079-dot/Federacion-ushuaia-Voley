/**
 * Parses a set score string (e.g., "25-20") into numbers.
 */
export function parseSetScore(scoreStr: string): { local: number; visitor: number } | null {
  const parts = scoreStr.split('-');
  if (parts.length !== 2) return null;
  const local = parseInt(parts[0], 10);
  const visitor = parseInt(parts[1], 10);
  if (isNaN(local) || isNaN(visitor)) return null;
  return { local, visitor };
}

/**
 * Calculates the total sets won by each team based on the array of set scores.
 */
export function calculateSetsWon(setScores: string[]): { localSets: number; visitorSets: number } {
  let localSets = 0;
  let visitorSets = 0;

  for (const score of setScores) {
    const parsed = parseSetScore(score);
    if (!parsed) continue;

    if (parsed.local > parsed.visitor) {
      localSets++;
    } else if (parsed.visitor > parsed.local) {
      visitorSets++;
    }
  }

  return { localSets, visitorSets };
}

/**
 * Calculates the league points for the match based on the sets won.
 *
 * Rules:
 * Partidos de 3 sets:
 * - 2-0 (3pts ganador, 0 perdedor).
 * - 2-1 (2pts ganador, 1 perdedor).
 *
 * Partidos de 5 sets:
 * - 3-0/3-1 (3pts ganador, 0 perdedor).
 * - 3-2 (2pts ganador, 1 perdedor).
 */
export function calculateLeaguePoints(
  localSets: number,
  visitorSets: number,
  maxSets: number = 5
): { localPoints: number; visitorPoints: number } {
  // Default return
  let localPoints = 0;
  let visitorPoints = 0;

  if (maxSets === 3) {
    if (localSets === 2 && visitorSets === 0) {
      localPoints = 3;
      visitorPoints = 0;
    } else if (localSets === 2 && visitorSets === 1) {
      localPoints = 2;
      visitorPoints = 1;
    } else if (visitorSets === 2 && localSets === 0) {
      localPoints = 0;
      visitorPoints = 3;
    } else if (visitorSets === 2 && localSets === 1) {
      localPoints = 1;
      visitorPoints = 2;
    }
  } else if (maxSets === 5) {
    if (localSets === 3 && (visitorSets === 0 || visitorSets === 1)) {
      localPoints = 3;
      visitorPoints = 0;
    } else if (localSets === 3 && visitorSets === 2) {
      localPoints = 2;
      visitorPoints = 1;
    } else if (visitorSets === 3 && (localSets === 0 || localSets === 1)) {
      localPoints = 0;
      visitorPoints = 3;
    } else if (visitorSets === 3 && localSets === 2) {
      localPoints = 1;
      visitorPoints = 2;
    }
  }

  return { localPoints, visitorPoints };
}

/**
 * Helper to calculate points directly from the score array.
 */
export function calculatePointsFromScores(
  setScores: string[],
  maxSets: number = 5
): { localPoints: number; visitorPoints: number } {
  const { localSets, visitorSets } = calculateSetsWon(setScores);
  return calculateLeaguePoints(localSets, visitorSets, maxSets);
}
