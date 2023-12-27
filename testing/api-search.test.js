const api_search_url = "http://localhost:3000/api/search"

describe("This block tests all the search APIs", () => {
    //const fetch = require("node-fetch")
    it("search per tag", async () => {
        expect.assertions(1)
        var text_to_search = "carton"
        var response = await fetch(api_search_url + "/tag/" + text_to_search, { method: 'GET' })
        expect(response.status).toEqual(200)
    })
    
    it("search per title", async () => {
        expect.assertions(1)
        var text_to_search = "Spongebob"
        var response = await fetch(api_search_url + "/review/" + text_to_search, { method: 'GET' })
        expect(response.status).toEqual(200)
    })
    
    it("search per user", async () => {
        expect.assertions(1)
        var text_to_search = "Scotonax"
        var response = await fetch(api_search_url + "/user/" + text_to_search, { method: 'GET' })
        expect(response.status).toEqual(200)
    })
})