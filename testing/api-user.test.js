//const fetch = require("node-fetch")
//import fetch from "node-fetch"

const api_user_url = "http://localhost:3000/api/user"

describe("This block tests all the user APIs", () => {
    it("get self user fail", async () => {
        expect.assertions(1)
        var response = await fetch(api_user_url + "/get", { method: 'GET' })
        expect(response.status).toEqual(400)
    })

    it("get user", async () => {
        expect.assertions(1)
        var user_to_get = "1"
        var response = await fetch(api_user_url + "/get/" + user_to_get, { method: 'GET' })
        expect(response.status).toEqual(200)
    })
    it("get user fail", async () => {
        expect.assertions(1)
        var user_to_get = "-1"
        var response = await fetch(api_user_url + "/get/" + user_to_get, { method: 'GET' })
        expect(response.status).toEqual(400)
    })

    it("get all usernames", async () => {
        expect.assertions(1)
        var response = await fetch(api_user_url + "/getAllUsernames", { method: 'GET' })
        expect(response.status).toEqual(200)
    })

    it("get user reviews", async () => {
        expect.assertions(1)
        var user_of_the_reviews = "1"
        var response = await fetch(api_user_url + "/getUserReviews/" + user_of_the_reviews, { method: 'GET' })
        expect(response.status).toEqual(200)
    })
})