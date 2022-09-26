module.exports = {
    presets: [
        ["@babel/preset-env", { targets: { node: "current" } }],
        "@babel/preset-typescript",
    ],
    plugins: [
        [
            "module-resolver",
            {
                alias: {
                    "@errors": "/src/errors",
                    "@configs": "./src/configs",
                    "@modules": "./src/modules",
                    "@shared": "./src/shared",
                    "@utils": "./src/utils"
                },
            },
        ],
        "babel-plugin-transform-typescript-metadata",
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }]
    ]
}