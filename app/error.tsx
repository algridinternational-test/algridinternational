"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main-content" tabIndex={-1} className="editorial-page error-page">
      <section>
        <p className="editorial-kicker">System notice</p>
        <h1>That did not load correctly.</h1>
        <p>Please retry the page. If the issue continues, return to the homepage.</p>
        <div className="error-actions">
          <button className="button button-primary" onClick={reset}>
            Try again <span aria-hidden="true">+</span>
          </button>
          <a className="button button-secondary" href="/">Return home</a>
        </div>
      </section>
    </main>
  );
}
