import { spawn } from "child_process";
import { existsSync } from "fs";
import path from "path";
import { FileSystemUtils } from "./file-system.js";

/**
 * Scaffold Playwright configuration and fixture files if they don't exist.
 * This should be called during apply workflow when Playwright is needed.
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
        "test:headed": "playwright test --headed",
        "test:codegen": "playwright codegen",
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
        "@playwright/test": "^1.48.0",
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
        packageJson.devDependencies["@playwright/test"] = "^1.48.0";

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
 * Playwright Test Configuration for SpecTest
 * 
 * This configuration is optimized for test workflows including:
 * - Test planning and generation
 * - Test execution with comprehensive reporting
 * - Test healing and debugging
 * - Coverage analysis
 * 
 * See https://playwright.dev/docs/test-configuration for full documentation.
 */
export default defineConfig({
  // Directory containing test files
  testDir: './tests',
  
  // Output directory for test results (screenshots, videos, traces)
  outputDir: './test-results',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter configuration - HTML report for detailed analysis, list for console output */
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like \`await page.goto('/')\`. */
    /* Uncomment and set your application URL for relative navigation */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    /* Traces help with debugging failed tests and test healing */
    trace: 'on-first-retry',

    /* Take screenshot on failure - essential for test healing and debugging */
    screenshot: 'on',

    /* Record video on failure - useful for understanding test failures */
    video: 'retain-on-failure',
    
    /* Action timeout - maximum time for actions like click, fill, etc. */
    actionTimeout: 10_000,
    
    /* Navigation timeout - maximum time for page navigation */
    navigationTimeout: 30_000,
  },

  /* Configure projects for major browsers */
  /* Add more browsers as needed: firefox, webkit, etc. */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment to add more browsers:
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  /* Run your local dev server before starting the tests */
  /* Uncomment and configure if your tests require a running server */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120_000,
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
    const fixturesContent = `import { test as base, Page } from '@playwright/test';

/**
 * Custom Playwright Test Fixtures
 * 
 * Extend the base test with custom fixtures for test workflows.
 * These fixtures can be used across all test files to maintain consistency
 * and reduce code duplication.
 * 
 * Examples of common fixtures:
 * - Authenticated pages (pre-logged in users)
 * - Test data factories
 * - API clients for test setup/teardown
 * - Custom page objects
 */
export const test = base.extend({
  // Example: Custom authenticated page fixture
  // authenticatedPage: async ({ page }, use) => {
  //   // Perform login or authentication setup
  //   await page.goto('/login');
  //   await page.fill('input[name="email"]', 'test@example.com');
  //   await page.fill('input[name="password"]', 'password123');
  //   await page.click('button[type="submit"]');
  //   await page.waitForURL('**/dashboard');
  //   await use(page);
  // },
  
  // Example: Test data factory fixture
  // testData: async ({}, use) => {
  //   const data = {
  //     user: { email: 'test@example.com', password: 'password123' },
  //     // Add more test data as needed
  //   };
  //   await use(data);
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
 * Seed Test for Playwright Test Agents
 * 
 * This test serves as a reference template for AI-powered test generation:
 * - Playwright Planner: Uses this to understand test structure and patterns
 * - Playwright Generator: Uses this as a template for generating new tests
 * - Playwright Healer: Uses this to understand expected test patterns when healing failures
 * 
 * This test demonstrates:
 * - Basic test structure with fixtures
 * - Page navigation and interaction patterns
 * - Assertion patterns with expect
 * - Best practices for automation
 * 
 * Keep this test simple and well-documented to guide AI agents effectively.
 */
test('seed - example test structure', async ({ page }) => {
  // Navigate to a page (update with your application URL)
  // await page.goto('/');
  
  // Example: Wait for page to load
  // await page.waitForLoadState('networkidle');
  
  // Example: Interact with elements using best practices
  // Use getByRole, getByText, getByLabel instead of CSS selectors when possible
  // await page.getByRole('button', { name: 'Submit' }).click();
  
  // Example: Assertions
  // await expect(page.getByText('Welcome')).toBeVisible();
  
  // This is a placeholder test - replace with actual test logic
  // or use as a template for generating new tests
  expect(true).toBe(true);
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
