import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Sculptor's Saga",
    short_name: "Sculptor",
    description: "Gamified ZBrush Education Platform",
    start_url: "/",
    display: "standalone", // Hides the browser URL bar
    orientation: "portrait", // Locks to portrait mode (optional)
    background_color: "#0a0a0a", // Void Black
    theme_color: "#0a0a0a", // Void Black (Status bar color)
    icons: [
      {
        src: "/icons/icon-192.png", // You will need to add these images to public/icons/ later
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}