import UuidGenerator from "./uuid.generator";

describe('id generatod', () => {

    test('should create a random and unique id', () => {

        const uuidGenerator = new UuidGenerator()
        const uuid = uuidGenerator.generate();
        const otherUuid = uuidGenerator.generate();

        expect(uuid).toEqual(expect.any(String))
        expect(uuid).not.toBe(otherUuid)

    })

})