# Usage
## Install
To prep your environment, make sure you have
- yarn
- node (13_x)
installed.

Run `yarn install` to install the dependencies.

## Build

`yarn build`

## Run
To output account numbers:
`./bankocr parse <filename>`

To output them to a file:

`./bankocr parse <filename> <outputFile>`

To validate an account number:
`./bankocr validate <accountNumber>`

# Contributing
## Setup
A `shell.nix` script have been supplied to provision your environment automatically if you have nix installed.
If nix is installed, open the shell by running  `nix-shell`.

## Linter
`yarn lint` to run eslint

## Tests
`yarn test` to run the test suite.
