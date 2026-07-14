/**
 * Sanitizes HTML content on the client side to prevent XSS.
 * Removes scripts, styles, iframes, and dangerous event handlers.
 */
export const sanitizeHtml = (htmlContent: string | undefined | null): string => {
  if (!htmlContent) return "";
  if (typeof window === "undefined") {
    // Basic fallback for server-side rendering (SSR) if DOMParser is unavailable
    // Removes obvious script tags
    return htmlContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  }
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    // Remove tags that can execute code or load external content directly
    const removeTags = ["script", "iframe", "object", "embed", "style", "meta", "link", "frame", "frameset"];
    removeTags.forEach((tag) => {
      doc.querySelectorAll(tag).forEach((el) => el.remove());
    });

    // Strip dangerous attributes (e.g. onerror, onload, javascript: urls)
    const allElements = doc.body.querySelectorAll("*");
    allElements.forEach((el) => {
      Array.from(el.attributes).forEach((attr) => {
        const name = attr.name.toLowerCase();
        const value = attr.value.trim().toLowerCase();

        // Remove on* event handlers
        if (name.startsWith("on")) {
          el.removeAttribute(attr.name);
        }
        // Remove javascript: and data: text/html href/src attributes
        else if ((name === "href" || name === "src") && 
                 (value.startsWith("javascript:") || value.startsWith("data:text/html"))) {
          el.removeAttribute(attr.name);
        }
      });
    });

    return doc.body.innerHTML;
  } catch (err) {
    console.error("HTML Sanitization failed:", err);
    return htmlContent;
  }
};
