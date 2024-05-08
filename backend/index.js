import express from 'express'
import cors from 'cors';
import prisma from './db/prisma.js'

const app = express()

app.use(cors({
    origin: ['http://localhost:5173']
}))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/notes', async (req, res)=>{
    try {
        const notes = await prisma.notes.findMany()
        res.status(200).json({notes});
    } catch (error) {
        console.log(error);
    }
})

app.post('/create',async (req, res)=>{
    try {
        const { note } = req.body;
        const newNote = await prisma.notes.create({
            data: {
                content: note
            }
        })
        res.status(200).json({message: "note created", newNote});
    } catch (error) {
        console.log(error)
    }
})

app.delete('/delete/:id', async (req, res)=>{
    try {
        const id = Number(req.params.id);
        await prisma.notes.delete({
            where: {
                id
            }
        })
        res.status(200).json({message: "note deleted!"})
    } catch (error) {
        console.log(error);
    }
})

app.listen(3000,()=>{
    console.log("server running http://localhost:3000");
})

