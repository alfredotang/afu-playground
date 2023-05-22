# afu-playground

## install dependencies

```bash
npm -g install pnpm
```

```bash
pnpm install

```

```bash
cp -R .env.example .env
```

## Get Gitlab access tokens
![go to preferences](./images/img-2023-05-23%20at%2005.11.14.png)
![go to access tokens](./images/img-2023-05-23%20at%2005.12.00.png)

## develop
```bash
pnpm build:watch
```
- scripts 都放在 `src/app` 底下
- `src/app` 底下的 `folder` 只要有 `main.ts` 會自動 `complier` 成 `cmd`
- 支援巢狀 files structure
- package.json 也會自動增加 scripts
- 在 `build:watch` 的模式下，會自動把 `ts` 打包到 `dist/*`


## cmd
顯示所有可以執行的 script，可以用這個來選擇要執行的 `cmd`
```bash
pnpm cmd:cmd
```

建立 release MR
```bash
pnpm cmd:release:*
```

建立 rc MR
```bash
pnpm cmd:rc:*
```