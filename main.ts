import computeDamage from "./lib/compute-damage.ts";
import { weaponInfos } from "./lib/weapon-data.ts";

const INTERVAL = 25;
const MAX = 5000;

function generateHeader() {
  const header = ["weapon_name"];
  for (let i = 0; i < MAX; i += INTERVAL) {
    header.push(i.toString(10));
  }
  return header.join(",") + "\n";
}

function generateBaseDamage() {
  return generateHeader() + weaponInfos.map((weaponInfo) => {
    const { name, damage, range, rangeModifier, gainRange, bullets } =
      weaponInfo;
    const row = [name];
    for (let i = 0; i < MAX; i += INTERVAL) {
      row.push(
        (computeDamage(i, damage, rangeModifier, range, gainRange) * bullets)
          .toString(10),
      );
    }
    return row.join(",");
  }).join("\n") + "\n";
}

function generateBurstDps() {
  return generateHeader() + weaponInfos.map((weaponInfo) => {
    const {
      name,
      damage,
      range,
      rangeModifier,
      gainRange,
      bullets,
      cycleTime,
    } = weaponInfo;
    const row = [name];
    for (let i = 0; i < MAX; i += INTERVAL) {
      row.push(
        (computeDamage(i, damage, rangeModifier, range, gainRange) * bullets *
          (1 / cycleTime)).toString(10),
      );
    }
    return row.join(",");
  }).join("\n") + "\n";
}

function generateSustainedDps() {
  return generateHeader() + weaponInfos.map((weaponInfo) => {
    const {
      name,
      damage,
      range,
      rangeModifier,
      gainRange,
      bullets,
      cycleTime,
      clipSize,
      reloadTime,
      reloadOnEmptyTime,
    } = weaponInfo;
    const row = [name];
    const sustainedClipTime = cycleTime * clipSize + (reloadOnEmptyTime ?? reloadTime);
    for (let i = 0; i < MAX; i += INTERVAL) {
      row.push(
        ((computeDamage(i, damage, rangeModifier, range, gainRange) * bullets * clipSize) /
          sustainedClipTime).toString(10),
      );
    }
    return row.join(",");
  }).join("\n") + "\n";
}

await Deno.writeTextFile("basedmg.csv", generateBaseDamage());
await Deno.writeTextFile("burstDps.csv", generateBurstDps());
await Deno.writeTextFile("sustainedDps.csv", generateSustainedDps());
