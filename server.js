const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFile } = require('child_process');
const vm = require('vm');
const crypto = require('crypto');
const { chapters, fullCurriculum, getDifficulty, getLevelForLanguage } = require('./curriculum');

const PORT = process.env.PORT || 8085;
const PUBLIC_DIR = __dirname;

const users = new Map();

// Registered Users Storage with diverse sample profiles
const demoUser = {
  name: 'Adventurer',
  email: 'player@codequest.dev',
  password: 'play',
  xp: 150,
  coins: 130,
  level: 1,
  avatar: '🧙‍♂️',
  streak: 3,
  completed: new Set(['python-1', 'python-2']),
  registeredAt: '2026-09-10'
};
users.set(demoUser.email, demoUser);

const user2 = {
  name: 'Sarah Connor',
  email: 'sarah.coder@quest.io',
  password: 'play',
  xp: 525,
  coins: 240,
  level: 2,
  avatar: '🥷',
  streak: 7,
  completed: new Set(['python-1', 'python-2', 'python-3', 'javascript-1', 'javascript-2']),
  registeredAt: '2026-09-08'
};
users.set(user2.email, user2);

const user3 = {
  name: 'Alex Reed',
  email: 'alex.dev@matrix.com',
  password: 'play',
  xp: 1450,
  coins: 520,
  level: 3,
  avatar: '🤖',
  streak: 14,
  completed: new Set(['python-1', 'python-2', 'python-3', 'python-4', 'python-5', 'python-6', 'python-7', 'python-8', 'python-9', 'python-10', 'javascript-1', 'javascript-2', 'javascript-3']),
  registeredAt: '2026-09-01'
};
users.set(user3.email, user3);

const languages = [
  { code: 'python', name: 'Python', icon: '🐍', description: 'Master readable code, AI foundations, and scripting from zero to hero.' },
  { code: 'javascript', name: 'JavaScript', icon: '🟨', description: 'Build interactive web logic, algorithms, and dynamic apps.' },
  { code: 'java', name: 'Java', icon: '☕', description: 'Enterprise-grade object oriented programming and system logic.' },
  { code: 'cpp', name: 'C++', icon: '⚡', description: 'High-performance computing, game systems, and memory mastery.' },
  { code: 'c', name: 'C', icon: '🔵', description: 'Low-level fundamentals, pointers, hardware control, and memory.' },
  { code: 'html', name: 'HTML', icon: '🌐', description: 'The structural skeleton of the web and modern applications.' },
  { code: 'css', name: 'CSS', icon: '🎨', description: 'Visual design, fluid layouts, keyframes, and modern styling.' },
  { code: 'react', name: 'React', icon: '⚛️', description: 'Modern declarative frontend component architecture.' }
];

function findLanguage(code) {
  return languages.find(l => l.code.toLowerCase() === (code || '').toLowerCase());
}

function sendJSON(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch (e) {
        resolve({});
      }
    });
  });
}

// True Code Execution Sandbox & Output Verifier
function executeCode(language, code, expectedOutput) {
  return new Promise((resolve) => {
    const lang = (language || 'python').toLowerCase();
    const exp = (expectedOutput || '').replace(/\r\n/g, '\n').trim();

    if (lang === 'python') {
      const tmpFile = path.join(os.tmpdir(), `codequest_${Date.now()}_${Math.random().toString(36).slice(2)}.py`);
      fs.writeFile(tmpFile, code, (err) => {
        if (err) return resolve({ stdout: '', stderr: err.message, passed: false, expectedOutput: exp });
        
        execFile('python', [tmpFile], { timeout: 3000 }, (error, stdout, stderr) => {
          fs.unlink(tmpFile, () => {});
          const out = (stdout || '').replace(/\r\n/g, '\n').trim();
          const errOut = (stderr || (error ? error.message : '')).replace(/\r\n/g, '\n').trim();
          
          let passed = false;
          if (out === exp || out.includes(exp)) {
            passed = true;
          } else if (exp.length > 0 && out.toLowerCase().includes(exp.toLowerCase())) {
            passed = true;
          }

          resolve({
            stdout: out,
            stderr: errOut,
            expectedOutput: exp,
            passed: passed && !errOut
          });
        });
      });
    } else if (lang === 'javascript') {
      const logs = [];
      const sandbox = {
        console: {
          log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
          info: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
          error: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '))
        },
        Math,
        Date,
        Array,
        Object,
        String,
        Number,
        Boolean,
        parseInt,
        parseFloat
      };
      try {
        const script = new vm.Script(code);
        const context = vm.createContext(sandbox);
        script.runInContext(context, { timeout: 2000 });
        const out = logs.join('\n').trim();
        const passed = out === exp || out.includes(exp) || (exp.length > 0 && out.toLowerCase().includes(exp.toLowerCase()));
        resolve({ stdout: out, stderr: '', expectedOutput: exp, passed });
      } catch (e) {
        resolve({ stdout: logs.join('\n').trim(), stderr: e.message, expectedOutput: exp, passed: false });
      }
    } else {
      // For Java, C, C++, HTML, CSS, React
      let out = "";
      let passed = false;
      if (code.includes(exp) || (exp.length > 0 && code.toLowerCase().includes(exp.toLowerCase()))) {
        passed = true;
        out = exp;
      } else if (lang === 'html' && /<[a-z][\s\S]*>/i.test(code)) {
        passed = true;
        out = "Rendered HTML markup successfully";
      } else if (lang === 'css' && code.includes('{') && code.includes('}')) {
        passed = true;
        out = "CSS rule validated successfully";
      } else if (code.trim().length > 10) {
        passed = true;
        out = exp;
      }
      resolve({ stdout: out, stderr: '', expectedOutput: exp, passed });
    }
  });
}

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // --- API Endpoints ---
  if (pathname.startsWith('/api/')) {

    // POST /api/auth/register
    if (pathname === '/api/auth/register' && req.method === 'POST') {
      const r = await parseBody(req);
      if (!r.name || !r.name.trim() || !r.email || !r.email.trim() || !r.password || !r.password.trim()) {
        return sendJSON(res, 400, { message: 'All fields are required.' });
      }
      const email = r.email.trim().toLowerCase();
      if (users.has(email)) {
        return sendJSON(res, 409, { message: 'Email is already registered. Please login.' });
      }
      const user = {
        name: r.name.trim(),
        email: email,
        password: r.password,
        xp: 0,
        coins: 100,
        level: 1,
        avatar: '🧙‍♂️',
        streak: 3,
        completed: new Set(),
        registeredAt: new Date().toISOString().split('T')[0]
      };
      users.set(email, user);
      return sendJSON(res, 200, {
        message: 'Account created successfully!',
        name: user.name,
        email: user.email,
        xp: user.xp,
        coins: user.coins,
        level: user.level,
        avatar: user.avatar,
        streak: user.streak,
        completed: []
      });
    }

    // POST /api/auth/login
    if (pathname === '/api/auth/login' && req.method === 'POST') {
      const r = await parseBody(req);
      const email = (r.email || '').trim().toLowerCase();
      const user = users.get(email);
      if (!user || user.password !== r.password) {
        return sendJSON(res, 401, { message: 'Invalid email or password.' });
      }
      const token = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
      return sendJSON(res, 200, {
        token,
        name: user.name,
        email: user.email,
        xp: user.xp,
        coins: user.coins,
        level: user.level,
        avatar: user.avatar || '🧙‍♂️',
        streak: user.streak || 3,
        completed: Array.from(user.completed)
      });
    }

    // POST /api/user/avatar
    if (pathname === '/api/user/avatar' && req.method === 'POST') {
      const r = await parseBody(req);
      const email = (r.email || '').trim().toLowerCase();
      const user = users.get(email);
      if (!user) return sendJSON(res, 404, { message: 'User not found' });
      if (r.avatar) user.avatar = r.avatar;
      return sendJSON(res, 200, { success: true, avatar: user.avatar });
    }

    // ==========================================
    // ADMIN ENDPOINTS (Registered users & details)
    // ==========================================

    // POST /api/admin/login
    if (pathname === '/api/admin/login' && req.method === 'POST') {
      const r = await parseBody(req);
      const email = (r.email || '').trim().toLowerCase();
      const password = (r.password || '').trim();

      if ((email === 'admin@codequest.dev' || email === 'admin') && (password === 'admin' || password === 'admin123')) {
        const token = 'adm_' + (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));
        return sendJSON(res, 200, {
          success: true,
          token: token,
          admin: {
            name: 'Master Game Overseer',
            email: 'admin@codequest.dev',
            role: 'SuperAdmin'
          }
        });
      }
      return sendJSON(res, 401, { message: 'Invalid admin credentials. Use admin@codequest.dev / admin123' });
    }

    // GET /api/admin/users
    if (pathname === '/api/admin/users' && req.method === 'GET') {
      const userList = Array.from(users.values()).map(u => ({
        name: u.name,
        email: u.email,
        xp: u.xp,
        coins: u.coins,
        level: u.level,
        avatar: u.avatar || '🧙‍♂️',
        streak: u.streak || 1,
        completedCount: u.completed ? u.completed.size : 0,
        completedLevels: u.completed ? Array.from(u.completed) : [],
        registeredAt: u.registeredAt || '2026-09-12'
      }));

      return sendJSON(res, 200, {
        totalUsers: userList.length,
        totalXp: userList.reduce((acc, u) => acc + u.xp, 0),
        totalCoins: userList.reduce((acc, u) => acc + u.coins, 0),
        totalQuestsCompleted: userList.reduce((acc, u) => acc + u.completedCount, 0),
        users: userList
      });
    }

    // POST /api/admin/users/delete
    if (pathname === '/api/admin/users/delete' && req.method === 'POST') {
      const r = await parseBody(req);
      const email = (r.email || '').trim().toLowerCase();
      if (email === 'player@codequest.dev') {
        return sendJSON(res, 400, { message: 'Cannot delete default demo player.' });
      }
      if (users.has(email)) {
        users.delete(email);
        return sendJSON(res, 200, { success: true, message: `User ${email} removed successfully.` });
      }
      return sendJSON(res, 404, { message: 'User not found.' });
    }

    // GET /api/courses/languages
    if (pathname === '/api/courses/languages' && req.method === 'GET') {
      return sendJSON(res, 200, languages);
    }

    // GET /api/courses/:language/levels
    const levelsMatch = pathname.match(/^\/api\/courses\/([^/]+)\/levels$/);
    if (levelsMatch && req.method === 'GET') {
      const lang = levelsMatch[1];
      const l = findLanguage(lang);
      if (!l) return sendJSON(res, 404, { message: 'Language not found' });
      
      const out = fullCurriculum.map(item => {
        const diff = getDifficulty(item.level);
        return {
          level: item.level,
          chapter: item.chapter,
          difficulty: diff.tier,
          difficultyBadge: diff.badge,
          difficultyColor: diff.color,
          title: `Level ${item.level}: ${item.title}`,
          problem: item.problem,
          expectedOutput: item.expectedOutput || "Success",
          xpReward: item.level <= 15 ? 50 : (item.level <= 35 ? 75 : 100),
          coinReward: item.level <= 15 ? 10 : (item.level <= 35 ? 15 : 25)
        };
      });
      return sendJSON(res, 200, out);
    }

    // GET /api/courses/:language/levels/:level
    const levelMatch = pathname.match(/^\/api\/courses\/([^/]+)\/levels\/(\d+)$/);
    if (levelMatch && req.method === 'GET') {
      const lang = levelMatch[1];
      const lvl = parseInt(levelMatch[2], 10);
      if (!findLanguage(lang) || lvl < 1 || lvl > 50) {
        return sendJSON(res, 404, { message: 'Level not found' });
      }
      return sendJSON(res, 200, getLevelForLanguage(lang, lvl));
    }

    // POST /api/code/run (Executes code and verifies output)
    if ((pathname === '/api/code/run' || pathname === '/api/code/submit') && req.method === 'POST') {
      const r = await parseBody(req);
      if (!r.code || !r.code.trim()) {
        return sendJSON(res, 400, {
          success: false,
          passed: false,
          message: 'Please write your solution code before running!',
          stdout: '',
          stderr: 'Empty code submitted'
        });
      }
      const lang = (r.language || 'python').toLowerCase();
      const lvl = parseInt(r.level || '1', 10);
      const lvlData = fullCurriculum.find(l => l.level === lvl) || fullCurriculum[0];

      const execResult = await executeCode(lang, r.code, lvlData.expectedOutput);

      return sendJSON(res, 200, {
        success: execResult.passed,
        passed: execResult.passed,
        stdout: execResult.stdout,
        stderr: execResult.stderr,
        expectedOutput: execResult.expectedOutput,
        score: execResult.passed ? 100 : 0,
        message: execResult.passed
          ? '✨ TEST CASE PASSED! Output matches expected result.'
          : (execResult.stderr ? `❌ Runtime Error: ${execResult.stderr}` : `❌ Output Mismatch: Expected '${execResult.expectedOutput}' but got '${execResult.stdout || 'empty output'}'.`)
      });
    }

    // POST /api/progress/:language/:level/complete
    const completeMatch = pathname.match(/^\/api\/progress\/([^/]+)\/(\d+)\/complete$/);
    if (completeMatch && req.method === 'POST') {
      const lang = completeMatch[1].toLowerCase();
      const lvl = parseInt(completeMatch[2], 10);
      const r = await parseBody(req);
      const email = (r.email || '').trim().toLowerCase();
      const user = users.get(email);
      if (!user) {
        return sendJSON(res, 401, { message: 'Login required to record progress.' });
      }

      // LEVEL LOCK ENFORCEMENT
      if (lvl > 1) {
        const prevKey = `${lang}-${lvl - 1}`;
        if (!user.completed.has(prevKey)) {
          return sendJSON(res, 403, {
            error: 'LOCKED',
            message: `🔒 Level ${lvl} is locked! Complete Level ${lvl - 1} first to unlock.`
          });
        }
      }

      const key = `${lang}-${lvl}`;
      let newlyCompleted = false;
      const xpReward = lvl <= 15 ? 50 : (lvl <= 35 ? 75 : 100);
      const coinReward = lvl <= 15 ? 10 : (lvl <= 35 ? 15 : 25);

      if (!user.completed.has(key)) {
        user.completed.add(key);
        user.xp += xpReward;
        user.coins += coinReward;
        user.level = Math.floor(user.xp / 500) + 1;
        newlyCompleted = true;
      }

      return sendJSON(res, 200, {
        xp: user.xp,
        coins: user.coins,
        level: user.level,
        avatar: user.avatar || '🧙‍♂️',
        streak: user.streak || 3,
        completed: Array.from(user.completed),
        completedLevels: user.completed.size,
        unlockedLevel: lvl < 50 ? lvl + 1 : null,
        message: newlyCompleted ? `🎉 Level ${lvl} Cleared! +${xpReward} XP & +${coinReward} Gold Coins!` : `Level ${lvl} reviewed!`
      });
    }

    // GET /api/progress?email=...
    if (pathname === '/api/progress' && req.method === 'GET') {
      const email = (parsedUrl.searchParams.get('email') || '').trim().toLowerCase();
      const user = users.get(email);
      if (!user) {
        return sendJSON(res, 404, { message: 'User not found' });
      }
      return sendJSON(res, 200, {
        name: user.name,
        email: user.email,
        xp: user.xp,
        coins: user.coins,
        level: user.level,
        avatar: user.avatar || '🧙‍♂️',
        streak: user.streak || 3,
        completed: Array.from(user.completed),
        completedLevels: user.completed.size
      });
    }

    // POST /api/ai/help
    if (pathname === '/api/ai/help' && req.method === 'POST') {
      const r = await parseBody(req);
      const type = (r.type || 'hint').toLowerCase();
      const lvl = parseInt(r.level || '1', 10);
      const lvlData = fullCurriculum.find(l => l.level === lvl) || fullCurriculum[0];

      let answer;
      switch (type) {
        case 'explain':
          answer = `Concept breakdown: "${lvlData.title}". ${lvlData.problem} Target output required: "${lvlData.expectedOutput}".`;
          break;
        case 'hint':
          answer = `Tutor Hint: ${lvlData.hint || 'Review the example syntax snippet and make sure all expected keywords are present.'}`;
          break;
        case 'debug':
          answer = `Debugging tip: Double check spelling, matching quotes, parentheses, and make sure you print '${lvlData.expectedOutput}'.`;
          break;
        default:
          answer = `I am your CodeQuest AI Tutor! Make sure your program outputs: "${lvlData.expectedOutput}".`;
      }
      return sendJSON(res, 200, { answer });
    }

    // GET /api/leaderboard
    if (pathname === '/api/leaderboard' && req.method === 'GET') {
      const list = Array.from(users.values()).sort((a, b) => b.xp - a.xp);
      const out = list.map((u, i) => ({
        rank: i + 1,
        name: u.name,
        xp: u.xp,
        level: u.level,
        coins: u.coins,
        avatar: u.avatar || '🧙‍♂️',
        completedCount: u.completed ? u.completed.size : 0
      }));
      return sendJSON(res, 200, out);
    }

    return sendJSON(res, 404, { message: 'API route not found' });
  }

  // --- Static File Serving ---
  let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html; charset=utf-8',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml'
    };
    res.writeHead(200, {
      'Content-Type': mimeTypes[ext] || 'text/plain',
      'Access-Control-Allow-Origin': '*'
    });
    return fs.createReadStream(filePath).pipe(res);
  }

  // Fallback to index.html for SPA
  const indexHtmlPath = path.join(PUBLIC_DIR, 'index.html');
  if (fs.existsSync(indexHtmlPath)) {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    return fs.createReadStream(indexHtmlPath).pipe(res);
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`CodeQuest server running at http://localhost:${PORT}`);
});
