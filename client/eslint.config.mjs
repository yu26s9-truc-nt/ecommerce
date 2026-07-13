import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import noRelativePaths from "eslint-plugin-no-relative-import-paths";
import prettier from "eslint-plugin-prettier/recommended";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
        //"src/components/ui",
    ]),
    prettier,
    {
        plugins: {
            "no-relative-import-paths": noRelativePaths,
            "unused-imports": unusedImports,
        },
        rules: {
            "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
            "prettier/prettier": [
                "error",
                {
                    jsxSingleQuote: false,
                    singleQuote: false,
                    tabWidth: 4,
                    trailingComma: "es5",
                    bracketSpacing: true,
                    printWidth: 150,
                    singleAttributePerLine: false,
                },
            ],
            "import/order": [
                "error",
                {
                    groups: ["builtin", "external", "internal"],
                    pathGroups: [
                        {
                            pattern: "react",
                            group: "external",
                            position: "before",
                        },
                    ],
                    pathGroupsExcludedImportTypes: ["react"],
                    "newlines-between": "always",
                    alphabetize: {
                        order: "asc",
                        caseInsensitive: true,
                    },
                },
            ],
            "no-relative-import-paths/no-relative-import-paths": [
                "error",
                {
                    allowSameFolder: true, // allow "./"
                    rootDir: "src",
                    allowedDepth: 0,
                },
            ],
            "unused-imports/no-unused-imports": "error",
            "no-unused-vars": "off",
        },
    },
]);

export default eslintConfig;
