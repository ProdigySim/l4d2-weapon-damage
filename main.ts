import computeDamage from "./lib/computeDamage.ts";

interface IWeaponInfo {
  name: string;
  damage: number;
  range: number;
  rangeModifier: number;
  gainRange?: number;
}

const weaponInfos = [
  {
    name: "smg",
    damage: 20,
    range: 2500,
    rangeModifier: 0.84,
  },
  {
    name: "smg_silenced",
    damage: 25,
    range: 2200,
    rangeModifier: 0.84,
    gainRange: 900,
  },
] as IWeaponInfo[];

const INTERVAL = 100;
const MAX = 5000;

const header = ["weapon_name"];
for (let i = 0; i < MAX; i += INTERVAL) {
  header.push(i.toString(10));
}
console.log(header.join(","));
for (const weaponInfo of weaponInfos) {
  const { name, damage, range, rangeModifier, gainRange } = weaponInfo;
  const row = [name];
  for (let i = 0; i < MAX; i += INTERVAL) {
    row.push(
      computeDamage(i, damage, rangeModifier, range, gainRange).toString(10),
    );
  }
  console.log(row.join(","));
}
