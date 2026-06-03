// Seedable RNG so mocks are stable across renders.
let _s = 1337;
function rand() {
  _s = (_s * 9301 + 49297) % 233280;
  return _s / 233280;
}
export const seedReset = () => { _s = 1337; };
export const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)];
export const randInt = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min;
export const randId = (prefix: string) => `${prefix}_${Math.floor(rand() * 1e9).toString(36)}`;
export const daysAgo = (n: number) => new Date(Date.now() - n * 86400_000).toISOString();
export const hoursAgo = (n: number) => new Date(Date.now() - n * 3600_000).toISOString();

export const FIRST_NAMES = ["Alex","Jordan","Sam","Taylor","Morgan","Casey","Robin","Riley","Avery","Quinn","Cameron","Drew","Reese","Skyler","Sage","Emery","Hayden","Parker","Rowan","Finley","Maya","Ava","Liam","Noah","Olivia","Emma","Sofia","Lucas","Ethan","Mia"];
export const LAST_NAMES = ["Patel","Nguyen","Garcia","Smith","Johnson","Williams","Brown","Jones","Miller","Davis","Wilson","Anderson","Martinez","Hernandez","Lopez","Gonzalez","Perez","Rodriguez","Lee","Kim","Chen","Singh","Khan","Cohen","Schmidt","Dubois","Rossi","Ivanov","Tanaka","Yamamoto"];
export const DOMAINS = ["acme.com","globex.io","initech.co","umbrella.org","stark.industries","wayne.ent","hooli.com","piedpiper.ai"];

export const fullName = () => `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;
export const email = (name: string) => `${name.toLowerCase().replace(" ", ".")}@${pick(DOMAINS)}`;
