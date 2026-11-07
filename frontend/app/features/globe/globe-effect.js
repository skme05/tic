// @ts-nocheck — moteur d'animation impératif (repris du site d'origine), piloté par un Scope.
/* Globe digital : Terre en points colorés et plongée vers Abidjan (accueil). */
import { $, clamp, lerp, easeIO, prefersReducedMotion, isCoarsePointer } from '~/lib/dom/scope';
import WORLD_COUNTRIES from './world-countries.js';

/* ====================================================================
   5 · GLOBE DIGITAL — terre en points colores, rotation propre,
       puis plongee au scroll jusqu'a l'Afrique / Abidjan
   ==================================================================== */

/* contours du monde, simplifies (lon, lat) */
var W_AFRICA = [
  [10,37],[16,33],[20,32],[25,32],[30,31],[32,31],[34,28],[37,22],[39,15],[43,12],
  [48,11],[51,12],[48,5],[44,2],[41,-2],[40,-7],[40,-11],[37,-16],[35,-19],[33,-24],
  [32,-27],[29,-31],[27,-33],[22,-34],[18,-34],[15,-27],[13,-23],[12,-18],[12,-13],
  [13,-8],[11,-4],[9,-1],[9,2],[9,4],[6,4],[4,6],[1,6],[-1,5],[-4,5],[-8,4],[-11,6],
  [-13,9],[-15,12],[-17,14],[-17,17],[-16,21],[-14,24],[-13,27],[-10,29],[-9,31],
  [-6,35],[-2,36],[3,37],[8,37]
];
var W_MADA   = [[44,-16],[47,-15],[50,-16],[50,-21],[47,-25],[45,-25],[43,-21],[44,-16]];
var W_EUR    = [
  [-9,43],[-9,39],[-6,37],[-1,37],[0,39],[3,42],[6,43],[8,44],[12,44],[15,40],[18,40],
  [20,40],[23,38],[26,38],[28,37],[31,36],[36,36],[35,33],[34,31],[36,28],[38,22],
  [43,13],[48,14],[52,15],[57,18],[59,23],[62,25],[66,25],[70,22],[72,20],[73,16],
  [76,9],[78,8],[80,13],[81,17],[85,20],[87,21],[91,22],[94,18],[97,16],[99,11],
  [100,7],[103,2],[104,1],[105,9],[107,11],[109,13],[108,17],[106,20],[110,21],
  [113,22],[117,24],[120,27],[121,30],[120,34],[122,38],[125,40],[128,42],[131,43],
  [135,48],[139,52],[143,56],[147,59],[155,60],[162,60],[170,61],[178,64],[180,66],
  [180,70],[172,70],[162,70],[152,72],[142,73],[132,74],[120,74],[110,76],[100,77],
  [90,76],[80,74],[70,73],[62,71],[52,70],[44,67],[38,66],[33,67],[30,70],[26,70],
  [21,70],[16,69],[13,66],[9,63],[6,58],[8,57],[11,57],[9,54],[6,53],[4,52],[1,51],
  [-1,49],[-4,48],[-2,47],[-1,46],[-2,44]
];
var W_HOLES  = [
  [[28,41],[36,42],[41,43],[41,45],[35,46],[30,46],[28,44]],          /* mer Noire */
  [[47,37],[52,38],[54,42],[53,47],[49,46],[47,42]],                  /* Caspienne */
  [[12,55],[19,55],[23,58],[25,61],[21,64],[16,61],[13,58]],          /* Baltique  */
  [[19,44],[20,42],[15,44],[13,45],[16,45]]                           /* Adriatique */
];
var W_GB     = [[-5,50],[-1,51],[1,52],[0,54],[-1,55],[-3,58],[-5,58],[-6,56],[-5,53],[-4,51]];
var W_JAPAN  = [[130,31],[132,34],[136,35],[139,35],[141,39],[142,42],[145,44],[143,43],[140,38],[137,37],[133,35],[131,33]];
var W_SUM    = [[95,5],[99,3],[102,0],[105,-3],[106,-6],[103,-5],[100,-2],[97,1]];
var W_BORNEO = [[109,2],[112,4],[116,7],[118,4],[118,-1],[116,-4],[112,-4],[110,-2]];
var W_JAVA   = [[105,-6],[108,-7],[112,-7],[115,-8],[112,-9],[108,-8],[106,-7]];
var W_NGUI   = [[131,-1],[136,-2],[141,-3],[147,-6],[150,-10],[145,-9],[140,-8],[136,-6],[132,-4]];
var W_NA     = [
  [-168,66],[-163,70],[-155,71],[-145,70],[-133,69],[-124,70],[-115,69],[-105,69],
  [-95,68],[-85,70],[-78,73],[-70,70],[-64,61],[-56,54],[-60,48],[-66,45],[-70,42],
  [-74,39],[-76,35],[-81,26],[-83,29],[-88,30],[-94,29],[-97,26],[-97,21],[-91,19],
  [-88,16],[-92,15],[-96,16],[-101,17],[-106,23],[-110,24],[-113,29],[-117,33],
  [-121,35],[-124,41],[-124,48],[-130,54],[-137,59],[-146,60],[-153,59],[-160,56],
  [-165,60],[-166,64]
];
var W_NA_H   = [[[-95,52],[-85,51],[-78,53],[-78,62],[-88,64],[-94,60]]];   /* baie d'Hudson */
var W_GRO    = [[-45,60],[-38,65],[-27,69],[-21,73],[-24,77],[-32,82],[-45,83],[-58,81],[-63,76],[-58,70],[-52,65]];
var W_SA     = [
  [-81,7],[-76,10],[-71,12],[-64,11],[-60,8],[-52,5],[-50,0],[-45,-2],[-38,-5],
  [-35,-8],[-38,-13],[-40,-20],[-46,-24],[-48,-26],[-53,-33],[-57,-35],[-62,-39],
  [-64,-42],[-65,-45],[-68,-50],[-69,-53],[-74,-52],[-74,-46],[-73,-40],[-72,-34],
  [-71,-28],[-70,-22],[-71,-17],[-76,-14],[-79,-8],[-81,-5],[-80,-2],[-78,1],[-79,5]
];
var W_AUS    = [
  [114,-22],[118,-20],[122,-17],[127,-14],[131,-12],[135,-12],[137,-16],[141,-12],
  [143,-11],[146,-18],[149,-21],[153,-25],[153,-29],[151,-33],[150,-37],[146,-39],
  [141,-38],[137,-35],[135,-34],[131,-32],[126,-32],[120,-34],[116,-35],[114,-32],
  [113,-26]
];
var W_NZ     = [[173,-35],[177,-38],[175,-41],[171,-43],[167,-46],[168,-44],[171,-40],[173,-37]];

var REGIONS = [
  { rings: [W_AFRICA, W_MADA], col: [220, 38, 38],  step: 1.1, key: 'af' },
  { rings: [W_EUR, W_GB],      col: [23, 95, 158],  step: 2.2, holes: W_HOLES },
  { rings: [W_JAPAN, W_SUM, W_BORNEO, W_JAVA, W_NGUI], col: [245, 137, 31], step: 1.8 },
  { rings: [W_NA, W_GRO],      col: [99, 184, 67],  step: 2.2, holes: W_NA_H },
  { rings: [W_SA],             col: [245, 196, 0],  step: 2.0 },
  { rings: [W_AUS, W_NZ],      col: [58, 168, 178], step: 2.0 }
];

/* Pays mis en avant dans le zoom africain. Les contours restent volontairement
   legerement simplifies pour conserver une animation fluide, mais chaque zone
   porte les couleurs de son drapeau plutot qu'une couleur continentale. */
var AF_COUNTRIES = [
  { n:'Maroc', poly:[[-13,28],[-1,28],[-1,35],[-5,36],[-10,35],[-13,32]], flag:[0,3], mode:'solid' },
  { n:'Algérie', poly:[[-9,19],[12,19],[12,35],[-1,35],[-5,33],[-9,29]], flag:[3,7,0], mode:'v' },
  { n:'Tunisie', poly:[[8,30],[12,30],[12,37],[9,37]], flag:[0,7], mode:'solid' },
  { n:'Égypte', poly:[[25,22],[36,22],[36,31],[32,31],[30,29],[25,29]], flag:[0,7,8], mode:'h' },
  { n:'Sénégal', poly:[[-17,12],[-11,12],[-11,17],[-16,17]], flag:[3,4,0], mode:'v' },
  { n:'Mali', poly:[[-12,10],[4,10],[4,25],[-4,25],[-12,19]], flag:[3,4,0], mode:'v' },
  { n:'Burkina Faso', poly:[[-5,9],[2,9],[2,15],[-5,15]], flag:[0,3,4], mode:'h' },
  { n:"Côte d’Ivoire", poly:[[-8,4],[-2,4],[-2,11],[-8,11]], flag:[2,7,3], mode:'v', home:true },
  { n:'Ghana', poly:[[-3,4],[1,4],[1,11],[-3,11]], flag:[0,4,3], mode:'h' },
  { n:'Nigeria', poly:[[2,4],[14,4],[14,14],[4,14],[2,10]], flag:[3,7,3], mode:'v' },
  { n:'Cameroun', poly:[[9,2],[16,2],[16,13],[10,13]], flag:[3,0,4], mode:'v' },
  { n:'RDC', poly:[[12,-13],[31,-13],[31,5],[24,5],[24,8],[15,8],[12,2]], flag:[1,0,4], mode:'d' },
  { n:'Angola', poly:[[12,-18],[24,-18],[24,-5],[17,-5],[12,-8]], flag:[0,8,4], mode:'h' },
  { n:'Éthiopie', poly:[[33,3],[48,3],[48,14],[42,14],[42,12],[35,12]], flag:[3,4,0], mode:'h' },
  { n:'Kenya', poly:[[34,-5],[42,-5],[42,5],[35,5]], flag:[8,0,3], mode:'h' },
  { n:'Tanzanie', poly:[[29,-12],[41,-12],[41,-1],[34,-1],[29,-5]], flag:[3,1,4], mode:'d' },
  { n:'Afrique du Sud', poly:[[16,-35],[33,-35],[33,-24],[28,-24],[28,-22],[20,-25],[16,-30]], flag:[0,1,3,4,7,8], mode:'d' },
  { n:'Madagascar', poly:[[43,-25],[50,-25],[50,-16],[45,-15],[43,-20]], flag:[7,3,0], mode:'h' }
];

var HUBS = [
  { n: 'Abidjan',      lon: -4.02, lat:  5.34, home: true },
  { n: 'Dakar',        lon: -17.4, lat: 14.72 },
  { n: 'Lagos',        lon:  3.38, lat:  6.52 },
  { n: 'Casablanca',   lon: -7.62, lat: 33.57 },
  { n: 'Nairobi',      lon: 36.82, lat: -1.29 },
  { n: 'Johannesburg', lon: 28.05, lat: -26.2 },
  { n: 'Paris',        lon:  2.35, lat: 48.86 },
  { n: 'Dubai',        lon: 55.27, lat: 25.2 },
  { n: 'New York',     lon: -74.0, lat: 40.71 },
  { n: 'Singapour',    lon: 103.8, lat:  1.35 }
];

var RAD = Math.PI / 180;

function ringBox(r) {
  var b = { x0: 999, y0: 999, x1: -999, y1: -999 };
  for (var i = 0; i < r.length; i++) {
    if (r[i][0] < b.x0) { b.x0 = r[i][0]; }
    if (r[i][0] > b.x1) { b.x1 = r[i][0]; }
    if (r[i][1] < b.y0) { b.y0 = r[i][1]; }
    if (r[i][1] > b.y1) { b.y1 = r[i][1]; }
  }
  return b;
}
function inRing(x, y, r) {
  var hit = false, j = r.length - 1;
  for (var i = 0; i < r.length; i++) {
    var xi = r[i][0], yi = r[i][1], xj = r[j][0], yj = r[j][1];
    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) { hit = !hit; }
    j = i;
  }
  return hit;
}

/* nuage de points terrestres : remplissage + littoral densifie */
function buildLand() {
  var pts = [];
  REGIONS.forEach(function (reg, ci) {
    var step = reg.step || 2;
    reg.rings.forEach(function (ring) {
      var b = ringBox(ring);
      for (var lat = Math.ceil(b.y0 / step) * step; lat <= b.y1; lat += step) {
        /* pas en longitude corrige par la latitude : densite reguliere */
        var lstep = step / Math.max(.25, Math.cos(lat * RAD));
        for (var lon = Math.ceil(b.x0 / lstep) * lstep; lon <= b.x1; lon += lstep) {
          if (!inRing(lon, lat, ring)) { continue; }
          var hole = false;
          if (reg.holes) {
            for (var h = 0; h < reg.holes.length; h++) {
              if (inRing(lon, lat, reg.holes[h])) { hole = true; break; }
            }
          }
          if (!hole) {
            var country = null;
            /* Les drapeaux ne remplacent que la surface africaine : ainsi la
               lecture de la planète reste nette dès la première seconde. */
            if (reg.key === 'af') {
              for (var countryIndex = 0; countryIndex < AF_COUNTRIES.length; countryIndex++) {
                if (inRing(lon, lat, AF_COUNTRIES[countryIndex].poly)) {
                  country = AF_COUNTRIES[countryIndex];
                  break;
                }
              }
            }
            if (country) {
              var flagN = country.flag.length;
              var ratio;
              if (country.mode === 'v') { ratio = (lon - ringBox(country.poly).x0) / Math.max(.01, ringBox(country.poly).x1 - ringBox(country.poly).x0); }
              else if (country.mode === 'd') { ratio = ((lon - ringBox(country.poly).x0) + (lat - ringBox(country.poly).y0)) / Math.max(.01, (ringBox(country.poly).x1 - ringBox(country.poly).x0) + (ringBox(country.poly).y1 - ringBox(country.poly).y0)); }
              else { ratio = (lat - ringBox(country.poly).y0) / Math.max(.01, ringBox(country.poly).y1 - ringBox(country.poly).y0); }
              pts.push([lon, lat, country.flag[Math.min(flagN - 1, Math.max(0, Math.floor(ratio * flagN)))], country.home ? 2 : 0]);
            } else { pts.push([lon, lat, ci, 0]); }
          }
        }
      }
      /* littoral : un point tous les ~1.1 degre le long du contour */
      for (var i = 0; i < ring.length; i++) {
        var a = ring[i], c = ring[(i + 1) % ring.length];
        var d = Math.sqrt(Math.pow(c[0] - a[0], 2) + Math.pow(c[1] - a[1], 2));
        var n = Math.max(1, Math.round(d / 1.1));
        for (var k = 0; k < n; k++) {
          pts.push([a[0] + (c[0] - a[0]) * k / n, a[1] + (c[1] - a[1]) * k / n, ci, 1]);
        }
      }
    });
  });
  /* calotte antarctique, discrete */
  for (var la = -84; la <= -70; la += 2.4) {
    var ls = 3.4 / Math.max(.12, Math.cos(la * RAD));
    for (var lo = -180; lo < 180; lo += ls) { pts.push([lo, la, 6, 0]); }
  }
  return pts;
}

var PAL = [
  [220, 38, 38], [23, 95, 158], [245, 137, 31],
  [99, 184, 67], [245, 196, 0], [58, 168, 178], [150, 160, 175],
  [255, 255, 255], [12, 16, 27]
];

/* Couleurs reelles de drapeaux, utilisees en bandes a l'interieur des
   frontieres Natural Earth. Le globe ne depend d'aucun CDN au chargement. */
var FLAG_STYLE = {
  DZ:['#006233','#ffffff','#d21034','h'], AO:['#ce1126','#000000','#ffcd00','h'],
  BJ:['#008751','#fcd116','#e8112d','v'], BW:['#6da9d2','#ffffff','#000000','h'],
  BF:['#ef2b2d','#009e49','#fcd116','h'], BI:['#ce1126','#ffffff','#1eb53a','h'],
  CM:['#007a5e','#ce1126','#fcd116','v'], CV:['#003893','#ffffff','#cf2027','h'],
  CF:['#003082','#ffffff','#289728','#ffce00','#d21034','v'], TD:['#002664','#fecb00','#c60c30','v'],
  KM:['#ffce00','#ffffff','#3a75c4','#d21034','#009739','h'], CG:['#009543','#fcd116','#dc241f','d'],
  CD:['#007fff','#f7d618','#ce1021','d'], CI:['#f77f00','#ffffff','#009e60','v'], DJ:['#6ab2e7','#ffffff','#12ad2b','h'],
  EG:['#ce1126','#ffffff','#000000','h'], GQ:['#3e9a00','#ffffff','#e32118','h'], ER:['#4189dd','#e4362d','#12ad2b','h'],
  SZ:['#3e5eb9','#ffd900','#b10c0c','h'], ET:['#078930','#fcdd09','#da121a','h'], GA:['#009e60','#fcd116','#3a75c4','h'],
  GM:['#ce1126','#ffffff','#0c1c8c','#3a7728','h'], GH:['#ce1126','#fcd116','#006b3f','h'], GN:['#ce1126','#fcd116','#009460','v'],
  GW:['#ce1126','#fcd116','#009e49','v'], KE:['#000000','#ffffff','#bb0000','#006600','h'], LS:['#00209f','#ffffff','#009543','h'],
  LR:['#bf0a30','#ffffff','#002868','h'], LY:['#e70013','#000000','#239e46','h'], MG:['#ffffff','#fc3d32','#007e3a','v'],
  MW:['#000000','#ce1126','#339e35','h'], ML:['#14b53a','#fcd116','#ce1126','v'], MR:['#006233','#fcd116','h'],
  MU:['#ea2839','#1a206d','#ffd500','#00a551','h'], MA:['#c1272d','#006233','h'], MZ:['#009739','#000000','#fce100','#ce1126','h'],
  NA:['#003580','#ffffff','#d21034','#009e49','d'], NE:['#e05206','#ffffff','#0db02b','h'], NG:['#008753','#ffffff','#008753','v'],
  RW:['#00a1de','#fdd835','#1e7d34','h'], ST:['#12ad2b','#fcd116','#d21034','h'], SN:['#00853f','#fdef42','#e31b23','v'],
  SC:['#003f87','#fcd116','#d21034','#ffffff','#009e49','d'], SL:['#1eb53a','#ffffff','#0072c6','h'], SO:['#4189dd','#ffffff','h'],
  ZA:['#e03c31','#ffffff','#007749','#000000','#ffb612','#002395','d'], SS:['#000000','#ce1126','#078930','#ffffff','#0b4ea2','#fcd116','h'],
  SD:['#d21034','#ffffff','#000000','#007229','h'], TZ:['#1eb53a','#fcd116','#000000','#00a3dd','d'], TG:['#006a4e','#ffce00','#d21034','h'],
  TN:['#e70013','#ffffff','h'], UG:['#000000','#fcdc04','#d90000','h'], ZM:['#198a00','#ef7d00','#000000','#de2010','h'],
  ZW:['#006400','#fce100','#d21034','#000000','#ffffff','h'], FR:['#002395','#ffffff','#ed2939','v'], ES:['#aa151b','#f1bf00','#aa151b','h'],
  GB:['#012169','#ffffff','#c8102e','d'], US:['#b22234','#ffffff','#3c3b6e','h'], BR:['#009b3a','#ffdf00','#002776','d'],
  CN:['#de2910','#ffde00','h'], IN:['#ff9933','#ffffff','#138808','h'], JP:['#ffffff','#bc002d','h'], AU:['#012169','#ffffff','#e4002b','d']
};

/** @param {import("~/lib/dom/scope").Scope} scope */
export function globe(scope) {
  var cv = $('#globe');
  var hero = $('.hero');
  if (!cv || !hero) { return; }

  var ctx = cv.getContext('2d', { alpha: true });
  var countries = WORLD_COUNTRIES;
  /* Les anciens points sont conserves uniquement comme secours au cas ou les
     donnees geographiques ne seraient pas chargees. */
  var land = countries.length ? [] : buildLand();
  var W = 0, H = 0, DPR = 1, R0 = 0, cx = 0, cy = 0;

  /* buckets par couleur, pour limiter les changements d'etat du contexte */
  var buckets = [];
  for (var i = 0; i < PAL.length; i++) { buckets.push([]); }

  function size() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width  = Math.round(W * DPR);
    cv.height = Math.round(H * DPR);
    R0 = Math.min(W, H) * (W < 760 ? .38 : .30);
    cx = W / 2;
  }

  /* on demarre avec l'Afrique face au visiteur, puis le globe tourne lentement */
  var dive = 0, spin = -8 * RAD, mx = 0, my = 0, tmx = 0, tmy = 0, last = 0;

  /* progression de la plongee, pilotee par le scroll du hero */
  function progress() {
    var r = hero.getBoundingClientRect();
    var run = r.height - window.innerHeight;
    if (run <= 0) { return 0; }
    return clamp(-r.top / run, 0, 1);
  }

  if (!isCoarsePointer()) {
    scope.on(hero, 'mousemove', function (e) {
      tmx = (e.clientX / window.innerWidth - .5);
      tmy = (e.clientY / window.innerHeight - .5);
    }, { passive: true });
    scope.on(hero, 'mouseleave', function () { tmx = 0; tmy = 0; });
  }

  /* projection orthographique : yaw puis pitch */
  function proj(lon, lat, yaw, pitch, R) {
    var la = lat * RAD, lo = lon * RAD;
    var vx = Math.cos(la) * Math.sin(lo);
    var vy = Math.sin(la);
    var vz = Math.cos(la) * Math.cos(lo);
    var cyw = Math.cos(yaw), syw = Math.sin(yaw);
    var x =  vx * cyw + vz * syw;
    var z = -vx * syw + vz * cyw;
    var cp = Math.cos(pitch), sp = Math.sin(pitch);
    var y2 = vy * cp - z * sp;
    var z2 = vy * sp + z * cp;
    return { x: cx + x * R, y: cy - y2 * R, z: z2 };
  }

  function pathCountry(country, yaw, pitch, R) {
    var polygons = country.g.type === 'Polygon' ? [country.g.coordinates] : country.g.coordinates;
    var visible = false, box = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };
    for (var pi = 0; pi < polygons.length; pi++) {
      var rings = polygons[pi];
      for (var ri = 0; ri < rings.length; ri++) {
        var ring = rings[ri], began = false, count = 0;
        for (var vi = 0; vi < ring.length; vi++) {
          var q = proj(ring[vi][0], ring[vi][1], yaw, pitch, R);
          if (q.z <= .035) { began = false; continue; }
          if (!began) { ctx.moveTo(q.x, q.y); began = true; } else { ctx.lineTo(q.x, q.y); }
          count++; visible = true;
          if (q.x < box.x0) { box.x0 = q.x; } if (q.x > box.x1) { box.x1 = q.x; }
          if (q.y < box.y0) { box.y0 = q.y; } if (q.y > box.y1) { box.y1 = q.y; }
        }
        if (count > 2) { ctx.closePath(); }
      }
    }
    return visible ? box : null;
  }

  function flagFill(country, box) {
    var st = FLAG_STYLE[country.iso];
    if (!st) {
      var fallback = ['#1a5f9e','#4a8f3c','#b91c1c','#e2a22f','#654aa2','#138a8a','#c06134'];
      st = [fallback[(country.mc || 1) % fallback.length], '#f4f7fa'];
    }
    var dir = st[st.length - 1], cols = st.slice(0, -1);
    var g;
    if (dir === 'v') { g = ctx.createLinearGradient(box.x0, 0, box.x1, 0); }
    else if (dir === 'd') { g = ctx.createLinearGradient(box.x0, box.y1, box.x1, box.y0); }
    else { g = ctx.createLinearGradient(0, box.y0, 0, box.y1); }
    for (var si = 0; si < cols.length; si++) {
      var a = si / cols.length, b = (si + 1) / cols.length;
      g.addColorStop(a, cols[si]); g.addColorStop(Math.max(a, b - .002), cols[si]);
    }
    return g;
  }

  function drawCountries(yaw, pitch, R, night) {
    if (!countries.length) { return; }
    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.clip();
    for (var ci = 0; ci < countries.length; ci++) {
      var country = countries[ci];
      if (R > R0 * 4 && country.co !== 'Africa') { continue; }
      ctx.beginPath();
      var box = pathCountry(country, yaw, pitch, R);
      if (!box || box.x1 - box.x0 < .3 || box.y1 - box.y0 < .3) { continue; }
      ctx.save(); ctx.clip();
      ctx.globalAlpha = .78 + night * .16;
      ctx.fillStyle = flagFill(country, box);
      ctx.fillRect(box.x0 - 2, box.y0 - 2, box.x1 - box.x0 + 4, box.y1 - box.y0 + 4);
      var shine = ctx.createLinearGradient(box.x0, box.y0, box.x1, box.y1);
      shine.addColorStop(0, 'rgba(255,255,255,.25)'); shine.addColorStop(.55, 'rgba(255,255,255,0)'); shine.addColorStop(1, 'rgba(0,10,30,.18)');
      ctx.fillStyle = shine; ctx.fillRect(box.x0, box.y0, box.x1 - box.x0, box.y1 - box.y0);
      ctx.restore();
      ctx.beginPath(); pathCountry(country, yaw, pitch, R);
      ctx.strokeStyle = 'rgba(255,255,255,' + (.42 + night * .2).toFixed(2) + ')';
      ctx.lineWidth = Math.max(.55, Math.min(1.15, R / R0 * .62)); ctx.stroke();
      ctx.strokeStyle = 'rgba(1,12,28,.30)'; ctx.lineWidth = Math.max(.3, Math.min(.65, R / R0 * .34)); ctx.stroke();
    }
    ctx.restore();
  }

  function drawAfricaBorders(yaw, pitch, R, strength) {
    if (countries.length) { return; }
    ctx.save();
    ctx.lineWidth = Math.max(.6, Math.min(1.25, R / R0 * .7));
    for (var ai = 0; ai < AF_COUNTRIES.length; ai++) {
      var poly = AF_COUNTRIES[ai].poly, first = true, visible = 0;
      ctx.beginPath();
      for (var ap = 0; ap <= poly.length; ap++) {
        var point = poly[ap % poly.length];
        var qp = proj(point[0], point[1], yaw, pitch, R);
        if (qp.z <= .015) { first = true; continue; }
        visible++;
        if (first) { ctx.moveTo(qp.x, qp.y); first = false; } else { ctx.lineTo(qp.x, qp.y); }
      }
      if (visible > 1) {
        ctx.strokeStyle = 'rgba(255,255,255,' + (strength * .62).toFixed(3) + ')';
        ctx.stroke();
        ctx.strokeStyle = 'rgba(4,12,24,' + (strength * .23).toFixed(3) + ')';
        ctx.lineWidth = Math.max(.45, Math.min(.85, R / R0 * .5));
        ctx.stroke();
        ctx.lineWidth = Math.max(.6, Math.min(1.25, R / R0 * .7));
      }
    }
    ctx.restore();
  }

  function draw(dt) {
    var p  = dive;
    var ep = easeIO(p);

    /* rotation propre du globe (~1 tour par minute), ralentie
       puis verrouillee sur Abidjan pendant la plongee */
    spin += dt * 0.000105 * (1 - ep);
    var target = -HUBS[0].lon * RAD;
    var delta  = target - spin;
    delta = Math.atan2(Math.sin(delta), Math.cos(delta));
    var yaw   = spin + delta * ep;
    var pitch = lerp(12 * RAD, HUBS[0].lat * RAD, ep);

    mx = lerp(mx, tmx, .07); my = lerp(my, tmy, .07);
    yaw   += mx * .34 * (1 - ep);
    pitch += my * .22 * (1 - ep);

    /* immersion : zoom regulier, puis ruee finale a travers la surface */
    var rush = Math.pow(clamp((p - .70) / .30, 0, 1), 2.2);
    var R = R0 * (1 + 2.9 * ep + 7.5 * rush);
    cy = H * lerp(.63, .5, ep);

    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, W, H);

    var night = clamp(p * 1.4, 0, 1);           /* 0 = fond clair, 1 = fond nuit */
    var ink   = 1 - night;

    /* halo atmospherique */
    var grd = ctx.createRadialGradient(cx, cy, R * .82, cx, cy, R * 1.22);
    grd.addColorStop(0, 'rgba(' + Math.round(lerp(185, 255, night)) + ',' +
      Math.round(lerp(28, 120, night)) + ',' + Math.round(lerp(28, 120, night)) + ',' +
      (0.10 + night * 0.1).toFixed(3) + ')');
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grd;
    ctx.beginPath(); ctx.arc(cx, cy, R * 1.22, 0, 6.2832); ctx.fill();

    /* ocean, ombres et reflet speculaire : une vraie masse spheree sous les terres */
    var ocean = ctx.createRadialGradient(cx - R * .28, cy - R * .36, R * .04, cx, cy, R * 1.04);
    if (night > .18) {
      ocean.addColorStop(0, 'rgba(31,92,150,.76)');
      ocean.addColorStop(.42, 'rgba(8,38,79,.88)');
      ocean.addColorStop(.78, 'rgba(4,14,35,.96)');
      ocean.addColorStop(1, 'rgba(0,5,17,.98)');
    } else {
      ocean.addColorStop(0, 'rgba(117,197,234,.72)');
      ocean.addColorStop(.42, 'rgba(27,117,177,.72)');
      ocean.addColorStop(.82, 'rgba(7,48,105,.84)');
      ocean.addColorStop(1, 'rgba(2,22,59,.94)');
    }
    ctx.fillStyle = ocean;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.fill();

    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.clip();
    var sheen = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
    sheen.addColorStop(0, 'rgba(255,255,255,.22)');
    sheen.addColorStop(.22, 'rgba(255,255,255,.045)');
    sheen.addColorStop(.58, 'rgba(0,12,44,0)');
    sheen.addColorStop(1, 'rgba(0,4,20,.48)');
    ctx.fillStyle = sheen; ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
    ctx.restore();

    /* Vrais pays et vrais littoraux : les frontieres sont issues du jeu de
       donnees Natural Earth et non de rectangles dessines a la main. */
    drawCountries(yaw, pitch, R, night);

    /* graticule */
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(' + (night > .5 ? '255,255,255' : '15,17,21') + ',' +
      (night > .5 ? .035 : .028).toFixed(2) + ')';
    var gl, first, pt;
    for (gl = -150; gl <= 180; gl += 30) {              /* meridiens */
      ctx.beginPath(); first = true;
      for (var la2 = -88; la2 <= 88; la2 += 4) {
        pt = proj(gl, la2, yaw, pitch, R);
        if (pt.z <= 0) { first = true; continue; }
        if (first) { ctx.moveTo(pt.x, pt.y); first = false; } else { ctx.lineTo(pt.x, pt.y); }
      }
      ctx.stroke();
    }
    for (gl = -60; gl <= 60; gl += 30) {                /* paralleles */
      ctx.beginPath(); first = true;
      for (var lo2 = -180; lo2 <= 180; lo2 += 4) {
        pt = proj(lo2, gl, yaw, pitch, R);
        if (pt.z <= 0) { first = true; continue; }
        if (first) { ctx.moveTo(pt.x, pt.y); first = false; } else { ctx.lineTo(pt.x, pt.y); }
      }
      ctx.stroke();
    }
    /* equateur, marque */
    ctx.strokeStyle = 'rgba(185,28,28,' + (0.045 + night * .07).toFixed(3) + ')';
    ctx.beginPath(); first = true;
    for (var lo3 = -180; lo3 <= 180; lo3 += 3) {
      pt = proj(lo3, 0, yaw, pitch, R);
      if (pt.z <= 0) { first = true; continue; }
      if (first) { ctx.moveTo(pt.x, pt.y); first = false; } else { ctx.lineTo(pt.x, pt.y); }
    }
    ctx.stroke();

    /* ── les terres, en points colores ── */
    for (var b = 0; b < buckets.length; b++) { buckets[b].length = 0; }
    var zoom = R / R0;
    var base = Math.max(1.6, 1.9 * Math.min(2.5, zoom * .85));

    for (var i = 0; i < land.length; i++) {
      var L = land[i];
      var q = proj(L[0], L[1], yaw, pitch, R);
      if (q.z <= 0.02) { continue; }
      if (q.x < -40 || q.x > W + 40 || q.y < -40 || q.y > H + 40) { continue; }
      buckets[L[2]].push(q.x, q.y, q.z, L[3]);
    }

    for (var c = 0; c < buckets.length; c++) {
      var arr = buckets[c];
      if (!arr.length) { continue; }
      var col = PAL[c];
      /* sur fond nuit les points s'eclaircissent */
      var rr = Math.round(lerp(col[0], Math.min(255, col[0] + 90), night));
      var gg = Math.round(lerp(col[1], Math.min(255, col[1] + 90), night));
      var bb = Math.round(lerp(col[2], Math.min(255, col[2] + 90), night));
      var focus = (c === 0) ? 1 : lerp(1, .5, ep);   /* l'Afrique reste nette */
      for (var k = 0; k < arr.length; k += 4) {
        var z = arr[k + 2], coast = arr[k + 3];
        var a = (0.34 + z * 0.6) * (coast ? 1 : 0.82) * focus;
        if (c === 6) { a *= .5; }
        ctx.fillStyle = 'rgba(' + rr + ',' + gg + ',' + bb + ',' + a.toFixed(3) + ')';
        var s = base * (0.62 + z * 0.5) * (coast ? 1.12 : 1);
        ctx.fillRect(arr[k] - s / 2, arr[k + 1] - s / 2, s, s);
      }
    }

    /* Frontieres fines visibles seulement sur la face exposee : les couleurs
       de drapeaux restent lisibles sans donner l'effet d'une carte plate. */
    drawAfricaBorders(yaw, pitch, R, .34 + ep * .62);

    /* ── arcs de liaison depuis Abidjan ── */
    var home = HUBS[0];
    var hv = [Math.cos(home.lat * RAD) * Math.sin(home.lon * RAD),
              Math.sin(home.lat * RAD),
              Math.cos(home.lat * RAD) * Math.cos(home.lon * RAD)];
    ctx.lineWidth = 1.3;
    for (var hi = 1; hi < HUBS.length; hi++) {
      var t2 = HUBS[hi];
      var tv = [Math.cos(t2.lat * RAD) * Math.sin(t2.lon * RAD),
                Math.sin(t2.lat * RAD),
                Math.cos(t2.lat * RAD) * Math.cos(t2.lon * RAD)];
      var dot = clamp(hv[0] * tv[0] + hv[1] * tv[1] + hv[2] * tv[2], -1, 1);
      var om  = Math.acos(dot);
      if (om < .001) { continue; }
      ctx.strokeStyle = 'rgba(' + (night > .5 ? '255,120,120' : '185,28,28') + ',' +
        (0.34 * (1 - ep * .7)).toFixed(3) + ')';
      ctx.beginPath();
      var st = true;
      for (var s2 = 0; s2 <= 26; s2++) {
        var tt = s2 / 26;
        var f1 = Math.sin((1 - tt) * om) / Math.sin(om);
        var f2 = Math.sin(tt * om) / Math.sin(om);
        var vx2 = hv[0] * f1 + tv[0] * f2;
        var vy2 = hv[1] * f1 + tv[1] * f2;
        var vz2 = hv[2] * f1 + tv[2] * f2;
        var nrm = Math.sqrt(vx2 * vx2 + vy2 * vy2 + vz2 * vz2) || 1;
        var lift = 1 + .19 * Math.sin(Math.PI * tt);
        var la3 = Math.asin(vy2 / nrm) / RAD;
        var lo4 = Math.atan2(vx2 / nrm, vz2 / nrm) / RAD;
        var q2 = proj(lo4, la3, yaw, pitch, R * lift);
        if (q2.z <= 0) { st = true; continue; }
        if (st) { ctx.moveTo(q2.x, q2.y); st = false; } else { ctx.lineTo(q2.x, q2.y); }
      }
      ctx.stroke();
    }

    /* ── marqueurs de villes ── */
    for (var mi = 0; mi < HUBS.length; mi++) {
      var hb = HUBS[mi];
      var q3 = proj(hb.lon, hb.lat, yaw, pitch, R);
      if (q3.z <= 0.06) { continue; }
      var isHome = !!hb.home;
      var rad = isHome ? 4.4 + ep * 3 : 2.6;
      ctx.fillStyle = isHome ? '#dc2626'
        : 'rgba(' + (night > .5 ? '255,255,255' : '15,17,21') + ',' + (0.42 + q3.z * .3).toFixed(2) + ')';
      ctx.beginPath(); ctx.arc(q3.x, q3.y, rad, 0, 6.2832); ctx.fill();
      if (isHome) {
        var pulse = (Date.now() % 2200) / 2200;
        ctx.strokeStyle = 'rgba(220,38,38,' + (0.55 * (1 - pulse)).toFixed(3) + ')';
        ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.arc(q3.x, q3.y, rad + pulse * (18 + ep * 34), 0, 6.2832); ctx.stroke();
      }
      /* etiquettes des villes africaines pendant la plongee */
      if (ep > .45 && !isHome && Math.abs(hb.lat) < 40 && hb.lon > -20 && hb.lon < 60) {
        ctx.fillStyle = 'rgba(255,255,255,' + ((ep - .45) * 1.6).toFixed(2) + ')';
        ctx.font = '600 11px Sora, system-ui, sans-serif';
        ctx.fillText(hb.n, q3.x + 9, q3.y + 4);
      }
      if (isHome && ep > .35) {
        var oa = Math.min(1, (ep - .35) * 1.5);
        ctx.fillStyle = 'rgba(255,255,255,' + oa.toFixed(2) + ')';
        ctx.font = '800 14px Sora, system-ui, sans-serif';
        ctx.fillText('ABIDJAN', q3.x + 22, q3.y - 2);
        ctx.fillStyle = 'rgba(255,140,140,' + oa.toFixed(2) + ')';
        ctx.font = '600 10px Sora, system-ui, sans-serif';
        ctx.fillText("CÔTE D'IVOIRE", q3.x + 22, q3.y + 15);
      }
    }
    /* voile de vitesse, discret, avant l'embrasement final */
    if (ink < .35) {
      ctx.fillStyle = 'rgba(5,7,12,' + ((0.35 - ink) * 0.5).toFixed(3) + ')';
      ctx.fillRect(0, 0, W, H);
    }
    /* rue vers la lumiere : plus de page noire — la surface s'embrase
       d'une lumiere blanche, reelle et totale, jusqu'a tout envahir */
    if (p > .76) {
      var burn = clamp((p - .76) / .24, 0, 1);
      var beam = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * .7);
      beam.addColorStop(0,   'rgba(255,255,255,' + (burn * burn * .98).toFixed(3) + ')');
      beam.addColorStop(.5,  'rgba(255,248,232,' + (burn * .62).toFixed(3) + ')');
      beam.addColorStop(1,   'rgba(255,255,255,0)');
      ctx.fillStyle = beam;
      ctx.fillRect(0, 0, W, H);
      if (burn > .7) {
        ctx.fillStyle = 'rgba(255,255,255,' + (clamp((burn - .7) / .3, 0, 1)).toFixed(3) + ')';
        ctx.fillRect(0, 0, W, H);
      }
    }
  }

  var raf = null;
  function frame(now) {
    var dt = Math.min(50, now - (last || now)); last = now;
    draw(dt);
    raf = scope.raf(frame);
  }

  function onScroll() {
    dive = progress();
    hero.style.setProperty('--dive', dive.toFixed(4));
  }

  size();
  onScroll();
  draw(16);                       /* premiere image immediate, sans attendre le rAF */
  scope.on(window, 'scroll', onScroll, { passive: true });
  scope.on(window, 'resize', function () { size(); onScroll(); draw(16); }, { passive: true });

  /* on ne calcule que si le hero est visible */
  if ('IntersectionObserver' in window) {
    scope.io(function (en) {
      en.forEach(function (e) {
        if (e.isIntersecting && !raf) { last = 0; raf = scope.raf(frame); }
        else if (!e.isIntersecting && raf) { window.cancelAnimationFrame(raf); raf = null; }
      });
    }, { threshold: 0 }).observe(hero);
  } else {
    raf = scope.raf(frame);
  }
  if (prefersReducedMotion()) { draw(16); if (raf) { window.cancelAnimationFrame(raf); raf = null; } }
}
