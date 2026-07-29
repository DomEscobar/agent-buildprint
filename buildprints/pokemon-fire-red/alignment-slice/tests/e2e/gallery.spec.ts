import { expect, test } from "@playwright/test";

test("Atlas Park renders every semantic asset family as a playable map", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => {
    errors.push(error.message);
  });

  await page.goto("/?renderer=canvas");
  await page.getByRole("link", { name: "Visit Atlas Park" }).click();

  const game = page.getByTestId("game-canvas");
  await expect(game.locator("canvas")).toBeVisible();
  await expect(game).toHaveAttribute("data-world-id", "gallery");
  await expect(game).toHaveAttribute("data-world-grid", "48x32");
  await expect(game).toHaveAttribute("data-world-stamps", "12/12");
  await expect(game).toHaveAttribute("data-world-props", "21/21");
  await expect(game).toHaveAttribute("data-world-grounds", "4/4");
  await expect(game).toHaveAttribute("data-world-sequences", "1/1");
  await expect(game).toHaveAttribute("data-world-authoring-units", "38/38");
  await expect(page.getByRole("heading")).toHaveText("Atlas Park");
  await expect(
    page.getByRole("link", { name: "Visit Route Grove" }),
  ).toHaveAttribute("href", "/");

  const startX = Number(await game.getAttribute("data-player-x"));
  await page.keyboard.down("ArrowRight");
  await expect
    .poll(async () => Number(await game.getAttribute("data-player-x")))
    .toBeGreaterThan(startX);
  await page.keyboard.up("ArrowRight");

  expect(errors).toEqual([]);
});

test("Atlas Park cable boundary blocks northward movement", async ({
  page,
}) => {
  await page.goto("/?map=gallery&renderer=canvas");

  const game = page.getByTestId("game-canvas");
  await expect(game).toHaveAttribute("data-world-semantic-ready", "true");
  await page.keyboard.down("ArrowUp");
  await expect(game).toHaveAttribute("data-player-collision", "blocked", {
    timeout: 6_000,
  });
  const blockedY = Number(await game.getAttribute("data-player-y"));
  await expect
    .poll(async () => Number(await game.getAttribute("data-player-y")))
    .toBeCloseTo(blockedY, 1);
  await page.keyboard.up("ArrowUp");
});

for (const width of [320, 375, 414, 768] as const) {
  test(`Atlas Park remains usable without page overflow at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 760 });
    await page.goto("/?map=gallery&renderer=canvas");

    await expect(
      page.getByTestId("game-canvas").locator("canvas"),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Visit Route Grove" }),
    ).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBe(width);
  });
}
