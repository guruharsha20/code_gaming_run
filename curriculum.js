// 50 Progressive, Gamified Coding Levels: Easy (1-15) -> Medium (16-35) -> Hard (36-50)
const chapters = [
  { id: 1, name: "Foundations & Syntax", range: [1, 10], icon: "🌲", biome: "forest", biomeTitle: "Emerald Enchanted Forest" },
  { id: 2, name: "Control Flow & Loops", range: [11, 20], icon: "⚡", biome: "thunder", biomeTitle: "Thunder Peak Highlands" },
  { id: 3, name: "Collections & Strings", range: [21, 30], icon: "💎", biome: "crystal", biomeTitle: "Bioluminescent Crystal Caverns" },
  { id: 4, name: "Functions & OOP", range: [31, 40], icon: "🌋", biome: "volcano", biomeTitle: "Molten Obsidian Forge" },
  { id: 5, name: "Algorithms & Boss Quests", range: [41, 50], icon: "🌌", biome: "cosmic", biomeTitle: "Celestial Dragon Citadel" }
];

function getDifficulty(lvl) {
  if (lvl <= 15) return { tier: "EASY", color: "#10b981", badge: "🟢 EASY" };
  if (lvl <= 35) return { tier: "MEDIUM", color: "#f59e0b", badge: "🟡 MEDIUM" };
  return { tier: "HARD", color: "#ef4444", badge: "🔴 HARD" };
}

const raw50Levels = [
  // ==========================================
  // TIER 1: EASY (LEVELS 1 - 15)
  // ==========================================
  {
    level: 1,
    title: "Hello World & Console Output",
    chapter: "Foundations & Syntax",
    problem: "Every coder's journey begins with a greeting. Write code that prints 'Hello, CodeQuest!' to the console.",
    hint: "Use print('Hello, CodeQuest!') in Python or console.log('Hello, CodeQuest!'); in JavaScript.",
    expectedOutput: "Hello, CodeQuest!",
    syntax: { python: "print('Hello, CodeQuest!')", javascript: "console.log('Hello, CodeQuest!');" },
    example: { python: "print('Welcome adventurer!')", javascript: "console.log('Welcome adventurer!');" },
    starter: {
      python: "# Level 1: Hello World [EASY]\n# Objective: Print 'Hello, CodeQuest!' to the console\n\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 1: Hello World [EASY]\n// Objective: Output 'Hello, CodeQuest!' to the console\n\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 2,
    title: "Hero Name & Level Variables",
    chapter: "Foundations & Syntax",
    problem: "Declare variable 'playerName' = 'ShadowNinja' and 'playerLevel' = 1. Print them together formatted as 'ShadowNinja Level 1'.",
    hint: "playerName = 'ShadowNinja', playerLevel = 1. Print: f'{playerName} Level {playerLevel}'",
    expectedOutput: "ShadowNinja Level 1",
    syntax: { python: "name = 'ShadowNinja'\nlvl = 1\nprint(f'{name} Level {lvl}')", javascript: "const name = 'ShadowNinja', lvl = 1;\nconsole.log(`${name} Level ${lvl}`);" },
    example: { python: "n = 'Valkyrie'\nl = 5\nprint(f'{n} Level {l}')", javascript: "console.log('Valkyrie Level 5');" },
    starter: {
      python: "# Level 2: Variables [EASY]\n# Task 1: playerName = 'ShadowNinja'\n# Task 2: playerLevel = 1\n# Task 3: Print 'ShadowNinja Level 1'\n\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 2: Variables [EASY]\n// Task 1: playerName = 'ShadowNinja'\n// Task 2: playerLevel = 1\n// Task 3: Output 'ShadowNinja Level 1'\n\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 3,
    title: "Combat Damage Arithmetic",
    chapter: "Foundations & Syntax",
    problem: "Calculate attack damage! Declare baseDamage = 40 and bonusMultiplier = 2. Multiply them, then print: 'Total Damage: 80'.",
    hint: "total = baseDamage * bonusMultiplier. Then print(f'Total Damage: {total}')",
    expectedOutput: "Total Damage: 80",
    syntax: { python: "base = 40\nmult = 2\nprint(f'Total Damage: {base * mult}')", javascript: "const base = 40, mult = 2;\nconsole.log(`Total Damage: ${base * mult}`);" },
    example: { python: "print(f'Total Damage: {30 * 2}')", javascript: "console.log('Total Damage: 60');" },
    starter: {
      python: "# Level 3: Arithmetic [EASY]\nbaseDamage = 40\nbonusMultiplier = 2\n\n# Objective: Multiply baseDamage by bonusMultiplier and print 'Total Damage: 80'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 3: Arithmetic [EASY]\nconst baseDamage = 40;\nconst bonusMultiplier = 2;\n\n// Objective: Multiply and output 'Total Damage: 80'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 4,
    title: "String Interpolation: Hero Herald",
    chapter: "Foundations & Syntax",
    problem: "With hero = 'Arthur' and realm = 'Camelot', construct and print: 'Lord Arthur of Camelot enters the arena!'",
    hint: "Use f-strings: print(f'Lord {hero} of {realm} enters the arena!')",
    expectedOutput: "Lord Arthur of Camelot enters the arena!",
    syntax: { python: "hero = 'Arthur'\nrealm = 'Camelot'\nprint(f'Lord {hero} of {realm} enters the arena!')", javascript: "console.log(`Lord ${hero} of ${realm} enters the arena!`);" },
    example: { python: "print('Lord Robin of Sherwood enters the arena!')", javascript: "console.log('Lord Robin of Sherwood enters the arena!');" },
    starter: {
      python: "# Level 4: Strings [EASY]\nhero = 'Arthur'\nrealm = 'Camelot'\n\n# Objective: Print 'Lord Arthur of Camelot enters the arena!'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 4: Strings [EASY]\nconst hero = 'Arthur';\nconst realm = 'Camelot';\n\n// Objective: Output 'Lord Arthur of Camelot enters the arena!'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 5,
    title: "Boolean Shield Check",
    chapter: "Foundations & Syntax",
    problem: "Given shieldHealth = 80 and shieldActive = True. If shieldHealth > 0 and shieldActive is True, print: 'Shield is holding!'",
    hint: "if shieldHealth > 0 and shieldActive: print('Shield is holding!')",
    expectedOutput: "Shield is holding!",
    syntax: { python: "if shieldHealth > 0 and shieldActive:\n    print('Shield is holding!')", javascript: "if (shieldHealth > 0 && shieldActive) console.log('Shield is holding!');" },
    example: { python: "if True: print('Shield is holding!')", javascript: "if (true) console.log('Shield is holding!');" },
    starter: {
      python: "# Level 5: Boolean Logic [EASY]\nshieldHealth = 80\nshieldActive = True\n\n# Objective: If shield is active and health > 0, print 'Shield is holding!'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 5: Boolean Logic [EASY]\nconst shieldHealth = 80;\nconst shieldActive = true;\n\n// Objective: If shield is active and health > 0, output 'Shield is holding!'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 6,
    title: "If-Else Vitality Check",
    chapter: "Foundations & Syntax",
    problem: "Evaluate hero vitality! Given playerHp = 45, if playerHp > 0 print 'Hero fights on!', otherwise print 'Hero has fallen!'.",
    hint: "Use if playerHp > 0: print('Hero fights on!') else: print('Hero has fallen!')",
    expectedOutput: "Hero fights on!",
    syntax: { python: "if playerHp > 0:\n    print('Hero fights on!')\nelse:\n    print('Hero has fallen!')", javascript: "if (playerHp > 0) console.log('Hero fights on!');" },
    example: { python: "if 45 > 0: print('Hero fights on!')", javascript: "if (45 > 0) console.log('Hero fights on!');" },
    starter: {
      python: "# Level 6: If-Else [EASY]\nplayerHp = 45\n\n# Objective: If playerHp > 0 print 'Hero fights on!', else 'Hero has fallen!'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 6: If-Else [EASY]\nlet playerHp = 45;\n\n// Objective: If playerHp > 0 output 'Hero fights on!', else 'Hero has fallen!'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 7,
    title: "Else-If Rank Evaluation",
    chapter: "Foundations & Syntax",
    problem: "Given score = 88: if score >= 90 rank is 'S-Rank', elif score >= 75 rank is 'A-Rank', else 'B-Rank'. Print: 'Quest Rank: A-Rank'",
    hint: "Since 88 is >= 75, print 'Quest Rank: A-Rank'",
    expectedOutput: "Quest Rank: A-Rank",
    syntax: { python: "if score >= 90: r = 'S-Rank'\nelif score >= 75: r = 'A-Rank'\nprint(f'Quest Rank: {r}')", javascript: "console.log('Quest Rank: A-Rank');" },
    example: { python: "print('Quest Rank: A-Rank')", javascript: "console.log('Quest Rank: A-Rank');" },
    starter: {
      python: "# Level 7: Else-If [EASY]\nscore = 88\n\n# Objective: If score >= 90 is S-Rank, >= 75 is A-Rank, else B-Rank.\n# Print 'Quest Rank: A-Rank'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 7: Else-If [EASY]\nconst score = 88;\n\n// Objective: Output 'Quest Rank: A-Rank'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 8,
    title: "Weapon Action Selector",
    chapter: "Foundations & Syntax",
    problem: "For weapon = 'bow', output the combat move: 'Action: Ranged Snipe'.",
    hint: "Check weapon == 'bow' and output 'Action: Ranged Snipe'",
    expectedOutput: "Action: Ranged Snipe",
    syntax: { python: "if weapon == 'bow': print('Action: Ranged Snipe')", javascript: "console.log('Action: Ranged Snipe');" },
    example: { python: "print('Action: Ranged Snipe')", javascript: "console.log('Action: Ranged Snipe');" },
    starter: {
      python: "# Level 8: Conditionals [EASY]\nweapon = 'bow'\n\n# Objective: If weapon is 'bow', print 'Action: Ranged Snipe'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 8: Conditionals [EASY]\nconst weapon = 'bow';\n\n// Objective: If weapon is 'bow', output 'Action: Ranged Snipe'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 9,
    title: "Dungeon Gate Key Logic",
    chapter: "Foundations & Syntax",
    problem: "Gate opens if hasGoldKey or (hasLockpick and lockSkill >= 5). With hasGoldKey = False, hasLockpick = True, lockSkill = 7, print: 'Dungeon Gate Opened: True'",
    hint: "canOpen = hasGoldKey or (hasLockpick and lockSkill >= 5); print(f'Dungeon Gate Opened: {canOpen}')",
    expectedOutput: "Dungeon Gate Opened: True",
    syntax: { python: "canOpen = False or (True and 7 >= 5)\nprint(f'Dungeon Gate Opened: {canOpen}')", javascript: "console.log('Dungeon Gate Opened: True');" },
    example: { python: "print('Dungeon Gate Opened: True')", javascript: "console.log('Dungeon Gate Opened: True');" },
    starter: {
      python: "# Level 9: Compound Logic [EASY]\nhasGoldKey = False\nhasLockpick = True\nlockSkill = 7\n\n# Objective: Print 'Dungeon Gate Opened: True'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 9: Compound Logic [EASY]\nconst hasGoldKey = false;\nconst hasLockpick = true;\nconst lockSkill = 7;\n\n// Objective: Output 'Dungeon Gate Opened: True'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 10,
    title: "Adventurer Passport",
    chapter: "Foundations & Syntax",
    problem: "Print the 3-line Hero Passport:\n=== HERO PASSPORT ===\nEldrin the Mage\nHP: 120 | MANA: 250",
    hint: "Use print('=== HERO PASSPORT ===\\nEldrin the Mage\\nHP: 120 | MANA: 250')",
    expectedOutput: "=== HERO PASSPORT ===\nEldrin the Mage\nHP: 120 | MANA: 250",
    syntax: { python: "print('=== HERO PASSPORT ===\\nEldrin the Mage\\nHP: 120 | MANA: 250')", javascript: "console.log('=== HERO PASSPORT ===\\nEldrin the Mage\\nHP: 120 | MANA: 250');" },
    example: { python: "print('=== HERO PASSPORT ===')", javascript: "console.log('=== HERO PASSPORT ===');" },
    starter: {
      python: "# Level 10: Multi-line Output [EASY]\n# Objective: Print the 3-line Hero Passport:\n# === HERO PASSPORT ===\n# Eldrin the Mage\n# HP: 120 | MANA: 250\n\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 10: Multi-line Output [EASY]\n// Objective: Output the 3-line Hero Passport:\n// === HERO PASSPORT ===\n// Eldrin the Mage\n// HP: 120 | MANA: 250\n\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 11,
    title: "While Loop: Potion Brewing",
    chapter: "Control Flow & Loops",
    problem: "Brew potions using a while loop counting count from 1 up to 3. Inside the loop, print 'Brewed Potion #3!' when count reaches 3.",
    hint: "count = 1; while count <= 3: ... print(f'Brewed Potion #{count}!')",
    expectedOutput: "Brewed Potion #3!",
    syntax: { python: "count = 1\nwhile count <= 3:\n    if count == 3: print(f'Brewed Potion #{count}!')\n    count += 1", javascript: "let c = 1; while(c<=3){ if(c===3) console.log(`Brewed Potion #${c}!`); c++; }" },
    example: { python: "c = 3\nprint(f'Brewed Potion #{c}!')", javascript: "console.log('Brewed Potion #3!');" },
    starter: {
      python: "# Level 11: While Loop [EASY]\n# Objective: Use a while loop counting 1 to 3 to output 'Brewed Potion #3!'\n\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 11: While Loop [EASY]\n// Objective: Use a while loop counting 1 to 3 to output 'Brewed Potion #3!'\n\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 12,
    title: "For Loop: Sword Swings",
    chapter: "Control Flow & Loops",
    problem: "Swing your sword 4 times using a for loop from 1 to 4. Print 'Swing #4 connected!' for the 4th swing.",
    hint: "for i in range(1, 5): ... if i == 4: print(f'Swing #{i} connected!')",
    expectedOutput: "Swing #4 connected!",
    syntax: { python: "for i in range(1, 5):\n    if i == 4: print(f'Swing #{i} connected!')", javascript: "for(let i=1;i<=4;i++) if(i===4) console.log(`Swing #${i} connected!`);" },
    example: { python: "for i in range(1, 3): print(f'Hit #{i}')", javascript: "console.log('Hit #1');" },
    starter: {
      python: "# Level 12: For Loop [EASY]\n# Objective: Loop from 1 to 4 and print 'Swing #4 connected!'\n\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 12: For Loop [EASY]\n// Objective: Loop from 1 to 4 and output 'Swing #4 connected!'\n\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 13,
    title: "Gold Coin Doubler",
    chapter: "Control Flow & Loops",
    problem: "You found a double-loot shrine! Start with gold = 50. Multiply gold by 2, then print: 'Gold Stash: 100'.",
    hint: "gold = 50 * 2; print(f'Gold Stash: {gold}')",
    expectedOutput: "Gold Stash: 100",
    syntax: { python: "gold = 50\ngold *= 2\nprint(f'Gold Stash: {gold}')", javascript: "let gold = 50; gold *= 2; console.log(`Gold Stash: ${gold}`);" },
    example: { python: "print('Gold Stash: 100')", javascript: "console.log('Gold Stash: 100');" },
    starter: {
      python: "# Level 13: Variable Reassignment [EASY]\ngold = 50\n\n# Objective: Double gold and print 'Gold Stash: 100'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 13: Variable Reassignment [EASY]\nlet gold = 50;\n\n// Objective: Double gold and output 'Gold Stash: 100'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 14,
    title: "Modulo Operator: Parity Check",
    chapter: "Control Flow & Loops",
    problem: "Check if number 42 is even using the modulo operator (42 % 2 == 0). If true, print: '42 is Even!'.",
    hint: "num = 42; if num % 2 == 0: print(f'{num} is Even!')",
    expectedOutput: "42 is Even!",
    syntax: { python: "num = 42\nif num % 2 == 0: print(f'{num} is Even!')", javascript: "const n = 42; if (n % 2 === 0) console.log(`${n} is Even!`);" },
    example: { python: "print('42 is Even!')", javascript: "console.log('42 is Even!');" },
    starter: {
      python: "# Level 14: Modulo Operator [EASY]\nnum = 42\n\n# Objective: Check if num % 2 == 0 and print '42 is Even!'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 14: Modulo Operator [EASY]\nconst num = 42;\n\n// Objective: Check if num % 2 === 0 and output '42 is Even!'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 15,
    title: "String Length: Battle Cry",
    chapter: "Control Flow & Loops",
    problem: "Measure your battle cry! warcry = 'FOR THE GUILD'. Calculate its character length (13) and print: 'Warcry Length: 13'.",
    hint: "In Python: len(warcry). In JS: warcry.length.",
    expectedOutput: "Warcry Length: 13",
    syntax: { python: "warcry = 'FOR THE GUILD'\nprint(f'Warcry Length: {len(warcry)}')", javascript: "const w = 'FOR THE GUILD'; console.log(`Warcry Length: ${w.length}`);" },
    example: { python: "s = 'HELLO'; print(f'Length: {len(s)}')", javascript: "console.log('Length: 5');" },
    starter: {
      python: "# Level 15: String Length [EASY]\nwarcry = 'FOR THE GUILD'\n\n# Objective: Calculate length and print 'Warcry Length: 13'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 15: String Length [EASY]\nconst warcry = 'FOR THE GUILD';\n\n// Objective: Calculate length and output 'Warcry Length: 13'\n// WRITE YOUR CODE BELOW:\n"
    }
  },

  // ==========================================
  // TIER 2: MEDIUM (LEVELS 16 - 35)
  // ==========================================
  {
    level: 16,
    title: "Loop Accumulator: Loot Sum",
    chapter: "Control Flow & Loops",
    problem: "Sum up gold drops in [15, 25, 60] using a loop accumulator. Print the total: 'Total Gold: 100'.",
    hint: "total = 0; for coin in [15, 25, 60]: total += coin; print(f'Total Gold: {total}')",
    expectedOutput: "Total Gold: 100",
    syntax: { python: "total = sum([15, 25, 60])\nprint(f'Total Gold: {total}')", javascript: "const total = [15, 25, 60].reduce((a,b)=>a+b,0); console.log(`Total Gold: ${total}`);" },
    example: { python: "print(f'Total: {10 + 20}')", javascript: "console.log('Total: 30');" },
    starter: {
      python: "# Level 16: Accumulator Loop [MEDIUM]\ncoins = [15, 25, 60]\n\n# Objective: Sum the list using a loop and print 'Total Gold: 100'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 16: Accumulator Loop [MEDIUM]\nconst coins = [15, 25, 60];\n\n// Objective: Sum the array and output 'Total Gold: 100'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 17,
    title: "Break Statement: Mimic Trap Escape",
    chapter: "Control Flow & Loops",
    problem: "Search chests 1 to 5. When chest == 3 is reached (mimic!), break out of the loop and print: 'Fled mimic at chest 3!'.",
    hint: "for chest in range(1, 6): if chest == 3: print('Fled mimic at chest 3!'); break",
    expectedOutput: "Fled mimic at chest 3!",
    syntax: { python: "for c in range(1, 6):\n    if c == 3:\n        print(f'Fled mimic at chest {c}!')\n        break", javascript: "for(let c=1; c<=5; c++) if(c===3) { console.log(`Fled mimic at chest ${c}!`); break; }" },
    example: { python: "for x in [1, 2]: break", javascript: "break;" },
    starter: {
      python: "# Level 17: Break Loop [MEDIUM]\n# Objective: Loop chests 1 to 5. At chest 3, print 'Fled mimic at chest 3!' and break.\n\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 17: Break Loop [MEDIUM]\n// Objective: Loop chests 1 to 5. At chest 3, output 'Fled mimic at chest 3!' and break.\n\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 18,
    title: "Continue Statement: Spike Trap Avoidance",
    chapter: "Control Flow & Loops",
    problem: "Walk steps 1 to 4. Step 2 has a spike trap; use continue to skip step 2. At step 4, print: 'Safely landed at step 4!'.",
    hint: "for step in range(1, 5): if step == 2: continue; if step == 4: print('Safely landed at step 4!')",
    expectedOutput: "Safely landed at step 4!",
    syntax: { python: "for s in range(1, 5):\n    if s == 2: continue\n    if s == 4: print(f'Safely landed at step {s}!')", javascript: "for(let s=1; s<=4; s++) { if(s===2) continue; if(s===4) console.log(`Safely landed at step ${s}!`); }" },
    example: { python: "if True: continue", javascript: "continue;" },
    starter: {
      python: "# Level 18: Continue Statement [MEDIUM]\n# Objective: Loop 1 to 4, skip 2 with continue, print 'Safely landed at step 4!'\n\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 18: Continue Statement [MEDIUM]\n// Objective: Loop 1 to 4, skip 2 with continue, output 'Safely landed at step 4!'\n\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 19,
    title: "Nested Loops: Radar Grid Scanner",
    chapter: "Control Flow & Loops",
    problem: "Generate radar grid coordinates using nested loops (r in 0..1, c in 0..1). When r == 1 and c == 1, print: 'Grid Center: (1, 1)'.",
    hint: "for r in range(2): for c in range(2): if r == 1 and c == 1: print(f'Grid Center: ({r}, {c})')",
    expectedOutput: "Grid Center: (1, 1)",
    syntax: { python: "for r in range(2):\n    for c in range(2):\n        if r == 1 and c == 1: print(f'Grid Center: ({r}, {c})')", javascript: "for(let r=0;r<2;r++) for(let c=0;c<2;c++) if(r===1&&c===1) console.log(`Grid Center: (${r}, ${c})`);" },
    example: { python: "print('Grid Center: (1, 1)')", javascript: "console.log('Grid Center: (1, 1)');" },
    starter: {
      python: "# Level 19: Nested Loops [MEDIUM]\n# Objective: Use nested loops to print 'Grid Center: (1, 1)'\n\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 19: Nested Loops [MEDIUM]\n// Objective: Use nested loops to output 'Grid Center: (1, 1)'\n\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 20,
    title: "Array Creation: Backpack Items",
    chapter: "Collections & Strings",
    problem: "Create an inventory list containing 'Torch', 'Rope', 'Ration'. Compute its length and print: 'Backpack Items: 3'.",
    hint: "items = ['Torch', 'Rope', 'Ration']; print(f'Backpack Items: {len(items)}')",
    expectedOutput: "Backpack Items: 3",
    syntax: { python: "items = ['Torch', 'Rope', 'Ration']\nprint(f'Backpack Items: {len(items)}')", javascript: "const items = ['Torch', 'Rope', 'Ration']; console.log(`Backpack Items: ${items.length}`);" },
    example: { python: "a = [1, 2]; print(len(a))", javascript: "console.log([1, 2].length);" },
    starter: {
      python: "# Level 20: Array / List [MEDIUM]\n# Objective: Create list ['Torch', 'Rope', 'Ration'] and print 'Backpack Items: 3'\n\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 20: Array / List [MEDIUM]\n// Objective: Create array ['Torch', 'Rope', 'Ration'] and output 'Backpack Items: 3'\n\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 21,
    title: "Array Indexing: Primary Relic",
    chapter: "Collections & Strings",
    problem: "Given relics = ['Amulet', 'Crown', 'Chalice']. Access index 0 and print: 'Equipped Relic: Amulet'.",
    hint: "relics[0] gives 'Amulet'. Print f'Equipped Relic: {relics[0]}'",
    expectedOutput: "Equipped Relic: Amulet",
    syntax: { python: "relics = ['Amulet', 'Crown', 'Chalice']\nprint(f'Equipped Relic: {relics[0]}')", javascript: "const relics = ['Amulet', 'Crown', 'Chalice']; console.log(`Equipped Relic: ${relics[0]}`);" },
    example: { python: "arr = ['A', 'B']; print(arr[0])", javascript: "console.log(['A', 'B'][0]);" },
    starter: {
      python: "# Level 21: Indexing [MEDIUM]\nrelics = ['Amulet', 'Crown', 'Chalice']\n\n# Objective: Access index 0 and print 'Equipped Relic: Amulet'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 21: Indexing [MEDIUM]\nconst relics = ['Amulet', 'Crown', 'Chalice'];\n\n// Objective: Access index 0 and output 'Equipped Relic: Amulet'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 22,
    title: "Array Push & Pop: Quiver Management",
    chapter: "Collections & Strings",
    problem: "Start with arrows = ['Standard Arrow']. Append 'Fire Arrow' to arrows, pop the last arrow and print: 'Fired: Fire Arrow'.",
    hint: "arrows.append('Fire Arrow'); fired = arrows.pop(); print(f'Fired: {fired}')",
    expectedOutput: "Fired: Fire Arrow",
    syntax: { python: "arrows = ['Standard Arrow']\narrows.append('Fire Arrow')\nfired = arrows.pop()\nprint(f'Fired: {fired}')", javascript: "const a = ['Standard Arrow']; a.push('Fire Arrow'); console.log(`Fired: ${a.pop()}`);" },
    example: { python: "a = []; a.append('X'); print(a.pop())", javascript: "console.log('X');" },
    starter: {
      python: "# Level 22: Push & Pop [MEDIUM]\narrows = ['Standard Arrow']\n\n# Objective: Append 'Fire Arrow', pop it, and print 'Fired: Fire Arrow'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 22: Push & Pop [MEDIUM]\nconst arrows = ['Standard Arrow'];\n\n// Objective: Push 'Fire Arrow', pop it, and output 'Fired: Fire Arrow'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 23,
    title: "Array Search: Finding Excalibur",
    chapter: "Collections & Strings",
    problem: "Given chest = ['Dagger', 'Excalibur', 'Wand']. Check if 'Excalibur' is in chest; if so, print: 'Artifact Found: Excalibur!'.",
    hint: "if 'Excalibur' in chest: print('Artifact Found: Excalibur!')",
    expectedOutput: "Artifact Found: Excalibur!",
    syntax: { python: "chest = ['Dagger', 'Excalibur', 'Wand']\nif 'Excalibur' in chest: print('Artifact Found: Excalibur!')", javascript: "const c = ['Dagger', 'Excalibur', 'Wand']; if(c.includes('Excalibur')) console.log('Artifact Found: Excalibur!');" },
    example: { python: "if 'A' in ['A', 'B']: print('Found!')", javascript: "console.log('Found!');" },
    starter: {
      python: "# Level 23: Array Search [MEDIUM]\nchest = ['Dagger', 'Excalibur', 'Wand']\n\n# Objective: If 'Excalibur' is in chest, print 'Artifact Found: Excalibur!'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 23: Array Search [MEDIUM]\nconst chest = ['Dagger', 'Excalibur', 'Wand'];\n\n// Objective: If 'Excalibur' in chest, output 'Artifact Found: Excalibur!'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 24,
    title: "Filtering Array: Epic Power Items",
    chapter: "Collections & Strings",
    problem: "From powers = [35, 75, 20, 90], filter only values >= 70. Print the filtered list: 'Epic Powers: [75, 90]'.",
    hint: "epic = [p for p in powers if p >= 70]; print(f'Epic Powers: {epic}')",
    expectedOutput: "Epic Powers: [75, 90]",
    syntax: { python: "epic = [p for p in [35, 75, 20, 90] if p >= 70]\nprint(f'Epic Powers: {epic}')", javascript: "const epic = [35, 75, 20, 90].filter(x => x >= 70); console.log(`Epic Powers: [${epic.join(', ')}]`);" },
    example: { python: "print('Epic Powers: [75, 90]')", javascript: "console.log('Epic Powers: [75, 90]');" },
    starter: {
      python: "# Level 24: Filtering [MEDIUM]\npowers = [35, 75, 20, 90]\n\n# Objective: Filter powers >= 70 and print 'Epic Powers: [75, 90]'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 24: Filtering [MEDIUM]\nconst powers = [35, 75, 20, 90];\n\n// Objective: Filter powers >= 70 and output 'Epic Powers: [75, 90]'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 25,
    title: "Map Transformation: Double Stats",
    chapter: "Collections & Strings",
    problem: "Given stats = [10, 20, 30]. Double each number and print: 'Doubled Stats: [20, 40, 60]'.",
    hint: "doubled = [x * 2 for x in stats]; print(f'Doubled Stats: {doubled}')",
    expectedOutput: "Doubled Stats: [20, 40, 60]",
    syntax: { python: "doubled = [x * 2 for x in [10, 20, 30]]\nprint(f'Doubled Stats: {doubled}')", javascript: "const d = [10, 20, 30].map(x => x * 2); console.log(`Doubled Stats: [${d.join(', ')}]`);" },
    example: { python: "print('Doubled Stats: [20, 40, 60]')", javascript: "console.log('Doubled Stats: [20, 40, 60]');" },
    starter: {
      python: "# Level 25: Map Transformation [MEDIUM]\nstats = [10, 20, 30]\n\n# Objective: Double all values and print 'Doubled Stats: [20, 40, 60]'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 25: Map Transformation [MEDIUM]\nconst stats = [10, 20, 30];\n\n// Objective: Double all values and output 'Doubled Stats: [20, 40, 60]'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 26,
    title: "2D Matrix: Dungeon Tilemap",
    chapter: "Collections & Strings",
    problem: "In a 3x3 matrix dungeon = [['.','.','.'], ['.','T','.'], ['.','.','.']]. Access center tile (1, 1) and print: 'Treasure Tile: T'.",
    hint: "tile = dungeon[1][1]; print(f'Treasure Tile: {tile}')",
    expectedOutput: "Treasure Tile: T",
    syntax: { python: "dungeon = [['.','.','.'], ['.','T','.'], ['.','.','.']]\nprint(f'Treasure Tile: {dungeon[1][1]}')", javascript: "const d = [['.','.','.'], ['.','T','.'], ['.','.','.']]; console.log(`Treasure Tile: ${d[1][1]}`);" },
    example: { python: "print('Treasure Tile: T')", javascript: "console.log('Treasure Tile: T');" },
    starter: {
      python: "# Level 26: 2D Matrix [MEDIUM]\ndungeon = [\n  ['.', '.', '.'],\n  ['.', 'T', '.'],\n  ['.', '.', '.']\n]\n\n# Objective: Access center tile (1, 1) and print 'Treasure Tile: T'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 26: 2D Matrix [MEDIUM]\nconst dungeon = [\n  ['.', '.', '.'],\n  ['.', 'T', '.'],\n  ['.', '.', '.']\n];\n\n// Objective: Access (1, 1) and output 'Treasure Tile: T'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 27,
    title: "String Slicing: Ancient Cipher",
    chapter: "Collections & Strings",
    problem: "Given cipher = 'SECRET_PHOENIX_STONE'. Extract the secret word from index 7 to 14 ('PHOENIX') and print: 'Cipher Decoded: PHOENIX'.",
    hint: "word = cipher[7:14]; print(f'Cipher Decoded: {word}')",
    expectedOutput: "Cipher Decoded: PHOENIX",
    syntax: { python: "cipher = 'SECRET_PHOENIX_STONE'\nprint(f'Cipher Decoded: {cipher[7:14]}')", javascript: "const c = 'SECRET_PHOENIX_STONE'; console.log(`Cipher Decoded: ${c.slice(7, 14)}`);" },
    example: { python: "s = 'ABC_DEF'; print(s[4:7])", javascript: "console.log('DEF');" },
    starter: {
      python: "# Level 27: String Slicing [MEDIUM]\ncipher = 'SECRET_PHOENIX_STONE'\n\n# Objective: Slice characters 7 to 14 and print 'Cipher Decoded: PHOENIX'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 27: String Slicing [MEDIUM]\nconst cipher = 'SECRET_PHOENIX_STONE';\n\n// Objective: Slice index 7 to 14 and output 'Cipher Decoded: PHOENIX'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 28,
    title: "String Split & Join: Combat Tactic",
    chapter: "Collections & Strings",
    problem: "Given raw = 'cast,dodge,strike'. Split it by comma, then join elements with ' -> '. Print: 'Tactic: cast -> dodge -> strike'.",
    hint: "parts = raw.split(','); result = ' -> '.join(parts); print(f'Tactic: {result}')",
    expectedOutput: "Tactic: cast -> dodge -> strike",
    syntax: { python: "raw = 'cast,dodge,strike'\nprint(f\"Tactic: {' -> '.join(raw.split(','))}\")", javascript: "const r = 'cast,dodge,strike'; console.log(`Tactic: ${r.split(',').join(' -> ')}`);" },
    example: { python: "print('Tactic: cast -> dodge -> strike')", javascript: "console.log('Tactic: cast -> dodge -> strike');" },
    starter: {
      python: "# Level 28: Split & Join [MEDIUM]\nraw = 'cast,dodge,strike'\n\n# Objective: Split by ',' and join with ' -> '. Print 'Tactic: cast -> dodge -> strike'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 28: Split & Join [MEDIUM]\nconst raw = 'cast,dodge,strike';\n\n// Objective: Split by ',' and join with ' -> '. Output 'Tactic: cast -> dodge -> strike'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 29,
    title: "Function Definition: Praise Song",
    chapter: "Functions & OOP",
    problem: "Define function singHero(name) that prints 'Praise be to Sir {name}!'. Call it with 'Lancelot'.",
    hint: "def singHero(name): print(f'Praise be to Sir {name}!'); singHero('Lancelot')",
    expectedOutput: "Praise be to Sir Lancelot!",
    syntax: { python: "def singHero(name):\n    print(f'Praise be to Sir {name}!')\nsingHero('Lancelot')", javascript: "function singHero(n){ console.log(`Praise be to Sir ${n}!`); }\nsingHero('Lancelot');" },
    example: { python: "def greet(x): print(f'Hello {x}')\ngreet('Knight')", javascript: "console.log('Hello Knight');" },
    starter: {
      python: "# Level 29: Functions [MEDIUM]\n# Objective: Define singHero(name) and call it with 'Lancelot'\n# Print 'Praise be to Sir Lancelot!'\n\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 29: Functions [MEDIUM]\n// Objective: Define singHero(name) and call it with 'Lancelot'\n// Output 'Praise be to Sir Lancelot!'\n\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 30,
    title: "Function Return: Critical Hit Formula",
    chapter: "Functions & OOP",
    problem: "Write function calcCrit(base, mult) that returns base * mult. Call calcCrit(50, 3) and print: 'Critical Damage: 150'.",
    hint: "def calcCrit(base, mult): return base * mult. print(f'Critical Damage: {calcCrit(50, 3)}')",
    expectedOutput: "Critical Damage: 150",
    syntax: { python: "def calcCrit(b, m): return b * m\nprint(f'Critical Damage: {calcCrit(50, 3)}')", javascript: "function calcCrit(b, m){ return b * m; }\nconsole.log(`Critical Damage: ${calcCrit(50, 3)}`);" },
    example: { python: "def add(a, b): return a + b\nprint(add(2, 3))", javascript: "console.log(5);" },
    starter: {
      python: "# Level 30: Return Values [MEDIUM]\n# Objective: Define calcCrit(base, mult) returning base * mult.\n# Print 'Critical Damage: 150'\n\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 30: Return Values [MEDIUM]\n// Objective: Define calcCrit(base, mult) returning base * mult.\n// Output 'Critical Damage: 150'\n\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 31,
    title: "Default Arguments: Pet Spawner",
    chapter: "Functions & OOP",
    problem: "Define function spawnPet(name, type='Wolf'). Call spawnPet('Fang') and print: 'Pet: Fang the Wolf'.",
    hint: "def spawnPet(name, type='Wolf'): print(f'Pet: {name} the {type}'); spawnPet('Fang')",
    expectedOutput: "Pet: Fang the Wolf",
    syntax: { python: "def spawnPet(name, type='Wolf'):\n    print(f'Pet: {name} the {type}')\nspawnPet('Fang')", javascript: "function spawnPet(name, type='Wolf'){ console.log(`Pet: ${name} the ${type}`); }\nspawnPet('Fang');" },
    example: { python: "print('Pet: Fang the Wolf')", javascript: "console.log('Pet: Fang the Wolf');" },
    starter: {
      python: "# Level 31: Default Parameters [MEDIUM]\n# Objective: Define spawnPet(name, type='Wolf') with default 'Wolf'.\n# Call spawnPet('Fang') to print 'Pet: Fang the Wolf'\n\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 31: Default Parameters [MEDIUM]\n// Objective: Define spawnPet(name, type='Wolf') with default 'Wolf'.\n// Call spawnPet('Fang') to output 'Pet: Fang the Wolf'\n\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 32,
    title: "Variable Scope Isolation",
    chapter: "Functions & OOP",
    problem: "Demonstrate local variable isolation: inside function getAura(), set local aura = 100 and return it. Print: 'Inner Aura: 100'.",
    hint: "def getAura(): aura = 100; return aura; print(f'Inner Aura: {getAura()}')",
    expectedOutput: "Inner Aura: 100",
    syntax: { python: "def getAura():\n    aura = 100\n    return aura\nprint(f'Inner Aura: {getAura()}')", javascript: "function getAura(){ const aura = 100; return aura; }\nconsole.log(`Inner Aura: ${getAura()}`);" },
    example: { python: "print('Inner Aura: 100')", javascript: "console.log('Inner Aura: 100');" },
    starter: {
      python: "# Level 32: Variable Scope [MEDIUM]\n# Objective: Define function getAura() with local variable aura = 100\n# Print 'Inner Aura: 100'\n\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 32: Variable Scope [MEDIUM]\n// Objective: Define function getAura() with local variable aura = 100\n// Output 'Inner Aura: 100'\n\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 33,
    title: "Character Dictionary / Object",
    chapter: "Functions & OOP",
    problem: "Create dictionary hero = {'name': 'Valkyrie', 'hp': 200}. Print: 'Hero Sheet: Valkyrie (HP: 200)'.",
    hint: "print(f\"Hero Sheet: {hero['name']} (HP: {hero['hp']})\")",
    expectedOutput: "Hero Sheet: Valkyrie (HP: 200)",
    syntax: { python: "hero = {'name': 'Valkyrie', 'hp': 200}\nprint(f\"Hero Sheet: {hero['name']} (HP: {hero['hp']})\")", javascript: "const hero = { name: 'Valkyrie', hp: 200 }; console.log(`Hero Sheet: ${hero.name} (HP: ${hero.hp})`);" },
    example: { python: "d = {'x': 10}; print(d['x'])", javascript: "console.log({x: 10}.x);" },
    starter: {
      python: "# Level 33: Dictionaries [MEDIUM]\n# Objective: Create dict with name: 'Valkyrie', hp: 200\n# Print 'Hero Sheet: Valkyrie (HP: 200)'\n\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 33: Objects [MEDIUM]\n// Objective: Create object with name: 'Valkyrie', hp: 200\n// Output 'Hero Sheet: Valkyrie (HP: 200)'\n\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 34,
    title: "Object Methods & State Modification",
    chapter: "Functions & OOP",
    problem: "Create a Mage object with mana = 50 and cast() method that reduces mana by 20. Call cast() and print: 'Mana Remaining: 30'.",
    hint: "mana = 50; mana -= 20; print(f'Mana Remaining: {mana}')",
    expectedOutput: "Mana Remaining: 30",
    syntax: { python: "class Mage:\n    def __init__(self): self.mana = 50\n    def cast(self): self.mana -= 20\nm = Mage(); m.cast()\nprint(f'Mana Remaining: {m.mana}')", javascript: "const mage = { mana: 50, cast(){ this.mana -= 20; } }; mage.cast(); console.log(`Mana Remaining: ${mage.mana}`);" },
    example: { python: "print('Mana Remaining: 30')", javascript: "console.log('Mana Remaining: 30');" },
    starter: {
      python: "# Level 34: Methods & State [MEDIUM]\n# Objective: Start with 50 mana, deduct 20, print 'Mana Remaining: 30'\n\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 34: Methods & State [MEDIUM]\n// Objective: Start with 50 mana, deduct 20, output 'Mana Remaining: 30'\n\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 35,
    title: "Class Blueprint & Instantiation",
    chapter: "Functions & OOP",
    problem: "Define class Knight with name and armor. Instantiate Knight('Galahad', 85) and print: 'Knight Galahad | Armor: 85'.",
    hint: "class Knight: def __init__(self, n, a): self.name = n; self.armor = a. k = Knight('Galahad', 85); print(f'Knight {k.name} | Armor: {k.armor}')",
    expectedOutput: "Knight Galahad | Armor: 85",
    syntax: { python: "class Knight:\n    def __init__(self, n, a): self.name, self.armor = n, a\nk = Knight('Galahad', 85)\nprint(f'Knight {k.name} | Armor: {k.armor}')", javascript: "class Knight{ constructor(n,a){ this.name=n; this.armor=a; } }\nconst k = new Knight('Galahad', 85);\nconsole.log(`Knight ${k.name} | Armor: ${k.armor}`);" },
    example: { python: "print('Knight Galahad | Armor: 85')", javascript: "console.log('Knight Galahad | Armor: 85');" },
    starter: {
      python: "# Level 35: Classes [MEDIUM]\n# Objective: Define Knight class, instantiate Knight('Galahad', 85)\n# Print 'Knight Galahad | Armor: 85'\n\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 35: Classes [MEDIUM]\n// Objective: Define Knight class, instantiate new Knight('Galahad', 85)\n// Output 'Knight Galahad | Armor: 85'\n\n// WRITE YOUR CODE BELOW:\n"
    }
  },

  // ==========================================
  // TIER 3: HARD (LEVELS 36 - 50)
  // ==========================================
  {
    level: 36,
    title: "Encapsulation: Sanitized Health Setter",
    chapter: "Functions & OOP",
    problem: "Write a health setter setHp(val) that prevents negative health (if val < 0, hp becomes 0). Test setHp(-15) and print: 'Sanitized HP: 0'.",
    hint: "def setHp(val): return max(0, val). print(f'Sanitized HP: {setHp(-15)}')",
    expectedOutput: "Sanitized HP: 0",
    syntax: { python: "def setHp(val): return 0 if val < 0 else val\nprint(f'Sanitized HP: {setHp(-15)}')", javascript: "function setHp(v){ return Math.max(0, v); }\nconsole.log(`Sanitized HP: ${setHp(-15)}`);" },
    example: { python: "print('Sanitized HP: 0')", javascript: "console.log('Sanitized HP: 0');" },
    starter: {
      python: "# Level 36: Encapsulation [HARD]\n# Objective: Implement setHp(val) that caps negative values at 0.\n# Test with -15 and print 'Sanitized HP: 0'\n\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 36: Encapsulation [HARD]\n// Objective: Implement setHp(val) that caps negative values at 0.\n// Test with -15 and output 'Sanitized HP: 0'\n\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 37,
    title: "Class Inheritance: Archmage Subclass",
    chapter: "Functions & OOP",
    problem: "Create class Archmage inheriting from Mage with special method castMeteor(). Call it and print: 'Archmage casts Meteor!'.",
    hint: "class Archmage: def castMeteor(self): print('Archmage casts Meteor!'). Archmage().castMeteor()",
    expectedOutput: "Archmage casts Meteor!",
    syntax: { python: "class Archmage:\n    def castMeteor(self):\n        print('Archmage casts Meteor!')\nArchmage().castMeteor()", javascript: "class Archmage { castMeteor(){ console.log('Archmage casts Meteor!'); } }\nnew Archmage().castMeteor();" },
    example: { python: "print('Archmage casts Meteor!')", javascript: "console.log('Archmage casts Meteor!');" },
    starter: {
      python: "# Level 37: Inheritance [HARD]\n# Objective: Define Archmage subclass with castMeteor()\n# Print 'Archmage casts Meteor!'\n\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 37: Inheritance [HARD]\n// Objective: Define Archmage subclass with castMeteor()\n// Output 'Archmage casts Meteor!'\n\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 38,
    title: "Polymorphism: Multi-Unit Turn",
    chapter: "Functions & OOP",
    problem: "Create two units Knight and Archer with executeTurn(). Loop through [Knight(), Archer()] and count units ready. Print: 'Army Turn: 2 Units Ready!'.",
    hint: "army = ['Knight', 'Archer']; print(f'Army Turn: {len(army)} Units Ready!')",
    expectedOutput: "Army Turn: 2 Units Ready!",
    syntax: { python: "army = [1, 2]\nprint(f'Army Turn: {len(army)} Units Ready!')", javascript: "console.log('Army Turn: 2 Units Ready!');" },
    example: { python: "print('Army Turn: 2 Units Ready!')", javascript: "console.log('Army Turn: 2 Units Ready!');" },
    starter: {
      python: "# Level 38: Polymorphism [HARD]\n# Objective: Dispatch turns across units and print 'Army Turn: 2 Units Ready!'\n\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 38: Polymorphism [HARD]\n// Objective: Dispatch turns across units and output 'Army Turn: 2 Units Ready!'\n\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 39,
    title: "Try-Catch: Safe Division Handling",
    chapter: "Algorithms & Boss Quests",
    problem: "Wrap a division by zero in a try-except block. Catch the error and print: 'Error Caught: Div by Zero!'.",
    hint: "try: x = 10 / 0\nexcept ZeroDivisionError:\n    print('Error Caught: Div by Zero!')",
    expectedOutput: "Error Caught: Div by Zero!",
    syntax: { python: "try:\n    x = 10 / 0\nexcept ZeroDivisionError:\n    print('Error Caught: Div by Zero!')", javascript: "try { throw new Error(); } catch(e) { console.log('Error Caught: Div by Zero!'); }" },
    example: { python: "print('Error Caught: Div by Zero!')", javascript: "console.log('Error Caught: Div by Zero!');" },
    starter: {
      python: "# Level 39: Try-Except [HARD]\n# Objective: Catch division by zero and print 'Error Caught: Div by Zero!'\n\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 39: Try-Catch [HARD]\n// Objective: Catch division error and output 'Error Caught: Div by Zero!'\n\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 40,
    title: "Custom Exception: OutOfManaError",
    chapter: "Algorithms & Boss Quests",
    problem: "Simulate mana exhaustion: if mana (20) < spellCost (50), raise and catch an exception and print: 'Warning: OutOfManaError Raised!'.",
    hint: "try: raise Exception() except: print('Warning: OutOfManaError Raised!')",
    expectedOutput: "Warning: OutOfManaError Raised!",
    syntax: { python: "class OutOfManaError(Exception): pass\ntry: raise OutOfManaError()\nexcept OutOfManaError: print('Warning: OutOfManaError Raised!')", javascript: "console.log('Warning: OutOfManaError Raised!');" },
    example: { python: "print('Warning: OutOfManaError Raised!')", javascript: "console.log('Warning: OutOfManaError Raised!');" },
    starter: {
      python: "# Level 40: Custom Exceptions [HARD]\nmana = 20\nspellCost = 50\n\n# Objective: If mana < spellCost, raise and catch error, print 'Warning: OutOfManaError Raised!'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 40: Custom Exceptions [HARD]\nconst mana = 20, spellCost = 50;\n\n// Objective: Handle mana error and output 'Warning: OutOfManaError Raised!'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 41,
    title: "LIFO Stack: Spell Undo Buffer",
    chapter: "Algorithms & Boss Quests",
    problem: "Implement a LIFO undo stack: stack = []. Push 'Slash', push 'Ice'. Pop the top element and print: 'Undid Action: Ice'.",
    hint: "stack = []; stack.append('Slash'); stack.append('Ice'); undid = stack.pop(); print(f'Undid Action: {undid}')",
    expectedOutput: "Undid Action: Ice",
    syntax: { python: "stack = ['Slash', 'Ice']\nprint(f'Undid Action: {stack.pop()}')", javascript: "const s = ['Slash', 'Ice']; console.log(`Undid Action: ${s.pop()}`);" },
    example: { python: "print('Undid Action: Ice')", javascript: "console.log('Undid Action: Ice');" },
    starter: {
      python: "# Level 41: LIFO Stack [HARD]\nstack = []\n\n# Objective: Push 'Slash', push 'Ice', pop last and print 'Undid Action: Ice'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 41: LIFO Stack [HARD]\nconst stack = [];\n\n// Objective: Push 'Slash', push 'Ice', pop last and output 'Undid Action: Ice'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 42,
    title: "FIFO Queue: Raid Matchmaking",
    chapter: "Algorithms & Boss Quests",
    problem: "Implement a FIFO queue: queue = ['PlayerA', 'PlayerB']. Remove the first player that arrived and print: 'Match Ready: PlayerA'.",
    hint: "queue = ['PlayerA', 'PlayerB']; first = queue.pop(0); print(f'Match Ready: {first}')",
    expectedOutput: "Match Ready: PlayerA",
    syntax: { python: "queue = ['PlayerA', 'PlayerB']\nprint(f'Match Ready: {queue.pop(0)}')", javascript: "const q = ['PlayerA', 'PlayerB']; console.log(`Match Ready: ${q.shift()}`);" },
    example: { python: "print('Match Ready: PlayerA')", javascript: "console.log('Match Ready: PlayerA');" },
    starter: {
      python: "# Level 42: FIFO Queue [HARD]\nqueue = ['PlayerA', 'PlayerB']\n\n# Objective: Dequeue the first player and print 'Match Ready: PlayerA'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 42: FIFO Queue [HARD]\nconst queue = ['PlayerA', 'PlayerB'];\n\n// Objective: Dequeue the first player and output 'Match Ready: PlayerA'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 43,
    title: "Recursion: Factorial Multiplier",
    chapter: "Algorithms & Boss Quests",
    problem: "Write recursive function factorial(n). Compute factorial(5) (5 * 4 * 3 * 2 * 1 = 120) and print: 'Combo Multiplier: 120'.",
    hint: "def factorial(n): return 1 if n <= 1 else n * factorial(n - 1). print(f'Combo Multiplier: {factorial(5)}')",
    expectedOutput: "Combo Multiplier: 120",
    syntax: { python: "def fact(n): return 1 if n<=1 else n*fact(n-1)\nprint(f'Combo Multiplier: {fact(5)}')", javascript: "function fact(n){ return n<=1 ? 1 : n*fact(n-1); }\nconsole.log(`Combo Multiplier: ${fact(5)}`);" },
    example: { python: "print('Combo Multiplier: 120')", javascript: "console.log('Combo Multiplier: 120');" },
    starter: {
      python: "# Level 43: Recursion [HARD]\n# Objective: Define recursive factorial(n), compute 5! and print 'Combo Multiplier: 120'\n\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 43: Recursion [HARD]\n// Objective: Define recursive factorial(n), compute 5! and output 'Combo Multiplier: 120'\n\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 44,
    title: "Recursion: Fibonacci Sequence",
    chapter: "Algorithms & Boss Quests",
    problem: "Compute the 7th Fibonacci number (13) recursively (0, 1, 1, 2, 3, 5, 8, 13). Print: 'Fibonacci Value: 13'.",
    hint: "def fib(n): return n if n <= 1 else fib(n-1) + fib(n-2). print(f'Fibonacci Value: {fib(7)}')",
    expectedOutput: "Fibonacci Value: 13",
    syntax: { python: "def fib(n): return n if n<=1 else fib(n-1)+fib(n-2)\nprint(f'Fibonacci Value: {fib(7)}')", javascript: "function fib(n){ return n<=1?n:fib(n-1)+fib(n-2); }\nconsole.log(`Fibonacci Value: ${fib(7)}`);" },
    example: { python: "print('Fibonacci Value: 13')", javascript: "console.log('Fibonacci Value: 13');" },
    starter: {
      python: "# Level 44: Recursive Fibonacci [HARD]\n# Objective: Compute fib(7) = 13 and print 'Fibonacci Value: 13'\n\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 44: Recursive Fibonacci [HARD]\n// Objective: Compute fib(7) = 13 and output 'Fibonacci Value: 13'\n\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 45,
    title: "Binary Search: Vault PIN Cracker",
    chapter: "Algorithms & Boss Quests",
    problem: "In sorted array [12, 25, 49, 77, 95], use binary search to locate index of target 77. Print: 'PIN Found at Index: 3'.",
    hint: "In sorted list, 77 is at index 3. Print 'PIN Found at Index: 3'",
    expectedOutput: "PIN Found at Index: 3",
    syntax: { python: "arr = [12, 25, 49, 77, 95]\nprint(f'PIN Found at Index: {arr.index(77)}')", javascript: "const arr = [12, 25, 49, 77, 95]; console.log(`PIN Found at Index: ${arr.indexOf(77)}`);" },
    example: { python: "print('PIN Found at Index: 3')", javascript: "console.log('PIN Found at Index: 3');" },
    starter: {
      python: "# Level 45: Binary Search [HARD]\npins = [12, 25, 49, 77, 95]\ntarget = 77\n\n# Objective: Find index of 77 and print 'PIN Found at Index: 3'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 45: Binary Search [HARD]\nconst pins = [12, 25, 49, 77, 95];\nconst target = 77;\n\n// Objective: Find index of 77 and output 'PIN Found at Index: 3'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 46,
    title: "Sorting Algorithm: Bubble Sort",
    chapter: "Algorithms & Boss Quests",
    problem: "Sort unsorted list [64, 34, 25, 12] in ascending order and print: 'Sorted Defenses: [12, 25, 34, 64]'.",
    hint: "defenses = sorted([64, 34, 25, 12]); print(f'Sorted Defenses: {defenses}')",
    expectedOutput: "Sorted Defenses: [12, 25, 34, 64]",
    syntax: { python: "arr = sorted([64, 34, 25, 12])\nprint(f'Sorted Defenses: {arr}')", javascript: "const arr = [64, 34, 25, 12].sort((a,b)=>a-b); console.log(`Sorted Defenses: [${arr.join(', ')}]`);" },
    example: { python: "print('Sorted Defenses: [12, 25, 34, 64]')", javascript: "console.log('Sorted Defenses: [12, 25, 34, 64]');" },
    starter: {
      python: "# Level 46: Sorting [HARD]\ndefenses = [64, 34, 25, 12]\n\n# Objective: Sort ascending and print 'Sorted Defenses: [12, 25, 34, 64]'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 46: Sorting [HARD]\nconst defenses = [64, 34, 25, 12];\n\n// Objective: Sort ascending and output 'Sorted Defenses: [12, 25, 34, 64]'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 47,
    title: "Two-Sum: Target Coin Pouch",
    chapter: "Algorithms & Boss Quests",
    problem: "In coins = [2, 7, 11, 15] and target = 9, find the pair of indices whose sum equals target (2 + 7 = 9). Print: 'Coin Indices: (0, 1)'.",
    hint: "Index 0 (2) and index 1 (7) sum to 9. Print 'Coin Indices: (0, 1)'",
    expectedOutput: "Coin Indices: (0, 1)",
    syntax: { python: "print('Coin Indices: (0, 1)')", javascript: "console.log('Coin Indices: (0, 1)');" },
    example: { python: "print('Coin Indices: (0, 1)')", javascript: "console.log('Coin Indices: (0, 1)');" },
    starter: {
      python: "# Level 47: Two-Sum Algorithm [HARD]\ncoins = [2, 7, 11, 15]\ntarget = 9\n\n# Objective: Find the two indices summing to 9 and print 'Coin Indices: (0, 1)'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 47: Two-Sum Algorithm [HARD]\nconst coins = [2, 7, 11, 15];\nconst target = 9;\n\n// Objective: Find indices summing to 9 and output 'Coin Indices: (0, 1)'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 48,
    title: "Deduplication: Unique Relics",
    chapter: "Algorithms & Boss Quests",
    problem: "Given drops = ['Ruby', 'Gem', 'Ruby', 'Emerald']. Use a set to remove duplicates, get count (3), and print: 'Unique Relics: 3'.",
    hint: "uniqueCount = len(set(drops)); print(f'Unique Relics: {uniqueCount}')",
    expectedOutput: "Unique Relics: 3",
    syntax: { python: "drops = ['Ruby', 'Gem', 'Ruby', 'Emerald']\nprint(f'Unique Relics: {len(set(drops))}')", javascript: "const d = ['Ruby', 'Gem', 'Ruby', 'Emerald']; console.log(`Unique Relics: ${new Set(d).size}`);" },
    example: { python: "print('Unique Relics: 3')", javascript: "console.log('Unique Relics: 3');" },
    starter: {
      python: "# Level 48: Sets & Deduplication [HARD]\ndrops = ['Ruby', 'Gem', 'Ruby', 'Emerald']\n\n# Objective: Deduplicate and print 'Unique Relics: 3'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 48: Sets & Deduplication [HARD]\nconst drops = ['Ruby', 'Gem', 'Ruby', 'Emerald'];\n\n// Objective: Deduplicate and output 'Unique Relics: 3'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 49,
    title: "Merchant Engine: Item Purchase",
    chapter: "Algorithms & Boss Quests",
    problem: "Buy an enchanted sword costing 45 coins with purse of 100 coins. Deduct coins and print: 'Purchase Approved! Balance: 55'.",
    hint: "balance = 100 - 45; print(f'Purchase Approved! Balance: {balance}')",
    expectedOutput: "Purchase Approved! Balance: 55",
    syntax: { python: "purse = 100\nprice = 45\nprint(f'Purchase Approved! Balance: {purse - price}')", javascript: "console.log(`Purchase Approved! Balance: ${100 - 45}`);" },
    example: { python: "print('Purchase Approved! Balance: 55')", javascript: "console.log('Purchase Approved! Balance: 55');" },
    starter: {
      python: "# Level 49: Merchant Shop Engine [HARD]\npurse = 100\nswordPrice = 45\n\n# Objective: Deduct cost and print 'Purchase Approved! Balance: 55'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 49: Merchant Shop Engine [HARD]\nlet purse = 100;\nconst swordPrice = 45;\n\n// Objective: Deduct cost and output 'Purchase Approved! Balance: 55'\n// WRITE YOUR CODE BELOW:\n"
    }
  },
  {
    level: 50,
    title: "GRAND FINALE: Ancient Dragon Battle",
    chapter: "Algorithms & Boss Quests",
    problem: "Simulate turn-based battle against Ancient Dragon (HP: 500)! In a loop, deal 125 damage each turn for 4 turns until dragon HP reaches 0. Print: 'VICTORY! The Ancient Dragon is Defeated!'",
    hint: "dragonHp = 500; while dragonHp > 0: dragonHp -= 125; print('VICTORY! The Ancient Dragon is Defeated!')",
    expectedOutput: "VICTORY! The Ancient Dragon is Defeated!",
    syntax: { python: "hp = 500\nwhile hp > 0: hp -= 125\nprint('VICTORY! The Ancient Dragon is Defeated!')", javascript: "let hp = 500; while(hp > 0) hp -= 125; console.log('VICTORY! The Ancient Dragon is Defeated!');" },
    example: { python: "print('VICTORY! The Ancient Dragon is Defeated!')", javascript: "console.log('VICTORY! The Ancient Dragon is Defeated!');" },
    starter: {
      python: "# Level 50: GRAND FINALE BOSS BATTLE [HARD]\ndragonHp = 500\nstrikeDamage = 125\n\n# Objective: Reduce dragonHp to 0 in a combat loop and print:\n# 'VICTORY! The Ancient Dragon is Defeated!'\n# WRITE YOUR CODE BELOW:\n",
      javascript: "// Level 50: GRAND FINALE BOSS BATTLE [HARD]\nlet dragonHp = 500;\nconst strikeDamage = 125;\n\n// Objective: Reduce dragonHp to 0 in a combat loop and output:\n// 'VICTORY! The Ancient Dragon is Defeated!'\n// WRITE YOUR CODE BELOW:\n"
    }
  }
];

const fullCurriculum = raw50Levels;

function getLevelForLanguage(lang, levelNum) {
  const item = fullCurriculum.find(l => l.level === parseInt(levelNum, 10)) || fullCurriculum[0];
  const l = (lang || 'python').toLowerCase();
  const diff = getDifficulty(item.level);

  const getProp = (obj) => {
    if (!obj) return null;
    return obj[l] || obj.python || obj.javascript || Object.values(obj)[0] || null;
  };

  return {
    level: item.level,
    chapter: item.chapter,
    difficulty: diff.tier,
    difficultyBadge: diff.badge,
    difficultyColor: diff.color,
    title: `Level ${item.level}: ${item.title}`,
    problem: item.problem,
    expectedOutput: item.expectedOutput || "Success",
    hint: item.hint || `To pass this quest, ensure your output matches: '${item.expectedOutput}'`,
    syntax: getProp(item.syntax) || "// Code syntax",
    exampleCode: getProp(item.example) || "// Example code",
    starterCode: getProp(item.starter) || "// Write your code below:",
    exampleExplanation: `This demonstrates the pattern for ${item.title} in ${lang.toUpperCase()}.`,
    explanation: `Level ${item.level} [${diff.tier}]: ${item.problem}`,
    xpReward: item.level <= 15 ? 50 : (item.level <= 35 ? 75 : 100),
    coinReward: item.level <= 15 ? 10 : (item.level <= 35 ? 15 : 25)
  };
}

module.exports = {
  chapters,
  fullCurriculum,
  getDifficulty,
  getLevelForLanguage
};
