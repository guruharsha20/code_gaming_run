package com.codinggame;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@SpringBootApplication
@RestController
@CrossOrigin(origins = "*")
public class CodingGameApplication {

    private final Map<String, User> users = new ConcurrentHashMap<>();
    private final List<Language> languages = new ArrayList<>();

    public CodingGameApplication() { createLanguages(); }

    public static void main(String[] args) {
        SpringApplication.run(CodingGameApplication.class, args);
    }

    private void createLanguages() {
        languages.add(new Language("python","Python","🐍","Master readable code, AI foundations, and scripting from zero to hero."));
        languages.add(new Language("javascript","JavaScript","🟨","Build interactive web logic, algorithms, and dynamic apps."));
        languages.add(new Language("java","Java","☕","Enterprise-grade object oriented programming and system logic."));
        languages.add(new Language("cpp","C++","⚡","High-performance computing, game systems, and memory mastery."));
        languages.add(new Language("c","C","🔵","Low-level fundamentals, pointers, hardware control, and memory."));
        languages.add(new Language("html","HTML","🌐","The structural skeleton of the web and modern applications."));
        languages.add(new Language("css","CSS","🎨","Visual design, fluid layouts, keyframes, and modern styling."));
        languages.add(new Language("react","React","⚛️","Modern declarative frontend component architecture."));
    }

    @PostMapping("/api/auth/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest r) {
        if (blank(r.name) || blank(r.email) || blank(r.password))
            return ResponseEntity.badRequest().body(Map.of("message","All fields are required"));
        String email = r.email.trim().toLowerCase();
        if (users.containsKey(email))
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message","Email already registered"));
        User u = new User(r.name.trim(), email, r.password);
        users.put(email, u);
        return ResponseEntity.ok(Map.of("message","Registration successful","name",u.name,"email",u.email));
    }

    @PostMapping("/api/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest r) {
        String email = r.email == null ? "" : r.email.trim().toLowerCase();
        User u = users.get(email);
        if (u == null || !Objects.equals(u.password, r.password))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message","Invalid email or password"));
        String token = UUID.randomUUID().toString();
        return ResponseEntity.ok(Map.of("token",token,"name",u.name,"email",u.email,"xp",u.xp,"coins",u.coins,"level",u.level,"completed",u.completed));
    }

    @PostMapping("/api/admin/login")
    public ResponseEntity<?> adminLogin(@RequestBody Map<String,String> r) {
        String email = r.getOrDefault("email","").trim().toLowerCase();
        String pwd = r.getOrDefault("password","").trim();
        if ((email.equals("admin@codequest.dev") || email.equals("admin")) && (pwd.equals("admin") || pwd.equals("admin123"))) {
            return ResponseEntity.ok(Map.of("success",true,"token","adm_"+UUID.randomUUID(),"admin",Map.of("name","Master Game Overseer","email","admin@codequest.dev")));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message","Invalid admin credentials"));
    }

    @GetMapping("/api/admin/users")
    public ResponseEntity<?> adminUsers() {
        List<Map<String,Object>> list = new ArrayList<>();
        for (User u : users.values()) {
            list.add(Map.of(
                "name", u.name,
                "email", u.email,
                "xp", u.xp,
                "coins", u.coins,
                "level", u.level,
                "avatar", "🧙‍♂️",
                "completedCount", u.completed.size(),
                "completedLevels", u.completed
            ));
        }
        return ResponseEntity.ok(Map.of("totalUsers", users.size(), "users", list));
    }

    @GetMapping("/api/courses/languages")
    public List<Language> languages() { return languages; }

    @GetMapping("/api/courses/{language}/levels")
    public ResponseEntity<?> levels(@PathVariable String language) {
        Language l = findLanguage(language);
        if (l == null) return ResponseEntity.notFound().build();
        List<Level> out = new ArrayList<>();
        for (int i=1;i<=50;i++) out.add(createLevel(l.code,i));
        return ResponseEntity.ok(out);
    }

    @GetMapping("/api/courses/{language}/levels/{level}")
    public ResponseEntity<?> level(@PathVariable String language,@PathVariable int level) {
        if (findLanguage(language)==null || level<1 || level>50) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(createLevel(language.toLowerCase(),level));
    }

    @PostMapping("/api/progress/{language}/{level}/complete")
    public ResponseEntity<?> complete(@PathVariable String language,@PathVariable int level,
                                      @RequestBody CompleteRequest r) {
        User u=users.get(r.email==null?"":r.email.toLowerCase());
        if(u==null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message","Login required"));

        // LEVEL LOCK ENFORCEMENT:
        // Must complete previous level before next level unlocks
        if (level > 1) {
            String prevKey = language.toLowerCase() + "-" + (level - 1);
            if (!u.completed.contains(prevKey)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "LOCKED", "message", "🔒 Level " + level + " is locked! Complete Level " + (level - 1) + " first to unlock."));
            }
        }

        String key=language.toLowerCase()+"-"+level;
        boolean newlyCompleted = u.completed.add(key);
        int xpReward = level <= 15 ? 50 : (level <= 35 ? 75 : 100);
        int coinReward = level <= 15 ? 10 : (level <= 35 ? 15 : 25);
        if (newlyCompleted) {
            u.xp += xpReward;
            u.coins += coinReward;
            u.level = (u.xp / 500) + 1;
        }

        return ResponseEntity.ok(Map.of(
            "xp", u.xp,
            "coins", u.coins,
            "level", u.level,
            "completed", u.completed,
            "completedLevels", u.completed.size(),
            "unlockedLevel", level < 50 ? level + 1 : 50,
            "message", newlyCompleted ? "🎉 Level " + level + " Completed! +" + xpReward + " XP & +" + coinReward + " Coins!" : "Level reviewed!"
        ));
    }

    @GetMapping("/api/progress")
    public ResponseEntity<?> progress(@RequestParam String email) {
        User u=users.get(email.toLowerCase());
        if(u==null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message","User not found"));
        return ResponseEntity.ok(Map.of(
            "name", u.name,
            "email", u.email,
            "xp", u.xp,
            "coins", u.coins,
            "level", u.level,
            "completed", u.completed,
            "completedLevels", u.completed.size()
        ));
    }

    @PostMapping("/api/code/submit")
    public ResponseEntity<?> submit(@RequestBody CodeRequest r) {
        if(blank(r.language)||blank(r.code))
            return ResponseEntity.badRequest().body(Map.of("success",false,"message","Language and code are required","score",0));
        String lang=r.language.toLowerCase(), code=r.code;
        boolean ok=switch(lang){
            case "java" -> code.contains("class") && code.contains("main");
            case "c","cpp" -> code.contains("main");
            case "python" -> code.contains("print") || code.contains("def") || code.contains("=");
            case "javascript" -> code.contains("console") || code.contains("function") || code.contains("let") || code.contains("const");
            case "html" -> code.toLowerCase().contains("<html") || code.toLowerCase().contains("<!doctype") || code.contains("<");
            case "css" -> code.contains("{") && code.contains("}");
            case "react" -> code.contains("return") || code.contains("React");
            default -> false;
        };
        return ResponseEntity.ok(Map.of("success",ok,"score",ok?100:0,
                "message",ok?"✨ Code verified successfully! Ready to claim +50 XP!":"Check your code and try again."));
    }

    @PostMapping("/api/ai/help")
    public Map<String,String> ai(@RequestBody AiRequest r) {
        String a=switch(r.type==null?"":r.type.toLowerCase()){
            case "explain" -> "Start by reviewing the syntax on the left, declare your variables, and verify your output.";
            case "hint" -> "Break the challenge into steps: input parameters, calculation, and console output.";
            case "debug" -> "Check matching brackets, exact spelling, case-sensitivity, and variable declarations.";
            default -> "I am your CodeQuest AI Tutor! Ask for an explanation, hint, or debugging assistance.";
        };
        return Map.of("answer",a);
    }

    @GetMapping("/api/leaderboard")
    public List<Map<String,Object>> leaderboard() {
        List<User> list=new ArrayList<>(users.values());
        list.sort(Comparator.comparingInt((User u)->u.xp).reversed());
        List<Map<String,Object>> out=new ArrayList<>(); int rank=1;
        for(User u:list) out.add(Map.of("rank",rank++,"name",u.name,"xp",u.xp,"level",u.level,"coins",u.coins));
        return out;
    }

    private Level createLevel(String language,int n){
        String[] titles = {
            "Hello World & Console Output", "Variables & Hero Attributes", "Numeric Types & Combat Arithmetic",
            "String Formatting & Hero Titles", "Boolean Logic & Shields", "If-Else Decision Making",
            "Else-If Ladder & Quest Ranks", "Switch / Match Weapon Selector", "Logical Operators (AND, OR, NOT)",
            "Chapter 1 Finale: Adventurer Passport", "While Loops: Spell Cast Counter", "For Loop: Training Dummy Hits",
            "Accumulator Pattern: Gold Looted", "Break Statement: Dungeon Escape", "Continue Statement: Dodging Traps",
            "Nested Loops: Radar Grid Scanner", "Do-While / Repeat Until Defeated", "Infinite Loop Guard Clauses",
            "Prime Hunter: Divisibility Check", "Chapter 2 Finale: Endless Wave Simulator", "Inventory List Creation",
            "Array Indexing & Gear Slots", "Push & Pop: Potion Bag Operations", "Array Search: Legendary Artifacts",
            "Filtering Loot: Rare Items Only", "Transforming Scores: Map & Double XP", "2D Grid: Dungeon Room Tile Map",
            "String Slicing: Secret Rune Word", "String Split & Join: Guild Chat", "Chapter 3 Finale: Vault Sorter",
            "Function Definition: The Bard's Tale", "Multi-Parameter Combat Calculator", "Default Arguments & Gear",
            "Variable Scope: Tower Ward Isolation", "Dictionary / Object: Character Sheet", "Object Methods & Action Triggers",
            "Classes & Constructors: Hero Blueprint", "Encapsulation & Health Setters", "Inheritance: Wizard Subclass",
            "Chapter 4 Finale: Polymorphic Combat", "Try-Catch: Safe Spell Casting", "Custom Exceptions: OutOfManaError",
            "Stack Data Structure: Spell Undo Buffer", "Queue Data Structure: Raid Matchmaking", "Recursion: Combo Multiplier",
            "Recursion: Fibonacci Magic Number", "Binary Search: Vault Code Cracker", "Two-Sum Challenge: Coin Pouch Match",
            "Mini Project: RPG Guild Shop Engine", "GRAND FINALE: Dragon Boss Battle Simulator"
        };
        String[] problems = {
            "Write a program that prints 'Hello, CodeQuest!' to the console.",
            "Create 'playerName' and 'playerLevel = 1' variables, then print both.",
            "Calculate attack: baseDamage = 40, bonusMultiplier = 2. Compute baseDamage * bonusMultiplier and print result.",
            "Combine hero name 'Arthur' and realm 'Camelot' into 'Lord Arthur of Camelot enters the arena!'.",
            "Check if shieldHealth (80) > 0 and print 'Shield is holding!'.",
            "Check playerHp (45) > 0: print 'Hero fights on!', otherwise 'Hero has fallen!'.",
            "Assign quest rank: score >= 90 is 'S-Rank', >= 75 is 'A-Rank', else 'B-Rank'. Test score = 88.",
            "Select weapon action: 'bow' -> 'Ranged Snipe', 'sword' -> 'Melee Attack', 'staff' -> 'Magic Spell'.",
            "Check if gate opens: hasGoldKey or (hasLockpick and lockSkill >= 5). Test with false, true, 7.",
            "Assemble passport: store name, classType ('Mage'), hp (120), mana (250) and print hero sheet.",
            "Cast spell 5 times using a while loop counting 1 to 5.",
            "Hit dummy 10 times using a for loop from 1 to 10.",
            "Calculate total gold looted from coins [10, 25, 5, 50, 100] using a loop accumulator.",
            "Search rooms 1 to 10. Break loop immediately when room 7 is reached.",
            "Loop steps 1 to 8. Skip step 4 with continue and alert trap dodged.",
            "Generate a 3x3 radar grid coordinates using nested loops.",
            "Repeat attacks reducing enemy HP by 25 until health reaches 0.",
            "Implement a loop safety guard counter terminating after max 20 iterations.",
            "Check if number 29 is a prime number.",
            "Simulate surviving 5 combat waves of 3 goblins each, printing total defeated (15).",
            "Create an inventory list ['Potion', 'Elixir', 'Iron Sword', 'Shield'] and print size.",
            "Access and print the first (index 0) and last item in gear loadout.",
            "Append 'Revive Scroll' to backpack and pop the top item.",
            "Search inventory ['Rusty Dagger', 'Wooden Bow', 'Excalibur'] for 'Excalibur'.",
            "Filter item qualities [1, 5, 2, 4, 3, 5] keeping only quality >= 4.",
            "Double XP values in [50, 100, 150, 200] and print boosted list.",
            "Create a 3x3 dungeon room matrix with a treasure chest 'C' at center (1, 1).",
            "Extract 'DRAGON' from 'ANCIENT_DRAGON_SCROLL' using string slicing.",
            "Split comma command 'attack,defend,cast' and join with ' -> '.",
            "Sort attack powers [45, 12, 89, 34, 67] in ascending order.",
            "Define function singLegend(hero) that prints a hero's epic tale.",
            "Write computeCritDamage(base, multiplier, armor) returning final damage.",
            "Create spawnEnemy(type, difficulty=1) with default parameter.",
            "Demonstrate local variable isolation inside a function.",
            "Create character stats dictionary { name: 'Valkyrie', hp: 200, mana: 80 }.",
            "Add attack(target) method reducing target's health by 30.",
            "Define Hero class with constructor (name, role) and instantiate two heroes.",
            "Encapsulate HP with setter validating hp >= 0.",
            "Create Wizard subclass inheriting from Hero with extra spellBook list.",
            "Demonstrate polymorphic executeTurn() across Knight and Archer units.",
            "Wrap dangerous division in a try-catch block to handle errors safely.",
            "Throw custom OutOfManaError when casting spell without sufficient mana.",
            "Implement LIFO undo stack supporting push() and pop() actions.",
            "Implement FIFO matchmaking raid queue with enqueue and dequeue.",
            "Write recursive comboMultiplier(n) where f(1)=1, f(n)=n*f(n-1).",
            "Compute 7th Fibonacci number recursively (fib(7)=13).",
            "Implement binary search to locate target 77 in sorted array.",
            "Solve Two-Sum: find pair in [2, 7, 11, 15] summing to target 9.",
            "Build an RPG guild shop system with coin balance checks and purchase inventory.",
            "GRAND FINALE: Simulate a turn-based combat boss battle against Ancient Dragon (HP 500)!"
        };

        String title = (n <= titles.length) ? titles[n - 1] : "Level " + n;
        String problem = (n <= problems.length) ? problems[n - 1] : "Create a program demonstrating Level " + n;
        String chapter = (n <= 10) ? "Foundations & Syntax" :
                         (n <= 20) ? "Control Flow & Loops" :
                         (n <= 30) ? "Collections & Strings" :
                         (n <= 40) ? "Functions & OOP" : "Algorithms & Boss Quests";

        String diff = n <= 15 ? "EASY" : (n <= 35 ? "MEDIUM" : "HARD");
        String diffBadge = n <= 15 ? "🟢 EASY" : (n <= 35 ? "🟡 MEDIUM" : "🔴 HARD");
        String diffColor = n <= 15 ? "#10b981" : (n <= 35 ? "#f59e0b" : "#ef4444");
        int xp = n <= 15 ? 50 : (n <= 35 ? 75 : 100);
        int coins = n <= 15 ? 10 : (n <= 35 ? 15 : 25);

        Level x = new Level();
        x.level = n;
        x.chapter = chapter;
        x.difficulty = diff;
        x.difficultyBadge = diffBadge;
        x.difficultyColor = diffColor;
        x.title = "Level " + n + ": " + title;
        x.problem = problem;
        x.explanation = "Level " + n + " [" + diff + "]: " + problem;
        x.syntax = syntax(language, n);
        x.exampleCode = example(language, n);
        x.starterCode = starter(language, n, title, diff);
        x.exampleExplanation = "This demonstrates the practical pattern for " + title + " in " + language.toUpperCase() + ".";
        x.xpReward = xp;
        x.coinReward = coins;
        return x;
    }

    private String syntax(String l, int n) {
        return switch (l) {
            case "java" -> "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Solution\");\n  }\n}";
            case "python" -> n == 1 ? "print('Hello, CodeQuest!')" : "def solve():\n    print('Level " + n + " completed')\nsolve()";
            case "c" -> "#include <stdio.h>\nint main() {\n  printf(\"Solution\\n\");\n  return 0;\n}";
            case "cpp" -> "#include <iostream>\nint main() {\n  std::cout << \"Solution\" << std::endl;\n  return 0;\n}";
            case "javascript" -> n == 1 ? "console.log('Hello, CodeQuest!');" : "function solve() {\n  console.log('Level " + n + " completed');\n}\nsolve();";
            case "html" -> "<h1>Hello, CodeQuest!</h1>";
            case "css" -> "selector { property: value; }";
            case "react" -> "function App() { return <h1>Hello, CodeQuest!</h1>; }";
            default -> "// Code syntax";
        };
    }

    private String example(String l, int n) {
        return switch (l) {
            case "java" -> "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Level " + n + " Example\");\n  }\n}";
            case "python" -> "print('Executing Level " + n + " example')";
            case "c" -> "#include <stdio.h>\nint main() { printf(\"Level " + n + " example\\n\"); return 0; }";
            case "cpp" -> "#include <iostream>\nint main() { std::cout << \"Level " + n + " example\" << std::endl; return 0; }";
            case "javascript" -> "console.log('Executing Level " + n + " example');";
            case "html" -> "<div class=\"example\"><p>Example Level " + n + "</p></div>";
            case "css" -> ".example { color: #38bdf8; font-weight: bold; }";
            case "react" -> "function App() { return <p>Example Level " + n + "</p>; }";
            default -> "// example";
        };
    }

    private String starter(String l, int n, String title, String diff) {
        return switch (l) {
            case "python" -> "# Level " + n + ": " + title + " [" + diff + "]\n# Objective: Complete the quest\n\n# WRITE YOUR CODE BELOW:\n";
            case "javascript" -> "// Level " + n + ": " + title + " [" + diff + "]\n// Objective: Complete the quest\n\n// WRITE YOUR CODE BELOW:\n";
            case "java" -> "public class Main {\n  public static void main(String[] args) {\n    // Level " + n + ": " + title + " [" + diff + "]\n    // WRITE YOUR CODE BELOW:\n    \n  }\n}";
            case "c" -> "#include <stdio.h>\nint main() {\n  // Level " + n + ": " + title + " [" + diff + "]\n  // WRITE YOUR CODE BELOW:\n  \n  return 0;\n}";
            case "cpp" -> "#include <iostream>\nint main() {\n  // Level " + n + ": " + title + " [" + diff + "]\n  // WRITE YOUR CODE BELOW:\n  \n  return 0;\n}";
            case "html" -> "<!-- Level " + n + ": " + title + " [" + diff + "] -->\n<!-- WRITE YOUR MARKUP BELOW: -->\n";
            case "css" -> "/* Level " + n + ": " + title + " [" + diff + "] */\n/* WRITE YOUR STYLES BELOW: */\n";
            case "react" -> "// Level " + n + ": " + title + " [" + diff + "]\nfunction App() {\n  // WRITE YOUR COMPONENT BELOW:\n  return null;\n}";
            default -> "// starter code";
        };
    }

    private Language findLanguage(String c) { for(Language l:languages) if(l.code.equalsIgnoreCase(c)) return l; return null; }
    private boolean blank(String s) { return s==null || s.trim().isEmpty(); }

    static class User {
        String name, email, password;
        int xp=0, coins=100, level=1;
        Set<String> completed=new HashSet<>();
        User(String n,String e,String p){name=n;email=e;password=p;}
    }
    static class Language { public String code, name, icon, description; Language(String c,String n,String i,String d){code=c;name=n;icon=i;description=d;} }
    static class Level { public int level; public String chapter, difficulty, difficultyBadge, difficultyColor, title, explanation, syntax, exampleCode, exampleExplanation, problem, starterCode, expectedOutput; public int xpReward, coinReward; }
    static class RegisterRequest { public String name, email, password; }
    static class LoginRequest { public String email, password; }
    static class CompleteRequest { public String email; }
    static class CodeRequest { public String language, code; }
    static class AiRequest { public String type, language, code; }
}
