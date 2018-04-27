/**
 * Created by Isitea on 07/14/2017.
 */

    "use strict";
    let LSEC = angular.module( "LSEC", [] );

    LSEC.controller( "ViewControl", [ "$scope", "$window", "$rootScope", GFLSEngine ] );
    function GFLSEngine ( $scope, $window, $rootScope ) {
        function updateList () {
            $scope.hourly = $window.Logistics.hourly().calc().MaxSum().list();
            updateDetail();
        }
        function updateDetail () {
            $scope.Detail = $window.Logistics.detail();
        }

        Object.assign( $scope, {
            Areas: {},
            visible: true,
            Cost: 24,
            HConversion: true,
            Weight: { Labor: 1, Ammo: 1, Ration: 1, Component: 3 },
            Selected: [ 0, 1, 2, 3 ],
            BackgroundColor: "8, 20, 60",
            Alpha: 35,
            round: function ( number ) {
                return $window.Math.round( number );
            },
            update: function ( settings ) {
                $window.Logistics.DEFAULT( settings );
                $rootScope.$broadcast( "Update list" );
            },
            updateCost: function () {
                $window.Logistics.DEFAULT( { Cost: $scope.Cost } );
                updateDetail();
            },
            reset: function ( ) {
                Object.assign( $scope.Weight, { Labor: 1, Ammo: 1, Ration: 1, Component: 3 } );
                $scope.update();
            },
            Select: function ( $index ) {
                if ( $scope.Selected.indexOf( $index ) !== -1 ) {
                    $scope.Selected.splice( $scope.Selected.indexOf( $index ), 1 );
                } else {
                    $scope.Selected.push( ( $index ) );
                    $scope.Selected.splice( 0, $scope.Selected.length - 4 );
                }
                $window.Logistics.DEFAULT( { Selected: $scope.Selected } );
                $rootScope.$broadcast( "Update detail" );
            },
            SortByDuration: function () {
                function byDuration ( a, b ) {
                    let order = ( b.HCost - a.HCost ) * Reverse;
                    if ( order === 0 ) order = ( b.Total - a.Total );
                    if ( order === 0 ) order = a.Code.localeCompare( b.Code );

                    return order;
                }

                Reverse *= -1;
                $scope.hourly = $window.Logistics.hourly().calc().list().sort( byDuration );
            },
            Convert: function ( cost ) {
                return cost**( !$scope.HConversion ? 1 : 0 );
            },
            ChangeStyle: function ( type ) {
                switch ( type ) {
                    case 1:
                        $window.document.querySelector( "#CalcStyle" ).href = "component/style-old.css";
                        Object.assign( $scope, {
                            BackgroundColor: "0, 0, 0",
                            Alpha: 65
                        } );
                        break;
                    case 2:
                        $window.document.querySelector( "#CalcStyle" ).href = "component/style.css";
                        Object.assign( $scope, {
                            BackgroundColor: "8, 20, 60",
                            Alpha: 35
                        } );
                        break;
                }
            }
        } );

        let Reverse = -1;
        for ( let data of $window.Logistics.raw() ) {
            $scope.Areas[data.Area] = true;
        }

        $scope.$on( "Update list", updateList );
        $scope.$on( "Update detail", updateDetail );
        updateList();
    }