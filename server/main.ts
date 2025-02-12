import fs from 'node:fs'
import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { logger as HonoLogger } from 'hono/logger'
import logger from '@/src/libs/logger'

const port = 8787
const app = new Hono()
app.use(HonoLogger())

app.get('/', c => c.html(fs.readFileSync('./server/client.html', 'utf-8')))
app.get('/:name', c => c.text(`hello ${c.req.param('name')}!`))

serve({
  port,
  fetch: app.fetch,
})

logger.box(`http://localhost:${port}`)
