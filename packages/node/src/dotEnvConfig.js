import workspaceRoot from 'find-yarn-workspace-root'
import dotenv from 'dotenv'

if (process.env.NODE_ENV === 'development') {
  dotenv.config({
    path: `${workspaceRoot()}/.env.${process.env.NODE_ENV}`
  })
}
