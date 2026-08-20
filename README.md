# Portfolio

This is my personal portfolio site. I'm building it while I look for my first software engineering role, mainly to have one place where I can show what I've actually built.

**Live site:** [akcanerim.github.io/portfolio](https://akcanerim.github.io/portfolio/)

## What's in it

The site has an intro with an animated particle background, an about section, a personal gallery mixing Erasmus photos and a few things I like, a projects section (currently showing UniTest, a project I'm building with a teammate), a certificates section linking out to my real Coursera verifications, and a contact section with links to my GitHub and LinkedIn.

## Built with

Plain HTML, CSS, and JavaScript. No React, no build tools, nothing fancy. I wanted to actually understand what every line does instead of letting a framework handle it for me, since I'm still pretty new to all of this.

A few small details I'm proud of: it's dark themed with a green accent, sections fade in as you scroll down using the Intersection Observer API, and there's a particle animation in the hero section that reacts when you move your mouse over it. The About text types itself out letter by letter the first time you scroll to it. The gallery is a horizontally scrolling strip that loops seamlessly, photos and videos mixed together. Clicking any photo (gallery or project screenshots) opens it in a shared lightbox with arrow navigation. The nav turns into a hamburger menu on smaller screens.

## Running it locally

There's no build step. Clone it and just open index.html in a browser:

```bash
git clone https://github.com/akcanerim/portfolio.git
cd portfolio
open index.html
```

## Status

The core site is done: layout, animations, and all the sections are in place. I'll keep adding new projects, certificates, and photos as I finish or collect them.