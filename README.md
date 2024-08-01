# afu-playground

## install [pnpm](https://pnpm.io/installation)

## install [fzf](https://github.com/junegunn/fzf?tab=readme-ov-file#installation)

### using homebrew

```bash
brew install fzf
```

## install dependencies

```bash
pnpm install
```

## cmd

顯示所有可以執行的 script，可以用這個來選擇要執行的 `cmd`

```bash
pnpm cmd
```

## log

log ts 到 terminal 上

建立 log 檔案

```bash
pnpm setup:log
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
