/*
 * karma-nomod.conf.js
 *
 * Created @author Antonio Carrasco Valero 201805160249
 *
 *
 ***************************************************************************

 Copyright 2014 2015 2016 Antonio Carrasco Valero
 Multi-platform Javascript EC5 coding patterns and base super-prototypes, for write-once, run and test everywhere (angular, require, node).

Licensed under the EUPL, Version 1.1 only (the "Licence");
You may not use this work except in compliance with the
Licence.
You may obtain a copy of the Licence at:
https://joinup.ec.europa.eu/software/page/eupl/licence-eupl
Unless required by applicable law or agreed to in
writing, software distributed under the Licence is
distributed on an "AS IS" basis,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
express or implied.
See the Licence for the specific language governing
permissions and limitations under the Licence.
 {{License2}}

 {{Licensed1}}
 {{Licensed2}}

 ***************************************************************************
 *
 */

var someKarmaConfFiles = [
    
    /* Order of files is mandatory as stated to the dependency injection in angular module definitions */
    
    /*
    './dist/nomod.min.js',
    */
    
    '../../src/nomod.js',
    
    '../behavioral-test/modulesinlined-behavioral-test/nomod-register-resolve-inlined-wodependencies-test.js',
    
    '../behavioral-test/modulefiles-wodependencies/module01wodeps.js',
    '../behavioral-test/modulefiles-wodependencies/module02wodeps.js',
    '../behavioral-test/modulesinfiles-behavioral-test/nomod-register-resolve-infiles-wodependencies-test.js',
    
    
    '../behavioral-test/modulesinlined-behavioral-test/nomod-register-resolve-inlined-withdependencies-noloop-test.js',
    
    '../behavioral-test/modulefiles-withdependencies/module01withdeps.js',
    '../behavioral-test/modulefiles-withdependencies/module02withdeps.js',
    '../behavioral-test/modulesinfiles-behavioral-test/nomod-register-resolve-infiles-withdependencies-noloop-test.js'

];


module.exports = function(config){
    config.set({
        
        basePath : './',
        
        files: someKarmaConfFiles,
        
        autoWatch : false,
        
        frameworks: ['jasmine'],
        
        browsers : ['Chrome'],
        
        port:  9877,
        colors:  true ,
        
        plugins : [
            'karma-chrome-launcher',
            'karma-jasmine'
        ],
    
        proxies: {
        },
    
        logLevel: config.LOG_DEBUG,
        /* logLevel: config.LOG_INFO,
           logLevel: config.LOG_DEBUG
         */
    
        browserNoActivityTimeout: 240000
    });
};
