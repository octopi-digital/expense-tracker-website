import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root: without this Turbopack walks up and finds the
  // home-directory package-lock.json, which would pull in ~/ as the root.
  turbopack: { root: projectRoot },
};

export default nextConfig;
