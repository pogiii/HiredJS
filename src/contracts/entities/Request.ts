import { User } from "./User"
import express from "express"
type Request = {
    user?: User | unknown
} & express.Request

export { Request }