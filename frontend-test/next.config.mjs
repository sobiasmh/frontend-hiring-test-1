/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      // Add configuration for handling GraphQL files
      config.module.rules.push({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'graphql-tag/loader',
          },
        ],
      });
  
      return config;
    },
  };
  
  export default nextConfig;
  
  
