import express, { response } from "express"
import { request } from "node:http"
import { pool } from "./db.js"

export const app = express()

app.use(express.static("public"))
app.set("json spaces", 2)
import cors from 'cors'

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

export function AlugueisView(){
    app.get('/alugueis', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM vw_alugueis')
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: 'Erro ao buscar aluguéis' })
  }
})
}
