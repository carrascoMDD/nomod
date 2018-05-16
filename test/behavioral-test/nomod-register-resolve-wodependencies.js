/*
 * nomod.js
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

var ComponentName    = "nomod-test";
var ModuleName     = "nomod-register-resolve-wodependencies";
var ModulePackages = "test/behavioral-test";

describe( ModuleName + " " + ModulePackages + " " + ComponentName, function () {
    
    var aModule01 = {
        "ComponentName": "nomod_test_adhoccmp",
        "ModuleName": "Module01",
        "ModulePackages": "nomodtestpkg"
    };
    aModule01.ModuleFullName = nomod.fComputeFullName( aModule01.ComponentName, aModule01.ModulePackages,aModule01.ModuleName);
    var aModule01_definer = function() {
      return aModule01;
    };
    
    beforeEach( function() {
        nomod.reset();
    });
    
    
    
    it("registers a module without dependencies and resolves it", function () {
        
        nomod.register( aModule01.ComponentName, aModule01.ModulePackages,aModule01.ModuleName,
            null /* theDependencies */,
            aModule01_definer
        );
        
        var aResolved = nomod.resolve( aModule01.ModuleFullName);
        
        expect( typeof aResolved).not.toBe( "undefined");
        expect( aResolved.ModuleFullName).toBe( aModule01.ModuleFullName)
    });
    
    
    
});


