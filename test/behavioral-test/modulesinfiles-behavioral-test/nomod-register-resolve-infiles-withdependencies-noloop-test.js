/*
 * nomod-register-resolve-infiles-withdependencies-test.js
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
    

    
    it("resolves a module in a file with dependencies (not in a loop) given its full name", function () {
        
        var aFullName01 = nomod.fComputeFullName( "nomod-test-instances", "test/behavioral-test/modulefiles-withdependencies", "module01infilewithdeps");
        
        var aResolved01 = nomod.resolve( aFullName01);
        
        expect( typeof aResolved01).not.toBe( "undefined");
        expect( aResolved01.ModuleFullName).toBe( aFullName01);
        
    });
    
    
    
    
    it("resolves two distinct modules in files with dependencies (not in a loop) given their full name", function () {
    
        var aFullName01 = nomod.fComputeFullName( "nomod-test-instances", "test/behavioral-test/modulefiles-withdependencies", "module01infilewithdeps");
        var aFullName02 = nomod.fComputeFullName( "nomod-test-instances", "test/behavioral-test/modulefiles-withdependencies", "module02infilewithdeps");
    
        var aResolved01 = nomod.resolve( aFullName01);
        var aResolved02 = nomod.resolve( aFullName02);
    
        expect( typeof aResolved01).not.toBe( "undefined");
        expect( aResolved01.ModuleFullName).toBe( aFullName01);
    
        expect( typeof aResolved02).not.toBe( "undefined");
        expect( aResolved02.ModuleFullName).toBe( aFullName02);
    });
    
    
});


