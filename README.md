# VS Code ESLint: Reproducing the Disable Comment Insertion Position

## Setup

Use Node.js 18.18 or later (Node.js 22 is recommended) and the VS Code
ESLint extension (extension ID: `dbaeumer.vscode-eslint`).

1. Run `npm install` in this folder.
2. Open this folder in VS Code (`code .`) so the included
   `.vscode/settings.json` is loaded as workspace settings.
3. Trust this reproduction folder after reviewing its contents, then enable the ESLint extension.

## Reproduction Steps

1. Open `repro.js` and wait for the `no-console` diagnostic on `console.log`.
2. Place the cursor on `console.log` and press `Ctrl+.` (`Cmd+.` on Mac).
3. Select **Disable no-console for this line**.

Before the code action:

```js
const user = null;
console.log("-- user check --", user == null); // eslint-disable-line eqeqeq -- Check for both null and undefined.
```

Expected edit:

```js
const user = null;
console.log("-- user check --", user == null); // eslint-disable-line eqeqeq, no-console -- Check for both null and undefined.
```

The code action should add `no-console` to the existing directive and preserve the trailing
explanation. The incorrect edit produced by the VS Code extension has not been confirmed with
an end-to-end run in this folder. If the action inserts text at the wrong position, record the
result and the installed extension version.

## Comparison with the CLI

- `npm run lint`: Reports one `no-console` error and exits with code 1.
- `npm start`: Prints `-- user check -- true` before the code action.
- Running ESLint from the CLI alone does not trigger the VS Code comment edit.

## Scope

The target is the insertion-position calculation in `server/src/eslintServer.ts` at commit
`ab90ddbc97c118db7088950e5de85e18a5898c14` from `microsoft/vscode-eslint`. This logic was
isolated to inspect the problematic edit position.

https://github.com/microsoft/vscode-eslint/blob/ab90ddbc97c118db7088950e5de85e18a5898c14/server/src/eslintServer.ts#L467
