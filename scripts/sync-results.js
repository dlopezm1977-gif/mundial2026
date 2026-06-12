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
  'Bosnia y Herzegovina': 'Bosnia and Herzegovina',
  'Estados Unidos':       'USA',
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
  'Costa de Marfil':      "Côte d'Ivoire",
  'Ecuador':              'Ecuador',
  'Suecia':               'Sweden',
  'Túnez':                'Tunisia',
  'España':               'Spain',
  'Cabo Verde':           'Cape Verde',
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
  'RD de Congo':          'DR Congo',
  'Inglaterra':           'England',
  'Croacia':              'Croatia',
  'Ghana':                'Ghana',
  'Panamá':               'Panama',
  'Uzbekistán':           'Uzbekistan',
  'Colombia':             'Colombia',
  'Australia':            'Australia',
  'Turquía':              'Türkiye',
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
  {id:52, home:'Brasil',           away:'Escocia'},
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
  // 1. Fetch finished and in-progress WC matches from football-data.org
  const apiRes = await fetch(
    'https://api.football-data.org/v4/competitions/WC/matches?status=FINISHED,IN_PLAY,PAUSED&season=2026',
    { headers: { 'X-Auth-Token': FOOTBALL_TOKEN } }
  );
  if (!apiRes.ok) {
    const body = await apiRes.text();
    throw new Error(`football-data.org error ${apiRes.status}: ${body}`);
  }
  const { matches: apiMatches = [] } = await apiRes.json();
  const liveCount     = apiMatches.filter(m => m.status === 'IN_PLAY' || m.status === 'PAUSED').length;
  const finishedCount = apiMatches.filter(m => m.status === 'FINISHED').length;
  console.log(`football-data.org: ${finishedCount} finished, ${liveCount} in progress`);

  // 2. Build candidate updates from API results
  const candidates = {};
  const unmatched = [];

  for (const m of apiMatches) {
    const homeEN = m.homeTeam?.name;
    const awayEN = m.awayTeam?.name;
    const score  = m.score?.fullTime;
    if (!homeEN || !awayEN || score?.home == null || score?.away == null) continue;

    const key = `${homeEN}|${awayEN}`;
    const localId = lookup.get(key);
    if (!localId) {
      unmatched.push(`${homeEN} vs ${awayEN}`);
      continue;
    }
    const isLive = m.status === 'IN_PLAY' || m.status === 'PAUSED';
    candidates[localId] = { home: String(score.home), away: String(score.away), live: isLive };
  }

  if (unmatched.length) {
    console.warn('Unmatched teams (update TEAM_MAP if needed):', unmatched.join(', '));
  }

  if (Object.keys(candidates).length === 0) {
    console.log('No matches to sync');
    return;
  }

  // 3. Authenticate with Firebase
  const token = await getFirebaseToken();

  // 4. Fetch current Firebase results to detect changes
  const currentRes = await fetch(`${FIREBASE_DB_URL}/results.json?auth=${token}`);
  const current = (await currentRes.json()) || {};

  // 5. Keep only results that differ from what Firebase already has
  const updates = {};
  for (const [id, score] of Object.entries(candidates)) {
    const prev = current[id];
    if (!prev || prev.home !== score.home || prev.away !== score.away || !!prev.live !== score.live) {
      updates[id] = score;
    }
  }

  if (Object.keys(updates).length === 0) {
    console.log('Firebase already up to date');
    return;
  }

  // 6. PATCH only the changed entries (leaves other results untouched)
  const patchRes = await fetch(`${FIREBASE_DB_URL}/results.json?auth=${token}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!patchRes.ok) throw new Error(`Firebase PATCH failed: ${patchRes.status}`);

  console.log(`Updated ${Object.keys(updates).length} result(s):`, updates);
}

main().catch(err => { console.error(err); process.exit(1); });
