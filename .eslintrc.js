/**
 * @type {import('eslint/lib/eslint/eslint').ConfigData}
 */
module.exports = {
    "env": {
        "browser": true,
        "amd": true,
        "node": true,
        // "version": "latest",
        "es2021": true
    },
<<<<<<< HEAD
    "settings": {
        "react": {
            "pragma": "React",
            "version": "17.0.2"
        }
    },
=======
>>>>>>> 5c9ed40311b55bcf0f2bac1c46699a0faa289e80
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-unused-vars": 'warn'
    },
    ignorePatterns: [
        'node_modules',
        'dist'
    ]
};
