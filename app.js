const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); //parse JSON bodies

let customer = []; // อาร์เรย์สำหรับเก็บรายการ customer ในหน่วยความจำ

// ดึงรายการ customer ทั้งหมด
app.get('/data', (req, res) => {
  res.json(customer);
});

// เพิ่มรายการ customer ใหม่
app.post('/customer', (req, res) => {
  const todo = { id: Date.now(), ...req.body };
  customer.push(todo);
  res.status(201).json(todo);
});

// อัพเดทรายการ customer โดยใช้ id
app.put('/customer/:id', (req, res) => {
  const { id } = req.params;
  const index = customer.findIndex(todo => todo.id == id);
  if (index !== -1) {
    customer[index] = { ...customer[index], ...req.body };
    res.json(customer[index]);
  } else {
    res.status(404).json({ message: 'customer not found' });
  }
});

// ลบรายการ customer โดยใช้ id
app.delete('/customer/:id', (req, res) => {
  const { id } = req.params;
  customer = customer.filter(todo => todo.id != id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`customer app listening at http://localhost:${port}`);
});
