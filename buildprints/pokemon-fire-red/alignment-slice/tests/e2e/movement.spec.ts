import { expect, type Page, test } from "@playwright/test";

const evidencePath = (filename: string): string =>
  `../../../.omo/ulw-loop/evidence/${filename}`;

const desktopEvidence = evidencePath("G001-C001-desktop-world.png");
const inspectorEvidence = evidencePath("G001-C002-atlas-inspector.png");
const mobileEvidence = evidencePath("G001-C003-mobile-world.png");

const playerX = async (page: Page): Promise<number> => {
  const value = await page
    .getByTestId("game-canvas")
    .getAttribute("data-player-x");
  return value === null ? Number.NaN : Number(value);
};

const playerY = async (page: Page): Promise<number> => {
  const value = await page
    .getByTestId("game-canvas")
    .getAttribute("data-player-y");
  return value === null ? Number.NaN : Number(value);
};

const canvasPixelSummary = async (
  page: Page,
): Promise<{
  readonly distinctColors: number;
  readonly opaqueSamples: number;
}> =>
  page.evaluate(() => {
    const source = document.querySelector<HTMLCanvasElement>("#game canvas");
    if (source === null) return { distinctColors: 0, opaqueSamples: 0 };

    const sampler = document.createElement("canvas");
    sampler.width = source.width;
    sampler.height = source.height;
    const context = sampler.getContext("2d", { willReadFrequently: true });
    if (context === null) return { distinctColors: 0, opaqueSamples: 0 };

    context.drawImage(source, 0, 0);
    const pixels = context.getImageData(
      0,
      0,
      sampler.width,
      sampler.height,
    ).data;
    const colors = new Set<string>();
    let opaqueSamples = 0;
    const stride = Math.max(4, Math.floor(pixels.length / 8_000) * 4);
    for (let index = 0; index < pixels.length; index += stride) {
      const red = pixels[index];
      const green = pixels[index + 1];
      const blue = pixels[index + 2];
      const alpha = pixels[index + 3];
      if (
        red === undefined ||
        green === undefined ||
        blue === undefined ||
        alpha === undefined
      ) {
        continue;
      }
      if (alpha > 0) opaqueSamples += 1;
      colors.add(`${red},${green},${blue},${alpha}`);
    }
    return { distinctColors: colors.size, opaqueSamples };
  });

const collectConsoleErrors = (page: Page): string[] => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => {
    errors.push(error.message);
  });
  return errors;
};

test("keyboard and touch move the same player without browser errors", async ({
  page,
}) => {
  const errors = collectConsoleErrors(page);

  await page.goto("/?renderer=canvas");
  await expect(page.getByTestId("game-canvas")).toHaveAttribute(
    "data-player-facing",
    "down",
  );
  const keyboardStart = await playerX(page);
  await page.keyboard.down("ArrowRight");
  await expect.poll(() => playerX(page)).toBeGreaterThan(keyboardStart);
  await page.keyboard.up("ArrowRight");
  await expect(page.getByTestId("game-canvas")).toHaveAttribute(
    "data-player-facing",
    "right",
  );

  await page.setViewportSize({ width: 375, height: 760 });
  const touchStart = await playerX(page);
  const right = page.getByRole("button", { name: "Move right" });
  await right.dispatchEvent("pointerdown", { pointerId: 1 });
  await expect.poll(() => playerX(page)).toBeGreaterThan(touchStart);
  await right.dispatchEvent("pointerup", { pointerId: 1 });

  expect(errors).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    375,
  );
});

test("desktop semantic world visual is coherent and collision-backed", async ({
  page,
}) => {
  const errors = collectConsoleErrors(page);
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/?renderer=canvas");

  const game = page.getByTestId("game-canvas");
  await expect(game.locator("canvas")).toBeVisible();
  await expect(game).toHaveAttribute("data-world-semantic-ready", "true");
  await expect(game).toHaveAttribute("data-world-grid", "34x22");
  await expect(game).toHaveAttribute("data-world-collision-model", "cell-mask");
  await page.screenshot({ path: desktopEvidence, fullPage: true });

  const pixels = await canvasPixelSummary(page);
  expect(pixels.distinctColors).toBeGreaterThan(8);
  expect(pixels.opaqueSamples).toBeGreaterThan(100);

  const startX = await playerX(page);
  await page.keyboard.down("ArrowRight");
  await expect.poll(() => playerX(page)).toBeGreaterThan(startX);
  await page.keyboard.up("ArrowRight");

  await page.keyboard.down("ArrowUp");
  await expect(game).toHaveAttribute("data-player-collision", "blocked", {
    timeout: 6_000,
  });
  const blockedY = await playerY(page);
  await page.waitForTimeout(250);
  expect(await playerY(page)).toBeCloseTo(blockedY, 1);
  await page.keyboard.up("ArrowUp");

  expect(errors).toEqual([]);
});

test("mobile semantic world visual fits and touch movement works", async ({
  page,
}) => {
  const errors = collectConsoleErrors(page);
  await page.setViewportSize({ width: 375, height: 760 });
  await page.goto("/?renderer=canvas");

  const game = page.getByTestId("game-canvas");
  await expect(game.locator("canvas")).toBeVisible();
  await expect(game).toHaveAttribute("data-world-semantic-ready", "true");
  await page.screenshot({ path: mobileEvidence, fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    375,
  );
  const frameBox = await page.locator(".game-frame").boundingBox();
  const canvasBox = await game.locator("canvas").boundingBox();
  expect(frameBox?.width).toBe(343);
  expect(canvasBox?.width).toBe(480);
  expect(canvasBox?.height).toBe(320);

  const startX = await playerX(page);
  const right = page.getByRole("button", { name: "Move right" });
  await right.dispatchEvent("pointerdown", { pointerId: 2 });
  await expect.poll(() => playerX(page)).toBeGreaterThan(startX);
  await right.dispatchEvent("pointerup", { pointerId: 2 });

  const up = page.getByRole("button", { name: "Move up" });
  await up.dispatchEvent("pointerdown", { pointerId: 3 });
  await expect(game).toHaveAttribute("data-player-collision", "blocked", {
    timeout: 6_000,
  });
  const blockedY = await playerY(page);
  await page.waitForTimeout(250);
  expect(await playerY(page)).toBeCloseTo(blockedY, 1);
  await up.dispatchEvent("pointerup", { pointerId: 3 });

  const pixels = await canvasPixelSummary(page);
  expect(pixels.distinctColors).toBeGreaterThan(8);
  expect(pixels.opaqueSamples).toBeGreaterThan(100);
  expect(errors).toEqual([]);
});

test("inspector exposes semantic atlas coverage without legacy rectangle stamps", async ({
  page,
}) => {
  const errors = collectConsoleErrors(page);
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.goto("/?inspect=1&renderer=canvas");

  const game = page.getByTestId("game-canvas");
  await expect(game.locator("canvas")).toBeVisible();
  await expect(game).toHaveAttribute("data-inspector-ready", "true");
  await expect(game).toHaveAttribute("data-inspector-coverage", "486/486");
  await expect(game).toHaveAttribute("data-atlas-covered-cells", "486");
  await page.screenshot({ path: inspectorEvidence, fullPage: true });
  await expect(game).toHaveAttribute("data-inspector-catalog", /Tile catalog/);
  await expect(game).toHaveAttribute("data-inspector-catalog", /sequence-only/);

  const catalog = await game.getAttribute("data-inspector-catalog");
  expect(catalog).not.toBeNull();
  for (const legacyLabel of [
    "pondWalkway",
    "plazaBuilding",
    "treeBlock",
    "lowerMarket",
  ]) {
    expect(catalog).not.toContain(legacyLabel);
  }

  const pixels = await canvasPixelSummary(page);
  expect(pixels.distinctColors).toBeGreaterThan(8);
  expect(pixels.opaqueSamples).toBeGreaterThan(100);
  expect(errors).toEqual([]);
});
