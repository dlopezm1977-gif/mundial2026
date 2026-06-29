#!/usr/bin/env node
// Fetches finished WC 2026 results from football-data.org and writes them to Firebase.
// Called by GitHub Actions every 5 minutes.

const FOOTBALL_TOKEN    = process.env.FOOTBALL_DATA_TOKEN;
const FIREBASE_API_KEY  = 'AIzaSyBCo618BZWbV7YSocRMdpckFacYyYESnlU';
const FIREBASE_DB_URL   = 'https://mundial2026-53420-default-rtdb.europe-west1.firebasedatabase.app';
const FIREBASE_EMAIL    = process.env.FIREBASE_ADMIN_EMAIL;
const FIREBASE_PASSWORD = process.env.FIREBASE_ADMIN_PASSWORD;

// Spanish app names → football-data.org English names
const TEAM_MAP = {
  'México':               'Mexico',
  'Sudáfrica':            'South Africa',
  'Corea del Sur':        'South Korea',
  'República Checa':      'Czechia',
  'Canadá':               'Canada',
  'Bosnia y Herzegovina': 'Bosnia-Herzegovina',
  'Estados Unidos':       'United States',
  'Paraguay':             'Paraguay',
  'Qatar':                'Qatar',
  'Suiza':                'Switzerland',
  'Brasil':               'Brazil',
  'Marruecos':            'Morocco',
  'Haití':                'Haiti',
  'Escocia':              'Scotland',
  'Alemania':             'Germany',
  'Curazao':              'Curaçao',
  'Países Bajos':         'Netherlands',
  'Japón':                'Japan',
  'Costa de Marfil':      'Ivory Coast',
  'Ecuador':              'Ecuador',
  'Suecia':               'Sweden',
  'Túnez':                'Tunisia',
  'España':               'Spain',
  'Cabo Verde':           'Cape Verde Islands',
  'Bélgica':              'Belgium',
  'Egipto':               'Egypt',
  'Arabia Saudita':       'Saudi Arabia',
  'Uruguay':              'Uruguay',
  'Irán':                 'Iran',
  'Nueva Zelanda':        'New Zealand',
  'Francia':              'France',
  'Senegal':              'Senegal',
  'Irak':                 'Iraq',
  'Noruega':              'Norway',
  'Argentina':            'Argentina',
  'Argelia':              'Algeria',
  'Austria':              'Austria',
  'Jordania':             'Jordan',
  'Portugal':             'Portugal',
  'RD de Congo':          'Congo DR',
  'Inglaterra':           'England',
  'Croacia':              'Croatia',
  'Ghana':                'Ghana',
  'Panamá':               'Panama',
  'Uzbekistán':           'Uzbekistan',
  'Colombia':             'Colombia',
  'Australia':            'Australia',
  'Turquía':              'Turkey',
};

// Group stage matches with app IDs — only these have fixed team names
const GROUP_MATCHES = [
  {id:1,  home:'México',           away:'Sudáfrica'},
  {id:2,  home:'Corea del Sur',    away:'República Checa'},
  {id:3,  home:'Canadá',           away:'Bosnia y Herzegovina'},
  {id:4,  home:'Estados Unidos',   away:'Paraguay'},
  {id:5,  home:'Qatar',            away:'Suiza'},
  {id:6,  home:'Brasil',           away:'Marruecos'},
  {id:7,  home:'Haití',            away:'Escocia'},
  {id:8,  home:'Australia',        away:'Turquía'},
  {id:9,  home:'Alemania',         away:'Curazao'},
  {id:10, home:'Países Bajos',     away:'Japón'},
  {id:11, home:'Costa de Marfil',  away:'Ecuador'},
  {id:12, home:'Suecia',           away:'Túnez'},
  {id:13, home:'España',           away:'Cabo Verde'},
  {id:14, home:'Bélgica',          away:'Egipto'},
  {id:15, home:'Arabia Saudita',   away:'Uruguay'},
  {id:16, home:'Irán',             away:'Nueva Zelanda'},
  {id:17, home:'Francia',          away:'Senegal'},
  {id:18, home:'Irak',             away:'Noruega'},
  {id:19, home:'Argentina',        away:'Argelia'},
  {id:20, home:'Austria',          away:'Jordania'},
  {id:21, home:'Portugal',         away:'RD de Congo'},
  {id:22, home:'Inglaterra',       away:'Croacia'},
  {id:23, home:'Ghana',            away:'Panamá'},
  {id:24, home:'Uzbekistán',       away:'Colombia'},
  {id:25, home:'República Checa',  away:'Sudáfrica'},
  {id:26, home:'Suiza',            away:'Bosnia y Herzegovina'},
  {id:27, home:'Canadá',           away:'Qatar'},
  {id:28, home:'México',           away:'Corea del Sur'},
  {id:29, home:'Estados Unidos',   away:'Australia'},
  {id:30, home:'Escocia',          away:'Marruecos'},
  {id:31, home:'Brasil',           away:'Haití'},
  {id:32, home:'Turquía',          away:'Paraguay'},
  {id:33, home:'Países Bajos',     away:'Suecia'},
  {id:34, home:'Alemania',         away:'Costa de Marfil'},
  {id:35, home:'Ecuador',          away:'Curazao'},
  {id:36, home:'Túnez',            away:'Japón'},
  {id:37, home:'España',           away:'Arabia Saudita'},
  {id:38, home:'Bélgica',          away:'Irán'},
  {id:39, home:'Uruguay',          away:'Cabo Verde'},
  {id:40, home:'Nueva Zelanda',    away:'Egipto'},
  {id:41, home:'Argentina',        away:'Austria'},
  {id:42, home:'Francia',          away:'Irak'},
  {id:43, home:'Noruega',          away:'Senegal'},
  {id:44, home:'Jordania',         away:'Argelia'},
  {id:45, home:'Portugal',         away:'Uzbekistán'},
  {id:46, home:'Inglaterra',       away:'Ghana'},
  {id:47, home:'Panamá',           away:'Croacia'},
  {id:48, home:'Colombia',         away:'RD de Congo'},
  {id:49, home:'Suiza',            away:'Canadá'},
  {id:50, home:'Bosnia y Herzegovina', away:'Qatar'},
  {id:51, home:'Marruecos',        away:'Haití'},
  {id:52, home:'Escocia',          away:'Brasil'},
  {id:53, home:'Sudáfrica',        away:'Corea del Sur'},
  {id:54, home:'República Checa',  away:'México'},
  {id:55, home:'Curazao',          away:'Costa de Marfil'},
  {id:56, home:'Ecuador',          away:'Alemania'},
  {id:57, home:'Japón',            away:'Suecia'},
  {id:58, home:'Túnez',            away:'Países Bajos'},
  {id:59, home:'Paraguay',         away:'Australia'},
  {id:60, home:'Turquía',          away:'Estados Unidos'},
  {id:61, home:'Noruega',          away:'Francia'},
  {id:62, home:'Senegal',          away:'Irak'},
  {id:63, home:'Cabo Verde',       away:'Arabia Saudita'},
  {id:64, home:'Uruguay',          away:'España'},
  {id:65, home:'Egipto',           away:'Irán'},
  {id:66, home:'Nueva Zelanda',    away:'Bélgica'},
  {id:67, home:'Croacia',          away:'Ghana'},
  {id:68, home:'Panamá',           away:'Inglaterra'},
  {id:69, home:'Colombia',         away:'Portugal'},
  {id:70, home:'RD de Congo',      away:'Uzbekistán'},
  {id:71, home:'Argelia',          away:'Austria'},
  {id:72, home:'Jordania',         away:'Argentina'},
];

// Reverse map: English name → Spanish name (for flag function in the app)
const EN_TO_ES = Object.fromEntries(Object.entries(TEAM_MAP).map(([es, en]) => [en, es]));

// Matches where football-data.org has home/away swapped vs our app definition.
// Scores are flipped before writing to Firebase so they match our local home team.
const SWAPPED_IDS = new Set([52]);

// 16avos matches whose away slot is a best-third (type:'th').
// The football-data.org API uses greedy assignment (wrong vs FIFA Annex C),
// so we skip writing ht/at for these — the app computes them via Annex C.
const THIRD_SLOT_MATCH_IDS = new Set([74, 77, 79, 80, 81, 82, 85, 87]);

// KO match UTC datetimes → local IDs (venue local time converted to UTC)
// Used to sync team names (non-third slots) and scores for KO matches
const KO_UTC_LOOKUP = {
  // 16avos de Final — hora bracket (CEST=UTC+2) menos 2h = UTC
  '2026-06-28T19:00:00Z': 73,  // Los Ángeles PDT-7  12:00 (bracket 21:00 CEST)
  '2026-06-29T17:00:00Z': 76,  // Houston CDT-5  12:00 (bracket 19:00 CEST)
  '2026-06-29T20:30:00Z': 74,  // Boston EDT-4  16:30 (bracket 22:30 CEST)
  '2026-06-30T01:00:00Z': 75,  // Monterrey CDT-5  20:00 (bracket 03:00 CEST Jul 30)
  '2026-06-30T17:00:00Z': 78,  // Dallas CDT-5  12:00 (bracket 19:00 CEST)
  '2026-06-30T21:00:00Z': 77,  // Nueva Jersey EDT-4  17:00 (bracket 23:00 CEST)
  '2026-07-01T01:00:00Z': 79,  // Ciudad de México CDT-5  20:00 (bracket 03:00 CEST Jul 1)
  '2026-07-01T16:00:00Z': 80,  // Atlanta EDT-4  12:00 (bracket 18:00 CEST)
  '2026-07-01T20:00:00Z': 82,  // Seattle PDT-7  16:00 (bracket 22:00 CEST)
  '2026-07-02T00:00:00Z': 81,  // San Francisco PDT-7  17:00 (bracket 02:00 CEST Jul 2)
  '2026-07-02T19:00:00Z': 84,  // Los Ángeles PDT-7  12:00 (bracket 21:00 CEST)
  '2026-07-02T23:00:00Z': 83,  // Toronto EDT-4  19:00 (bracket 01:00 CEST Jul 3)
  '2026-07-03T03:00:00Z': 85,  // Vancouver PDT-7  20:00 (bracket 05:00 CEST Jul 3)
  '2026-07-03T18:00:00Z': 88,  // Dallas CDT-5  13:00 (bracket 20:00 CEST)
  '2026-07-03T22:00:00Z': 86,  // Miami EDT-4  18:00 (bracket 00:00 CEST Jul 4)
  '2026-07-04T01:30:00Z': 87,  // Kansas City CDT-5  20:30 (bracket 03:30 CEST Jul 4)
  // Octavos de Final — mismo criterio: t(HTML,EDT) + 4 = UTC
  '2026-07-04T17:00:00Z': 90,  // Houston  13:00 EDT (19:00 España)
  '2026-07-04T21:00:00Z': 89,  // Philadelphia  17:00 EDT (23:00 España)
  '2026-07-05T20:00:00Z': 91,  // Nueva Jersey  16:00 EDT (22:00 España)
  '2026-07-06T00:00:00Z': 92,  // Ciudad de México  20:00 EDT (02:00 España Jul 6)
  '2026-07-06T19:00:00Z': 93,  // Dallas  15:00 EDT (21:00 España)
  '2026-07-07T00:00:00Z': 94,  // Seattle  20:00 EDT (02:00 España Jul 7)
  '2026-07-07T16:00:00Z': 95,  // Atlanta  12:00 EDT (18:00 España)
  '2026-07-07T20:00:00Z': 96,  // Vancouver  16:00 EDT (22:00 España)
  // Cuartos de Final
  '2026-07-09T20:00:00Z': 97,  // Boston  16:00 EDT (22:00 España)
  '2026-07-10T19:00:00Z': 98,  // Los Ángeles  15:00 EDT (21:00 España)
  '2026-07-11T21:00:00Z': 99,  // Miami  17:00 EDT (23:00 España)
  '2026-07-12T01:00:00Z': 100, // Kansas City  21:00 EDT (03:00 España Jul 12)
  // Semifinales
  '2026-07-14T19:00:00Z': 101, // Dallas  15:00 EDT (21:00 España)
  '2026-07-15T19:00:00Z': 102, // Atlanta  15:00 EDT (21:00 España)
  // 3er Puesto + Final
  '2026-07-18T21:00:00Z': 103, // Miami EDT-4  17:00
  '2026-07-19T19:00:00Z': 104, // Nueva Jersey EDT-4  15:00
};

// Build lookup: "HomeEN|AwayEN" → local match id
const lookup = new Map();
for (const m of GROUP_MATCHES) {
  const homeEN = TEAM_MAP[m.home];
  const awayEN = TEAM_MAP[m.away];
  if (homeEN && awayEN) {
    lookup.set(`${homeEN}|${awayEN}`, m.id);
  } else {
    if (!homeEN) console.warn(`No mapping for home team: ${m.home}`);
    if (!awayEN) console.warn(`No mapping for away team: ${m.away}`);
  }
}

async function getFirebaseToken() {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: FIREBASE_EMAIL, password: FIREBASE_PASSWORD, returnSecureToken: true }),
    }
  );
  const data = await res.json();
  if (!data.idToken) throw new Error(`Firebase auth failed: ${JSON.stringify(data)}`);
  return data.idToken;
}

async function main() {
  // Stop running after the tournament ends (final is July 19, grace day = July 20)
  const today = new Date().toISOString().slice(0, 10);
  if (today > '2026-07-20') {
    console.log('Tournament over — nothing to sync');
    return;
  }

  // 1. Fetch all WC matches (group + KO, all statuses) from football-data.org
  const apiRes = await fetch(
    'https://api.football-data.org/v4/competitions/WC/matches?season=2026',
    { headers: { 'X-Auth-Token': FOOTBALL_TOKEN } }
  );
  if (!apiRes.ok) {
    const body = await apiRes.text();
    throw new Error(`football-data.org error ${apiRes.status}: ${body}`);
  }
  const { matches: apiMatches = [] } = await apiRes.json();
  const liveCount     = apiMatches.filter(m => m.status === 'IN_PLAY' || m.status === 'PAUSED').length;
  const finishedCount = apiMatches.filter(m => m.status === 'FINISHED').length;
  console.log(`football-data.org: ${finishedCount} finished, ${liveCount} in progress, ${apiMatches.length} total`);

  // 2. Build candidate updates from API results
  const candidates = {};
  const apiIdByLocalId = {};  // localId → football-data.org match id
  const statusByLocalId = {}; // localId → match status
  const koTeamCandidates = {}; // localId → {ht, at} for KO bracket team names
  const unmatched = [];

  for (const m of apiMatches) {
    const homeEN = m.homeTeam?.name;
    const awayEN = m.awayTeam?.name;
    const score  = m.score?.fullTime;
    const isLive = m.status === 'IN_PLAY' || m.status === 'PAUSED';
    const isFinished = m.status === 'FINISHED';

    // Normalize utcDate to "YYYY-MM-DDTHH:MM:SSZ" format for lookup
    const utcKey = (m.utcDate || '').slice(0, 19) + 'Z';

    // Try group match lookup first (by team name pair)
    if (homeEN && awayEN && (score?.home != null && score?.away != null) && (isLive || isFinished)) {
      const key = `${homeEN}|${awayEN}`;
      const localId = lookup.get(key);
      if (localId) {
        const flip = SWAPPED_IDS.has(localId);
        candidates[localId] = { home: String(flip ? score.away : score.home), away: String(flip ? score.home : score.away), live: isLive };
        apiIdByLocalId[localId] = m.id;
        statusByLocalId[localId] = m.status;
        continue;
      }
    }

    // Try KO match lookup (by UTC datetime)
    const koLocalId = KO_UTC_LOOKUP[utcKey];
    if (koLocalId) {
      const homeES = homeEN ? (EN_TO_ES[homeEN] || homeEN) : null;
      const awayES = awayEN ? (EN_TO_ES[awayEN] || awayEN) : null;
      const entry = {};
      // Write ht/at only for non-third-slot matches (API greedy != Annex C for third slots)
      if (!THIRD_SLOT_MATCH_IDS.has(koLocalId) && homeES && awayES) {
        entry.ht = homeES;
        entry.at = awayES;
      } else if ((homeEN || awayEN) && !THIRD_SLOT_MATCH_IDS.has(koLocalId)) {
        console.warn(`KO match ${koLocalId} (${utcKey}): team mapping failed homeEN=${homeEN} awayEN=${awayEN}`);
      }
      // Write scores for all KO matches once played
      if ((isFinished || isLive) && score?.home != null && score?.away != null) {
        entry.home = String(score.home);
        entry.away = String(score.away);
        entry.live = isLive;
      }
      if (Object.keys(entry).length > 0) koTeamCandidates[koLocalId] = entry;
      continue;
    }

    // Truly unmatched: log only for played matches with teams
    if ((isLive || isFinished) && homeEN && awayEN) {
      unmatched.push(`${homeEN} vs ${awayEN} [${utcKey}]`);
    }
  }

  if (unmatched.length) {
    console.warn('Unmatched teams (update TEAM_MAP or KO_UTC_LOOKUP):', unmatched.join(', '));
  }

  if (Object.keys(candidates).length === 0 && Object.keys(koTeamCandidates).length === 0) {
    console.log('No matches to sync');
    return;
  }

  // 3. Authenticate with Firebase
  const token = await getFirebaseToken();

  // 4. Fetch current Firebase results to detect changes
  const currentRes = await fetch(`${FIREBASE_DB_URL}/results.json?auth=${token}`);
  const current = (await currentRes.json()) || {};

  // 5. Keep only score results that differ
  const updates = {};
  for (const [id, score] of Object.entries(candidates)) {
    const prev = current[id];
    if (!prev || prev.home !== score.home || prev.away !== score.away || !!prev.live !== score.live) {
      updates[id] = score;
    }
  }

  // 5b. Keep only KO updates (team names + scores) that differ.
  // Using "id/field" keys in the PATCH body tells Firebase to merge fields
  // without overwriting other fields in the same match object.
  const koMultiPath = {};
  for (const [id, entry] of Object.entries(koTeamCandidates)) {
    const prev = current[id] || {};
    if (entry.ht !== undefined && entry.ht !== prev.ht) koMultiPath[`${id}/ht`] = entry.ht;
    if (entry.at !== undefined && entry.at !== prev.at) koMultiPath[`${id}/at`] = entry.at;
    if (entry.home !== undefined && entry.home !== prev.home) koMultiPath[`${id}/home`] = entry.home;
    if (entry.away !== undefined && entry.away !== prev.away) koMultiPath[`${id}/away`] = entry.away;
    if (entry.live !== undefined && !!entry.live !== !!prev.live) koMultiPath[`${id}/live`] = entry.live;
  }

  const hasScoreUpdates = Object.keys(updates).length > 0;
  const hasKoUpdates    = Object.keys(koMultiPath).length > 0;

  if (!hasScoreUpdates && !hasKoUpdates) {
    console.log('Results already up to date');
  } else {
    // 6. PATCH only changed entries (leaves other results untouched)
    if (hasScoreUpdates) {
      const patchRes = await fetch(`${FIREBASE_DB_URL}/results.json?auth=${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!patchRes.ok) throw new Error(`Firebase PATCH failed: ${patchRes.status}`);
      console.log(`Updated ${Object.keys(updates).length} result(s):`, updates);
    }
    if (hasKoUpdates) {
      // Multi-path PATCH: keys like "74/ht" merge into results/74 without overwriting scores
      const koPatchRes = await fetch(`${FIREBASE_DB_URL}/results.json?auth=${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(koMultiPath),
      });
      if (!koPatchRes.ok) throw new Error(`Firebase KO teams PATCH failed: ${koPatchRes.status}`);
      const ids = [...new Set(Object.keys(koMultiPath).map(k => k.split('/')[0]))];
      console.log(`Updated KO team names for match(es) ${ids.join(',')}:`, koMultiPath);
    }
  }

  // 7. Sync top scorers (non-fatal)
  await syncScorers(token).catch(e => console.warn('syncScorers failed:', e.message));

  // syncGoals disabled: football-data.org free tier returns 0 goals per match
  // await syncGoals(token, apiIdByLocalId, statusByLocalId).catch(e => console.warn('syncGoals failed:', e.message));
}

async function syncScorers(token) {
  const res = await fetch(
    'https://api.football-data.org/v4/competitions/2000/scorers?season=2026&limit=30',
    { headers: { 'X-Auth-Token': FOOTBALL_TOKEN } }
  );
  if (!res.ok) { console.warn('Scorers fetch failed:', res.status); return; }
  const { scorers = [] } = await res.json();

  const data = scorers.map(s => ({
    name: s.player.name,
    team: EN_TO_ES[s.team.name] || s.team.name,
    tla: s.team.tla,
    goals: s.goals,
    assists: s.assists ?? 0,
    penalties: s.penalties ?? 0,
    playedMatches: s.playedMatches,
  }));

  // Only write if changed
  const currentRes = await fetch(`${FIREBASE_DB_URL}/scorers.json?auth=${token}`);
  const current = await currentRes.json();
  if (JSON.stringify(current) === JSON.stringify(data)) {
    console.log('Scorers already up to date');
    return;
  }

  const putRes = await fetch(`${FIREBASE_DB_URL}/scorers.json?auth=${token}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!putRes.ok) throw new Error(`Scorers PUT failed: ${putRes.status}`);
  console.log(`Scorers updated: ${data.length} players, leader: ${data[0]?.name} (${data[0]?.goals} goles)`);
}

async function syncGoals(token, apiIdByLocalId, statusByLocalId) {
  const localIds = Object.keys(apiIdByLocalId);
  if (localIds.length === 0) return;

  // Fetch already-cached goal entries from Firebase
  const cachedRes = await fetch(`${FIREBASE_DB_URL}/goals.json?auth=${token}`);
  const cached = (await cachedRes.json()) || {};

  const goalsToWrite = {};
  let fetched = 0;

  for (const localId of localIds) {
    const status = statusByLocalId[localId];
    const isLive = status === 'IN_PLAY' || status === 'PAUSED';
    const isFinished = status === 'FINISHED';

    // Skip finished matches already cached
    if (isFinished && cached[localId]) continue;

    const apiId = apiIdByLocalId[localId];

    // Throttle: 100 ms between requests (free tier = 10 req/min)
    if (fetched > 0) await new Promise(r => setTimeout(r, 150));

    const res = await fetch(
      `https://api.football-data.org/v4/matches/${apiId}`,
      { headers: { 'X-Auth-Token': FOOTBALL_TOKEN } }
    );
    fetched++;

    if (!res.ok) {
      console.warn(`Goals fetch failed for match ${apiId}: ${res.status}`);
      continue;
    }

    const matchData = await res.json();
    const rawGoals = matchData.goals ?? [];
    console.log(`  match ${apiId} (localId ${localId}): ${rawGoals.length} goals from API`);

    const goals = rawGoals.map(g => {
      const teamEN = g.team?.name || '';
      const teamES = EN_TO_ES[teamEN] || teamEN;
      return {
        minute: g.minute ?? null,
        minuteExtra: g.injuryTime ?? null,
        type: g.type || 'REGULAR',       // REGULAR | PENALTY | OWN_GOAL
        scorer: g.scorer?.name || '',
        team: teamES,
        assist: g.assist?.name || null,
      };
    });

    goalsToWrite[localId] = goals;
  }

  if (Object.keys(goalsToWrite).length === 0) {
    console.log('Goals already up to date');
    return;
  }

  const patchRes = await fetch(`${FIREBASE_DB_URL}/goals.json?auth=${token}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goalsToWrite),
  });
  if (!patchRes.ok) throw new Error(`Goals PATCH failed: ${patchRes.status}`);
  console.log(`Goals updated for ${Object.keys(goalsToWrite).length} match(es)`);
}

main().catch(err => { console.error(err); process.exit(1); });
