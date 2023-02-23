import { inputValidator } from "./validator";

describe("validator", () => {
    test("return true, all values correct", () => {
        const result = inputValidator(40, 42);

        expect(result).toBeTruthy();
    });

    test("return false, value incorrect", () => {
        const result = inputValidator(40, 52);

        expect(result).toBeFalsy();
    });

    test("edge left value, should return true", () => {
        const result = inputValidator(40, 36.4);

        expect(result).toBeTruthy();
    });

    test("edge right value, should return true", () => {
        const result = inputValidator(40, 44);

        expect(result).toBeTruthy();
    });

    test("return false, values are string", () => {
        // @ts-ignore
        const result = inputValidator("40", "25");

        expect(result).toBeFalsy();
    });
});