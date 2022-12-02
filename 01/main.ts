const data = await Deno.readTextFile("input.csv");

let index = 0;

const elfs: Elf[] = [];

type Elf = {
  calories: number;
};

for (const line of data.split("\n")) {
  if (line == "") {
    index++;
    continue;
  }

  const elf = elfs[index] || (elfs[index] = { calories: 0 } as Elf);

  elf.calories += parseInt(line);
}

function firstPart() {
  let mostCalories = 0;
  for (const elf of elfs) {
    if (elf.calories > mostCalories) {
      mostCalories = elf.calories;
    }
  }
  return mostCalories;
}

function secondPart() {
  elfs.sort((a, b) => b.calories - a.calories);

  return elfs.splice(0, 3).reduce((a, b) => a + b.calories, 0);
}

console.log(firstPart());
console.log(secondPart());
