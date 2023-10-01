export interface Station {
  stationcode: string;
  name: string;
  is_installed: string;
  capacity: number;
  numdocksavailable: number;
  numbikesavailable: number;
  mechanical: number;
  ebike: number;
  is_renting: string;
  is_returning: string;
  duedate: string;
  coordonnees_geo: {
    lon: number;
    lat: number;
  };
  nom_arrondissement_communes: string;
  code_insee_commune: null | number;
}
