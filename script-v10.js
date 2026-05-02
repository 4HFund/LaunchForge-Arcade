(() => {
  const calendly = 'https://calendly.com/sidney-mozingo/15-min-video-discovery-call';
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  const stage = $('#stage');
  const progress = $('#progress');
  const hudLabel = $('#hudLabel');
  const hudCount = $('#hudCount');

  const state = {
    mission: '',
    pressure: [],
    identity: [],
    media: [],
    modules: [],
    kit: [],
    budget: '',
    timeline: '',
    credits: 12,
    scores: {
      basic: 0,
      custom: 0,
      premium: 0,
      brand: 0,
      qr: 0,
      video: 0,
      photo: 0,
      music: 0,
      social: 0,
      support: 0,
      full: 0
    }
  };

  const offers = {
    basic: ['Quick Launch Brief', 'Basic Landing Page — $300', '$50 off your first landing page'],
    custom: ['Polished Presence Brief', 'Custom Landing Page — $600', 'Free QR flyer included'],
    premium: ['Full Foundation Brief', 'Premium Website — $900', '$100 off your premium website build'],
    brand: ['Identity System Brief', 'Logo + Brand Kit — $249', 'Free social profile graphics included'],
    qr: ['Local Activation Brief', 'QR Flyer / QR Business Card', 'Bundle flyer + QR card and save'],
    video: ['Story Engine Brief', 'Video Editing / Promo Video', 'Free 15-second social cutdown'],
    photo: ['Visual Trust Brief', 'Photo Content Package', 'Free web-ready photo crop set'],
    music: ['Sound Identity Brief', 'Custom Music / Jingle / Theme Song', 'Free intro/outro version'],
    social: ['Momentum Campaign Brief', 'Social Content / Campaign Support', 'Free starter content direction sheet'],
    support: ['Ongoing Partner Brief', 'Ongoing Website Support — starting at $49/month', 'First month discounted with website package'],
    full: ['Full Creative Launch Brief', 'Custom Creative Launch Bundle', 'Custom bundle discount']
  };

  function add(key, value = 1) {
    state.scores[key] = (state.scores[key] || 0) + value;
  }

  function esc(value = '') {
    return String(value).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  }

  function updateHud(step, label) {
    hudLabel.textContent = label.toUpperCase();
    hudCount.textContent = `${String(Math.min(step, 8)).padStart(2, '0')} / 08`;
    progress.style.width = `${Math.min(100, (step / 8) * 100)}%`;
  }

  function render(markup) {
    stage.innerHTML = markup;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function scene(step, label, title, copy, body, actions = '') {
    updateHud(step, label);
    render(`
      <section class="scene">
        <div class="topline">
          <div>
            <p class="kicker">${esc(label)}</p>
            <h1 class="step-title">${esc(title)}</h1>
            <p class="copy">${esc(copy)}</p>
          </div>
          <span class="step-pill">Phase ${Math.min(step, 8)} / 8</span>
        </div>
        ${body}
        ${actions}
      </section>
    `);
  }

  function home() {
    updateHud(0, 'System Ready');
    render(`
      <section class="scene home">
        <div>
          <p class="kicker">ChurchBuilt Creative Simulator</p>
          <h1 class="title"><span>Launch</span>Forge</h1>
          <p class="copy">A premium intake experience that turns goals, pressure points, media needs, budget, and timeline into a useful ChurchBuilt launch brief.</p>
          <div class="actions">
            <button class="btn btn-primary" id="start" type="button">Begin Brand Simulation</button>
            <button class="btn btn-dark" id="skip" type="button">I already know I need help</button>
          </div>
        </div>
        <aside class="brand-panel">
          <div>
            <div class="wordmark"><span>Church</span><b>Built</b></div>
            <div class="tagline">Built to serve. Built to grow.</div>
            <div class="swoosh"></div>
          </div>
          <div class="panel-bottom">
            <p class="kicker">Creative launch partner</p>
            <h2>Build the signal. Cut the noise.</h2>
            <div class="stat-grid">
              <div class="stat-mini"><b>08</b><span>Phases</span></div>
              <div class="stat-mini"><b>12</b><span>Credits</span></div>
              <div class="stat-mini"><b>01</b><span>Brief</span></div>
            </div>
          </div>
        </aside>
      </section>
    `);
    $('#start').addEventListener('click', mission);
    $('#skip').addEventListener('click', leadGate);
  }

  function cards(items, className = 'mission-grid') {
    return `<div class="${className}">${items.map((item) => `
      <button class="card" type="button" data-v="${esc(item[0])}">
        <div class="icon">${item[1]}</div>
        <b>${esc(item[0])}</b>
        <span>${esc(item[2])}</span>
      </button>
    `).join('')}</div>`;
  }

  function bind(selector, handler) {
    $$(selector).forEach((el) => el.addEventListener('click', () => handler(el)));
  }

  function mission() {
    const items = [
      ['Business', '▣', 'Company, shop, service, or local offer.'],
      ['Church / Ministry', '✦', 'Mission that needs clarity and reach.'],
      ['Nonprofit', '◇', 'Cause that needs credibility and action.'],
      ['Event / Fundraiser', '●', 'Date-driven campaign that needs attention.'],
      ['Personal Brand', '◉', 'A person-led platform.'],
      ['Product / Service', '▰', 'An offer that needs a sharper launch.'],
      ['Community Project', '⌂', 'Local initiative that needs visibility.'],
      ['Undefined Idea', '◆', 'A vision with scattered pieces.']
    ];
    scene(1, 'Mission File', 'Open the mission file', 'Choose what kind of project this is. The simulator shapes the recommendation around the mission type.', cards(items));
    bind('.card', (btn) => {
      state.mission = btn.dataset.v;
      if (state.mission.includes('Church')) { add('premium', 2); add('video'); add('social'); add('support', 2); }
      else if (state.mission.includes('Event')) { add('qr', 3); add('video', 2); add('music'); }
      else if (state.mission.includes('Undefined')) { add('full', 4); add('support', 2); }
      else { add('custom', 2); add('brand'); add('photo'); }
      pressure();
    });
  }

  function pressure() {
    const items = ['No Website', 'Weak Website', 'Weak Logo', 'Bad Photos', 'No Promo Video', 'Confusing Message', 'Weak Social Media', 'No Flyer / QR', 'No Sound Identity', 'Everything Scattered'];
    const body = `
      <div class="split">
        <div class="signal-panel"><div class="priority-grid">
          ${items.map((item) => `<button class="option" type="button" data-v="${esc(item)}"><b>${esc(item)}</b><span>Mark as a primary obstacle.</span></button>`).join('')}
        </div></div>
        <aside class="priority-stack">
          <div class="slot" id="slot0">Pressure 1</div>
          <div class="slot" id="slot1">Pressure 2</div>
          <div class="slot" id="slot2">Pressure 3</div>
          <p class="micro">The final brief will use these as the main reason behind the recommendation.</p>
        </aside>
      </div>`;
    scene(2, 'Pressure Scan', 'Identify the friction', 'Select up to three pressure points. This keeps the strategy focused.', body, `<div class="actions"><button class="btn btn-primary" id="next" type="button">Run Pressure Scan</button></div>`);
    bind('.option', (btn) => pickThree(btn, state.pressure, 'Pressure'));
    $('#next').addEventListener('click', () => {
      state.pressure.forEach((v) => {
        if (v.includes('Website')) { add('custom', 3); add('premium', 2); }
        if (v.includes('Logo')) add('brand', 4);
        if (v.includes('Photos')) add('photo', 4);
        if (v.includes('Video')) add('video', 4);
        if (v.includes('Message')) add('custom', 2);
        if (v.includes('Social')) add('social', 3);
        if (v.includes('QR')) add('qr', 4);
        if (v.includes('Sound')) add('music', 4);
        if (v.includes('Scattered')) add('full', 5);
      });
      identity();
    });
  }

  function pickThree(btn, arr, label) {
    const value = btn.dataset.v;
    const index = arr.indexOf(value);
    if (index > -1) { arr.splice(index, 1); btn.classList.remove('selected'); }
    else if (arr.length < 3) { arr.push(value); btn.classList.add('selected'); }
    for (let i = 0; i < 3; i++) {
      const slot = $(`#slot${i}`);
      if (slot) {
        slot.textContent = arr[i] || `${label} ${i + 1}`;
        slot.classList.toggle('filled', Boolean(arr[i]));
      }
    }
  }

  function identity() {
    const rows = [['Clean', 'Bold'], ['Warm', 'Premium'], ['Local', 'High-End'], ['Simple', 'Creative'], ['Faith-Based', 'Broad Community']];
    const body = `<div class="segmented">${rows.map((row, index) => `
      <div class="slider-row">
        <div class="slider-head"><span>${row[0]}</span><span>${row[1]}</span></div>
        <div class="slider-options">${[1, 2, 3, 4, 5].map((n) => `<button class="dot" type="button" data-row="${index}" data-v="${n}">${n}</button>`).join('')}</div>
      </div>`).join('')}</div>`;
    scene(3, 'Identity Lab', 'Shape the visual signal', 'Choose where the brand should sit. These are strategic direction sliders.', body, `<div class="actions"><button class="btn btn-primary" id="next" type="button">Lock Identity Direction</button></div>`);
    bind('.dot', (dot) => {
      $$(`.dot[data-row="${dot.dataset.row}"]`).forEach((x) => x.classList.remove('selected'));
      dot.classList.add('selected');
      state.identity[Number(dot.dataset.row)] = Number(dot.dataset.v);
    });
    $('#next').addEventListener('click', () => {
      state.identity.forEach((v) => {
        if (v >= 4) { add('custom'); add('video'); add('brand'); }
        else if (v <= 2) { add('photo'); add('qr'); add('custom'); }
        else add('brand');
      });
      media();
    });
  }

  function toggle(btn, arr) {
    const value = btn.dataset.v;
    const index = arr.indexOf(value);
    if (index > -1) { arr.splice(index, 1); btn.classList.remove('selected'); }
    else { arr.push(value); btn.classList.add('selected'); }
  }

  function media() {
    const items = [['Photo Library', 'Photography', 'photo', 3], ['Promo Video', 'Video Editing', 'video', 4], ['Social Clips', 'Social Content', 'social', 3], ['Theme Song / Jingle', 'Custom Music', 'music', 3], ['Testimonial Edit', 'Video Story', 'video', 2], ['Event Recap', 'Event Media', 'video', 3]];
    const body = `<div class="media-grid">${items.map((item) => `<button class="asset" type="button" data-v="${item[0]}" data-score="${item[2]}" data-p="${item[3]}"><b>${item[0]}</b><span>${item[1]}</span></button>`).join('')}</div>`;
    scene(4, 'Media Engine', 'Choose what makes people care', 'Select media tools that would make the project easier to understand, trust, or remember.', body, `<div class="actions"><button class="btn btn-primary" id="next" type="button">Calibrate Media Engine</button></div>`);
    bind('.asset', (btn) => toggle(btn, state.media));
    $('#next').addEventListener('click', () => {
      $$('.asset.selected').forEach((btn) => add(btn.dataset.score, Number(btn.dataset.p)));
      architecture();
    });
  }

  function architecture() {
    const modules = ['Hero Message', 'About / Story', 'Services / Offers', 'Photos', 'Promo Video', 'Booking / Contact', 'Donation / Signup', 'Events', 'QR Code', 'Newsletter', 'Social Links', 'FAQ'];
    const body = `<div class="split"><div class="module-grid">${modules.map((mod) => `<button class="module" type="button" data-v="${mod}"><b>${mod}</b><span>Add this to the website blueprint.</span></button>`).join('')}</div><aside class="blueprint" id="blueprint"><p class="micro">Selected website modules will appear here.</p></aside></div>`;
    scene(5, 'Website Architecture', 'Assemble the digital blueprint', 'Tap the modules the online presence actually needs.', body, `<div class="actions"><button class="btn btn-primary" id="next" type="button">Lock Website Blueprint</button></div>`);
    bind('.module', (btn) => {
      toggle(btn, state.modules);
      $('#blueprint').innerHTML = state.modules.length ? state.modules.map((m) => `<div class="wire">${esc(m)}</div>`).join('') : `<p class="micro">Selected website modules will appear here.</p>`;
    });
    $('#next').addEventListener('click', () => {
      const n = state.modules.length;
      if (n <= 4) add('basic', 2);
      if (n >= 5 && n <= 8) add('custom', 4);
      if (n >= 9) { add('premium', 4); add('full', 2); }
      state.modules.forEach((m) => {
        if (m.includes('Video')) add('video', 3);
        if (m.includes('Photos')) add('photo', 3);
        if (m.includes('QR')) add('qr', 3);
        if (m.includes('Newsletter') || m.includes('Social')) add('social', 2);
      });
      kit();
    });
  }

  function kit() {
    const items = [['Website', 3, 'custom'], ['Brand Kit', 3, 'brand'], ['Photos', 2, 'photo'], ['Video', 4, 'video'], ['Music / Jingle', 2, 'music'], ['QR Promo', 1, 'qr'], ['Social Content', 2, 'social'], ['Monthly Support', 2, 'support'], ['Full Launch', 6, 'full']];
    state.credits = 12;
    const body = `<span class="credits" id="credits">12 Credits</span><div class="media-grid">${items.map((item) => `<button class="asset" type="button" data-v="${item[0]}" data-cost="${item[1]}" data-score="${item[2]}"><span class="cost">${item[1]} CR</span><b>${item[0]}</b><span>Add to launch kit.</span></button>`).join('')}</div>`;
    scene(6, 'Launch Kit Builder', 'Spend twelve launch credits', 'Choose what you would actually invest in first.', body, `<div class="actions"><button class="btn btn-primary" id="next" type="button">Confirm Launch Kit</button></div>`);
    bind('.asset', (btn) => {
      const value = btn.dataset.v;
      const cost = Number(btn.dataset.cost);
      const index = state.kit.indexOf(value);
      if (index > -1) { state.kit.splice(index, 1); state.credits += cost; btn.classList.remove('selected'); }
      else if (state.credits >= cost) { state.kit.push(value); state.credits -= cost; btn.classList.add('selected'); }
      $('#credits').textContent = `${state.credits} Credits`;
    });
    $('#next').addEventListener('click', () => {
      $$('.asset.selected').forEach((btn) => add(btn.dataset.score, 5));
      calibration();
    });
  }

  function calibration() {
    const budgets = ['Under $100', '$100–$250', '$250–$500', '$500–$900', '$900+', 'Need payments / discount'];
    const times = ['ASAP', '2 Weeks', '1 Month', '2–3 Months', 'Just Exploring'];
    const body = `<div class="calibration"><div class="cal-card"><p class="kicker">Budget Comfort</p><div class="cal-options">${budgets.map((b) => `<button type="button" data-type="budget" data-v="${b}">${b}</button>`).join('')}</div></div><div class="cal-card"><p class="kicker">Timeline</p><div class="cal-options">${times.map((t) => `<button type="button" data-type="timeline" data-v="${t}">${t}</button>`).join('')}</div></div></div>`;
    scene(7, 'Launch Calibration', 'Set budget and timeline', 'These settings keep the recommendation realistic and help ChurchBuilt follow up the right way.', body, `<div class="actions"><button class="btn btn-primary" id="next" type="button">Generate Launch Brief</button></div>`);
    bind('.cal-options button', (btn) => {
      const type = btn.dataset.type;
      if (type === 'budget') state.budget = btn.dataset.v;
      else state.timeline = btn.dataset.v;
      $$(`button[data-type="${type}"]`).forEach((x) => x.classList.remove('selected'));
      btn.classList.add('selected');
    });
    $('#next').addEventListener('click', () => {
      const budget = state.budget || '';
      if (budget.includes('Under')) add('qr', 4);
      if (budget.includes('100')) add('brand', 2);
      if (budget.includes('250')) add('basic', 4);
      if (budget.includes('500')) add('custom', 4);
      if (budget.includes('900+')) add('premium', 4);
      if (budget.includes('discount')) add('full');
      if (state.timeline === 'ASAP' || state.timeline === '2 Weeks') add('custom');
      leadGate();
    });
  }

  function leadGate() {
    updateHud(8, 'Brief Ready');
    render(`
      <section class="scene">
        <p class="kicker">Final Gate</p>
        <h1 class="step-title">Unlock the launch brief</h1>
        <p class="copy">Enter your info to reveal the recommended ChurchBuilt path, offer, and follow-up details.</p>
        <form class="field-grid" id="leadForm">
          <div class="field"><label>Name</label><input name="name" required placeholder="Your name"></div>
          <div class="field"><label>Email</label><input name="email" type="email" required placeholder="you@example.com"></div>
          <div class="field"><label>Business / Organization</label><input name="organization" required placeholder="Brand name"></div>
          <div class="field"><label>Website or Social</label><input name="website" placeholder="Optional"></div>
          <div class="field"><label>Phone</label><input name="phone" placeholder="Optional"></div>
          <div class="field full"><label>Project Notes</label><textarea name="notes" rows="4" placeholder="Anything you want me to know..."></textarea></div>
          <div class="field full"><button class="btn btn-primary" type="submit">Reveal My Launch Brief</button></div>
        </form>
      </section>
    `);
    $('#leadForm').addEventListener('submit', submitLead);
  }

  function topOffer() {
    const sorted = Object.keys(state.scores).sort((a, b) => state.scores[b] - state.scores[a]);
    return { key: sorted[0], second: sorted[1] || 'full' };
  }

  function submitLead(event) {
    event.preventDefault();
    const top = topOffer();
    const result = offers[top.key];
    const second = offers[top.second] || offers.full;
    const lead = Object.fromEntries(new FormData(event.target).entries());
    const payload = { lead, ...state, topRecommendation: result[0], recommendedService: result[1], unlockedOffer: result[2], createdAt: new Date().toISOString() };
    const all = JSON.parse(localStorage.getItem('launchforge_leads') || '[]');
    all.push(payload);
    localStorage.setItem('launchforge_leads', JSON.stringify(all));
    localStorage.setItem('launchforge_latest_lead', JSON.stringify(payload));
    updateHud(8, 'Launch Brief Generated');
    const badges = [state.mission, ...state.pressure, ...state.media, ...state.modules, ...state.kit].filter(Boolean).slice(0, 20);
    render(`
      <section class="scene">
        <p class="kicker">ChurchBuilt Launch Brief</p>
        <h1 class="brief-title">${esc(result[0])}</h1>
        <p class="copy">${esc(result[1])} is the smartest first move based on the project signals you selected.</p>
        <div class="brief-layout">
          <div class="brief-card">
            <div class="summary">
              <div class="summary-row"><span>Recommended Path</span><strong>${esc(result[1])}</strong></div>
              <div class="summary-row"><span>Unlocked Offer</span><strong>${esc(result[2])}</strong></div>
              <div class="summary-row"><span>Secondary Fit</span><strong>${esc(second[0])}</strong></div>
              <div class="summary-row"><span>Mission</span><strong>${esc(state.mission || 'Not selected')}</strong></div>
              <div class="summary-row"><span>Budget</span><strong>${esc(state.budget || 'Not selected')}</strong></div>
              <div class="summary-row"><span>Timeline</span><strong>${esc(state.timeline || 'Not selected')}</strong></div>
            </div>
            <div class="actions"><a class="btn btn-primary" href="${calendly}" target="_blank" rel="noopener">Book My Free Discovery Call</a></div>
          </div>
          <aside class="brief-card">
            <h2 class="step-title" style="font-size:2.8rem">Project Intel</h2>
            <div class="badge-list">${badges.map((x) => `<span class="badge">${esc(x)}</span>`).join('')}</div>
            <p class="notice">ChurchBuilt is your creative launch partner for websites, branding, video, photos, custom music, QR promo, content, and ongoing support.</p>
          </aside>
        </div>
      </section>
    `);
  }

  if ($('#start')) $('#start').addEventListener('click', mission);
  if ($('#skip')) $('#skip').addEventListener('click', leadGate);
})();