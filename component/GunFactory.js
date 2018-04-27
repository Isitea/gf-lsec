/**
 * Created by Isitea on 07/14/2017.
 */

"use strict";
let LSEC = angular.module( "LSEC", [] );

LSEC.controller( "GunFactory", [ "$scope", "$window", Addon_GunFactory ] );
function Addon_GunFactory ( $scope, $window, $rootScope ) {
    Object.assign( $scope, {
        visible: true,
        BackgroundColor: "8, 20, 60",
        Alpha: 35,
        Guns: GF_Guns,
        HH: 0,
        MM: 0,
        round: function ( number ) {
            return $window.Math.round( number );
        },
        reset: function() {
            Object.assign( $scope, { HH: 0, MM: 0 } );
        },
        setDuration: function ( Gun ) {
            Object.assign( $scope, { HH: Gun.HH, MM: Gun.MM } );
        },
        ChangeStyle: function ( type ) {
            switch ( type ) {
                case 1:
                    $window.document.querySelector( "#AddonStyle" ).href = "component/style-old.css";
                    Object.assign( $scope, {
                        BackgroundColor: "0, 0, 0",
                        Alpha: 65
                    } );
                    break;
                case 2:
                    $window.document.querySelector( "#AddonStyle" ).href = "component/style.css";
                    Object.assign( $scope, {
                        BackgroundColor: "8, 20, 60",
                        Alpha: 35
                    } );
                    break;
            }
        }
    } );

}
