const data = await Deno.readTextFile("input.csv");

type Rucksack = {
  compartments: Compartment[];
};

type Compartment = {
  items: Item[];
};

type Item = {
  value: string;
};

const rucksacks = createRucksacks(data.split("\n"));

console.info(firstPart(rucksacks));
console.info(secondPart(rucksacks));

function firstPart(rucksacks: Rucksack[]): number {
  let total = 0;

  for (const rucksack of rucksacks) {
    let found = false;

    for (const compartment of rucksack.compartments) {
      if (found) break;

      for (const item of compartment.items) {
        if (found) break;

        for (
          const otherCompartment of rucksack.compartments.filter((c) =>
            c !== compartment
          )
        ) {
          if (found) break;

          for (const otherItem of otherCompartment.items) {
            if (found) break;

            if (item.value === otherItem.value) {
              found = true;

              const priority = findPriority(item.value);
              if (priority) {
                total += priority;
              }
            }
          }
        }
      }
    }
  }

  return total;
}

function secondPart(rucksacks: Rucksack[]): number {
  let total = 0;

  // const groups = rucksacks.

  return total;
}

function createRucksacks(lines: string[]): Rucksack[] {
  const rucksacks: Rucksack[] = [];

  for (const line of lines) {
    const rucksack: Rucksack = {
      compartments: [
        {
          items: [],
        } as Compartment,
        {
          items: [],
        } as Compartment,
      ],
    } as Rucksack;

    const items = [...line].map((item) => {
      return {
        value: item,
      } as Item;
    });

    rucksack.compartments[0].items = items.slice(0, items.length / 2);
    rucksack.compartments[1].items = items.slice(items.length / 2);

    rucksacks.push(rucksack);
  }

  return rucksacks;
}

function findPriority(letter: string): number | undefined {
  if (letter.match(/[a-z]/)) {
    return (letter.codePointAt(0) || 0) - 96;
  } else {
    return (letter.codePointAt(0) || 0) - 38;
  }

  return undefined;
}
