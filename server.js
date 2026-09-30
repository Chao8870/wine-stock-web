const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ฐานข้อมูลจำลอง (ดึงข้อมูลโครงสร้างจากไฟล์ Excel: Wine_Master)
let wines = [
    { 
        id: 'W00001', barcode: 'VACA000001', name: 'Adrianna', vintage: 2020, 
        type: 'Red', country: 'Argentina', region: 'Mendoza', bottle_size: 750, 
        cost_price: 6040, price: 7490, 
        qty_front: 0, qty_back: 0, qty_home: 0 
    },
    { 
        id: 'W00002', barcode: 'VACA000002', name: 'Catena', vintage: 2022, 
        type: 'Red', country: 'Argentina', region: 'Mendoza', bottle_size: 750, 
        cost_price: 795, price: 1690, 
        qty_front: 6, qty_back: 21, qty_home: 0 
    },
    { 
        id: 'W00003', barcode: 'VACA000003', name: 'Catena Zapata Argentino', vintage: 2022, 
        type: 'Red', country: 'Argentina', region: 'Mendoza', bottle_size: 750, 
        cost_price: 3745, price: 5490, 
        qty_front: 2, qty_back: 5, qty_home: 7 
    }
];

// API: ตรวจสอบการ Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'wine1234') {
        res.json({ success: true, role: 'admin', name: 'ผู้จัดการร้าน (Admin)' });
    } else if (username === 'staff' && password === 'staff1234') {
        res.json({ success: true, role: 'staff', name: 'พนักงานหน้าร้าน (Staff)' });
    } else {
        res.status(401).json({ success: false, message: 'ชื่อหรือรหัสผ่านไม่ถูกต้อง' });
    }
});

// API: ดึงข้อมูลไวน์ทั้งหมด
app.get('/api/wines', (req, res) => {
    res.json(wines);
});

// API: ปรับจำนวนสต็อกตามตำแหน่งที่เก็บ (หน้าร้าน, หลังร้าน, บ้าน)
app.patch('/api/wines/:id/qty', (req, res) => {
    const { location, amount } = req.body; // location: 'qty_front', 'qty_back', หรือ 'qty_home'
    const id = req.params.id;
    const wine = wines.find(w => w.id === id);
    
    if (wine && (location === 'qty_front' || location === 'qty_back' || location === 'qty_home')) {
        wine[location] += amount;
        if (wine[location] < 0) wine[location] = 0; // ป้องกันสต็อกติดลบ
        res.json(wine);
    } else {
        res.status(404).json({ error: "ไม่พบข้อมูลไวน์ หรือ ระบุตำแหน่งผิด" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
