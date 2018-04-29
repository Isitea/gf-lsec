import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-logistics',
  templateUrl: './logistics.component.html',
  styleUrls: ['./logistics.component.css']
})
export class LogisticsComponent implements OnInit {
  Columns = [ "Mission", "Labor", "Ammo", "Ration", "Component", "Duration", "Requirement", "Bonus" ];
  missions = new MatTableDataSource( Missions );

  constructor() { }

  ngOnInit() {
  }

  showBonus ( flag: number ): string {
    let bonus = [];
    for ( const [ key, value ] of Object.entries( Bonus ) ) {
      if ( flag & value ) {
        bonus.push( Locale["ko-kr"][key] );
      }
    }

    return bonus.join( ', ' );
  }

}
interface Missions {
  area: string;
  code: string;
  duration: string;
  resource: Resource;
  requirement: Requirement;
  bonus: number;
}
interface Resource {
  labor: number;
  ammo: number;
  ration: number;
  component: number;
}
interface Requirement {
  leader: number;
  members: number;
}
const Locale = {
  "ko-kr": {
    none: "",
    manufacture: "고속 제조",
    repair: "고속 수복",
    doll: "인형 제조",
    equip: "장비 제조",
    token: "구매 토큰"
  }
};
const Bonus = {
  none: 0,
  manufacture: 1,
  repair: 2,
  doll: 4,
  equip: 8,
  token: 16,
};
const Missions: Missions[] = [
  { area: "0", code: "00-1", duration: "00:50", resource: { labor: 0, ammo: 145, ration: 145, component: 0 }, requirement: { leader: 40, members: 4 }, bonus: Bonus.manufacture | Bonus.repair },
  { area: "0", code: "00-2", duration: "03:00", resource: { labor: 550, ammo: 0, ration: 0, component: 350 }, requirement: { leader: 45, members: 5 }, bonus: Bonus.doll },
  { area: "0", code: "00-3", duration: "12:00", resource: { labor: 900, ammo: 900, ration: 900, component: 250 }, requirement: { leader: 45, members: 5 }, bonus: Bonus.equip | Bonus.repair },
  { area: "0", code: "00-4", duration: "24:00", resource: { labor: 0, ammo: 1200, ration: 800, component: 750 }, requirement: { leader: 50, members: 5 }, bonus: Bonus.token },
  { area: "1", code: "01-1", duration: "00:15", resource: { labor: 10, ammo: 30, ration: 15, component: 0 }, requirement: { leader: 1, members: 2 }, bonus: Bonus.none },
  { area: "1", code: "01-2", duration: "00:30", resource: { labor: 0, ammo: 40, ration: 60, component: 0 }, requirement: { leader: 3, members: 2 }, bonus: Bonus.none },
  { area: "1", code: "01-3", duration: "01:00", resource: { labor: 30, ammo: 0, ration: 30, component: 10 }, requirement: { leader: 5, members: 3 }, bonus: Bonus.none },
  { area: "1", code: "01-4", duration: "02:00", resource: { labor: 160, ammo: 160, ration: 0, component: 0 }, requirement: { leader: 6, members: 5 }, bonus: Bonus.doll },
  { area: "2", code: "02-1", duration: "00:40", resource: { labor: 100, ammo: 0, ration: 0, component: 30 }, requirement: { leader: 5, members: 3 }, bonus: Bonus.none },
  { area: "2", code: "02-2", duration: "01:30", resource: { labor: 60, ammo: 200, ration: 80, component: 0 }, requirement: { leader: 8, members: 4 }, bonus: Bonus.none },
  { area: "2", code: "02-3", duration: "04:00", resource: { labor: 10, ammo: 10, ration: 10, component: 230 }, requirement: { leader: 10, members: 5 }, bonus: Bonus.manufacture | Bonus.none },
  { area: "2", code: "02-4", duration: "06:00", resource: { labor: 0, ammo: 250, ration: 600, component: 60 }, requirement: { leader: 15, members: 5 }, bonus: Bonus.doll },
  { area: "3", code: "03-1", duration: "00:20", resource: { labor: 50, ammo: 0, ration: 75, component: 0 }, requirement: { leader: 12, members: 4 }, bonus: Bonus.none },
  { area: "3", code: "03-2", duration: "00:45", resource: { labor: 0, ammo: 120, ration: 70, component: 30 }, requirement: { leader: 20, members: 5 }, bonus: Bonus.none },
  { area: "3", code: "03-3", duration: "01:30", resource: { labor: 0, ammo: 300, ration: 0, component: 0 }, requirement: { leader: 15, members: 4 }, bonus: Bonus.manufacture | Bonus.none },
  { area: "3", code: "03-4", duration: "05:00", resource: { labor: 0, ammo: 0, ration: 300, component: 300 }, requirement: { leader: 25, members: 5 }, bonus: Bonus.doll | Bonus.equip },
  { area: "4", code: "04-1", duration: "01:00", resource: { labor: 0, ammo: 185, ration: 185, component: 0 }, requirement: { leader: 30, members: 4 }, bonus: Bonus.equip },
  { area: "4", code: "04-2", duration: "02:00", resource: { labor: 0, ammo: 0, ration: 0, component: 210 }, requirement: { leader: 35, members: 5 }, bonus: Bonus.manufacture },
  { area: "4", code: "04-3", duration: "06:00", resource: { labor: 800, ammo: 550, ration: 0, component: 0 }, requirement: { leader: 40, members: 5 }, bonus: Bonus.doll | Bonus.none },
  { area: "4", code: "04-4", duration: "08:00", resource: { labor: 400, ammo: 400, ration: 400, component: 150 }, requirement: { leader: 40, members: 5 }, bonus: Bonus.manufacture },
  { area: "5", code: "05-1", duration: "00:30", resource: { labor: 0, ammo: 0, ration: 100, component: 45 }, requirement: { leader: 30, members: 4 }, bonus: Bonus.none },
  { area: "5", code: "05-2", duration: "02:30", resource: { labor: 0, ammo: 600, ration: 300, component: 0 }, requirement: { leader: 35, members: 5 }, bonus: Bonus.none },
  { area: "5", code: "05-3", duration: "04:00", resource: { labor: 800, ammo: 400, ration: 400, component: 0 }, requirement: { leader: 40, members: 5 }, bonus: Bonus.equip },
  { area: "5", code: "05-4", duration: "07:00", resource: { labor: 100, ammo: 0, ration: 0, component: 700 }, requirement: { leader: 40, members: 5 }, bonus: Bonus.doll },
  { area: "6", code: "06-1", duration: "02:00", resource: { labor: 300, ammo: 300, ration: 0, component: 100 }, requirement: { leader: 35, members: 5 }, bonus: Bonus.none },
  { area: "6", code: "06-2", duration: "03:00", resource: { labor: 0, ammo: 200, ration: 550, component: 100 }, requirement: { leader: 40, members: 5 }, bonus: Bonus.manufacture | Bonus.none },
  { area: "6", code: "06-3", duration: "05:00", resource: { labor: 0, ammo: 0, ration: 200, component: 500 }, requirement: { leader: 45, members: 5 }, bonus: Bonus.equip },
  { area: "6", code: "06-4", duration: "12:00", resource: { labor: 800, ammo: 800, ration: 800, component: 0 }, requirement: { leader: 45, members: 5 }, bonus: Bonus.token },
  { area: "7", code: "07-1", duration: "02:30", resource: { labor: 650, ammo: 0, ration: 650, component: 0 }, requirement: { leader: 40, members: 5 }, bonus: Bonus.none },
  { area: "7", code: "07-2", duration: "04:00", resource: { labor: 0, ammo: 650, ration: 0, component: 300 }, requirement: { leader: 45, members: 5 }, bonus: Bonus.doll | Bonus.none },
  { area: "7", code: "07-3", duration: "05:30", resource: { labor: 900, ammo: 600, ration: 600, component: 0 }, requirement: { leader: 50, members: 5 }, bonus: Bonus.equip },
  { area: "7", code: "07-4", duration: "08:00", resource: { labor: 250, ammo: 250, ration: 250, component: 600 }, requirement: { leader: 50, members: 5 }, bonus: Bonus.manufacture },
  { area: "8", code: "08-1", duration: "01:00", resource: { labor: 150, ammo: 150, ration: 150, component: 0 }, requirement: { leader: 45, members: 5 }, bonus: Bonus.equip },
  { area: "8", code: "08-2", duration: "03:00", resource: { labor: 0, ammo: 0, ration: 0, component: 450 }, requirement: { leader: 50, members: 5 }, bonus: Bonus.none },
  { area: "8", code: "08-3", duration: "06:00", resource: { labor: 400, ammo: 800, ration: 800, component: 0 }, requirement: { leader: 55, members: 5 }, bonus: Bonus.manufacture | Bonus.none },
  { area: "8", code: "08-4", duration: "09:00", resource: { labor: 1500, ammo: 400, ration: 400, component: 100 }, requirement: { leader: 60, members: 5 }, bonus: Bonus.doll },
  { area: "9", code: "09-1", duration: "00:30", resource: { labor: 0, ammo: 0, ration: 100, component: 50 }, requirement: { leader: 55, members: 5 }, bonus: Bonus.none },
  { area: "9", code: "09-2", duration: "01:30", resource: { labor: 180, ammo: 0, ration: 180, component: 100 }, requirement: { leader: 60, members: 5 }, bonus: Bonus.manufacture },
  { area: "9", code: "09-3", duration: "04:30", resource: { labor: 750, ammo: 750, ration: 0, component: 0 }, requirement: { leader: 65, members: 5 }, bonus: Bonus.doll },
  { area: "9", code: "09-4", duration: "07:00", resource: { labor: 500, ammo: 900, ration: 900, component: 0 }, requirement: { leader: 70, members: 5 }, bonus: Bonus.equip },
  { area: "10", code: "10-1", duration: "00:40", resource: { labor: 140, ammo: 200, ration: 0, component: 0 }, requirement: { leader: 65, members: 5 }, bonus: Bonus.none },
  { area: "10", code: "10-2", duration: "01:40", resource: { labor: 0, ammo: 240, ration: 180, component: 0 }, requirement: { leader: 70, members: 5 }, bonus: Bonus.doll |  Bonus.manufacture },
  { area: "10", code: "10-3", duration: "05:20", resource: { labor: 0, ammo: 480, ration: 480, component: 300 }, requirement: { leader: 75, members: 5 }, bonus: Bonus.manufacture | Bonus.none },
  { area: "10", code: "10-4", duration: "10:00", resource: { labor: 660, ammo: 660, ration: 660, component: 330 }, requirement: { leader: 75, members: 5 }, bonus: Bonus.equip },
];