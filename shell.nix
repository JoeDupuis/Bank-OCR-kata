{ project_dir ? (toString ./.)
, pkgs ? import <nixpkgs> {}
}:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs-13_x
    yarn
  ];
}
