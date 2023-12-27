const api_review_url = "http://localhost:3000/api/review"

describe("This block tests all the review APIs", () => {
    it("create review fail", async () => {
        expect.assertions(1)
        var response = await fetch(api_review_url + "/create", {
            method: 'POST', body: JSON.stringify({
                title: "recensione bella",
                tags: [],
                text: "testo della recensione bella"
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toEqual(400)
    })

    it("get review", async () => {
        expect.assertions(1)
        var review_id = "1"
        var response = await fetch(api_review_url + "/get/" + review_id, { method: 'GET' })
        expect(response.status).toEqual(200)
    })
    it("get review fail", async () => {
        expect.assertions(1)
        var review_id = "-1"
        var response = await fetch(api_review_url + "/get/" + review_id, { method: 'GET' })
        expect(response.status).toEqual(400)
    })

    it("get reviews per views", async () => {
        expect.assertions(1)
        var response = await fetch(api_review_url + "/getPerViews", { method: 'GET' })
        expect(response.status).toEqual(200)
    })

    it("rate review fail", async () => {
        expect.assertions(1)
        var response = await fetch(api_review_url + "/rate", {
            method: 'PUT', body: JSON.stringify({
                author_id: 1,
                review_id: 1,
                rate: true
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toEqual(400)
    })
})