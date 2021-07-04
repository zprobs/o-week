const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
    alias: {
      '@root': path.resolve(__dirname, 'src/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@views': path.resolve(__dirname, 'src/views/'),
    },
  },
};