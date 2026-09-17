import settings from "../site.config.json" with { type: "json" };

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const canonical = new URL(settings.origin);
    if (url.hostname === settings.wwwHost || (url.hostname === canonical.hostname && url.protocol !== canonical.protocol)) {
      url.protocol = canonical.protocol;
      url.host = canonical.host;
      return Response.redirect(url.href, 308);
    }
    const range = request.headers.get("range");
    const headers = new Headers(request.headers);
    headers.delete("range");
    const mediaHead = request.method === "HEAD" && range && new URL(request.url).pathname.endsWith(".mp4");
    const asset = await env.ASSETS.fetch(new Request(request, { headers, method: mediaHead ? "GET" : request.method }));
    if (!new URL(request.url).pathname.endsWith(".mp4") || asset.status !== 200) return asset;

    const responseHeaders = new Headers(asset.headers);
    responseHeaders.set("Accept-Ranges", "bytes");
    if (!range || (request.headers.has("if-range") && request.headers.get("if-range") !== asset.headers.get("etag"))) {
      return new Response(asset.body, { status: asset.status, headers: responseHeaders });
    }

    const buffer = await asset.arrayBuffer();
    const length = buffer.byteLength;
    const match = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
    let start = 0;
    let end = length - 1;
    let valid = Boolean(match && (match[1] || match[2]));
    if (valid && match) {
      if (!match[1]) {
        const suffix = Number(match[2]);
        start = Math.max(0, length - suffix);
        valid = suffix > 0;
      } else {
        start = Number(match[1]);
        if (match[2]) end = Math.min(Number(match[2]), length - 1);
      }
      valid = valid && Number.isSafeInteger(start) && Number.isSafeInteger(end) && start <= end && start < length;
    }
    if (!valid) {
      responseHeaders.set("Content-Range", `bytes */${length}`);
      responseHeaders.set("Content-Length", "0");
      return new Response(null, { status: 416, headers: responseHeaders });
    }
    responseHeaders.set("Content-Range", `bytes ${start}-${end}/${length}`);
    responseHeaders.set("Content-Length", String(end - start + 1));
    return new Response(request.method === "HEAD" ? null : buffer.slice(start, end + 1), { status: 206, headers: responseHeaders });
  },
};

export default worker;
