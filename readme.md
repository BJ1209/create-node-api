# create-node-api

A CLI to scaffold production-ready Node.js API projects. Pick your language and framework — the rest is set up for you.

---

## What it does

Asks you two questions, then generates a complete project with folder structure, dependencies, and config files ready to go.

```

? Project name: my-api

? Language:     TypeScript

  Creating folder structure... ✓

  Installing dependencies...   ✓


  Ready.


  cd my-api

  npm run dev

```

---

## Options

| Prompt | Choices |

|--------|---------|

| Language | TypeScript, JavaScript |

This gives you 2 possible combinations. Each generates a separate, fully working template — no conditional file generation.

---

## Generated project structure

```

my-api/

├── src/

│   ├── index.ts          # entry point

│   ├── env.ts            # parsed environment variables and typings

│   ├── app/              # app

│   |	├── app.ts        # app file

│   |	├── common/       # folder for all common stuff   

│   |	|   ├── config/

│   |	|   |    ├── db.ts

│   |	|   ├── Dto/

│   |	|   |    ├── base.dto.ts

│   |	|   ├── middleware/

│   |	|   |    ├── validate.middleware.ts

│   |	|   ├── utils/

│   |	|   |    ├── APIResponse.ts

│   |	|   |    ├── APIError.ts

│   |	├── modules/      # folder for all modules

├── package.json

├── tsconfig.json         # TypeScript only

├── .env

├── .gitignore

└── .env.example

```

---

## Requirements

- Node.js 18+
- npm

---

## Project scripts (after generation)

| Script | Command | What it does |

|--------|---------|--------------|

| Dev server | `npm run dev` | Starts with hot reload |

| Production | `npm start` | Runs compiled output |
