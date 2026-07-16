# Paint Store Simulator

A browser-based paint store management game. Mix custom paint orders, run the tinting machine, and get cans to customers before they lose patience.

**[Play it here](https://ramblinjan.github.io/paint-store/)**

## How it works

Customers queue up at the register with paint orders. Your job is to:

1. **Take orders** at the register
2. **Grab base paint** from the warehouse shelves (White, Gray, or Deep base)
3. **Load cans onto the tinting machine** and activate it
4. **Seal finished cans** from the output side
5. **Load cans into a shaker** and wait for it to finish mixing
6. **Deliver** the mixed paint to the customer at the pickup counter

## Controls

| Key | Action |
|-----|--------|
| Arrow keys / WASD | Move |
| E | Interact |

## Tech

Pure HTML5 Canvas — no framework, no build step. ES modules only.

## Development

Just serve the directory with any static file server:

```
npx serve .
# or
python3 -m http.server
```
