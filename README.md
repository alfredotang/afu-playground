# afu-playground
此專案是用 [pnpm](https://pnpm.io/) 當作 package manager
所以使用前可以先安裝 [pnpm](https://pnpm.io/)

## install dependencies

```bash
pnpm install
```

## prepare env
```bash
cp -R .env.example .env
```
- `PROJECT_ROOT_PATH`
  - 這個專案的絕對路徑, ex. `~/project/afu-playground`
- `IKALA_ROOT_PATH`
  - portal & cdp-management 所屬的資料夾，如果在不同資料夾，需要把他們放在一起
  - ex. portal & cdp-management 都放在 `~/project`
  - 那就填入 `~/project`
- `GITLAB_API_TOKEN`
  - ![go to preferences](./images/img-2023-05-23%20at%2005.11.14.png)
  - ![go to access tokens](./images/img-2023-05-23%20at%2005.12.00.png)

## cmd
顯示所有可以執行的 script，可以用這個來選擇要執行的 `cmd`
```bash
pnpm cmd
```

建立 release MR (rc or production)
```bash
pnpm cmd:release:mr
```

## log
log ts 到 terminal 上

建立 log 檔案
```bash
mkdir .log
touch .log/main.ts
```
範例
```ts
// example
// .log/main.ts
console.log('hello')
```

執行
```bash
pnpm log
```

## develop
若要開發新的 cmd ，一律放在 `src/app` 底下。新增/異動後，執行
```bash
pnpm write:cmd
```
會自動根據 `src/app` 的結構，產生對應的 scripts 到 `package.json`

```bash
src/app
├── cmd
│   └── main.ts -> `"cmd": "tsx src/app/cmd/main.ts"`
├── create-ikala-tsx -> `"cmd:create-ikala-tsx": "tsx src/app/create-ikala-tsx/main.ts",`
│   ├── main.ts
│   └── templates
│       ├── index.txt
│       └── tsx.txt
├── generate-ts-type
│   ├── entry.json
│   └── main.ts -> `"cmd:generate-ts-type": "tsx src/app/generate-ts-type/main.ts",`
├── id
│   └── main.ts -> `"cmd:id": "tsx src/app/id/main.ts",`
└── release
    ├── desc
    │   └── main.ts  -> `"cmd:release:desc": "tsx src/app/release/desc/main.ts",`
    └── mr
        └── main.ts -> `"cmd:release:mr": "tsx src/app/release/mr/main.ts",`
```