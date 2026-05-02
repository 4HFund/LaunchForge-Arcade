# LaunchForge Arcade

LaunchForge Arcade is a vanilla HTML/CSS/JavaScript interactive lead-generation game for ChurchBuilt.

It helps churches, nonprofits, small businesses, entrepreneurs, events, fundraisers, and local projects discover which ChurchBuilt creative service fits them best.

## What It Recommends

The game can recommend:

- Basic Landing Page
- Custom Landing Page
- Premium Website
- Logo + Brand Kit
- QR Flyer / QR Business Card
- Video Editing / Promo Video
- Photography / Photo Content Package
- Custom Music / Jingle / Theme Song
- Social Content
- Ongoing Website Support
- Full Creative Launch Bundle

## Included Game Levels

1. Mission Picker
2. Starting Point Scanner
3. Brand Vibe Smash
4. Fix the Broken Brand
5. Landing Page Tower
6. Content Catcher
7. Budget Bridge
8. Launch Timer

After the 8 levels, visitors enter their name, email, organization, website/social link, and optional phone number to unlock their custom Launch Kit result.

## Files

- `index.html`
- `style.css`
- `script.js`

## Lead Capture Setup

Open `script.js` and update this section:

```js
const CONFIG = {
  calendlyUrl: "https://calendly.com/sidney-mozingo/15-min-video-discovery-call",
  leadEndpoint: "",
  businessEmail: ""
};
```

Set `leadEndpoint` to a Formspree, Getform, Netlify Function, Make/Zapier webhook, or custom backend endpoint.

If `leadEndpoint` is left blank, the game still works. Leads are stored in the visitor browser using `localStorage`, and the result can be downloaded as JSON from the final screen.

## Deployment

This is a static site. You can deploy it with:

- GitHub Pages
- Netlify
- Vercel
- GoDaddy static hosting
- Any basic web host

## ChurchBuilt Positioning

ChurchBuilt is a creative launch partner for websites, branding, video, photos, music, QR promo materials, and ongoing support.

Built to serve. Built to grow.
