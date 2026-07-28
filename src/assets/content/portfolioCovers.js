const modules = import.meta.glob("../images/portfolio/*.webp", { eager: true, import: "default" });

const covers = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => [path.split("/").pop(), url])
);

export function resolveCover(filename) {
  return covers[filename] ?? filename;
}
