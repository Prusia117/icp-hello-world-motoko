# Calculadora para la Dosificación de Concreto

Calculadora hecha en Mokoto como backend y Js como frontend

## Ejecutarlo de forma local

-Clona este repositorio

```
  git clone https://github.com/Prusia117/icp-hello-world-motoko
```

-Ve al directorio icp-hello-world-motoko

-Intala las dependencias

```
  npm install
```

-Ejecuta un dfx start

```
   dfx start
```

-Crea los canisters
```
   dfx canister create --all
```

-Genera la carpeta declarations
```
  dfx generate icp_hello_world_motoko_backend
```

-Despues ejecuta el deploy del fronted un dfx deploy

```
   dfx deploy icp_hello_world_motoko_frontend
```

-Habre la aplicacion mediante este link

```
   frontend: http://127.0.0.1:4943/?canisterId=[replaza por tu canister id puede ser algo así: bd3sg-teaaa-aaaaa-qaaba-cai] .
```
```
   backend: http://127.0.0.1:4943/?canisterId=[replaza por tu canister id puede ser algo así: be2us-64aaa-aaaaa-qaabq-cai&id=bkyz2-fmaaa-aaaaa-qaaaq-cai] .
```
