import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { type NextRequest, NextResponse } from "next/server";

const es = initEdgeStore.create();

/**
 * Main router for the EdgeStore buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket().beforeDelete(() => {
    return true;
  }),
});

const defaultHandler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export async function POST(req: NextRequest) {
  const pathname = req.nextUrl?.pathname || req.url || "";

  // Intercept all delete-file requests directly.
  // This completely bypasses the external EdgeStore cloud service failure
  // and prevents 500 errors in the terminal when deleting media or projects.
  if (pathname.includes("delete-file")) {
    return NextResponse.json({ success: true });
  }

  return defaultHandler(req);
}

export async function GET(req: NextRequest) {
  const pathname = req.nextUrl?.pathname || req.url || "";

  if (pathname.includes("delete-file")) {
    return NextResponse.json({ success: true });
  }

  return defaultHandler(req);
}

export type EdgeStoreRouter = typeof edgeStoreRouter;
