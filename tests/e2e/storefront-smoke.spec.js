import { expect, test } from "@playwright/test";

test.describe("THEXIAS_PLACE storefront smoke", () => {
  test("utility search opens and dismisses when clicking outside", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const utilitySearch = page.locator(".utility-bar .search-icon-button--round");
    await expect(utilitySearch).toHaveCount(1);
    await expect(page.locator(".primary-nav .search-icon-button--nav")).toHaveCount(0);
    const openSearch = utilitySearch;
    await expect(openSearch).toBeVisible();
    await openSearch.click();

    const searchForm = page.getByRole("search");
    await expect(searchForm).toBeVisible();
    await expect(page.getByPlaceholder("Search the edit")).toBeFocused();
    await page.getByRole("main").click({ position: { x: 12, y: 12 } });

    await expect(searchForm).toBeHidden();
    await expect(utilitySearch).toHaveAttribute("aria-expanded", "false");
  });

  test("Shop Now precedes wishlist across mobile, tablet, and desktop widths", async ({ page }) => {
    await page.goto("/");

    const actions = page.locator(".primary-nav-actions > button");
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await expect(actions).toHaveCount(3);
      await expect(actions.nth(0)).toHaveClass(/primary-shop-cta/);
      await expect(actions.nth(1)).toHaveClass(/wishlist-button/);
      await expect(actions.nth(2)).toHaveClass(/\bbag\b/);

      const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(pageWidth).toBeLessThanOrEqual(width);
    }
  });

  test("desktop category mega-menu opens a selected collection", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const navigation = page.getByRole("navigation", { name: "Primary navigation" });
    await navigation.getByRole("button", { name: /Categories/ }).click();
    const megaMenu = page.locator("#desktop-category-menu");
    await expect(megaMenu).toHaveAttribute("aria-hidden", "false");
    await megaMenu.getByRole("button", { name: "Denim" }).click();
    await expect(megaMenu.locator("#desktop-category-denims-list")).toBeVisible();
    await megaMenu.getByRole("button", { name: /^Jeans/ }).click();

    await expect(page.getByRole("heading", { name: "Shop the edit." })).toBeVisible();
    await expect(page.locator(".filters button.on")).toHaveText("Denim");
  });

  test("mobile category accordion opens and navigates to a collection", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const menu = page.getByRole("button", { name: "Open menu" });
    await expect(page.locator(".mobile-menu-button small")).toHaveCount(0);
    await menu.click();
    const closeMenu = page.getByRole("button", { name: "Close menu" });
    await expect(closeMenu).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator(".mobile-menu-button small")).toHaveCount(0);
    await page.getByRole("button", { name: "Categories" }).click();
    await expect(page.locator("#mobile-category-list")).toBeVisible();
    await page.getByRole("button", { name: "Denim" }).click();
    await page.locator("#mobile-category-denims-list").getByRole("button", { name: /^Jeans/ }).click();

    await expect(page.getByRole("heading", { name: "Shop the edit." })).toBeVisible();
    await expect(page.locator(".filters button.on")).toHaveText("Denim");
    await expect(page.locator(".mobile-menu-button")).toHaveAttribute("aria-expanded", "false");
  });

  test("mobile Denim accordion exposes denim subcategories without horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await page.getByRole("button", { name: "Open menu" }).click();
    const denimsToggle = page.getByRole("button", { name: "Denim", exact: true });
    await page.getByRole("button", { name: "Categories" }).click();
    await denimsToggle.click();

    await expect(denimsToggle).toHaveAttribute("aria-expanded", "true");
    const denimsList = page.locator("#mobile-category-denims-list");
    await expect(denimsList).toBeVisible();
    await expect(denimsList.getByRole("button", { name: /^Jeans/ })).toBeVisible();
    await expect(denimsList.getByRole("button", { name: /^Jorts/ })).toBeVisible();
    await expect(denimsList.getByRole("button", { name: /^Skirts/ })).toBeVisible();
    await expect(denimsList.getByRole("button", { name: "Pants", exact: true })).toHaveCount(0);

    const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(pageWidth).toBeLessThanOrEqual(390);

    await denimsList.getByRole("button", { name: /^Jorts/ }).click();
    await expect(page.getByRole("heading", { name: "Shop the edit." })).toBeVisible();
    await expect(page.locator(".card")).toHaveCount(12);
    await expect(page.locator(".card").first()).toContainText("Jorts");
  });

  test("mobile Gowns accordion opens and routes Date Night Gowns to dinner pieces", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 844 });
    await page.goto("/");

    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("button", { name: "Categories" }).click();
    const gownToggle = page.getByRole("button", { name: "Gowns", exact: true });
    await gownToggle.click();

    await expect(gownToggle).toHaveAttribute("aria-expanded", "true");
    const gownList = page.locator("#mobile-category-gown-list");
    await expect(gownList).toBeVisible();
    await expect(gownList.getByRole("button", { name: "Casual Gowns", exact: true })).toHaveCount(0);
    await expect(gownList.getByRole("button", { name: /^Date Night Gowns/ })).toBeVisible();
    await expect(gownList.getByRole("button", { name: /^Corporate Gowns/ })).toBeVisible();

    const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(pageWidth).toBeLessThanOrEqual(320);

    await gownList.getByRole("button", { name: /^Date Night Gowns/ }).click();
    await expect(page.getByRole("heading", { name: "Shop the edit." })).toBeVisible();
    await expect(page.locator(".card")).toHaveCount(6);
    await expect(page.locator(".card").first()).toContainText("Gown");
  });

  test("bag checkout link carries the selected item and total to WhatsApp", async ({ page }) => {
    await page.goto("/");

    const navigation = page.getByRole("navigation", { name: "Primary navigation" });
    await navigation.getByRole("button", { name: "Shop Now" }).click();
    await expect(page.getByRole("heading", { name: "Shop the edit." })).toBeVisible();

    const product = page.locator(".card").filter({ hasText: "High-Waist Skinny Denim" });
    await expect(product).toHaveCount(1);
    await product.getByRole("button", { name: /^Add$/ }).click();
    await expect(page.getByRole("status")).toContainText("High-Waist Skinny Denim added to your bag");

    await page.getByRole("button", { name: "Open shopping bag" }).click();
    await expect(page.getByRole("heading", { name: "Shopping bag" })).toBeVisible();
    await expect(page.locator(".cart-items")).toContainText("High-Waist Skinny Denim");

    const checkout = page.getByRole("link", { name: /Checkout via WhatsApp/ });
    await expect(checkout).toHaveAttribute("target", "_blank");
    const href = await checkout.getAttribute("href");
    expect(href).toBeTruthy();

    const checkoutUrl = new URL(href);
    expect(checkoutUrl.origin).toBe("https://wa.me");
    expect(checkoutUrl.pathname).toBe("/2347048969953");

    const message = checkoutUrl.searchParams.get("text") || "";
    expect(message).toContain("Hi THEXIAS PLACE! I'd like to order:");
    expect(message).toContain("High-Waist Skinny Denim x1");
    expect(message).toContain("Total: ₦18,500");
  });
});
