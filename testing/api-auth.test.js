//const fetch = require("node-fetch")
import fetch from "node-fetch"

const api_auth_url = "http://localhost:3000/api/auth"

describe("This block tests all the auth APIs", () => {
    it("current user fail", async () => {
        expect.assertions(1)
        var response = await fetch(api_auth_url + "/current", { method: 'GET' })
        expect( ( await response.json() ).status ).toEqual(400)
    })
    
    it("login", async () => {
        expect.assertions(1)
        var response = await fetch(api_auth_url + "/login", { method: 'POST', body: JSON.stringify({
            username: "Scotonax",
            password: "123456789"
        }),
        headers: { 'Content-Type': 'application/json' } })
        expect( ( await response.json() ).status ).toEqual(200)
    })
    it("login fail", async () => {
        expect.assertions(1)
        var response = await fetch(api_auth_url + "/login", { method: 'POST', body: JSON.stringify({
            username: "unexisting_user",
            password: "12346789"
        }),
        headers: { 'Content-Type': 'application/json' } })
        expect( ( await response.json() ).status ).toEqual(400)
    })
    
    it("logout", async () => {
        expect.assertions(1)
        var response = await fetch(api_auth_url + "/logout", { method: 'GET' })
        expect( ( await response.json() ).status ).toEqual(200)
    })
    
    it("register fail", async () => {
        expect.assertions(1)
        var response = await fetch(api_auth_url + "/register", { method: 'POST' })
        expect( ( await response.json() ).status ).toEqual(400)
    })
})