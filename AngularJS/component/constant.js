/**
 * Created by Isitea on 07/12/2017.
 */

    "use strict";
    function LogisticsGain ( LS ) {
        let hourly = [], _Self = this, DEFAULT = {
            Availability: {},
            Weight: { Labor: 1, Ammo: 1, Ration: 1, Component: 3 },
            Reverse: 1,
            Selected: [ 0, 1, 2, 3 ],
            Cost: 24
        };
        this.hourly = function ( Availability = DEFAULT.Availability ) {
            hourly.splice( 0, hourly.length );
            for ( let Data of LS ) {
                if ( Availability[Data.Area] !== false ) {
                    let hour = Number(  Data.Cost.split(":")[0] ) + Number( Data.Cost.split(":")[1] ) / 60;
                    hourly.push( Object.assign( {}, Data, { Labor: Data.Labor / hour, Ammo: Data.Ammo / hour, Ration: Data.Ration / hour, Component: Data.Component / hour, HCost: hour } ) );
                }
            }

            return _Self;
        };
        this.calc = function ( weight = DEFAULT.Weight ) {
            for ( let mission of hourly ) {
                mission.Total = mission.Labor * weight.Labor + mission.Ammo * weight.Ammo + mission.Ration * weight.Ration + mission.Component * weight.Component;
            }

            return _Self;
        };
        this.MaxSum = function ( reverse = DEFAULT.Reverse ) {
            function compareTotal ( a, b ) {
                let order = ( b.Total - a.Total ) * reverse;
                if ( order === 0 ) order = a.Code.localeCompare( b.Code );

                return order;
            }

            hourly.sort( compareTotal );

            return _Self;
        };

        this.raw = function () {
            return LS;
        };
        this.list = function () {
            return hourly;
        };
        this.DEFAULT = function ( option ) {
            Object.assign( DEFAULT, option );
        };

        this.result = function () {
            return hourly.slice( 0, 6 );
        };
        this.detail = function ( list = DEFAULT.Selected, cost = DEFAULT.Cost ) {
            let Detail = { Labor: 0, Ammo: 0, Ration: 0, Component: 0, Total: 0, LaborCost: 0, AmmoCost: 0, RationCost: 0, ComponentCost: 0, Mission: [] };
            for ( let id of list ) {
                if ( id < hourly.length ) {
                    Detail.Labor += hourly[id].Labor;
                    Detail.Ammo += hourly[id].Ammo;
                    Detail.Ration += hourly[id].Ration;
                    Detail.Component += hourly[id].Component;
                    Detail.Mission.push( hourly[id].Code );

                    let H = hourly[id].HCost;
                    Detail.LaborCost += hourly[id].Labor * parseInt( cost / H ) * H;
                    Detail.AmmoCost += hourly[id].Ammo * parseInt( cost / H ) * H;
                    Detail.RationCost += hourly[id].Ration * parseInt( cost / H ) * H;
                    Detail.ComponentCost += hourly[id].Component * parseInt( cost / H ) * H;
                }
            }
            Detail.Total = Detail.Labor + Detail.Ammo + Detail.Ration + Detail.Component;

            for ( let id in Detail ) {
                if ( Detail.hasOwnProperty( id ) && typeof Detail[id] === "number" ) Detail[id] = Math.round( Detail[id] );
            }

            return Detail;
        };
    }

    window.Logistics = new LogisticsGain( [
        { Area: "0", Code: "00-1", Cost: "00:50", Labor: 0, Ammo: 145, Ration: 145, Component: 0, Limitation: 40, Members: 4, Note: "고속 제조,고속 수복" },
        { Area: "0", Code: "00-2", Cost: "03:00", Labor: 550, Ammo: 0, Ration: 0, Component: 350, Limitation: 45, Members: 5, Note: "인형 제조" },
        { Area: "0", Code: "00-3", Cost: "12:00", Labor: 900, Ammo: 900, Ration: 900, Component: 250, Limitation: 45, Members: 5, Note: "장비 제조,고속 수복" },
        { Area: "0", Code: "00-4", Cost: "24:00", Labor: 0, Ammo: 1200, Ration: 800, Component: 750, Limitation: 50, Members: 5, Note: "구매 코인" },
        { Area: "1", Code: "01-1", Cost: "00:15", Labor: 10, Ammo: 30, Ration: 15, Component: 0, Limitation: 1, Members: 2, Note: "" },
        { Area: "1", Code: "01-2", Cost: "00:30", Labor: 0, Ammo: 40, Ration: 60, Component: 0, Limitation: 3, Members: 2, Note: "" },
        { Area: "1", Code: "01-3", Cost: "01:00", Labor: 30, Ammo: 0, Ration: 30, Component: 10, Limitation: 5, Members: 3, Note: "고속 수복" },
        { Area: "1", Code: "01-4", Cost: "02:00", Labor: 160, Ammo: 160, Ration: 0, Component: 0, Limitation: 6, Members: 5, Note: "인형 제조" },
        { Area: "2", Code: "02-1", Cost: "00:40", Labor: 100, Ammo: 0, Ration: 0, Component: 30, Limitation: 5, Members: 3, Note: "" },
        { Area: "2", Code: "02-2", Cost: "01:30", Labor: 60, Ammo: 200, Ration: 80, Component: 0, Limitation: 8, Members: 4, Note: "고속 수복" },
        { Area: "2", Code: "02-3", Cost: "04:00", Labor: 10, Ammo: 10, Ration: 10, Component: 230, Limitation: 10, Members: 5, Note: "고속 제조,고속 수복" },
        { Area: "2", Code: "02-4", Cost: "06:00", Labor: 0, Ammo: 250, Ration: 600, Component: 60, Limitation: 15, Members: 5, Note: "인형 제조" },
        { Area: "3", Code: "03-1", Cost: "00:20", Labor: 50, Ammo: 0, Ration: 75, Component: 0, Limitation: 12, Members: 4, Note: "" },
        { Area: "3", Code: "03-2", Cost: "00:45", Labor: 0, Ammo: 120, Ration: 70, Component: 30, Limitation: 20, Members: 5, Note: "" },
        { Area: "3", Code: "03-3", Cost: "01:30", Labor: 0, Ammo: 300, Ration: 0, Component: 0, Limitation: 15, Members: 4, Note: "고속 제조,고속 수복" },
        { Area: "3", Code: "03-4", Cost: "05:00", Labor: 0, Ammo: 0, Ration: 300, Component: 300, Limitation: 25, Members: 5, Note: "인형 제조,장비 제조" },
        { Area: "4", Code: "04-1", Cost: "01:00", Labor: 0, Ammo: 185, Ration: 185, Component: 0, Limitation: 30, Members: 4, Note: "장비 제조" },
        { Area: "4", Code: "04-2", Cost: "02:00", Labor: 0, Ammo: 0, Ration: 0, Component: 210, Limitation: 35, Members: 5, Note: "고속 제조" },
        { Area: "4", Code: "04-3", Cost: "06:00", Labor: 800, Ammo: 550, Ration: 0, Component: 0, Limitation: 40, Members: 5, Note: "인형 제조,고속 수복" },
        { Area: "4", Code: "04-4", Cost: "08:00", Labor: 400, Ammo: 400, Ration: 400, Component: 150, Limitation: 40, Members: 5, Note: "고속 제조" },
        { Area: "5", Code: "05-1", Cost: "00:30", Labor: 0, Ammo: 0, Ration: 100, Component: 45, Limitation: 30, Members: 4, Note: "" },
        { Area: "5", Code: "05-2", Cost: "02:30", Labor: 0, Ammo: 600, Ration: 300, Component: 0, Limitation: 35, Members: 5, Note: "고속 수복" },
        { Area: "5", Code: "05-3", Cost: "04:00", Labor: 800, Ammo: 400, Ration: 400, Component: 0, Limitation: 40, Members: 5, Note: "장비 제조" },
        { Area: "5", Code: "05-4", Cost: "07:00", Labor: 100, Ammo: 0, Ration: 0, Component: 700, Limitation: 40, Members: 5, Note: "인형 제조" },
        { Area: "6", Code: "06-1", Cost: "02:00", Labor: 300, Ammo: 300, Ration: 0, Component: 100, Limitation: 35, Members: 5, Note: "" },
        { Area: "6", Code: "06-2", Cost: "03:00", Labor: 0, Ammo: 200, Ration: 550, Component: 100, Limitation: 40, Members: 5, Note: "고속 제조,고속 수복" },
        { Area: "6", Code: "06-3", Cost: "05:00", Labor: 0, Ammo: 0, Ration: 200, Component: 500, Limitation: 45, Members: 5, Note: "장비 제조" },
        { Area: "6", Code: "06-4", Cost: "12:00", Labor: 800, Ammo: 800, Ration: 800, Component: 0, Limitation: 45, Members: 5, Note: "구매 코인" },
        { Area: "7", Code: "07-1", Cost: "02:30", Labor: 650, Ammo: 0, Ration: 650, Component: 0, Limitation: 40, Members: 5, Note: "" },
        { Area: "7", Code: "07-2", Cost: "04:00", Labor: 0, Ammo: 650, Ration: 0, Component: 300, Limitation: 45, Members: 5, Note: "인형 제조,고속 수복" },
        { Area: "7", Code: "07-3", Cost: "05:30", Labor: 900, Ammo: 600, Ration: 600, Component: 0, Limitation: 50, Members: 5, Note: "장비 제조" },
        { Area: "7", Code: "07-4", Cost: "08:00", Labor: 250, Ammo: 250, Ration: 250, Component: 600, Limitation: 50, Members: 5, Note: "고속 제조" },
        { Area: "8", Code: "08-1", Cost: "01:00", Labor: 150, Ammo: 150, Ration: 150, Component: 0, Limitation: 45, Members: 5, Note: "장비 제조" },
        { Area: "8", Code: "08-2", Cost: "03:00", Labor: 0, Ammo: 0, Ration: 0, Component: 450, Limitation: 50, Members: 5, Note: "고속 수복" },
        { Area: "8", Code: "08-3", Cost: "06:00", Labor: 400, Ammo: 800, Ration: 800, Component: 0, Limitation: 55, Members: 5, Note: "고속 제조,고속 수복" },
        { Area: "8", Code: "08-4", Cost: "09:00", Labor: 1500, Ammo: 400, Ration: 400, Component: 100, Limitation: 60, Members: 5, Note: "인형 제조" },
        { Area: "9", Code: "09-1", Cost: "00:30", Labor: 0, Ammo: 0, Ration: 100, Component: 50, Limitation: 55, Members: 5, Note: "" },
        { Area: "9", Code: "09-2", Cost: "01:30", Labor: 180, Ammo: 0, Ration: 180, Component: 100, Limitation: 60, Members: 5, Note: "고속 제조" },
        { Area: "9", Code: "09-3", Cost: "04:30", Labor: 750, Ammo: 750, Ration: 0, Component: 0, Limitation: 65, Members: 5, Note: "인형 제조" },
        { Area: "9", Code: "09-4", Cost: "07:00", Labor: 500, Ammo: 900, Ration: 900, Component: 0, Limitation: 70, Members: 5, Note: "장비 제조" },
        { Area: "10", Code: "10-1", Cost: "00:40", Labor: 140, Ammo: 200, Ration: 0, Component: 0, Limitation: 65, Members: 5, Note: "" },
        { Area: "10", Code: "10-2", Cost: "01:40", Labor: 0, Ammo: 240, Ration: 180, Component: 0, Limitation: 70, Members: 5, Note: "인형 제조, 고속 제조" },
        { Area: "10", Code: "10-3", Cost: "05:20", Labor: 0, Ammo: 480, Ration: 480, Component: 300, Limitation: 75, Members: 5, Note: "고속 제조,고속 수복" },
        { Area: "10", Code: "10-4", Cost: "10:00", Labor: 660, Ammo: 660, Ration: 660, Component: 330, Limitation: 75, Members: 5, Note: "장비 제조" },
    ] );
