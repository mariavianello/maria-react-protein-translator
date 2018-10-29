
module.exports = {
  env: {
    test: {
      plugins: [
        'dynamic-import-node',
      ],
      presets: [
        ['@babel/preset-env', {
          useBuiltIns: 'usage',
          modules: 'commonjs',
        }],
      ],
      sourceMaps: 'inline',
      retainLines: true,
    },
  },
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    ['module-resolver', {
      'root': ['./src'],
      'alias': {
        'test': './test',
        'stories': './stories',
      },
    }],
  ],
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      modules: false,
    }],
  ],
};
