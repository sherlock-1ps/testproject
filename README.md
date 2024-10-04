# Backoffice Web

> Backoffice Web (Next.js + App Router + Antd + Tailwind)

## Build Setup
#### Install

To install all apps and packages, run the following command:

```bash
yarn install | yarn
```

#### Develop

To develop all apps and packages, run the following command:

```bash
yarn lingui # you can only do it once, or you need to translate.
yarn dev
```

#### Build
To build all apps and packages, run the following command:
```bash
yarn build
```

#### Start
> Start a Next.js production server.

```bash
yarn start
```

## Project Structure

Root
```
├── src/
│   ├── app               #
│   ├── components        # 
│   ├── constants         #
│   ├── enums             #
│   ├── layouts           #
│   ├── libs              #
│   ├── locales           #
│   ├── services          #
│   ├── stores            #
│   ├── styles            #
│   ├── theme             #
│   ├── types             #
│   ├── utils             #
│   └── ...
└── ...
```

## Files Structure

การตั้งชื่อไฟล์ในโปรเจคนี้เราจะใช้เป็น Kebab Case ตัวอย่างเช่น `/components/seo-header.tsx`

## การใช้งาน i18n

หลักๆ เราจะใช้งานคือ เรียก `const { _ } = useLingui()` ใน react component แล้วทำการใช้งานเช่น ```_(msg`ทดสอบ`)``` เป็นต้น ส่วนตัว `msg` ได้จากการ `import { msg } from '@lingui/macro'`

หากต้องการทำการครอบ element ด้วยก็ทำการ import `Trans` จาก `@lingui/macro` มาใช้แทน ตามตัวอย่างข้างล่าง

```tsx
<Trans>ทดสอบ <span>Something...</span></Trans>
// OR
<Trans><h1><span>ทดสอบ</span><span>Something...</span></h1></Trans>
```

## Antd Components

### Space 
- โปรเจคนี้เราจะไม่ใช้ Space เพราะมันดันไปเพิ่ม element ที่เป็น item ให้อีกที มองว่าไม่เหมาะ แนะนำว่าควรใช้ tailwind ปั้น FlexBox Layout ขึ้นมาเอง

### Button
- เราจะไม่ import จาก `antd` โดยตรง แต่จะ import ผ่าน base component ในโปคเจคแทน `import Button from '@/components/base/ui/button'`
- สาเหตุ เพราะว่าเราต้องการให้ตัว Button รองรับหลายสี เราจึงทำการสร้าง props ชื่อ `variant` มา และสามารถเลือกใช้สีตามที่กำหนดได้

### Modal
- เราจะไม่ import จาก `antd` โดยตรง แต่จะ import ผ่าน base component ในโปคเจคแทน `import Modal from '@/components/base/ui/modal'`
- สาเหตุ เพราะว่าเราต้องการ Custom ตัว Button เป็นไปตาม design system ของ project นี้

### Tag
- เราจะไม่ import จาก `antd` โดยตรง แต่จะ import ผ่าน base component ในโปคเจคแทน `import Tag from '@/components/base/ui/tag'`
- สามารถใช้ได้ทั้ง variant ที่ custom ขึ้นมา และ color ยังสามารถใช้ได้เหมือนเดิม

## SSR
- สำหรับ App router นั้นหากทำการ fetch data ผ่าน SSR เพื่อนำมาใช้ในหน้าจัดการ แล้วอัพเดทผ่าน CSR อาจจะไม่เหมาะ เพราะจะติดปัญหาตัว router cache ได้
- ณ​ ตอนนี้คิดว่าใช้ CSR ไปก่อน ส่วนในอนาคต หากอยากทำ SSR จริงๆ ต้องใช้ action ในการ handle ปัญหาเหล่านี้แทน
- App router มันพยายามทำ full cache ทำให้ต้องเขียนตาม Pattern ใหม่ของมันให้ได้ `แต่ ณ​ ตอนนี้ ขอให้พอใช้งานได้ไปก่อน แล้วค่อย refactoring ปรับไปใช้ตาม practice อีกที่`

## Commit code type
Easy to commit code via [VSCode Conventional Commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits)

Keep this version for *VSCode Conventional Commits*
```json
"devDependencies": {
  "@commitlint/cli": "^18.6.1",
  "@commitlint/config-conventional": "^18.6.2"
}
```

Must be one of the following:
* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests or correcting existing tests
* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
* **chore**: Other changes that don't modify src or test files
* **revert**: Reverts a previous commit