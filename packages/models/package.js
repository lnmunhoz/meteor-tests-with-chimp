Package.describe({
  name: 'lnmunhoz:models',
  version: '0.0.1',
  summary: '',
  git: '',
  documentation: 'README.md',
});

Package.onUse((api) => {
  api.versionsFrom('1.4.1.3');

  const deps = [
    'ecmascript',
    'meteor-base',
    'mongo',
    'aldeed:simple-schema@1.5.3',
    'aldeed:collection2@2.10.0',
    'matb33:collection-hooks@0.8.4',
  ];

  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    console.log('models:', 'Including xolvio:backdoor for chimp tests');
    deps.push('xolvio:backdoor');
  }

  api.use(deps);
  api.imply(deps);

  api.mainModule('./lib/index.js');
});
