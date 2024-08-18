//** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		domains: ['avatars.githubusercontent.com', 'raw.githubusercontent.com'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'raw.githubusercontent.com',
				port: ''
			}
		]
	}
};

module.exports = nextConfig;
