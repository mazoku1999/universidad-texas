/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    env: {
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: 'your-cloud-name', // Reemplazar con tu cloud name de Cloudinary
    },
    // Asegurarnos que las rutas sean relativas para poder abrir el sitio desde cualquier ubicación
    basePath: '',
    assetPrefix: '/',
};

export default nextConfig; 