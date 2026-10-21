# A Virtual Bouquet for Maria 💐

Seven flowers, seven questions, seven love letters. A small static website made to be opened on a phone.

## How it works

1. **Welcome**: a short note inviting Maria to open her bouquet.
2. **Bouquet**: seven clickable flowers. The next flower to read glows softly, and opened flowers get a small gold heart.
3. **Letters**: each flower opens a love letter. The seventh flower stays a bud until the other six have been read, then blooms and opens a specially styled final letter.
4. **Closing note**: shown after the seventh letter, with our photo. It can be reopened from the bouquet later.

Little extras: tap the polaroid tucked into the wrapping to see the photo, tap the ribbon, or tap anywhere empty for a floating heart.

Progress is saved in the browser, so the bouquet remembers which letters were opened. Add `?reset` to the URL to start over (useful for testing before sending).

## Editing

| What | Where |
| --- | --- |
| Letter questions and answers, greeting, sign-off, hints | `site/js/content.js` |
| Welcome and closing note wording | `site/index.html` |
| Colours, fonts, animations | `site/css/style.css` |
| Flower designs and bouquet layout | `site/js/app.js` (`FLOWERS`) |
| Photo | `site/images/us.jpeg` |

## Running locally

No build step. Open `site/index.html` in a browser.

## Deploying

```bash
./deploy.sh        # Git Bash
./deploy.ps1       # PowerShell
```

Both copy `site/` into `dist/` and force-push it to the `gh-pages` branch using the key in `.ssh/`.

The old React version is kept in `old-react-site/` for reference.
