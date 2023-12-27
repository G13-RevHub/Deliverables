const api_auth_url = "http://localhost:3000/api/auth"

describe("This block tests all the auth APIs", () => {
    test("current user fail", async () => {
        expect.assertions(1)
        var response = await fetch(api_auth_url + "/current", { method: 'GET' })
        expect(response.status).toEqual(400)
    })

    test("login", async () => {
        expect.assertions(1)
        var response = await fetch(api_auth_url + "/login", {
            method: 'POST', body: JSON.stringify({
                username: "Scotonax",
                password: "123456789"
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toEqual(200)
    })
    test("login fail", async () => {
        expect.assertions(1)
        var response = await fetch(api_auth_url + "/login", {
            method: 'POST', body: JSON.stringify({
                username: "unexisting_user",
                password: "12346789"
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toEqual(400)
    })

    test("logout", async () => {
        expect.assertions(1)
        var response = await fetch(api_auth_url + "/logout", { method: 'GET' })
        expect(response.status).toEqual(200)
    })

    test("register fail", async () => {
        expect.assertions(1)
        var response = await fetch(api_auth_url + "/register", { method: 'POST' })
        expect(response.status).toEqual(400)
    })
})