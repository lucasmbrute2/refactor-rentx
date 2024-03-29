import { pathsToModuleNameMapper } from "ts-jest"
import { compilerOptions } from "./tsconfig.json"

export default {
    bail: true,
    clearMocks: true,
    coverageProvider: "v8",
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/src" }),
    preset: "ts-jest",
    collectCoverage: true,
    collectCoverageFrom: [
        "<rootDir>/src/modules/**/useCases/**/*.ts"
    ],
    coverageDirectory: "coverage",
    coverageReporters: [
        "text-summary",
        "lcov"
    ],
    testMatch: [
        "**/*.spec.ts"
    ],
};
