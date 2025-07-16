const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post("/submit", (req, res) => {
    const { name, uregno, admnno, clgname, email, subjects } = req.body

    // Parse numerical values
    const parsedUregno = parseInt(uregno)
    const parsedAdmnno = parseInt(admnno)

    const parsedSubjects = subjects.map(sub => ({
        subjname: sub.subjname,
        mark: parseInt(sub.mark)
    }))

    // Calculate total
    const total = parsedSubjects.reduce((acc, sub) => acc + sub.mark, 0)

    // Calculate CGPA (assuming total per subject = 100)
    const cgpa = (total / (parsedSubjects.length * 10)).toFixed(2)

    // Prepare response
    const resultData = {
        name,
        uregno: parsedUregno,
        admnno: parsedAdmnno,
        clgname,
        email,
        subjects: parsedSubjects,
        total,
        cgpa
    }

    res.json(resultData)
})

app.listen(4000, () => {
    console.log("✅ Server is running")
})
