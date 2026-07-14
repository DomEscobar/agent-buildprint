import { expect, type Page, test } from "@playwright/test";

const playerX = async (page: Page): Promise<number> => {
  const value = await page
    .getByTestId("game-canvas")
    .getAttribute("data-player-x");
  return Number(value);
};

test("keyboard and touch move the same player without browser errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("/");
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

test("inspector exposes semantic tile placement catalog", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("/?inspect=1");
  await expect(page.getByTestId("game-canvas")).toHaveAttribute(
    "data-inspector-catalog",
    /Tile catalog/,
  );
  await expect(page.getByTestId("game-canvas")).toHaveAttribute(
    "data-inspector-catalog",
    /fence\.horizontal\.left-end/,
  );
  await expect(page.getByTestId("game-canvas")).toHaveAttribute(
    "data-inspector-catalog",
    /sequence-only/,
  );
  await expect(page.getByTestId("game-canvas")).toHaveAttribute(
    "data-inspector-catalog",
    /water\.pond-with-walkway/,
  );

  expect(errors).toEqual([]);
});
