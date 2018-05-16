/*
 * module02withdeps.js
 *    test/behavioral-test/modulefiles-withdependencies
 *
 * Created @author Antonio Carrasco Valero 201805160249
 *
 *
 ***************************************************************************

 Copyright 2018 Antonio Carrasco Valero
 toy module definition, resolution and dependency injection used by prettytype multi-platform as an alternative to angular, require, node

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

(function() {
    
    var aModule = {
        "ComponentName":  "nomod-test-instances",
        "ModuleName":     "module02infilewithdeps",
        "ModulePackages": "test/behavioral-test/modulefiles-withdependencies"
    };
    aModule.ModuleFullName = nomod.fComputeFullName( aModule.ComponentName, aModule.ModulePackages, aModule.ModuleName);
    var aModule_definer = function() {
        return aModule;
    };
    
    nomod.register( aModule.ComponentName, aModule.ModulePackages, aModule.ModuleName,
        [   /* theDependencies */
            nomod.fComputeFullName( "nomod-test-instances", "test/behavioral-test/modulefiles-withdependencies", "module01infilewithdeps")
        ],
        aModule_definer
    );
    
})();


