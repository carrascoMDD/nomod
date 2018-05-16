/*
 * nomod.js
 *
 * Created @author Antonio Carrasco Valero 201410030426
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


nomod = (function() {
    
    var NAMESEPARATOR   = "/";
    
    var OPERATION_register   = "register";
    var OPERATION_resolve    = "resolve";
    
    var MESSAGE_alreadyregistered    = "alreadyregistered";
    var MESSAGE_notregistered        = "notregistered";
    var MESSAGE_inconsistentname     = "inconsistentname";
    var MESSAGE_parametermissing     = "parametermissing";
    var MESSAGE_parameternotfunction = "parameternotfunction";
    var MESSAGE_nestedexception      = "nestedexception";
    var MESSAGE_internalerror        = "internalerror";
    
    var MODULEREGISTRATIONS_BYFULLNAME = { };
    
    
    
    
    var fNewVoidRegistration = function() {
        var aNewRegistration = {
            "componentName":          null,
            "packageNames":           null,
            "moduleName":             null,
            "fullName":               null,
            "dependencies":           null,
            "moduleDefiner":          null,
            
            "registeredTimestamp":    null,
            "registeredTimestampStr": null,
            
            "attemptedTimestamp":     null,
            "attemptedTimestampStr":  null,
            "definedTimestamp":       null,
            "definedTimestampStr":    null,
    
            "resolvedDependencies":   null,
            "module":                 null,
            "exception":              null
        };
        if(aNewRegistration){}/*CQT*/
        return aNewRegistration;
    };
    
    
    
    
    var nomod_reset = function( ) {
        
        MODULEREGISTRATIONS_BYFULLNAME = { };
    };
    
    
    
    var nomod_drop = function( theFullName) {
        
        if( !theFullName) {
            return;
        }
        
        if( !MODULEREGISTRATIONS_BYFULLNAME.hasOwnProperty( theFullName))  {
            return;
        }
        
        delete MODULEREGISTRATIONS_BYFULLNAME[ theFullName];
    };
    
    
    
    
    var nomod_register = function( theComponentName, thePackageNames, theModuleName, theDependencies, theModuleDefiner) {
    
        if( !theModuleName) {
            throw new NomodException( OPERATION_register, MESSAGE_parametermissing, "theModuleName", theComponentName, thePackageNames, theModuleName);
        }
    
        if( !theModuleDefiner) {
            throw new NomodException( OPERATION_register, MESSAGE_parametermissing, "theModuleDefiner", theComponentName, thePackageNames, theModuleName);
        }
    
        if( !( typeof theModuleDefiner === "function")) {
            throw new NomodException( OPERATION_register, MESSAGE_parameternotfunction, "theModuleDefiner", theComponentName, thePackageNames, theModuleName);
        }
       
        var aFullName = null;
        try  {
            aFullName = fComputeFullName(  theComponentName, thePackageNames, theModuleName);
        }
        catch( anException) {
            throw new NomodException( OPERATION_register, MESSAGE_nestedexception, "fComputeFullName", theModuleName, theComponentName, thePackageNames, theModuleName, anException);
        }
        if( !aFullName) {
            throw new NomodException( OPERATION_register, MESSAGE_internalerror, "!fComputeFullName", theModuleName, theComponentName, thePackageNames, theModuleName);
        }
        
        var anExistingRegistration = MODULEREGISTRATIONS_BYFULLNAME[ aFullName];
        if( !( typeof anExistingRegistration === "undefined")) {
            throw new NomodException( OPERATION_register, MESSAGE_alreadyregistered, null, theComponentName, thePackageNames, theModuleName);
        }
        
        var aNow = new Date();
    
        var aNewRegistration = fNewVoidRegistration();
        aNewRegistration[ "componentName"]          = theComponentName;
        aNewRegistration[ "packageNames"]           = thePackageNames;
        aNewRegistration[ "moduleName"]             = theModuleName;
        aNewRegistration[ "fullName"]               = aFullName;
        aNewRegistration[ "dependencies"]           = theDependencies;
        aNewRegistration[ "moduleDefiner"]          = theModuleDefiner;
        aNewRegistration[ "registeredTimestamp"]    = aNow.getTime();
        aNewRegistration[ "registeredTimestampStr"] = fDateToTimestampStr( aNow);
    
        aNewRegistration[ "attemptedTimestamp"]     = undefined;
        aNewRegistration[ "attemptedTimestampStr"]  = undefined;
        aNewRegistration[ "definedTimestamp"]       = undefined;
        aNewRegistration[ "definedTimestampStr"]    = undefined;
    
        aNewRegistration[ "resolvedDependencies"]   = theDependencies;
        aNewRegistration[ "module"]                 = undefined;
        aNewRegistration[ "exception"]              = undefined;
        
    
        MODULEREGISTRATIONS_BYFULLNAME[ aFullName] = aNewRegistration;
        
        return aNewRegistration;
    };
    
    
    
    
    
    var nomod_resolve = function( theFullName) {
        
        var aModule = try_resolve( theFullName);
        if( !( typeof aModule === "undefined")) {
            return aModule;
        }
    
        aModule = try_define( theFullName);
        if( !( typeof aModule === "undefined")) {
            return aModule;
        }
    
        throw new NomodException( OPERATION_resolve, MESSAGE_parametermissing, "theFullName", null, null, theFullName);
    };
    
    
    
    
    var try_resolve = function( theFullName) {
        if( !theFullName) {
            throw new NomodException( OPERATION_resolve, MESSAGE_parametermissing, "theFullName", null, null, theFullName);
        }
        
        var anExistingRegistration = MODULEREGISTRATIONS_BYFULLNAME[ theFullName];
        if( typeof anExistingRegistration === "undefined") {
            throw new NomodException( OPERATION_resolve, MESSAGE_notregistered, null, null, null, theFullName);
        }
        if( !( theFullName === anExistingRegistration[ "fullName"])) {
            throw new NomodException( OPERATION_resolve, MESSAGE_inconsistentname, anExistingRegistration[ "fullName"], null, null, theFullName);
        }
        
        var aResolvedModule = anExistingRegistration[ "module"];
        if( typeof aResolvedModule === "undefined") {
            return undefined;
        }
        
        return aResolvedModule;
    };
    
    
    
    
    
    var try_define = function( theFullName) {
    
        if( !theFullName) {
            throw new NomodException( "try_define", MESSAGE_parametermissing, "theFullName", null, null, theFullName);
        }
    
        var anExistingRegistration = MODULEREGISTRATIONS_BYFULLNAME[ theFullName];
        if( typeof anExistingRegistration === "undefined") {
            throw new NomodException( "try_define", MESSAGE_notregistered, null, null, null, theFullName);
        }
        if( !( theFullName === anExistingRegistration[ "fullName"])) {
            throw new NomodException( "try_define", MESSAGE_inconsistentname, anExistingRegistration[ "fullName"], null, null, theFullName);
        }
    
        var aResolvedModule = anExistingRegistration[ "module"];
        if( !( typeof aResolvedModule === "undefined")) {
            return aResolvedModule;
        }
    
        var aModuleDefiner = anExistingRegistration[ "moduleDefiner"];
        if( !( typeof aModuleDefiner === "function")) {
            throw new NomodException( "try_define", MESSAGE_internalerror, "theModuleDefiner", null, null, theFullName);
        }
    
        var aNowAttempt = new Date();
        anExistingRegistration[ "attemptedTimestamp"]     = aNowAttempt.getTime();
        anExistingRegistration[ "attemptedTimestampStr"]  = fDateToTimestampStr( aNowAttempt);
    
        var someResolvedDependencies = undefined;
        var aNumDependencies = 0;
        var someDependencies = anExistingRegistration[ "dependencies"];
        if( someDependencies) {
            aNumDependencies = someDependencies.length;
            if( aNumDependencies) {
                someResolvedDependencies = Array.apply(null, Array( aNumDependencies)).map(function(){ return undefined;});
                try_resolveDependenciesInto( someDependencies, someResolvedDependencies);
            }
        }
        
        var aDefinedModule = null;
        try {
            if( aNumDependencies) {
                aDefinedModule = aModuleDefiner.apply( null, someResolvedDependencies);
            }
            else {
                aDefinedModule = aModuleDefiner();
            }
        }
        catch( anException) {
            anExistingRegistration[ "exception"] = new NomodException( "try_define", MESSAGE_internalerror, "Exception during aModuleDefiner( someDependencies)", null, null, theFullName, anException);
            throw anExistingRegistration[ "exception"];
        }
        if( !aDefinedModule) {
            anExistingRegistration[ "exception"] = new NomodException( "try_define", MESSAGE_internalerror, "aModuleDefiner( someDependencies)", null, null, theFullName);
            throw anExistingRegistration[ "exception"];
        }
    
        anExistingRegistration[ "module"] = aDefinedModule;
        var aNowDefine = new Date();
        anExistingRegistration[ "definedTimestamp"]     = aNowDefine.getTime();
        anExistingRegistration[ "definedTimestampStr"]  = fDateToTimestampStr( aNowDefine);
    
        if( aNumDependencies) {
            anExistingRegistration[ "resolvedDependencies"]  = someResolvedDependencies;
        }
        return aDefinedModule;
    };
    
    
    
    
    
    var try_resolveDependenciesInto = function( theDependenciesToResolve, theResolvedDependencies) {
        if( !theDependenciesToResolve) {
            return;
        }
    
        if( !theResolvedDependencies) {
            return;
        }
    
        var aNumDependenciesToResolve = theDependenciesToResolve.length;
        if( !aNumDependenciesToResolve) {
            return;
        }
    
        for( var aDependencyToResolveIdx=0; aDependencyToResolveIdx < aNumDependenciesToResolve; aDependencyToResolveIdx++) {
            var aDependencyToResolve = theDependenciesToResolve[ aDependencyToResolveIdx];
            if( !aDependencyToResolve) {
                continue;
            }
            
            var anAlreadyResolved = theResolvedDependencies[ aDependencyToResolveIdx];
            if( !( typeof anAlreadyResolved === "undefined")) {
                continue;
            }
    
            var aJustResolved = null;
            try {
                aJustResolved = nomod_resolve( aDependencyToResolve);
            }
            catch( anException) {
                throw new NomodException( "try_resolveDependenciesInto", MESSAGE_internalerror, "Exception during try_resolve( aDependencyToResolve)", null, null, aDependencyToResolve, anException);
            }
    
            theResolvedDependencies[ aDependencyToResolveIdx] = aJustResolved;
        }
        
        return;
    };
    
    
    
    
    
    var aNomodException_prototype = {
        _v_Operation:     null,
        _v_Message:       null,
        _v_Parameter:     null,
        _v_ComponentName: null,
        _v_PackageNames:  null,
        _v_ModuleName:    null,
        _v_Reason:        null
    };
    
    aNomodException_prototype.toString = function() {
        var aReasonStr = "";
        if( this._v_Reason) {
            if( typeof this._v_Reason === "string") {
                aReasonStr = this._v_Reason;
            }
            else {
                if( typeof this._v_Reason.toString === "function") {
                    aReasonStr = this._v_Reason.toString();
                }
            }
        }
        
        var aFullStr = "NomodException " +
            ( this._v_Operation     ? ( "op=" + this._v_Operation )       : "?op") + " " +
            ( this._v_Message       ? ( "msg=" + this._v_Message )        : "") + " " +
            ( this._v_Parameter     ? ( "parm=" + this._v_Parameter )        : "") + " " +
            ( this._v_ComponentName ? ( "cmp=" + this._v_ComponentName )  : "?cmp") + " " +
            ( this._v_PackageNames  ? ( "pkgs=" + this._v_PackageNames )  : "?pkgs") + " " +
            ( this._v_ModuleName    ? ( "mod=" + this._v_ModuleName )     : "?mod") + " " +
            ( aReasonStr            ? ( "reason: (" + aReasonStr + ") " ) : "");
        
        if(aFullStr){}/*CQT*/
        return aFullStr;
    };

    
    var NomodException = function( theOperation, theMessage, theParameter, theComponentName, thePackageNames, theModuleName, theReason) {
        this._v_Operation =     theOperation;
        this._v_Message =       theMessage;
        this._v_Parameter =     theParameter;
        this._v_ComponentName = theComponentName;
        this._v_PackageNames =  thePackageNames;
        this._v_ModuleName =    theModuleName;
        this._v_Reason =        theReason;
    };
    NomodException.prototype = aNomodException_prototype;
    
    
    
    
    
    var fDateToTimestampStr = function( theDate) {
        
        if( theDate == null) {
            return null;
        }
        
        var aDate = "" + theDate.getDate();
        var aDateStr = "" + aDate;
        if( aDateStr.length < 2) {
            aDateStr = "0" + aDateStr;
        }
        
        var aMonth = "" + (theDate.getMonth()+ 1);
        var aMonthStr = "" + aMonth;
        if( aMonthStr.length < 2) {
            aMonthStr = "0" + aMonthStr;
        }
        
        var aFullYear = theDate.getFullYear();
        var aFullYearStr = "" + aFullYear;
        
        var aHours = theDate.getHours();
        var aHoursStr = "" + aHours;
        if( aHoursStr.length < 2) {
            aHoursStr = "0" + aHoursStr;
        }
        
        var aMinutes = theDate.getMinutes();
        var aMinutesStr = "" + aMinutes;
        if( aMinutesStr.length < 2) {
            aMinutesStr = "0" + aMinutesStr;
        }
        
        var aSeconds = theDate.getSeconds();
        var aSecondsStr = "" + aSeconds;
        if( aSecondsStr.length < 2) {
            aSecondsStr = "0" + aSecondsStr;
        }
        
        var aMilliseconds = theDate.getMilliseconds();
        var aMillisecondsStr = "" + aMilliseconds;
        if( aMillisecondsStr.length < 3) {
            if( aMillisecondsStr.length < 2) {
                aMillisecondsStr = "00" + aMillisecondsStr;
            }
            else {
                aMillisecondsStr = "0" + aMillisecondsStr;
            }
        }
        
        var aTimestampStr = aFullYearStr + aMonthStr  + aDateStr + aHoursStr  + aMinutesStr  + aSecondsStr + aMillisecondsStr;
        if( aTimestampStr){}/* CQT */
        
        return aTimestampStr;
    };
    
    
    
    var fComputeFullName = function( theComponentName, thePackageNames, theModuleName) {
        
        if( !theModuleName) {
            throw new NomodException( "fComputeFullName", "missing parameter theModuleName", theComponentName, thePackageNames, theModuleName);
        }
        
        var someNames = [ ];
        
        var aComponentName = theComponentName;
        if( !aComponentName) {
            aComponentName = ".";
        }
        someNames.push( aComponentName);
        
        if( thePackageNames) {
            var somePackageNames = thePackageNames.split( NAMESEPARATOR);
            if( somePackageNames && somePackageNames.length) {
                Array.prototype.push.apply( someNames, somePackageNames);
            }
        }
        
        someNames.push( theModuleName);
        
        var aFullName = someNames.join( NAMESEPARATOR);
        if(aFullName){}/*CQT*/
        return aFullName;
    };
    
    
    var NOMOD = {
        register: nomod_register,
        resolve:  nomod_resolve,
        
        /* helpers for testing purposes */
        reset:    nomod_reset,
        drop:     nomod_drop,
        fComputeFullName: fComputeFullName,
    
        NAMESEPARATOR: NAMESEPARATOR
    };
    
    return NOMOD;
    
})();

//# sourceMappingURL=nomod.js.map