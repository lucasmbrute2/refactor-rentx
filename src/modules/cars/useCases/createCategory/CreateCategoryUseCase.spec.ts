describe("Create category", () => {
    it("Expected 2 + 2 = 4", () => {
        const sum = 2 + 2;
        const result = 4;

        expect(sum).toBe(result)
    })

    it("Expect 2 + 2 not be 5", () => {
        const sum = 2 + 4;
        const result = 5;


        expect(sum).not.toBe(result)
    })
})