const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ฐานข้อมูลจำลอง (นำเข้าข้อมูลจากไฟล์ winemaster.xlsx เรียบร้อยแล้ว ทั้ง 140 รายการ)
let wines = [
    { id: 'W00001', barcode: 'VACA000001', name: 'Adrianna 2020', vintage: 2020, type: 'Red', country: 'Argentina', region: 'Mendoza', bottle_size: 750, cost_price: 6040, price: 7490, qty_front: 0, qty_back: 0, qty_home: 0 },
    { id: 'W00002', barcode: 'VACA000002', name: 'Catena 2022', vintage: 2022, type: 'Red', country: 'Argentina', region: 'Mendoza', bottle_size: 750, cost_price: 795, price: 1690, qty_front: 6, qty_back: 21, qty_home: 0 },
    { id: 'W00003', barcode: 'VACA000003', name: 'Catena Zapata Argentino 2022', vintage: 2022, type: 'Red', country: 'Argentina', region: 'Mendoza', bottle_size: 750, cost_price: 3745, price: 5490, qty_front: 2, qty_back: 5, qty_home: 7 },
    { id: 'W00004', barcode: 'VACA000004', name: 'Catena Zapata Cabernet', vintage: 2021, type: 'Red', country: 'Argentina', region: 'Mendoza', bottle_size: 750, cost_price: 3490, price: 3490, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00005', barcode: 'VACA000005', name: 'Gran Vu Blend 2018', vintage: 2018, type: 'Red', country: 'Argentina', region: 'Mendoza', bottle_size: 750, cost_price: 4010, price: 5090, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00006', barcode: 'VACA000006', name: 'Magnum Argentino 2017', vintage: 2017, type: 'Red', country: 'Argentina', region: 'Mendoza', bottle_size: 1500, cost_price: 0, price: 0, qty_front: 0, qty_back: 1, qty_home: 1 },
    { id: 'W00007', barcode: 'VACA000007', name: 'Magnum Argentino 2020', vintage: 2020, type: 'Red', country: 'Argentina', region: 'Mendoza', bottle_size: 1500, cost_price: 0, price: 0, qty_front: 0, qty_back: 2, qty_home: 0 },
    { id: 'W00008', barcode: 'VACA000008', name: 'Magnum Argentino 2022', vintage: 2022, type: 'Red', country: 'Argentina', region: 'Mendoza', bottle_size: 1500, cost_price: 0, price: 0, qty_front: 0, qty_back: 0, qty_home: 1 },
    { id: 'W00009', barcode: 'VACA000009', name: 'Super Magnum Argentino', vintage: 2020, type: 'Red', country: 'Argentina', region: 'Mendoza', bottle_size: 3000, cost_price: 0, price: 0, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00010', barcode: 'VACA000010', name: 'Penfolds Koonunga Hill 2021', vintage: 2021, type: 'Red', country: 'Australia', region: 'South Australia', bottle_size: 750, cost_price: 650, price: 1290, qty_front: 2, qty_back: 0, qty_home: 0 },
    { id: 'W00011', barcode: 'VACA000011', name: 'Penfolds Bin 407', vintage: 2019, type: 'Red', country: 'Australia', region: 'South Australia', bottle_size: 750, cost_price: 4390, price: 4390, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00012', barcode: 'VACA000012', name: 'Don Melchor', vintage: 2021, type: 'Red', country: 'Chile', region: 'Maipo Valley', bottle_size: 750, cost_price: 0, price: 0, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00013', barcode: 'VACA000013', name: 'Baronesa P. 2019', vintage: 2019, type: 'Red', country: 'Chile', region: 'Maipo Valley', bottle_size: 750, cost_price: 2160, price: 3490, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00014', barcode: 'VACA000014', name: 'Clarendelle 2018', vintage: 2018, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 845, price: 1590, qty_front: 6, qty_back: 8, qty_home: 0 },
    { id: 'W00015', barcode: 'VACA000015', name: 'Clos du Milieu 2020', vintage: 2020, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1856, price: 0, qty_front: 0, qty_back: 0, qty_home: 0 },
    { id: 'W00016', barcode: 'VACA000016', name: 'Le C De Calon Segur 2019', vintage: 2019, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1430, price: 2190, qty_front: 0, qty_back: 0, qty_home: 0 },
    { id: 'W00017', barcode: 'VACA000017', name: 'Tempo 2019', vintage: 2019, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1450, price: 2190, qty_front: 3, qty_back: 0, qty_home: 0 },
    { id: 'W00018', barcode: 'VACA000018', name: 'Tempo 2023', vintage: 2023, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1450, price: 2190, qty_front: 2, qty_back: 11, qty_home: 0 },
    { id: 'W00019', barcode: 'VACA000019', name: 'Domaine Faiveley Mercurey 2023', vintage: 2023, type: 'Red', country: 'France', region: 'Burgundy', bottle_size: 750, cost_price: 1460, price: 0, qty_front: 0, qty_back: 0, qty_home: 0 },
    { id: 'W00020', barcode: 'VACA000020', name: 'Domaine Faiveley Nuits-Saint-Georges 2022', vintage: 2022, type: 'Red', country: 'France', region: 'Burgundy', bottle_size: 750, cost_price: 2110, price: 3090, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00021', barcode: 'VACA000021', name: 'Faiveley Bourgogne Pinot Noir 2022', vintage: 2022, type: 'Red', country: 'France', region: 'Burgundy', bottle_size: 750, cost_price: 1070, price: 1890, qty_front: 2, qty_back: 6, qty_home: 0 },
    { id: 'W00022', barcode: 'VACA000022', name: 'Faiveley Gevrey-Chambertin', vintage: 2019, type: 'Red', country: 'France', region: 'Burgundy', bottle_size: 750, cost_price: 4680, price: 5790, qty_front: 0, qty_back: 1, qty_home: 0 },
    { id: 'W00023', barcode: 'VACA000023', name: 'Faiveley Nuits-Saint-Georges 2022', vintage: 2022, type: 'Red', country: 'France', region: 'Burgundy', bottle_size: 750, cost_price: 2180, price: 3090, qty_front: 0, qty_back: 3, qty_home: 0 },
    { id: 'W00024', barcode: 'VACA000024', name: 'Faiveley Nuits-Saint-Georges Premier Cru 2019', vintage: 2019, type: 'Red', country: 'France', region: 'Burgundy', bottle_size: 750, cost_price: 4930, price: 5100, qty_front: 1, qty_back: 1, qty_home: 0 },
    { id: 'W00025', barcode: 'VACA000025', name: 'Faiveley Volnay 2022', vintage: 2022, type: 'Red', country: 'France', region: 'Burgundy', bottle_size: 750, cost_price: 3600, price: 4400, qty_front: 2, qty_back: 0, qty_home: 0 },
    { id: 'W00026', barcode: 'VACA000026', name: 'Hermitage Domaine Jaboulet Aîné', vintage: 2017, type: 'Red', country: 'France', region: 'Rhône', bottle_size: 750, cost_price: 4360, price: 5190, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00027', barcode: 'VACA000027', name: 'Volnay 1er Cru Les Pitures', vintage: 2020, type: 'Red', country: 'France', region: 'Burgundy', bottle_size: 750, cost_price: 3520, price: 4190, qty_front: 1, qty_back: 0, qty_home: 1 },
    { id: 'W00028', barcode: 'VACA000028', name: 'Chateau Cantemerle 2011', vintage: 2011, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1490, price: 2590, qty_front: 0, qty_back: 0, qty_home: 4 },
    { id: 'W00029', barcode: 'VACA000029', name: 'Chateau Cantemerle 2012', vintage: 2012, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1490, price: 2590, qty_front: 0, qty_back: 0, qty_home: 1 },
    { id: 'W00030', barcode: 'VACA000030', name: 'Chateau Cantemerle 2020', vintage: 2020, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1490, price: 2590, qty_front: 3, qty_back: 5, qty_home: 4 },
    { id: 'W00031', barcode: 'VACA000031', name: 'Chateau La Tour Carnet', vintage: 2018, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 2070, price: 2890, qty_front: 3, qty_back: 0, qty_home: 0 },
    { id: 'W00032', barcode: 'VACA000032', name: 'Blason D\'issan 2014', vintage: 2014, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1785, price: 2590, qty_front: 1, qty_back: 5, qty_home: 0 },
    { id: 'W00033', barcode: 'VACA000033', name: 'Chateau Brane-Cantenac 2018', vintage: 2018, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 3724, price: 4490, qty_front: 2, qty_back: 0, qty_home: 0 },
    { id: 'W00034', barcode: 'VACA000034', name: 'Chateau D\'issan 2018', vintage: 2018, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 2800, price: 4190, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00035', barcode: 'VACA000035', name: 'Chateau Lascombes 2020', vintage: 2020, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 3740, price: 4490, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00036', barcode: 'VACA000036', name: 'Chateau Prieure Lichine', vintage: 2019, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 2680, price: 3390, qty_front: 1, qty_back: 11, qty_home: 3 },
    { id: 'W00037', barcode: 'VACA000037', name: 'Chevalier De Lascombes 2019', vintage: 2019, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1649, price: 2390, qty_front: 2, qty_back: 4, qty_home: 0 },
    { id: 'W00038', barcode: 'VACA000038', name: 'Margaux Brio 2020', vintage: 2020, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1690, price: 2390, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00039', barcode: 'VACA000039', name: 'Margaux de Brane 2019', vintage: 2019, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1461, price: 2290, qty_front: 0, qty_back: 9, qty_home: 0 },
    { id: 'W00040', barcode: 'VACA000040', name: 'Pont de Gassac (Red)', vintage: 2023, type: 'Red', country: 'France', region: 'Languedoc', bottle_size: 750, cost_price: 720, price: 1390, qty_front: 2, qty_back: 10, qty_home: 0 },
    { id: 'W00041', barcode: 'VACA000041', name: 'Baron Pichon 2016', vintage: 2016, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 7500, price: 9590, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00042', barcode: 'VACA000042', name: 'Chateau Clerc Milon 2020', vintage: 2020, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 4000, price: 5990, qty_front: 2, qty_back: 1, qty_home: 0 },
    { id: 'W00043', barcode: 'VACA000043', name: 'Chateau D\'Armailhac', vintage: 2018, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 3150, price: 3990, qty_front: 2, qty_back: 0, qty_home: 0 },
    { id: 'W00044', barcode: 'VACA000044', name: 'Chateau Duhart-Milon 2016', vintage: 2016, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 3900, price: 5590, qty_front: 1, qty_back: 0, qty_home: 4 },
    { id: 'W00045', barcode: 'VACA000045', name: 'Chateau Grand Puy Lacoste 2019', vintage: 2019, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 4890, price: 5690, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00046', barcode: 'VACA000046', name: 'Chateau Haut Batailley 2018', vintage: 2018, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 3190, price: 3190, qty_front: 2, qty_back: 1, qty_home: 4 },
    { id: 'W00047', barcode: 'VACA000047', name: 'Chateau Lynch Bages 2018', vintage: 2018, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 5000, price: 6990, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00048', barcode: 'VACA000048', name: 'Chateau Lynch-Moussas 2021', vintage: 2021, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 2440, price: 3190, qty_front: 3, qty_back: 3, qty_home: 4 },
    { id: 'W00049', barcode: 'VACA000049', name: 'Chateau Pedesclaux', vintage: 2018, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 2185, price: 2990, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00050', barcode: 'VACA000050', name: 'Les Griffons De Pichon Baron 2019', vintage: 2019, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 2450, price: 3290, qty_front: 2, qty_back: 2, qty_home: 0 },
    { id: 'W00051', barcode: 'VACA000051', name: 'Pastourelle De Clerc Milon 2022', vintage: 2022, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1728, price: 2790, qty_front: 3, qty_back: 3, qty_home: 0 },
    { id: 'W00052', barcode: 'VACA000052', name: 'Pontet Canet 2019', vintage: 2019, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 6540, price: 7590, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00053', barcode: 'VACA000053', name: 'Reserve De La Comtesse 2016', vintage: 2016, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 2945, price: 3990, qty_front: 0, qty_back: 0, qty_home: 0 },
    { id: 'W00054', barcode: 'VACA000054', name: 'Chateau La Tour Martillac 2019', vintage: 2019, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 2488, price: 3190, qty_front: 3, qty_back: 0, qty_home: 0 },
    { id: 'W00055', barcode: 'VACA000055', name: 'Chateau Malartic', vintage: 2016, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 2480, price: 3950, qty_front: 3, qty_back: 4, qty_home: 0 },
    { id: 'W00056', barcode: 'VACA000056', name: 'Chateau Malartic', vintage: 2011, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 2600, price: 3390, qty_front: 0, qty_back: 9, qty_home: 0 },
    { id: 'W00057', barcode: 'VACA000057', name: 'Chateau Malartic', vintage: 2012, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 2600, price: 3390, qty_front: 0, qty_back: 10, qty_home: 0 },
    { id: 'W00058', barcode: 'VACA000058', name: 'Chateau Pape Clement', vintage: 2016, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 6990, price: 6990, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00059', barcode: 'VACA000059', name: 'Chateau Pape Clement 2015', vintage: 2015, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 5500, price: 6990, qty_front: 3, qty_back: 1, qty_home: 7 },
    { id: 'W00060', barcode: 'VACA000060', name: 'Chateau Pape Clement 2017', vintage: 2017, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 5500, price: 6990, qty_front: 0, qty_back: 0, qty_home: 1 },
    { id: 'W00061', barcode: 'VACA000061', name: 'Chateau Pape Clement 2019', vintage: 2019, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 5500, price: 6990, qty_front: 0, qty_back: 0, qty_home: 2 },
    { id: 'W00062', barcode: 'VACA000062', name: 'Domaine De Chevalier', vintage: 2016, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 4120, price: 5190, qty_front: 0, qty_back: 0, qty_home: 0 },
    { id: 'W00063', barcode: 'VACA000063', name: 'L\'Esprit de Chevalier 2016', vintage: 2016, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1980, price: 2790, qty_front: 0, qty_back: 0, qty_home: 0 },
    { id: 'W00064', barcode: 'VACA000064', name: 'Le Petit Smith Haut Lafitte 2020', vintage: 2020, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 2000, price: 2890, qty_front: 2, qty_back: 1, qty_home: 0 },
    { id: 'W00065', barcode: 'VACA000065', name: 'Chateau La Fleur de Bouard 2020', vintage: 2020, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1870, price: 2690, qty_front: 2, qty_back: 2, qty_home: 0 },
    { id: 'W00066', barcode: 'VACA000066', name: 'Chateau La Gravette 2019', vintage: 2019, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 3560, price: 4490, qty_front: 2, qty_back: 1, qty_home: 0 },
    { id: 'W00067', barcode: 'VACA000067', name: 'La Petite Eglise 2020', vintage: 2020, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 2860, price: 3590, qty_front: 2, qty_back: 1, qty_home: 0 },
    { id: 'W00068', barcode: 'VACA000068', name: 'LE Carillon De Rouget 2015', vintage: 2015, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1895, price: 2990, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00069', barcode: 'VACA000069', name: 'By Ott 2024', vintage: 2024, type: 'Red', country: 'France', region: 'Provence', bottle_size: 750, cost_price: 1180, price: 1890, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00070', barcode: 'VACA000070', name: 'Aromes de Pavie 2015', vintage: 2015, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 3611, price: 5200, qty_front: 2, qty_back: 6, qty_home: 0 },
    { id: 'W00071', barcode: 'VACA000071', name: 'Château Beau-Séjour Bécot 2019', vintage: 2019, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 4050, price: 4990, qty_front: 1, qty_back: 0, qty_home: 4 },
    { id: 'W00072', barcode: 'VACA000072', name: 'Château Canon 2016', vintage: 2016, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 6500, price: 4990, qty_front: 0, qty_back: 0, qty_home: 8 },
    { id: 'W00073', barcode: 'VACA000073', name: 'Château Corbin 2014', vintage: 2019, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1980, price: 2790, qty_front: 1, qty_back: 4, qty_home: 0 },
    { id: 'W00074', barcode: 'VACA000074', name: 'Château Corbin 2019', vintage: 2019, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1850, price: 2790, qty_front: 2, qty_back: 0, qty_home: 0 },
    { id: 'W00075', barcode: 'VACA000075', name: 'Château Daugay 2019', vintage: 2019, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1774, price: 2990, qty_front: 1, qty_back: 2, qty_home: 0 },
    { id: 'W00076', barcode: 'VACA000076', name: 'Château Fleur Cardinale', vintage: 2018, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 2675, price: 3490, qty_front: 2, qty_back: 0, qty_home: 0 },
    { id: 'W00077', barcode: 'VACA000077', name: 'Château Grand Barrail 2013', vintage: 2013, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 960, price: 1790, qty_front: 2, qty_back: 4, qty_home: 0 },
    { id: 'W00078', barcode: 'VACA000078', name: 'Château La Gaffelière', vintage: 2018, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 3850, price: 4990, qty_front: 1, qty_back: 0, qty_home: 6 },
    { id: 'W00079', barcode: 'VACA000079', name: 'Château Quinault L\'Enclos 2018', vintage: 2018, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1750, price: 2990, qty_front: 0, qty_back: 0, qty_home: 1 },
    { id: 'W00080', barcode: 'VACA000080', name: 'Château Quinault L\'Enclos 2019', vintage: 2019, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1750, price: 2990, qty_front: 5, qty_back: 0, qty_home: 6 },
    { id: 'W00081', barcode: 'VACA000081', name: 'Château Saint Jean 2020', vintage: 2020, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1940, price: 2690, qty_front: 3, qty_back: 1, qty_home: 0 },
    { id: 'W00082', barcode: 'VACA000082', name: 'Saint-Paul De Dominique', vintage: 2018, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1590, price: 2290, qty_front: 0, qty_back: 12, qty_home: 0 },
    { id: 'W00083', barcode: 'VACA000083', name: 'Château de Pez 2018', vintage: 2018, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1680, price: 2699, qty_front: 3, qty_back: 0, qty_home: 0 },
    { id: 'W00084', barcode: 'VACA000084', name: 'Château Ormes de Pez 2009', vintage: 2009, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 3000, price: 3990, qty_front: 2, qty_back: 2, qty_home: 0 },
    { id: 'W00085', barcode: 'VACA000085', name: 'Château Ormes de Pez 2013', vintage: 2013, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 3000, price: 3790, qty_front: 1, qty_back: 5, qty_home: 0 },
    { id: 'W00086', barcode: 'VACA000086', name: 'Château Phélan Ségur 2017', vintage: 2017, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 2800, price: 3790, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00087', barcode: 'VACA000087', name: 'Le Marquis de Calon Ségur 2019', vintage: 2019, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1850, price: 3290, qty_front: 0, qty_back: 2, qty_home: 0 },
    { id: 'W00088', barcode: 'VACA000088', name: 'Le Marquis de Calon Ségur', vintage: 2020, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1850, price: 3920, qty_front: 0, qty_back: 1, qty_home: 0 },
    { id: 'W00089', barcode: 'VACA000089', name: 'Le Marquis de Calon Ségur 2019', vintage: 2019, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1850, price: 3290, qty_front: 1, qty_back: 4, qty_home: 0 },
    { id: 'W00090', barcode: 'VACA000090', name: 'Pagodes de Cos 2018', vintage: 2018, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 2670, price: 3490, qty_front: 0, qty_back: 0, qty_home: 0 },
    { id: 'W00091', barcode: 'VACA000091', name: 'Château Gruaud Larose 2019', vintage: 2019, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 3870, price: 4590, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00092', barcode: 'VACA000092', name: 'Château Léoville Poyferré 2015', vintage: 2015, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 3850, price: 4790, qty_front: 0, qty_back: 0, qty_home: 1 },
    { id: 'W00093', barcode: 'VACA000093', name: 'Château Léoville Poyferré 2017', vintage: 2017, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 3850, price: 4790, qty_front: 1, qty_back: 0, qty_home: 1 },
    { id: 'W00094', barcode: 'VACA000094', name: 'La Croix Ducru-Beaucaillou 2019', vintage: 2019, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 2990, price: 3990, qty_front: 2, qty_back: 0, qty_home: 0 },
    { id: 'W00095', barcode: 'VACA000095', name: 'Le Petit Lion 2019', vintage: 2019, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 3390, price: 4190, qty_front: 2, qty_back: 0, qty_home: 0 },
    { id: 'W00096', barcode: 'VACA000096', name: 'Le Petit Ducru 2019', vintage: 2019, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1540, price: 2990, qty_front: 2, qty_back: 13, qty_home: 0 },
    { id: 'W00097', barcode: 'VACA000097', name: 'Sarget 2018', vintage: 2018, type: 'Red', country: 'France', region: 'Bordeaux', bottle_size: 750, cost_price: 1960, price: 2590, qty_front: 1, qty_back: 4, qty_home: 0 },
    { id: 'W00098', barcode: 'VACA000098', name: 'Cont\'Ugo 2022', vintage: 2022, type: 'Red', country: 'Italy', region: 'Tuscany', bottle_size: 750, cost_price: 1405, price: 2190, qty_front: 3, qty_back: 3, qty_home: 0 },
    { id: 'W00099', barcode: 'VACA000099', name: 'Guado Al Tasso 2022', vintage: 2022, type: 'Red', country: 'Italy', region: 'Tuscany', bottle_size: 750, cost_price: 3880, price: 4990, qty_front: 2, qty_back: 0, qty_home: 0 },
    { id: 'W00100', barcode: 'VACA000100', name: 'Le Serre 2022', vintage: 2022, type: 'Red', country: 'Italy', region: 'Tuscany', bottle_size: 750, cost_price: 2605, price: 3590, qty_front: 2, qty_back: 7, qty_home: 0 },
    { id: 'W00101', barcode: 'VACA000101', name: 'Sassicaia', vintage: 2020, type: 'Red', country: 'Italy', region: 'Tuscany', bottle_size: 750, cost_price: 12500, price: 15990, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00102', barcode: 'VACA000102', name: 'Sondraia 2019', vintage: 2019, type: 'Red', country: 'Italy', region: 'Tuscany', bottle_size: 750, cost_price: 2200, price: 3390, qty_front: 0, qty_back: 0, qty_home: 0 },
    { id: 'W00103', barcode: 'VACA000103', name: '1502 Da Vinci in Romagna 2022', vintage: 2022, type: 'Red', country: 'Italy', region: 'Emilia-Romagna', bottle_size: 750, cost_price: 845, price: 1590, qty_front: 2, qty_back: 11, qty_home: 0 },
    { id: 'W00104', barcode: 'VACA000104', name: 'Loca Ciuca', vintage: 2019, type: 'Red', country: 'Italy', region: 'Tuscany', bottle_size: 750, cost_price: 1186, price: 1990, qty_front: 2, qty_back: 4, qty_home: 0 },
    { id: 'W00105', barcode: 'VACA000105', name: 'Biondi-Santi 2013', vintage: 2013, type: 'Red', country: 'Italy', region: 'Tuscany', bottle_size: 750, cost_price: 6580, price: 7590, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00106', barcode: 'VACA000106', name: 'Il Poggione 2018', vintage: 2018, type: 'Red', country: 'Italy', region: 'Tuscany', bottle_size: 750, cost_price: 2039, price: 2490, qty_front: 2, qty_back: 4, qty_home: 0 },
    { id: 'W00107', barcode: 'VACA000107', name: 'Luca Bosio 2018', vintage: 2018, type: 'Red', country: 'Italy', region: 'Piedmont', bottle_size: 750, cost_price: 2650, price: 3590, qty_front: 2, qty_back: 0, qty_home: 0 },
    { id: 'W00108', barcode: 'VACA000108', name: 'Prunotto', vintage: 2020, type: 'Red', country: 'Italy', region: 'Piedmont', bottle_size: 750, cost_price: 1870, price: 2590, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00109', barcode: 'VACA000109', name: 'Prunotto 2018', vintage: 2018, type: 'Red', country: 'Italy', region: 'Piedmont', bottle_size: 750, cost_price: 1900, price: 3290, qty_front: 2, qty_back: 0, qty_home: 0 },
    { id: 'W00110', barcode: 'VACA000110', name: 'Salento Primitivo 2023', vintage: 2023, type: 'Red', country: 'Italy', region: 'Apulia', bottle_size: 750, cost_price: 780, price: 1490, qty_front: 4, qty_back: 1, qty_home: 0 },
    { id: 'W00111', barcode: 'VACA000111', name: 'Badia A Passignano 2021', vintage: 2021, type: 'Red', country: 'Italy', region: 'Tuscany', bottle_size: 750, cost_price: 1640, price: 2490, qty_front: 4, qty_back: 0, qty_home: 0 },
    { id: 'W00112', barcode: 'VACA000112', name: 'Biserno 2022', vintage: 2022, type: 'Red', country: 'Italy', region: 'Tuscany', bottle_size: 750, cost_price: 5050, price: 5990, qty_front: 2, qty_back: 1, qty_home: 0 },
    { id: 'W00113', barcode: 'VACA000113', name: 'Brancaia Il Blu 2019', vintage: 2019, type: 'Red', country: 'Italy', region: 'Tuscany', bottle_size: 750, cost_price: 2200, price: 3590, qty_front: 2, qty_back: 0, qty_home: 0 },
    { id: 'W00114', barcode: 'VACA000114', name: 'Flaccianello della Pieve 2018', vintage: 2018, type: 'Red', country: 'Italy', region: 'Tuscany', bottle_size: 750, cost_price: 6450, price: 7790, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00115', barcode: 'VACA000115', name: 'Il Pino di Biserno 2022', vintage: 2022, type: 'Red', country: 'Italy', region: 'Tuscany', bottle_size: 750, cost_price: 1839, price: 2690, qty_front: 1, qty_back: 1, qty_home: 0 },
    { id: 'W00116', barcode: 'VACA000116', name: 'Il Seggio 2022', vintage: 2022, type: 'Red', country: 'Italy', region: 'Tuscany', bottle_size: 750, cost_price: 1130, price: 1990, qty_front: 4, qty_back: 3, qty_home: 0 },
    { id: 'W00117', barcode: 'VACA000117', name: 'Le Volte 2023', vintage: 2023, type: 'Red', country: 'Italy', region: 'Tuscany', bottle_size: 750, cost_price: 1319, price: 2090, qty_front: 1, qty_back: 6, qty_home: 0 },
    { id: 'W00118', barcode: 'VACA000118', name: 'Luce 2016', vintage: 2016, type: 'Red', country: 'Italy', region: 'Tuscany', bottle_size: 750, cost_price: 3800, price: 7990, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00119', barcode: 'VACA000119', name: 'Luce 2020', vintage: 2020, type: 'Red', country: 'Italy', region: 'Tuscany', bottle_size: 750, cost_price: 3207, price: 7990, qty_front: 2, qty_back: 3, qty_home: 0 },
    { id: 'W00120', barcode: 'VACA000120', name: 'Lucente 2022', vintage: 2022, type: 'Red', country: 'Italy', region: 'Tuscany', bottle_size: 750, cost_price: 1182, price: 2590, qty_front: 2, qty_back: 1, qty_home: 0 },
    { id: 'W00121', barcode: 'VACA000121', name: 'Magnum Il Seggio', vintage: 2022, type: 'Red', country: 'Italy', region: 'Tuscany', bottle_size: 1500, cost_price: 0, price: 0, qty_front: 0, qty_back: 2, qty_home: 0 },
    { id: 'W00122', barcode: 'VACA000122', name: 'Marchese Antinori', vintage: 2022, type: 'Red', country: 'Italy', region: 'Tuscany', bottle_size: 750, cost_price: 1560, price: 2390, qty_front: 1, qty_back: 2, qty_home: 0 },
    { id: 'W00123', barcode: 'VACA000123', name: 'Sirpasso Toscana 2024', vintage: 2024, type: 'Red', country: 'Italy', region: 'Tuscany', bottle_size: 750, cost_price: 840, price: 1590, qty_front: 2, qty_back: 2, qty_home: 0 },
    { id: 'W00124', barcode: 'VACA000124', name: 'Tignanello', vintage: 2022, type: 'Red', country: 'Italy', region: 'Tuscany', bottle_size: 750, cost_price: 5240, price: 6490, qty_front: 2, qty_back: 10, qty_home: 0 },
    { id: 'W00125', barcode: 'VACA000125', name: 'Aldergheri Amarone 2020', vintage: 2020, type: 'Red', country: 'Italy', region: 'Veneto', bottle_size: 750, cost_price: 3040, price: 3990, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00126', barcode: 'VACA000126', name: 'Aldergheri Valpolicella Ripasso', vintage: 2020, type: 'Red', country: 'Italy', region: 'Veneto', bottle_size: 750, cost_price: 1605, price: 2390, qty_front: 3, qty_back: 3, qty_home: 0 },
    { id: 'W00127', barcode: 'VACA000127', name: 'Cloudy Bay Pinot Noir', vintage: 2022, type: 'Red', country: 'New Zealand', region: 'Marlborough', bottle_size: 750, cost_price: 1980, price: 2990, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00128', barcode: 'VACA000128', name: 'Alion 2019', vintage: 2019, type: 'Red', country: 'Spain', region: 'Castilla y León', bottle_size: 750, cost_price: 3100, price: 4190, qty_front: 1, qty_back: 8, qty_home: 0 },
    { id: 'W00129', barcode: 'VACA000129', name: 'Macan 2019', vintage: 2019, type: 'Red', country: 'Spain', region: 'La Rioja', bottle_size: 750, cost_price: 3270, price: 4090, qty_front: 2, qty_back: 1, qty_home: 0 },
    { id: 'W00130', barcode: 'VACA000130', name: 'Macán Clásico 2018', vintage: 2018, type: 'Red', country: 'Spain', region: 'La Rioja', bottle_size: 750, cost_price: 2380, price: 3590, qty_front: 2, qty_back: 1, qty_home: 0 },
    { id: 'W00131', barcode: 'VACA000131', name: 'Pingorote 2019', vintage: 2019, type: 'Red', country: 'Spain', region: 'Castilla y León', bottle_size: 750, cost_price: 720, price: 1490, qty_front: 2, qty_back: 0, qty_home: 0 },
    { id: 'W00132', barcode: 'VACA000132', name: 'Pintia', vintage: 2017, type: 'Red', country: 'Spain', region: 'Castilla y León', bottle_size: 750, cost_price: 2838, price: 3990, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00133', barcode: 'VACA000133', name: 'Decoy 2019', vintage: 2019, type: 'Red', country: 'USA', region: 'California', bottle_size: 750, cost_price: 1290, price: 1990, qty_front: 2, qty_back: 1, qty_home: 0 },
    { id: 'W00134', barcode: 'VACA000134', name: 'Robert Mondavi Vint 2022', vintage: 2022, type: 'Red', country: 'USA', region: 'California', bottle_size: 750, cost_price: 1650, price: 0, qty_front: 0, qty_back: 0, qty_home: 0 },
    { id: 'W00135', barcode: 'VACA000135', name: 'Robert Mondavi Vint 2023', vintage: 2023, type: 'Red', country: 'USA', region: 'California', bottle_size: 750, cost_price: 840, price: 1590, qty_front: 2, qty_back: 2, qty_home: 0 },
    { id: 'W00136', barcode: 'VACA000136', name: 'Inglenook', vintage: 2015, type: 'Red', country: 'USA', region: 'California', bottle_size: 750, cost_price: 3990, price: 4790, qty_front: 2, qty_back: 0, qty_home: 0 },
    { id: 'W00137', barcode: 'VACA000137', name: 'Spottswoode', vintage: 2019, type: 'Red', country: 'USA', region: 'California', bottle_size: 750, cost_price: 12090, price: 12090, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00138', barcode: 'VACA000138', name: 'Stag\'s Leap 2022', vintage: 2022, type: 'Red', country: 'USA', region: 'California', bottle_size: 750, cost_price: 1854, price: 2690, qty_front: 2, qty_back: 1, qty_home: 0 },
    { id: 'W00139', barcode: 'VACA000139', name: 'Quilceda Creek 2018', vintage: 2018, type: 'Red', country: 'USA', region: 'Washington', bottle_size: 750, cost_price: 10200, price: 12090, qty_front: 1, qty_back: 0, qty_home: 0 },
    { id: 'W00140', barcode: 'VACA000140', name: '', vintage: '', type: '', country: '', region: '', bottle_size: 750, cost_price: 511, price: 381156, qty_front: 0, qty_back: 0, qty_home: 0 },
];

// เก็บประวัติการใช้งาน (Logs) ลงไฟล์เพื่อป้องกันข้อมูลหายเมื่อเซิร์ฟเวอร์รีสตาร์ท
const fs = require('fs');
const logsFilePath = './logs.json';

function readLogs() {
    if (!fs.existsSync(logsFilePath)) return [];
    const data = fs.readFileSync(logsFilePath, 'utf8');
    
    // ดักจับกรณีไฟล์ถูกสร้างไว้แต่ข้างในว่างเปล่า หรือข้อมูล JSON พัง
    if (!data || data.trim() === '') return []; 
    
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error("อ่านไฟล์ logs.json ไม่สำเร็จ:", error);
        return []; 
    }
}

function addLog(username, action, detail) {
    const time = new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });
    const logs = readLogs();
    
    // ตั้งชื่อ key ให้ตรงกับหน้า logs.html (timestamp, user, action, details)
    logs.unshift({ timestamp: time, user: username, action: action, details: detail });
    
    if (logs.length > 500) logs.pop(); // เก็บย้อนหลัง 500 รายการ
    fs.writeFileSync(logsFilePath, JSON.stringify(logs, null, 2));
}

// API: ตรวจสอบการ Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'wine1234') {
        res.json({ success: true, role: 'admin', name: 'ผู้จัดการร้าน (Admin)' });
    } else if (username === 'staff' && password === 'staff1234') {
        res.json({ success: true, role: 'staff', name: 'พนักงานหน้าร้าน (Staff)' });
    } else if (username === 'Demo' && password === 'Demo') {
        res.json({ success: true, role: 'viewer', name: 'ผู้เข้าชม (Demo)' });
    } else {
        res.status(401).json({ success: false, message: 'ชื่อหรือรหัสผ่านไม่ถูกต้อง' });
    }
});

// API: ดึงข้อมูลไวน์ทั้งหมด
app.get('/api/wines', (req, res) => {
    res.json(wines);
});

// API: ดึงข้อมูลประวัติการใช้งาน (Logs)
app.get('/api/logs', (req, res) => {
    res.json(readLogs());
});

// API: เพิ่มไวน์ใหม่
app.post('/api/wines', (req, res) => {
    const { id, barcode, name, type, country, bottle_size, price, user } = req.body;
    
    const newWine = { 
        id: id, barcode: barcode, name: name, vintage: '', type: type,        
        country: country, region: '', bottle_size: bottle_size || 750, 
        cost_price: 0, price: price, qty_front: 0, qty_back: 0, qty_home: 0 
    };
    
    wines.push(newWine);
    addLog(user || 'ไม่ทราบชื่อ', 'เพิ่มสินค้าใหม่', `รหัส: ${id} | ชื่อ: ${name}`);
    res.json(newWine);
});

// API: ปรับจำนวนสต็อกตามตำแหน่งที่เก็บ
app.patch('/api/wines/:id/qty', (req, res) => {
    const { location, amount, user } = req.body;
    const id = req.params.id;
    const wine = wines.find(w => w.id === id);
    
    if (wine && (location === 'qty_front' || location === 'qty_back' || location === 'qty_home')) {
        
        // --- เช็คสต็อกคงเหลือก่อน ---
        // ถ้าเป็นการเบิกออก (amount เป็นลบ) และสต็อกเป็น 0 หรือน้อยกว่า ให้ปฏิเสธการบันทึก
        if (amount < 0 && wine[location] <= 0) {
            return res.status(400).json({ error: 'สต็อกหมด ไม่สามารถเบิกออกได้' });
        }

        wine[location] += amount;
        
        const action = amount > 0 ? 'นำเข้าสต็อก (In)' : 'ตัดสต็อก (Out)';
        const locName = location === 'qty_front' ? 'หน้าร้าน' : location === 'qty_back' ? 'หลังร้าน' : 'บ้าน';
        addLog(user || 'ไม่ทราบชื่อ', action, `รหัส: ${id} | ${locName} (${amount > 0 ? '+'+amount : amount} ขวด)`);
        
        res.json(wine);
    } else {
        res.status(404).json({ error: "ไม่พบข้อมูลไวน์ หรือ ระบุตำแหน่งผิด" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


