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
        languages.add(new Language("c","C","🔵","Learn C programming from beginner to advanced."));
        languages.add(new Language("java","Java","☕","Learn Java programming from beginner to advanced."));
        languages.add(new Language("cpp","C++","⚡","Learn C++ programming and problem solving."));
        languages.add(new Language("python","Python","🐍","Learn Python programming from zero."));
        languages.add(new Language("javascript","JavaScript","🟨","Learn JavaScript for web development."));
        languages.add(new Language("html","HTML","🌐","Learn HTML and build web pages."));
        languages.add(new Language("css","CSS","🎨","Learn CSS and design websites."));
        languages.add(new Language("react","React","⚛️","Learn React for modern frontend development."));
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
        return ResponseEntity.ok(Map.of("token",token,"name",u.name,"email",u.email,"xp",u.xp,"coins",u.coins,"level",u.level));
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
        String key=language.toLowerCase()+"-"+level;
        if(u.completed.add(key)){ u.xp+=50; u.coins+=10; u.level=(u.xp/500)+1; }
        return ResponseEntity.ok(Map.of("xp",u.xp,"coins",u.coins,"level",u.level,
                "completedLevels",u.completed.size(),"message","Level completed 🎉"));
    }

    @GetMapping("/api/progress")
    public ResponseEntity<?> progress(@RequestParam String email) {
        User u=users.get(email.toLowerCase());
        if(u==null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message","User not found"));
        return ResponseEntity.ok(Map.of("name",u.name,"email",u.email,"xp",u.xp,"coins",u.coins,
                "level",u.level,"completedLevels",u.completed.size()));
    }

    @PostMapping("/api/code/submit")
    public ResponseEntity<?> submit(@RequestBody CodeRequest r) {
        if(blank(r.language)||blank(r.code))
            return ResponseEntity.badRequest().body(Map.of("success",false,"message","Language and code are required","score",0));
        String lang=r.language.toLowerCase(), code=r.code;
        boolean ok=switch(lang){
            case "java" -> code.contains("class") && code.contains("main");
            case "c","cpp" -> code.contains("main");
            case "python" -> code.contains("print") || code.contains("def");
            case "javascript" -> code.contains("console") || code.contains("function");
            case "html" -> code.toLowerCase().contains("<html") || code.toLowerCase().contains("<!doctype");
            case "css" -> code.contains("{") && code.contains("}");
            case "react" -> code.contains("return") || code.contains("React");
            default -> false;
        };
        return ResponseEntity.ok(Map.of("success",ok,"score",ok?100:0,
                "message",ok?"Code structure looks correct! 🎉":"Check your code and try again."));
    }

    @PostMapping("/api/ai/help")
    public Map<String,String> ai(@RequestBody AiRequest r) {
        String a=switch(r.type==null?"":r.type.toLowerCase()){
            case "explain" -> "Start with the basic syntax, then understand the example step by step.";
            case "hint" -> "Break the problem into input, processing, and output.";
            case "debug" -> "Check syntax, variable names, brackets, conditions, and expected output.";
            default -> "I am your Coding Game AI Tutor. Ask for an explanation, hint, or debugging help.";
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
        String[] topics={"Introduction","Variables","Data Types","Input and Output","Operators","Conditions","If Else","Nested If","Switch","For Loop","While Loop","Do While","Nested Loops","Break and Continue","Arrays","Two Dimensional Arrays","Strings","Functions","Parameters","Return Values","Classes","Objects","Constructors","Encapsulation","Inheritance","Polymorphism","Abstraction","Interfaces","Collections","ArrayList","HashMap","HashSet","Generics","Exception Handling","File Handling","Threads","Lambda Expressions","Streams","Database","JDBC","Searching","Sorting","Recursion","Data Structures","Algorithms","Time Complexity","Problem Solving","DSA Practice","Mini Project","Final Challenge"};
        String topic=topics[n-1];
        Level x=new Level(); x.level=n; x.title="Level "+n+": "+topic;
        x.explanation="Learn "+topic+" in "+language+" with a simple example.";
        x.syntax=syntax(language); x.exampleCode=example(language);
        x.exampleExplanation="This example demonstrates "+topic+" in "+language+".";
        x.problem="Create a simple "+topic+" program."; x.xpReward=50; x.coinReward=10;
        return x;
    }

    private String syntax(String l){
        return switch(l){
            case "java" -> "class Main { public static void main(String[] args) { } }";
            case "python" -> "variable = value\\nprint(variable)";
            case "c" -> "#include <stdio.h>\\nint main(){ return 0; }";
            case "cpp" -> "#include <iostream>\\nint main(){ return 0; }";
            case "javascript" -> "let variable = value;\\nconsole.log(variable);";
            case "html" -> "<!DOCTYPE html>\\n<html><body></body></html>";
            case "css" -> "selector { property: value; }";
            case "react" -> "function App(){ return <h1>Hello</h1>; }";
            default -> "// code";
        };
    }

    private String example(String l){
        return switch(l){
            case "java" -> "public class Main { public static void main(String[] args) { System.out.println(10 + 20); } }";
            case "python" -> "a=10\\nb=20\\nprint(a+b)";
            case "c" -> "#include <stdio.h>\\nint main(){ printf(\"%d\",10+20); return 0; }";
            case "cpp" -> "#include <iostream>\\nint main(){ std::cout << 10+20; return 0; }";
            case "javascript" -> "let a=10; let b=20; console.log(a+b);";
            case "html" -> "<!DOCTYPE html><html><body><h1>Hello Coding Game</h1></body></html>";
            case "css" -> "body { font-family: Arial; }";
            case "react" -> "function App(){ return (<h1>Hello Coding Game</h1>); }";
            default -> "// example";
        };
    }

    private Language findLanguage(String c){ for(Language l:languages) if(l.code.equalsIgnoreCase(c)) return l; return null; }
    private boolean blank(String s){ return s==null || s.trim().isEmpty(); }

    static class User {
        String name,email,password; int xp=0,coins=100,level=1; Set<String> completed=new HashSet<>();
        User(String n,String e,String p){name=n;email=e;password=p;}
    }
    static class Language { public String code,name,icon,description; Language(String c,String n,String i,String d){code=c;name=n;icon=i;description=d;} }
    static class Level { public int level; public String title,explanation,syntax,exampleCode,exampleExplanation,problem; public int xpReward,coinReward; }
    static class RegisterRequest { public String name,email,password; }
    static class LoginRequest { public String email,password; }
    static class CompleteRequest { public String email; }
    static class CodeRequest { public String language,code; }
    static class AiRequest { public String type,language,code; }
}
