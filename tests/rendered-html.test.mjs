import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Algrid homepage and launch metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Algrid International — AI Venture Builder<\/title>/i);
  assert.match(html, /Build the next version/);
  assert.match(html, /Skip to content/);
  assert.match(html, /social@algridinternational\.com/);
  assert.match(html, /og-gold\.png/);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /codex-preview|site is taking shape/i);
});

test("server-renders the primary indexable routes", async () => {
  const routes = [
    ["/mvps", /Products designed/],
    ["/insights", /Ideas for building the next version/],
    ["/work/leroselle", /Turning toothpaste into a modern oral-care ritual/],
    ["/privacy", /Privacy, in plain language/],
    ["/terms", /Website terms/],
  ];

  for (const [pathname, content] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(await response.text(), content);
  }
});
