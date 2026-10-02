import { expect, test } from "@playwright/test";

test.describe("THEXIAS_PLACE storefront smoke", () => {
  test("utility search opens and dismisses when clicking outside", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const openSearch = page.getByRole("button", { name: "Open search" });
    await expect(openSearch).toBeVisible();
    await openSearch.click();

    const searchForm = page.getByRole("search");
    await expect(searchForm).toBeVisible();
    await expect(page.getByPlaceholder("Search the edit")).toBeFocused();
    await page.getByRole("main").click({ position: { x: 12, y: 12 } });

    await expect(searchForm).toBeHidden();
    await expect(page.getByRole("button", { name: "Open search" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  test("desktop category mega-menu opens a selected collection", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const navigation = page.getByRole("navigation", { name: "Primary navigation" });
    await navigation.getByRole("button", { name: /Categories/ }).click();
    const megaMenu = page.locator("#desktop-category-menu");
    await expect(megaMenu).toHaveAttribute("aria-hidden", "false");
    await megaMenu.getByRole("button", { name: /^Denim/ }).click();

    await expect(page.getByRole("heading", { name: "Shop the edit." })).toBeVisible();
    await expect(page.locator(".filters button.on")).toHaveText("Denim");
  });

  test("mobile category accordion opens and navigates to a collection", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const menu = page.getByRole("button", { name: "Open menu" });
    await menu.click();
    await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await page.getByRole("button", { name: "Categories" }).click();
    await expect(page.locator("#mobile-category-list")).toBeVisible();
    await page.getByRole("button", { name: /^Denim/ }).click();

    await expect(page.getByRole("heading", { name: "Shop the edit." })).toBeVisible();
    await expect(page.locator(".filters button.on")).toHaveText("Denim");
    await expect(page.locator(".mobile-menu-button")).toHaveAttribute("aria-expanded", "false");
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
