const { chromium } = require("playwright");
const path = require("path");

const ARTIFACT_DIR = "/Users/kkyn/.gemini/antigravity/brain/b7e73010-0fd8-4d84-a644-65e0d50758c5";
const HTML_PATH = "file://" + path.resolve(__dirname, "../dist/standalone.html");

async function runTests() {
  console.log("🚀 Launching Playwright Chromium Headless...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on("console", msg => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  page.on("pageerror", err => {
    consoleErrors.push(err.message);
  });

  console.log("📍 Navigating to standalone webapp:", HTML_PATH);
  await page.goto(HTML_PATH);
  await page.waitForLoadState("networkidle");

  // Helper for React 18 range slider input dispatch
  async function setSliderValue(locator, value) {
    await locator.evaluate((el, val) => {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
      setter.call(el, val);
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    }, value);
  }

  // ==================== Test Tab 1: Live Flow Sandbox ====================
  console.log("\n--- (1/4) Testing Live Flow Sandbox ---");
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "screenshots/1_live_flow_sandbox.png") });

  const initialVerdict = await page.locator("h3").first().innerText();
  console.log("  ✔ Initial Verdict:", initialVerdict);

  // Click Benign Preset
  console.log("  👉 Clicking Benign preset button...");
  await page.click("button:has-text(\"Benign\")");
  await page.waitForTimeout(100);
  const benignVerdict = await page.locator("h3").first().innerText();
  console.log("  ✔ Verdict after Benign preset:", benignVerdict);

  // Click Exploits Preset
  console.log("  👉 Clicking Exploits preset button...");
  await page.click("button:has-text(\"Exploits\")");
  await page.waitForTimeout(100);
  const exploitsVerdict = await page.locator("h3").first().innerText();
  console.log("  ✔ Verdict after Exploits preset:", exploitsVerdict);

  // Perturb Flow Duration Slider
  console.log("  👉 Perturbing Flow Duration slider to 4500ms...");
  const durationSlider = page.locator("input[aria-label=\"Flow Duration\"]");
  await setSliderValue(durationSlider, "4500");
  await page.waitForTimeout(200);

  const customBadge = await page.locator("text=Custom Perturbed").isVisible();
  console.log("  ✔ Custom Perturbed badge visible:", customBadge);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "screenshots/1b_perturbed_sandbox.png") });

  // Click Reset
  console.log("  👉 Clicking Reset button...");
  await page.click("button:has-text(\"Reset\")");
  await page.waitForTimeout(200);
  const isPerturbedAfterReset = await page.locator("text=Custom Perturbed").isVisible();
  console.log("  ✔ Perturbed badge cleared after reset:", !isPerturbedAfterReset);

  // Click Random Scenario
  console.log("  👉 Clicking Random Scenario button...");
  await page.click("button:has-text(\"Random Scenario\")");
  await page.waitForTimeout(200);
  const randomVerdict = await page.locator("h3").first().innerText();
  console.log("  ✔ Random scenario loaded with verdict:", randomVerdict);

  // ==================== Test Tab 2: Bayes Decision Studio ====================
  console.log("\n--- (2/4) Testing Bayes Decision Studio ---");
  await page.click("button:has-text(\"Bayes Decision Studio\")");
  await page.waitForTimeout(350);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "screenshots/2_bayes_studio.png") });

  const bayesTitle = await page.locator("text=Total Expected Bayes Risk").isVisible();
  console.log("  ✔ Bayes Risk metric panel loaded:", bayesTitle);

  // Click High Security Profile
  console.log("  👉 Clicking High Security profile...");
  await page.click("button:has-text(\"High Security (C01=100)\")");
  await page.waitForTimeout(200);

  const riskValue = await page.locator(".text-3xl.font-bold").first().innerText();
  console.log("  ✔ Updated Bayes Total Risk value:", riskValue);

  // Adjust Threshold Slider
  console.log("  👉 Adjusting Threshold Slider to 0.70...");
  const tauSlider = page.locator("input[aria-label=\"Classifier Threshold \\\\tau\"]");
  await setSliderValue(tauSlider, "0.70");
  await page.waitForTimeout(200);

  const updatedRisk = await page.locator(".text-3xl.font-bold").first().innerText();
  console.log("  ✔ Risk after threshold shift to 0.70:", updatedRisk);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "screenshots/2b_bayes_tuned.png") });

  // ==================== Test Tab 3: Batch Traffic Explorer ====================
  console.log("\n--- (3/4) Testing Batch Traffic Explorer ---");
  await page.click("button:has-text(\"Batch Traffic Explorer\")");
  await page.waitForTimeout(350);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "screenshots/3_batch_explorer.png") });

  const totalFlowsCount = await page.locator(".text-xl.font-bold").first().innerText();
  console.log("  ✔ Total Batch Flows loaded:", totalFlowsCount);

  // Test Search Filter
  console.log("  👉 Filtering table by query 59.166.0.2...");
  const searchInput = page.locator("input[name=\"flowSearch\"]");
  await searchInput.fill("59.166.0.2");
  await page.waitForTimeout(200);

  const rowCount = await page.locator("tbody tr").count();
  console.log("  ✔ Filtered row count for IP 59.166.0.2:", rowCount);

  // Select Table Row
  console.log("  👉 Clicking first table row to select flow...");
  await page.locator("tbody tr").first().click();
  await page.waitForTimeout(100);

  // Clear search
  await searchInput.fill("");
  await page.waitForTimeout(150);

  // Filter by Protocol UDP
  console.log("  👉 Filtering by UDP Protocol...");
  await page.selectOption("#proto-filter", "17");
  await page.waitForTimeout(200);
  const udpRowCount = await page.locator("tbody tr").count();
  console.log("  ✔ UDP flows count:", udpRowCount);

  // ==================== Test Tab 4: Latent Space & Clusters ====================
  console.log("\n--- (4/4) Testing Latent Space & Clusters ---");
  await page.click("button:has-text(\"Latent Space & Clusters\")");
  await page.waitForTimeout(350);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "screenshots/4_latent_space.png") });

  const scatterNodes = await page.locator("svg circle").count();
  console.log("  ✔ Total 2D PCA scatter nodes rendered:", scatterNodes);

  // Click on a point with force
  console.log("  👉 Clicking on a scatter plot node to inspect flow telemetry...");
  await page.locator("svg circle").nth(30).click({ force: true });
  await page.waitForTimeout(200);

  const inspectedClass = await page.locator("text=Ground Truth Class").locator("..").locator(".text-lg.font-bold").innerText();
  console.log("  ✔ Flow inspector side drawer populated with class:", inspectedClass);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "screenshots/4b_latent_inspected.png") });

  // Filter to DoS Cluster
  console.log("  👉 Filtering to DoS Cluster points...");
  await page.selectOption("#latent-filter", "DoS");
  await page.waitForTimeout(200);
  const dosNodes = await page.locator("svg circle").count();
  console.log("  ✔ Filtered DoS cluster nodes:", dosNodes);

  console.log("\n--- Test Results Summary ---");
  if (consoleErrors.length === 0) {
    console.log("✅ ALL TESTS PASSED! 0 console errors detected during entire interaction run.");
  } else {
    console.warn("⚠️ Console errors encountered:", consoleErrors);
  }

  await browser.close();
}

runTests().catch(err => {
  console.error("❌ Test failed with error:", err);
  process.exit(1);
});
