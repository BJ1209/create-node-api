import chalk from "chalk";
import { select, input } from '@inquirer/prompts';
import path from "path";
import fs from 'fs-extra';
import ora from "ora";
import { execa } from "execa";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main(): Promise<void> {
  console.log(chalk.bold.cyan("\n  create-node-api\n"));

  const projectName = await input({
    message: "Project name:",
    default: "my-project",
    validate: (v: string) => v.trim() ? true : "Project name cannot be empty",
    required: true,
  });

  const language = await select({
    message: "Select language:",
    choices: [
      { name: "TypeScript", value: "typescript" },
      { name: "JavaScript", value: "javascript" },
    ]
  });

  const library = "express";

  const templateDir = path.join(__dirname, `../templates/${library}-${language}`);

  console.log(templateDir);
  const spinner = ora("Creating folder structure...").start();
  if (!fs.existsSync(templateDir)) {
    spinner.fail(chalk.red(`Template not found: ${library}-${language}`));
    return process.exit(1);
  }

  const targetDir = path.resolve(process.cwd(), projectName);
  if (fs.existsSync(targetDir)) {
    spinner.fail(chalk.red(`\n  Directory "${projectName}" already exists.\n`));
    return process.exit(1);
  }

  await fs.copy(templateDir, targetDir);

  // Patch package.json with project name
  const pkgPath = path.join(targetDir, "package.json");
  const pkg = await fs.readJson(pkgPath);
  pkg.name = projectName;
  await fs.writeJson(pkgPath, pkg, { spaces: 2 });

  spinner.succeed("Folder structure created");

  // Install dependencies
  const installSpinner = ora("Installing dependencies...").start();

  try {
    await execa("npm", ["install"], { cwd: targetDir });
    installSpinner.succeed("Dependencies installed");
  } catch {
    installSpinner.fail("npm install failed — run it manually");
  }

  console.log(chalk.green(`\n  Ready.\n`));
  console.log(chalk.gray(`  Language:   ${language}`));
  console.log(chalk.gray(`  Framework:  ${library}\n`));
  console.log(chalk.white("  Next:\n"));
  console.log(chalk.cyan(`  cd ${projectName}`));
  console.log(chalk.cyan(`  npm run dev\n`));
}

main().catch((err) => {
  console.error(chalk.red("\n  Error:"), err.message);
  process.exit(1);
});
