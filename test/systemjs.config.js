(function(global) {
  var map = {
    app: ".",
    '@angular': '../node_modules/@angular',
    'rxjs': '../node_modules/rxjs'
  };
  var packages = {
    app: { main: './main.ts', defaultExtension: 'ts' },
    '@angular/core': { main: 'bundles/core.umd.js', defaultExtension: 'js' },
    '@angular/http': { main: 'bundles/http.umd.js', defaultExtension: 'js' },
    '@angular/compiler': { main: 'bundles/compiler.umd.js', defaultExtension: 'js' },
    '@angular/common': { main: 'bundles/common.umd.js', defaultExtension: 'js' },
    '@angular/platform-browser-dynamic': { main: 'bundles/platform-browser-dynamic.umd.js', defaultExtension: 'js' },
    '@angular/platform-browser': { main: 'bundles/platform-browser.umd.js', defaultExtension: 'js' },
    rxjs: { defaultExtension: 'js' }
  };

  map['my-npm'] = '../dist';
  packages['my-npm'] = {main: 'index.js', defaultExtension: 'js'};
  map['my-npm'] = '../src';
  packages['my-npm'] = {main: 'index.ts', defaultExtension: 'ts'};

  System.config({
    transpiler: 'typescript', //use typescript for compilation
    typescriptOptions: {      //typescript compiler options
      emitDecoratorMetadata: true
    },
    map: map,
    packages: packages
  });
})(this);