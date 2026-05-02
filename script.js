const CONFIG = {
  calendlyUrl: "https://calendly.com/sidney-mozingo/15-min-video-discovery-call",
  leadEndpoint: ""
};

const $ = (selector) => document.querySelector(selector);
const screen = $("#screen");
const progressBar = $("#progressBar");
const hudLabel = $("#hudLabel");
const levelCount = $("#levelCount");

const state = {
  mission: "",
  startingPoint: "",
  vibes: [],
  problems: [],
  blocks: [],
  tools: [],
  budget: "",
  timeline: "",
  lead: {},
  scores: {
    basicLandingPage: 0,
    customLandingPage: 0,
    premiumWebsite: 0,
    logoBrandKit: 0,
    qrPromo: 0,
    videoEditing: 0,
    photography: 0,
    customMusic: 0,
    socialContent: 0,
    ongoingSupport: 0,
    fullCreativeLaunch: 0
  }
};

const results = {
  basicLandingPage: {
    title: "Quick Launch Kit",
    service: "Basic Landing Page — $300",
    offer: "$50 off your first landing page",
    copy: "You need a sharp, simple digital home base. One page. Clear message. Strong call-to-action. No clutter."
  },
  customLandingPage: {
    title: "Polished Presence Kit",
    service: "Custom Landing Page — $600",
    offer: "Free QR flyer included",
    copy: "Your brand needs a stronger first impression. A custom landing page gives you structure, clarity, and a professional place to send people."
  },
  premiumWebsite: {
    title: "Full Foundation Kit",
    service: "Premium Website — $900",
    offer: "$100 off your premium website build",
    copy: "You need more than a landing page. You need a real online foundation with multiple sections, clean navigation, and a full brand presence."
  },
  logoBrandKit: {
    title: "Brand Glow-Up Kit",
    service: "Logo + Brand Kit — $249",
    offer: "Free social profile graphics included",
    copy: "Your visual identity needs to look intentional. A better logo, colors, type direction, and brand kit will make everything feel more professional."
  },
  qrPromo: {
    title: "Street-Level Promo Kit",
    service: "QR Flyer / QR Business Card",
    offer: "Bundle flyer + QR card and save",
    copy: "You need a fast way to turn attention into action. QR flyers and cards help move people from real life to your website, event, booking link, or form."
  },
  videoEditing: {
    title: "Story Builder Kit",
    service: "Video Editing / Promo Video Package",
    offer: "Free 15-second social cutdown with your first video project",
    copy: "Your brand needs motion, emotion, and a story people can feel. Video can explain the mission faster than a wall of text."
  },
  photography: {
    title: "Visual Upgrade Kit",
    service: "Photo Content Package",
    offer: "Free web-ready photo crop set",
    copy: "Your visuals need to carry more trust. Better photos instantly make your website, social posts, flyers, and promotions feel real and professional."
  },
  customMusic: {
    title: "Soundtrack Kit",
    service: "Custom Music / Jingle / Theme Song",
    offer: "Free short intro/outro version included",
    copy: "Your project has a sound. A custom jingle, theme, intro, or campaign song can make your brand more memorable."
  },
  socialContent: {
    title: "Content Momentum Kit",
    service: "Social Content / Campaign Support",
    offer: "Free starter content direction sheet",
    copy: "Your brand needs consistency. Social content gives people a reason to keep seeing, remembering, and trusting what you do."
  },
  ongoingSupport: {
    title: "Ongoing Partner Kit",
    service: "Ongoing Website Support — starting at $49/month",
    offer: "First month discounted with any website package",
    copy: "You need a creative partner, not another abandoned project. Ongoing support keeps your site and content updated."
  },
  fullCreativeLaunch: {
    title: "Full Creative Launch Kit",
    service: "Custom Creative Launch Bundle",
    offer: "Custom bundle discount",
    copy: "Your project needs the full treatment: website, branding, visuals, video, music, QR promo, and clear messaging working together."
  }
};

function add(key, amount = 1) {
  state.scores[key] = (state.scores[key] || 0) + amount;
}

function safe(value = "") {
  return String(value).replace(/[&<>"']/g, (match) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[match]));
}

function updateHud(level, label) {
  const percent = Math.min(100, (level / 8) * 100);
  progressBar.style.width = `${percent}%`;
  hudLabel.textContent = label;
  levelCount.textContent = `${String(Math.min(level, 8)).padStart(2, "0")} / 08`;
}

function scene(level, label, title, copy, body, actions = "") {
  updateHud(level, label.toUpperCase());
  screen.innerHTML = `
    <div class="scene">
      <div class="level-top">
        <div>
          <p class="kicker">${safe(label)}</p>
          <h1 class="level-title">${title}</h1>
          <p class="level-copy">${copy}</p>
        </div>
        <span class="level-pill">Level ${Math.min(level, 8)} / 8</span>
      </div>
      ${body}
      ${actions}
    </div>
  `;
}

function home() {
  updateHud(0, "SYSTEM READY");
  screen.innerHTML = `
    <div class="scene hero">
      <div>
        <p class="kicker">ChurchBuilt presents</p>
        <h1 class="title">LaunchForge Arcade</h1>
        <p class="subtitle">A cinematic 8-level brand intelligence game that finds the ChurchBuilt service your project needs most: websites, branding, video, photos, music, QR promo, content, or a full creative launch.</p>
        <div class="button-row">
          <button class="btn btn-primary" type="button" id="startGame">Start the Mission</button>
          <button class="btn btn-dark" type="button" id="skipToLead">I already know I need help</button>
        </div>
      </div>
      <aside class="poster-card">
        <div class="poster-logo">LF</div>
        <div>
          <h2>Forge the brand. Find the move.</h2>
          <p>Built for churches, nonprofits, small businesses, entrepreneurs, events, and local projects.</p>
        </div>
      </aside>
    </div>
  `;
  $("#startGame").onclick = mission;
  $("#skipToLead").onclick = unlock;
}

function cards(items, columns = "") {
  return `<div class="grid ${columns}">${items.map(item => `
    <button class="card" type="button" data-value="${safe(item.value)}">
      <div class="icon">${item.icon || "✦"}</div>
      <b>${safe(item.label)}</b>
      <span>${safe(item.copy || "Tap to lock this in.")}</span>
    </button>
  `).join("")}</div>`;
}

function mission() {
  const items = [
    { label: "Small Business", value: "Small Business", icon: "🏪", copy: "Local offer, service, shop, or startup." },
    { label: "Church / Ministry", value: "Church / Ministry", icon: "⛪", copy: "A mission that needs clarity and reach." },
    { label: "Nonprofit", value: "Nonprofit", icon: "🤝", copy: "Cause-driven work that needs trust." },
    { label: "Event / Fundraiser", value: "Event / Fundraiser", icon: "🎟️", copy: "Something coming up that needs attention." },
    { label: "Personal Brand", value: "Personal Brand", icon: "🎤", copy: "You are the face of the message." },
    { label: "Product / Service", value: "Product / Service", icon: "📦", copy: "An offer that needs a cleaner launch." },
    { label: "Community Project", value: "Community Project", icon: "🌄", copy: "Local impact that needs promotion." },
    { label: "Messy Idea", value: "Messy Idea", icon: "🧩", copy: "The vision exists, but the pieces need shaped." }
  ];
  scene(1, "Mission Picker", "Choose the mission", "Every project has a different launch path. Pick what you are building and the system will begin scoring your best move.", cards(items));
  document.querySelectorAll(".card").forEach(card => card.onclick = () => {
    state.mission = card.dataset.value;
    if (state.mission === "Small Business") { add("customLandingPage", 2); add("logoBrandKit"); add("photography"); }
    if (state.mission === "Church / Ministry") { add("premiumWebsite"); add("videoEditing"); add("socialContent"); add("ongoingSupport", 2); }
    if (state.mission === "Nonprofit") { add("customLandingPage"); add("qrPromo"); add("videoEditing"); }
    if (state.mission === "Event / Fundraiser") { add("qrPromo", 3); add("videoEditing", 2); add("customMusic"); }
    if (state.mission === "Personal Brand") { add("logoBrandKit", 2); add("photography", 2); add("videoEditing"); }
    if (state.mission === "Product / Service") { add("customLandingPage", 2); add("photography"); add("qrPromo"); }
    if (state.mission === "Community Project") { add("qrPromo", 2); add("videoEditing"); add("fullCreativeLaunch"); }
    if (state.mission === "Messy Idea") { add("fullCreativeLaunch", 4); add("ongoingSupport", 2); }
    startingPoint();
  });
}

function startingPoint() {
  const items = [
    { label: "Starting From Scratch", value: "Starting From Scratch", icon: "🧱", copy: "No real online presence yet." },
    { label: "Website Needs Work", value: "Website Needs Work", icon: "🕸️", copy: "It exists, but it does not impress." },
    { label: "Logo But No Brand", value: "Logo But No Brand", icon: "🎯", copy: "The identity is incomplete." },
    { label: "Content Is Rough", value: "Content Is Rough", icon: "🎬", copy: "Photos or videos need polish." },
    { label: "Promoting Soon", value: "Promoting Soon", icon: "🚨", copy: "You need momentum fast." },
    { label: "Too Many Ideas", value: "Too Many Ideas", icon: "🧠", copy: "The message needs organized." },
    { label: "Needs Professional Look", value: "Needs Professional Look", icon: "💼", copy: "You need credibility fast." },
    { label: "Need Ongoing Help", value: "Need Ongoing Help", icon: "🔁", copy: "You need a partner after launch." }
  ];
  scene(2, "Starting Point Scanner", "Scan the starting point", "Where are you right now? This tells ChurchBuilt whether you need a starter build, a polish pass, a content push, or a full creative system.", cards(items));
  document.querySelectorAll(".card").forEach(card => card.onclick = () => {
    state.startingPoint = card.dataset.value;
    const v = state.startingPoint;
    if (v.includes("Scratch")) { add("basicLandingPage", 3); add("logoBrandKit"); add("fullCreativeLaunch"); }
    if (v.includes("Website")) { add("customLandingPage", 3); add("premiumWebsite", 2); add("ongoingSupport"); }
    if (v.includes("Logo")) add("logoBrandKit", 4);
    if (v.includes("Content")) { add("photography", 2); add("videoEditing", 2); }
    if (v.includes("Promoting")) { add("qrPromo", 3); add("videoEditing"); add("socialContent"); }
    if (v.includes("Ideas")) { add("fullCreativeLaunch", 4); add("ongoingSupport", 2); }
    if (v.includes("Professional")) { add("customLandingPage", 2); add("photography"); add("logoBrandKit"); }
    if (v.includes("Ongoing")) add("ongoingSupport", 5);
    vibeSmash();
  });
}

function vibeSmash() {
  const words = ["Bold", "Clean", "Warm", "Premium", "Funny", "Faith-Based", "Local", "Creative", "Professional", "Modern", "Family-Friendly", "Energetic", "Trustworthy", "Simple", "Powerful", "Hopeful", "Friendly", "High-End", "Community", "Inspiring"];
  scene(3, "Brand Vibe Smash", "Tap the signal words", "Tap the vibes that match how your brand should feel. This builds your creative direction and influences your recommendation.", `
    <div class="meter"><span id="timeLeft">20 SEC</span><div class="meter-bar"><i id="energy"></i></div><span id="vibeTotal">0 LOCKED</span></div>
    <div class="arena" id="arena"></div>
  `, `<div class="button-row"><button class="btn btn-primary" type="button" id="lockVibes">Lock Vibes</button></div>`);
  const arena = $("#arena");
  words.forEach((word, index) => {
    const button = document.createElement("button");
    button.className = "vibe";
    button.type = "button";
    button.textContent = word;
    button.style.left = `${6 + Math.random() * 75}%`;
    button.style.top = `${7 + Math.random() * 74}%`;
    button.style.animationDelay = `${index * .08}s`;
    button.onclick = () => {
      if (state.vibes.includes(word)) return;
      state.vibes.push(word);
      button.classList.add("hit");
      $("#energy").style.width = `${Math.min(100, state.vibes.length * 7)}%`;
      $("#vibeTotal").textContent = `${state.vibes.length} LOCKED`;
      setTimeout(() => button.remove(), 220);
    };
    arena.appendChild(button);
  });
  let time = 20;
  const timer = setInterval(() => {
    time -= 1;
    const el = $("#timeLeft");
    if (el) el.textContent = `${time} SEC`;
    if (time <= 0) { clearInterval(timer); scoreVibes(); fixBrand(); }
  }, 1000);
  $("#lockVibes").onclick = () => { clearInterval(timer); scoreVibes(); fixBrand(); };
}

function scoreVibes() {
  const v = state.vibes.join(" ");
  if (/Premium|High-End|Professional|Trustworthy|Clean|Modern/.test(v)) { add("customLandingPage", 2); add("premiumWebsite"); }
  if (/Funny|Energetic|Creative|Bold|Powerful/.test(v)) { add("videoEditing", 2); add("customMusic"); add("socialContent"); }
  if (/Warm|Friendly|Family|Hopeful|Faith/.test(v)) { add("photography", 2); add("videoEditing"); }
  if (/Local|Community/.test(v)) { add("qrPromo", 2); add("photography"); }
}

function fixBrand() {
  const problems = ["Outdated Website", "No Website", "Weak Logo", "Blurry Photos", "No Promo Video", "Confusing Message", "Weak Social Media", "No Clear CTA", "No Flyer or QR Code", "No Custom Content", "No Music Identity", "Everything Feels Scattered"];
  scene(4, "Fix the Broken Brand", "Throw problems into the forge", "Tap every broken piece you want fixed first. This is where the game finds the real money problem.", `
    <div class="forge-layout">
      <div class="bin problem-grid">${problems.map(p => `<button class="chip" type="button" data-value="${safe(p)}">${safe(p)}</button>`).join("")}</div>
      <aside class="bin forge"><div><h3>The Forge</h3><p class="level-copy">Selected problems melt down into your launch strategy.</p><div class="tags" id="problemTags"></div></div></aside>
    </div>
  `, `<div class="button-row"><button class="btn btn-primary" type="button" id="nextProblems">Forge the Fix</button></div>`);
  document.querySelectorAll(".chip").forEach(chip => chip.onclick = () => {
    const value = chip.dataset.value;
    if (state.problems.includes(value)) return;
    state.problems.push(value);
    chip.classList.add("selected");
    $("#problemTags").insertAdjacentHTML("beforeend", `<span class="tag">${safe(value)}</span>`);
  });
  $("#nextProblems").onclick = () => { scoreProblems(); landingTower(); };
}

function scoreProblems() {
  state.problems.forEach(v => {
    if (v.includes("Website")) { add("customLandingPage", 3); add("premiumWebsite", 2); }
    if (v === "No Website") add("basicLandingPage", 3);
    if (v.includes("Logo")) add("logoBrandKit", 4);
    if (v.includes("Photos")) add("photography", 4);
    if (v.includes("Video")) add("videoEditing", 4);
    if (v.includes("Message") || v.includes("CTA")) { add("customLandingPage", 2); add("fullCreativeLaunch", 2); }
    if (v.includes("Social")) { add("socialContent", 3); add("videoEditing"); }
    if (v.includes("QR") || v.includes("Flyer")) add("qrPromo", 4);
    if (v.includes("Music")) add("customMusic", 4);
    if (v.includes("Scattered")) { add("fullCreativeLaunch", 5); add("ongoingSupport", 2); }
  });
}

function landingTower() {
  const blocks = ["Hero", "About", "Services", "Photos", "Promo Video", "Testimonials", "Event Info", "Donation", "Booking", "Contact Form", "Social Links", "FAQ", "Pricing", "Custom Audio", "QR Code", "Newsletter", "Location Map", "Volunteer Form"];
  scene(5, "Landing Page Tower", "Build the digital foundation", "Choose what your online presence needs. The taller the build, the stronger the case for a bigger package.", `
    <div class="tower-layout">
      <div class="tower-bank">${blocks.map(b => `<button class="block" type="button" data-value="${safe(b)}">${safe(b)}</button>`).join("")}</div>
      <aside class="tower-stack" id="tower"></aside>
    </div>
  `, `<div class="button-row"><button class="btn btn-primary" type="button" id="nextTower">Lock the Build</button></div>`);
  document.querySelectorAll(".block").forEach(block => block.onclick = () => {
    const value = block.dataset.value;
    if (state.blocks.includes(value)) return;
    state.blocks.push(value);
    block.classList.add("selected");
    $("#tower").insertAdjacentHTML("beforeend", `<div class="tower-piece">${safe(value)}</div>`);
  });
  $("#nextTower").onclick = () => { scoreBlocks(); contentCatcher(); };
}

function scoreBlocks() {
  const n = state.blocks.length;
  if (n <= 5) add("basicLandingPage", 2);
  if (n >= 6 && n <= 9) add("customLandingPage", 4);
  if (n >= 10) { add("premiumWebsite", 4); add("fullCreativeLaunch", 2); }
  state.blocks.forEach(v => {
    if (v.includes("Video")) add("videoEditing", 3);
    if (v.includes("Photos")) add("photography", 3);
    if (v.includes("Audio")) add("customMusic", 3);
    if (v.includes("QR")) add("qrPromo", 3);
    if (v.includes("Newsletter") || v.includes("Social")) add("socialContent", 2);
  });
}

function contentCatcher() {
  scene(6, "Content Catcher", "Catch the launch tools", "Move the bucket and catch the services you care about. This makes the game feel playful while still collecting buying intent.", `
    <div class="catch-stage" id="catchStage"><div class="catcher" id="catcher">LAUNCH KIT</div></div>
    <div class="button-row"><button class="btn btn-dark" type="button" id="left">← Left</button><button class="btn btn-dark" type="button" id="right">Right →</button><button class="btn btn-primary" type="button" id="nextCatch">Finish Round</button></div>
    <p class="level-copy">Caught: <span id="caught">nothing yet</span></p>
  `);
  const tools = ["Website", "Logo", "Brand Kit", "Photos", "Video", "Music", "Jingle", "QR Flyer", "Business Card", "Social Posts", "Event Promo", "Monthly Updates", "Email Signup", "Booking Link", "Donation Link"];
  const stage = $("#catchStage");
  let x = 50;
  let active = true;
  function move(amount) {
    x = Math.max(7, Math.min(83, x + amount));
    $("#catcher").style.left = `${x}%`;
  }
  $("#left").onclick = () => move(-12);
  $("#right").onclick = () => move(12);
  document.onkeydown = (e) => { if (e.key === "ArrowLeft") move(-9); if (e.key === "ArrowRight") move(9); };
  function caught(value) {
    if (!state.tools.includes(value)) state.tools.push(value);
    $("#caught").textContent = state.tools.join(", ");
  }
  const spawner = setInterval(() => {
    if (!active) return;
    const item = document.createElement("div");
    item.className = "fall";
    item.textContent = tools[Math.floor(Math.random() * tools.length)];
    item.style.left = `${8 + Math.random() * 78}%`;
    stage.appendChild(item);
    let y = -40;
    const faller = setInterval(() => {
      y += 6;
      item.style.top = `${y}px`;
      const itemX = parseFloat(item.style.left);
      if (y > 315 && Math.abs(itemX - x) < 14) {
        caught(item.textContent);
        item.remove();
        clearInterval(faller);
      }
      if (y > 455) { item.remove(); clearInterval(faller); }
    }, 42);
  }, 520);
  setTimeout(() => { active = false; clearInterval(spawner); }, 15000);
  $("#nextCatch").onclick = () => { active = false; clearInterval(spawner); scoreTools(); budgetBridge(); };
}

function scoreTools() {
  state.tools.forEach(v => {
    if (v === "Website") { add("basicLandingPage"); add("customLandingPage", 3); }
    if (v === "Logo" || v === "Brand Kit") add("logoBrandKit", 4);
    if (v === "Photos") add("photography", 4);
    if (v === "Video") add("videoEditing", 4);
    if (v === "Music" || v === "Jingle") add("customMusic", 4);
    if (v.includes("QR") || v.includes("Business")) add("qrPromo", 4);
    if (v.includes("Social") || v.includes("Email")) add("socialContent", 3);
    if (v.includes("Monthly")) add("ongoingSupport", 5);
    if (v.includes("Event")) add("qrPromo", 2);
  });
}

function budgetBridge() {
  const items = ["Under $100", "$100–$250", "$250–$500", "$500–$900", "$900+", "I need payments", "I need a discount", "Not sure yet"].map(x => ({ label: x, value: x, icon: "▰", copy: "Select the starting point that feels realistic." }));
  scene(7, "Budget Bridge", "Choose the launch runway", "This keeps the recommendation realistic. We are not trying to sell everyone the biggest thing. We are finding the right first move.", `<div class="bridge-grid">${items.map(item => `<button class="card" type="button" data-value="${safe(item.value)}"><div class="icon">${item.icon}</div><b>${safe(item.label)}</b><span>${safe(item.copy)}</span></button>`).join("")}</div><div class="bridge-road" id="road"><strong>IDEA</strong><strong>LAUNCH</strong></div>`);
  document.querySelectorAll(".card").forEach(card => card.onclick = () => {
    state.budget = card.dataset.value;
    $("#road").insertAdjacentHTML("beforeend", `<div class="plank">${safe(state.budget)}</div>`);
    if (state.budget.includes("Under")) { add("qrPromo", 4); add("logoBrandKit"); }
    if (state.budget.includes("100")) { add("logoBrandKit", 2); add("videoEditing"); add("customMusic"); }
    if (state.budget.includes("250")) { add("basicLandingPage", 4); add("logoBrandKit", 2); }
    if (state.budget.includes("500")) { add("customLandingPage", 4); add("premiumWebsite"); add("videoEditing"); }
    if (state.budget.includes("900+")) { add("premiumWebsite", 4); add("fullCreativeLaunch", 4); }
    if (state.budget.includes("payments") || state.budget.includes("discount")) { add("basicLandingPage"); add("customLandingPage"); add("fullCreativeLaunch"); }
    setTimeout(launchTimer, 500);
  });
}

function launchTimer() {
  const options = ["ASAP", "2 Weeks", "1 Month", "2–3 Months", "Just Exploring"];
  scene(8, "Launch Timer", "Stop the clock", "Lock in your urgency. Hot leads need fast action. Explorers need the right starter path.", `
    <div class="dial-wrap"><div class="dial"><div id="dialValue" class="dial-value">ASAP</div></div><button class="btn btn-primary" type="button" id="stopTimer">Stop Timer</button></div>
  `);
  let i = 0;
  const timer = setInterval(() => {
    i = (i + 1) % options.length;
    $("#dialValue").textContent = options[i];
  }, 420);
  $("#stopTimer").onclick = () => {
    clearInterval(timer);
    state.timeline = $("#dialValue").textContent;
    if (state.timeline === "ASAP" || state.timeline === "2 Weeks") { add("fullCreativeLaunch"); add("customLandingPage"); }
    unlock();
  };
}

function unlock() {
  updateHud(8, "BLUEPRINT READY");
  screen.innerHTML = `
    <div class="scene">
      <p class="kicker">Final Gate</p>
      <h1 class="level-title">Unlock the launch kit</h1>
      <p class="level-copy">Your recommendation is ready. Enter your info and ChurchBuilt will show your best-fit service, offer, and next move.</p>
      <form class="form-grid" id="leadForm">
        <div class="field"><label>Name</label><input name="name" required placeholder="Your name"></div>
        <div class="field"><label>Email</label><input name="email" type="email" required placeholder="you@example.com"></div>
        <div class="field"><label>Business / Organization</label><input name="organization" required placeholder="Brand name"></div>
        <div class="field"><label>Website or Social</label><input name="website" placeholder="Optional"></div>
        <div class="field"><label>Phone</label><input name="phone" placeholder="Optional"></div>
        <div class="field full"><label>Project Notes</label><textarea name="notes" rows="4" placeholder="Tell me anything I should know..."></textarea></div>
        <div class="field full"><button class="btn btn-primary" type="submit">Reveal My Launch Kit</button></div>
      </form>
    </div>
  `;
  $("#leadForm").onsubmit = submitLead;
}

async function submitLead(event) {
  event.preventDefault();
  state.lead = Object.fromEntries(new FormData(event.target).entries());
  const top = getTop();
  const r = results[top.key];
  const payload = {
    ...state.lead,
    mission: state.mission,
    startingPoint: state.startingPoint,
    vibes: state.vibes,
    problems: state.problems,
    blocks: state.blocks,
    tools: state.tools,
    budget: state.budget,
    timeline: state.timeline,
    topRecommendation: r.title,
    recommendedService: r.service,
    unlockedOffer: r.offer,
    scores: state.scores,
    createdAt: new Date().toISOString()
  };
  const all = JSON.parse(localStorage.getItem("launchforge_leads") || "[]");
  all.push(payload);
  localStorage.setItem("launchforge_leads", JSON.stringify(all));
  localStorage.setItem("launchforge_latest_lead", JSON.stringify(payload));
  if (CONFIG.leadEndpoint) {
    try { await fetch(CONFIG.leadEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); } catch (error) { console.warn(error); }
  }
  showResult(payload);
}

function getTop() {
  const sorted = Object.entries(state.scores).sort((a, b) => b[1] - a[1]);
  return { key: sorted[0][0], score: sorted[0][1], second: sorted[1]?.[0] };
}

function showResult(payload) {
  const top = getTop();
  const r = results[top.key];
  const second = results[top.second] || results.fullCreativeLaunch;
  updateHud(8, "LAUNCH KIT FORGED");
  screen.innerHTML = `
    <div class="scene">
      <p class="kicker">Result Unlocked</p>
      <h1 class="result-title">${safe(r.title)}</h1>
      <p class="subtitle">${safe(r.copy)}</p>
      <div class="result-layout">
        <div class="result-card">
          <div class="stat"><span>Best ChurchBuilt match</span><strong>${safe(r.service)}</strong></div>
          <div class="stat"><span>Unlocked offer</span><strong>${safe(r.offer)}</strong></div>
          <div class="stat"><span>Secondary fit</span><strong>${safe(second.title)}</strong></div>
          <div class="stat"><span>Mission</span><strong>${safe(state.mission || "Not selected")}</strong></div>
          <div class="stat"><span>Budget</span><strong>${safe(state.budget || "Not selected")}</strong></div>
          <div class="stat"><span>Timeline</span><strong>${safe(state.timeline || "Not selected")}</strong></div>
          <div class="button-row">
            <a class="btn btn-primary" href="${CONFIG.calendlyUrl}" target="_blank" rel="noopener">Book My Free Discovery Call</a>
            <button class="btn btn-dark" id="download" type="button">Download Result</button>
          </div>
        </div>
        <aside class="result-card">
          <h2 class="level-title" style="font-size:2.6rem">Intel</h2>
          <p class="level-copy"><strong>Vibe:</strong> ${safe(state.vibes.slice(0, 7).join(", ") || "Not selected")}</p>
          <p class="level-copy"><strong>Problems:</strong> ${safe(state.problems.join(", ") || "Not selected")}</p>
          <p class="level-copy"><strong>Tools:</strong> ${safe(state.tools.join(", ") || "Not selected")}</p>
          <div class="notice">ChurchBuilt is your creative launch partner for websites, branding, video, photos, custom music, QR promo, content, and ongoing support.</div>
        </aside>
      </div>
    </div>
  `;
  $("#download").onclick = () => download(JSON.stringify(payload, null, 2), "launchforge-result.json", "application/json");
}

function download(content, filename, type) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([content], { type }));
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

window.addEventListener("DOMContentLoaded", home);
