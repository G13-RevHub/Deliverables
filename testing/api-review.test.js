const api_review_url = "http://localhost:3000/api/auth"

//describe("This block tests all the review APIs", () => {
    const fetch = require("node-fetch")
    it("create review fail", async () => {
        expect.assertions(1)
        var response = await fetch(api_review_url + "/create", { method: 'POST', body: JSON.stringify({
            title: "recensione bella",
            tags: [],
            text: "testo della recensione bella"
        }),
        headers: { 'Content-Type': 'application/json' } })
        expect( ( await response.json() ).status ).toEqual(400)
    })
    
    it("get review", async () => {
        expect.assertions(1)
        var review_id = "1"
        var response = await fetch(api_review_url + "/get/" + review_id, { method: 'GET' })
        expect( ( await response.json() ).status ).toEqual(200)
    })
    it("get review fail", async () => {
        expect.assertions(1)
        var review_id = "-1"
        var response = await fetch(api_review_url + "/get/" + review_id, { method: 'GET' })
        expect( ( await response.json() ).status ).toEqual(400)
    })
    
    it("get reviews per views", async () => {
        expect.assertions(1)
        var response = await fetch(api_review_url + "/getPerViews", { method: 'GET' })
        expect( ( await response.json() ).status ).toEqual(200)
    })
    
    it("rate review fail", async () => {
        expect.assertions(1)
        var response = await fetch(api_review_url + "/rate", { method: 'POST', body: JSON.stringify({
            author_id: 1,
            review_id: 1,
            rate: true
        }),
        headers: { 'Content-Type': 'application/json' } })
        expect( ( await response.json() ).status ).toEqual(400)
    })
//})