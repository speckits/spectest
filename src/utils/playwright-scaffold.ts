import { spawn } from "child_process";
import { existsSync } from "fs";
import path from "path";
import { FileSystemUtils } from "./file-system.js";

/**
 * Scaffold Playwright configuration and fixture files if they don't exist.
 * This should be called during apply workflow when Playwright is needed for test automation.
 *
 * @param projectPath - Path to the project root (defaults to current directory)
 */
export async function scaffoldPlaywrightFiles(
  projectPath: string = "."
): Promise<void> {
  const resolvedPath = path.resolve(projectPath);

  // Create package.json if it doesn't exist
  const packageJsonPath = path.join(resolvedPath, "package.json");
  if (!(await FileSystemUtils.fileExists(packageJsonPath))) {
    const projectName = path.basename(resolvedPath) || "my-project";
    const packageJsonContent = {
      name: projectName,
      version: "1.0.0",
      description: "Playwright test automation project",
      type: "module",
      scripts: {
        test: "playwright test",
        "test:ui": "playwright test --ui",
        "test:debug": "playwright test --debug",
        report: "playwright show-report",
      },
      dependencies: {
        chalk: "^5.6.2",
        commander: "^14.0.2",
        ora: "^8.2.0",
        prettier: "^2.8.8",
        typescript: "^5.9.3",
        vitest: "^3.2.4",
        zod: "^4.2.1",
      },
      devDependencies: {
        "@playwright/test": "^1.40.0",
      },
    };
    await FileSystemUtils.writeFile(
      packageJsonPath,
      JSON.stringify(packageJsonContent, null, 2) + "\n"
    );
  } else {
    // If package.json exists, ensure @playwright/test is in dependencies or devDependencies
    try {
      const packageJsonContent = await FileSystemUtils.readFile(
        packageJsonPath
      );
      const packageJson = JSON.parse(packageJsonContent);

      const hasPlaywright =
        (packageJson.dependencies &&
          packageJson.dependencies["@playwright/test"]) ||
        (packageJson.devDependencies &&
          packageJson.devDependencies["@playwright/test"]);

      if (!hasPlaywright) {
        // Add @playwright/test to devDependencies if not present
        if (!packageJson.devDependencies) {
          packageJson.devDependencies = {};
        }
        packageJson.devDependencies["@playwright/test"] = "^1.40.0";

        // Add test scripts if not present
        if (!packageJson.scripts) {
          packageJson.scripts = {};
        }
        if (!packageJson.scripts.test) {
          packageJson.scripts.test = "playwright test";
        }
        if (!packageJson.scripts["test:ui"]) {
          packageJson.scripts["test:ui"] = "playwright test --ui";
        }
        if (!packageJson.scripts["test:debug"]) {
          packageJson.scripts["test:debug"] = "playwright test --debug";
        }

        await FileSystemUtils.writeFile(
          packageJsonPath,
          JSON.stringify(packageJson, null, 2) + "\n"
        );
      }
    } catch (error) {
      // If package.json is invalid JSON, skip updating it
      console.warn(
        "Warning: Could not parse package.json, skipping Playwright dependency check"
      );
    }
  }

  // Create playwright.config.ts if it doesn't exist
  const configPath = path.join(resolvedPath, "playwright.config.ts");
  if (!(await FileSystemUtils.fileExists(configPath))) {
    const configContent = `import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'list',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like \`await page.goto('/')\`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Take screenshot on failure */
    screenshot: 'on',

    /* Record video on failure */
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
`;
    await FileSystemUtils.writeFile(configPath, configContent);
  }

  // Create tests directory if it doesn't exist
  const testsDir = path.join(resolvedPath, "tests");
  if (!(await FileSystemUtils.directoryExists(testsDir))) {
    await FileSystemUtils.createDirectory(testsDir);
  }

  // Create fixtures.ts if it doesn't exist
  const fixturesPath = path.join(testsDir, "fixtures.ts");
  if (!(await FileSystemUtils.fileExists(fixturesPath))) {
    const fixturesContent = `import { test as base } from '@playwright/test';

// Extend base test with custom fixtures
export const test = base.extend({
  // Add custom fixtures here
  // Example:
  // page: async ({ page }, use) => {
  //   // Custom page setup
  //   await use(page);
  // },
});

export { expect } from '@playwright/test';
`;
    await FileSystemUtils.writeFile(fixturesPath, fixturesContent);
  }

  // Create seed.spec.ts if it doesn't exist
  const seedPath = path.join(testsDir, "seed.spec.ts");
  if (!(await FileSystemUtils.fileExists(seedPath))) {
    const seedContent = `import { test, expect } from './fixtures';

/**
 * Seed test for Playwright Test Agents.
 * This test sets up the environment and provides a ready-to-use page context.
 * Playwright planner, generator, and healer agents use this as a reference.
 */
test('seed', async ({ page }) => {
  // This test uses custom fixtures from ./fixtures
  // Add any global setup or initialization here
});
`;
    await FileSystemUtils.writeFile(seedPath, seedContent);
  }
}

/**
 * Run Playwright tests with report and screenshot generation.
 * This should be called during apply workflow after implementing test changes.
 *
 * @param projectPath - Path to the project root (defaults to current directory)
 * @returns Promise that resolves when tests complete (exit code 0) or rejects on failure
 */
export async function runPlaywrightTests(
  projectPath: string = "."
): Promise<void> {
  const resolvedPath = path.resolve(projectPath);
  const packageJsonPath = path.join(resolvedPath, "package.json");

  // Check if package.json exists
  if (!(await FileSystemUtils.fileExists(packageJsonPath))) {
    throw new Error(
      "package.json not found. Run scaffoldPlaywrightFiles first."
    );
  }

  // Check if playwright.config.ts exists
  const configPath = path.join(resolvedPath, "playwright.config.ts");
  if (!(await FileSystemUtils.fileExists(configPath))) {
    throw new Error(
      "playwright.config.ts not found. Run scaffoldPlaywrightFiles first."
    );
  }

  return new Promise((resolve, reject) => {
    // Determine package manager (npm, pnpm, yarn)
    const packageManager = detectPackageManager(resolvedPath);
    const command =
      packageManager === "pnpm"
        ? "pnpm"
        : packageManager === "yarn"
        ? "yarn"
        : "npm";
    const args =
      packageManager === "pnpm"
        ? ["test"]
        : packageManager === "yarn"
        ? ["test"]
        : ["run", "test"];

    console.log(`Running Playwright tests with ${command}...`);
    console.log(
      `Reports will be generated in: ${path.join(
        resolvedPath,
        "playwright-report"
      )}`
    );
    console.log(`Screenshots will be saved on test failures`);

    const child = spawn(command, args, {
      cwd: resolvedPath,
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    child.on("error", (error) => {
      reject(new Error(`Failed to run Playwright tests: ${error.message}`));
    });

    child.on("close", (code, signal) => {
      if (code === 0) {
        console.log("\n✅ Tests completed successfully!");
        console.log(
          `📊 HTML Report: ${path.join(
            resolvedPath,
            "playwright-report",
            "index.html"
          )}`
        );
        console.log(
          `📄 JSON Report: ${path.join(
            resolvedPath,
            "playwright-report",
            "results.json"
          )}`
        );
        resolve();
      } else {
        const reason = signal ? `signal ${signal}` : `exit code ${code}`;
        console.log("\n❌ Tests failed!");
        console.log(
          `📊 HTML Report: ${path.join(
            resolvedPath,
            "playwright-report",
            "index.html"
          )}`
        );
        console.log(
          `📸 Screenshots: Check test-results/ directory for failure screenshots`
        );
        reject(new Error(`Playwright tests failed (${reason})`));
      }
    });
  });
}

/**
 * Detect which package manager is being used in the project
 */
function detectPackageManager(projectPath: string): "npm" | "pnpm" | "yarn" {
  const pnpmLockPath = path.join(projectPath, "pnpm-lock.yaml");
  const yarnLockPath = path.join(projectPath, "yarn.lock");
  const packageLockPath = path.join(projectPath, "package-lock.json");

  // Check for lock files (synchronous check is fine for detection)
  try {
    if (existsSync(pnpmLockPath)) {
      return "pnpm";
    }
    if (existsSync(yarnLockPath)) {
      return "yarn";
    }
    if (existsSync(packageLockPath)) {
      return "npm";
    }
  } catch {
    // Fallback to npm if we can't detect
  }

  // Default to npm if no lock file found
  return "npm";
}
