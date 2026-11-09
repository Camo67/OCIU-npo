/**
 * STATIC source-level regression checks for the Hero CTA navigation fix.
 *
 * Scope and honesty boundary:
 *   - These checks read the two supplied source files as text and assert on their
 *     structure. They do NOT render React, do NOT run a DOM, do NOT open a browser,
 *     and do NOT prove runtime, visual or mobile behaviour.
 *   - Dependency-free on purpose: only Node.js built-ins (node:test, node:assert,
 *     node:fs, node:path). No install, no network, no external packages.
 *
 * Run with:  node --test tests/hero-cta-navigation.test.mjs
 */

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HERO_PATH = path.join(PROJECT_ROOT, "src/components/Hero.tsx");
const INDEX_PATH = path.join(PROJECT_ROOT, "src/pages/Index.tsx");

const heroSource = readFileSync(HERO_PATH, "utf8");
const indexSource = readFileSync(INDEX_PATH, "utf8");

/** All literal `id="..."` values declared in a JSX source file. */
function declaredIds(source) {
  return [...source.matchAll(/\bid="([^"]*)"/g)].map((match) => match[1]);
}

/** All `<Button ...>...</Button>` elements, split into attribute string and body. */
function buttonElements(source) {
  return [...source.matchAll(/<Button\b([^>]*)>([\s\S]*?)<\/Button>/g)].map((match) => ({
    attrs: match[1],
    body: match[2],
    raw: match[0],
  }));
}

/** First opening `<a ...>` tag found inside a JSX fragment, or null. */
function firstAnchor(fragment) {
  const match = fragment.match(/<a\b([^>]*)>/);
  return match ? { attrs: match[1], raw: match[0] } : null;
}

const INDEX_IDS = declaredIds(indexSource);
const HERO_IDS = declaredIds(heroSource);
const CTAS = buttonElements(heroSource);

/** Look up one CTA by its visible label, failing loudly if it is missing. */
function ctaFor(label) {
  const found = CTAS.filter((cta) => cta.body.includes(label));
  assert.equal(
    found.length,
    1,
    `Expected exactly one <Button> containing the label "${label}" in ${HERO_PATH}, found ${found.length}.`,
  );
  return found[0];
}

describe("Hero CTA navigation (static source checks)", () => {
  test("Hero still renders exactly the two intended CTA buttons", () => {
    assert.equal(
      CTAS.length,
      2,
      `Expected 2 <Button> CTAs in Hero.tsx, found ${CTAS.length}. This check guards against extra or removed CTAs.`,
    );
  });

  test("Get Involved CTA is an anchor pointing at the existing #join section", () => {
    const cta = ctaFor("Get Involved");
    const anchor = firstAnchor(cta.body);

    assert.ok(anchor, '"Get Involved" CTA renders no <a> element, so it cannot navigate.');
    assert.match(
      anchor.attrs,
      /\bhref="#join"/,
      `"Get Involved" anchor must have href="#join"; found: <a${anchor.attrs}>. Index.tsx declares ids: ${JSON.stringify(INDEX_IDS)}.`,
    );
    assert.ok(
      INDEX_IDS.includes("join"),
      `"#join" target id is not declared in ${INDEX_PATH}; declared ids: ${JSON.stringify(INDEX_IDS)}.`,
    );
  });

  test("Explore Our Work CTA is an anchor pointing at the existing #mission section", () => {
    const cta = ctaFor("Explore Our Work");
    const anchor = firstAnchor(cta.body);

    assert.ok(anchor, '"Explore Our Work" CTA renders no <a> element, so it cannot navigate.');
    assert.match(
      anchor.attrs,
      /\bhref="#mission"/,
      `"Explore Our Work" anchor must have href="#mission"; found: <a${anchor.attrs}>. Index.tsx declares ids: ${JSON.stringify(INDEX_IDS)}.`,
    );
    assert.ok(
      INDEX_IDS.includes("mission"),
      `"#mission" target id is not declared in ${INDEX_PATH}; declared ids: ${JSON.stringify(INDEX_IDS)}.`,
    );
  });

  test("both CTAs delegate their styling to Button via asChild (Button stays the styling owner)", () => {
    for (const label of ["Get Involved", "Explore Our Work"]) {
      const cta = ctaFor(label);
      assert.match(
        cta.attrs,
        /(^|\s)asChild(\s|$|=)/,
        `"${label}" <Button> is missing the asChild prop, so the anchor would nest inside a <button> instead of replacing it (invalid, inaccessible nesting).`,
      );
    }
  });

  test("the anchor is the direct child of Button, not a nested extra wrapper", () => {
    for (const label of ["Get Involved", "Explore Our Work"]) {
      const cta = ctaFor(label);
      assert.match(
        cta.body,
        /^\s*<a\b/,
        `In "${label}", the <a> must be the immediate child of <Button> for asChild to forward props/styles correctly.`,
      );
    }
  });

  test("anchor does not declare its own className, so Button styling is preserved", () => {
    for (const label of ["Get Involved", "Explore Our Work"]) {
      const anchor = firstAnchor(ctaFor(label).body);
      assert.ok(anchor, `"${label}" CTA has no anchor.`);
      assert.doesNotMatch(
        anchor.attrs,
        /\bclassName=/,
        `"${label}" anchor sets its own className, which would fight the Button variants. Styling must stay on <Button>.`,
      );
    }
  });

  test("Button sizing, variants and the 200px CTA width are unchanged", () => {
    const growth = ctaFor("Get Involved").attrs;
    const energy = ctaFor("Explore Our Work").attrs;

    for (const [label, attrs] of [
      ["Get Involved", growth],
      ["Explore Our Work", energy],
    ]) {
      assert.match(attrs, /\bsize="lg"/, `"${label}" lost size="lg".`);
      assert.match(attrs, /\bclassName="min-w-\[200px\]"/, `"${label}" lost className="min-w-[200px]".`);
    }
    assert.match(growth, /\bvariant="growth"/, '"Get Involved" lost variant="growth".');
    assert.match(energy, /\bvariant="energy"/, '"Explore Our Work" lost variant="energy".');
  });

  test("responsive CTA layout wrapper is unchanged", () => {
    assert.ok(
      heroSource.includes("flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"),
      "The responsive CTA container classes changed; the column-on-mobile / row-on-desktop layout must be preserved.",
    );
  });

  test("the two CTAs target different, existing sections", () => {
    const joinHref = firstAnchor(ctaFor("Get Involved").body)?.attrs.match(/href="([^"]*)"/)?.[1];
    const missionHref = firstAnchor(ctaFor("Explore Our Work").body)?.attrs.match(/href="([^"]*)"/)?.[1];

    assert.ok(joinHref, '"Get Involved" has no href.');
    assert.ok(missionHref, '"Explore Our Work" has no href.');
    assert.notEqual(joinHref, missionHref, "Both CTAs point at the same fragment; they should lead to different sections.");

    for (const href of [joinHref, missionHref]) {
      assert.match(href, /^#[A-Za-z][\w-]*$/, `Fragment "${href}" is not a plain same-page id reference.`);
      assert.ok(
        INDEX_IDS.includes(href.slice(1)),
        `Fragment "${href}" has no matching id="..." in ${INDEX_PATH}; declared ids: ${JSON.stringify(INDEX_IDS)}.`,
      );
    }
  });

  test("every in-page fragment used by Hero resolves to a declared id", () => {
    const fragments = [...heroSource.matchAll(/\bhref="#([^"]*)"/g)].map((match) => match[1]);
    assert.ok(fragments.length >= 2, `Expected at least 2 in-page fragment links in Hero.tsx, found ${fragments.length}.`);

    const unresolved = fragments.filter((fragment) => !INDEX_IDS.includes(fragment));
    assert.deepEqual(
      unresolved,
      [],
      `Hero.tsx links to fragments with no declared target in ${INDEX_PATH}: ${JSON.stringify(unresolved)}.`,
    );
  });

  test("declared section ids in Index.tsx are unique", () => {
    const duplicates = INDEX_IDS.filter((id, position) => INDEX_IDS.indexOf(id) !== position);
    assert.deepEqual(duplicates, [], `Duplicate id="..." declarations in ${INDEX_PATH}: ${JSON.stringify(duplicates)}.`);
  });

  test("no inactive <button> CTA remains and no onclick handler was introduced", () => {
    assert.doesNotMatch(heroSource, /<button\b/, "Hero.tsx must not render a bare <button> CTA; navigation must be anchor-based.");
    assert.doesNotMatch(heroSource, /\bonClick\b/, "Hero.tsx must not use onClick scroll handlers for CTA navigation.");
  });

  test("decorative arrow icon inside the link is hidden from assistive tech", () => {
    const cta = ctaFor("Get Involved");
    if (!cta.body.includes("<ArrowRight")) {
      return; // icon removed by design; nothing to hide.
    }
    const icon = cta.body.match(/<ArrowRight\b([^>]*)\/?>/);
    assert.ok(icon, "ArrowRight usage could not be read.");
    assert.match(
      icon[1],
      /\baria-hidden="true"/,
      "The arrow icon sits inside the link text; mark it aria-hidden=\"true\" so the CTA is announced as its label only.",
    );
  });

  test("scope guards: no form, invented contacts, external URLs or tracking added", () => {
    for (const [label, pattern] of [
      ["a <form>", /<form\b/],
      ["a mailto: link", /mailto:/i],
      ["a tel: link", /tel:/i],
      ["an external http(s) URL", /https?:\/\//i],
      ["a payment/bank directive", /\b(iban|swift|account number|bank details)\b/i],
    ]) {
      assert.doesNotMatch(heroSource, pattern, `Hero.tsx must not add ${label} in this bounded navigation task.`);
    }
  });

  test("motto, tagline and headings were left untouched", () => {
    assert.ok(heroSource.includes("Learn, Build, Earn"), "The motto was changed; it is out of scope for this task.");
    assert.ok(
      heroSource.includes("Empowering communities to learn, build, and support community growth."),
      "The tagline was changed; it is out of scope for this task.",
    );
    assert.ok(
      heroSource.includes("Our Community in Unity (OCIU)"),
      "The hero heading was changed; it is out of scope for this task.",
    );
  });
});

describe("Supplied sources are the reviewed inputs", () => {
  test("Hero.tsx and Index.tsx are readable and non-empty", () => {
    assert.ok(heroSource.trim().length > 0, `${HERO_PATH} is empty.`);
    assert.ok(indexSource.trim().length > 0, `${INDEX_PATH} is empty.`);
  });

  test("Hero still declares no section ids of its own (targets live in Index.tsx)", () => {
    assert.deepEqual(HERO_IDS, [], `Hero.tsx unexpectedly declares ids: ${JSON.stringify(HERO_IDS)}.`);
  });
});
