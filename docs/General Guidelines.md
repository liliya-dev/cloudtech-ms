# General Guidelines

## Typescript

Next.js builds will fail if types are not correct. You can use `npx tsc --noEmit` to check types locally.

## Prettier

Use your editors Prettier extension to format files.

## Preview mode and null checks

Always assume a prop may be missing due to CMS live preview mode. Anything can be missing at all times. That means optional typing obj?: { key?: string } and null checks obj?.key. Don't let preview mode catch you with unchecked props.

## Accessible Radix components

For dropdowns, modals etc we use [Radix](https://www.radix-ui.com/). They are accessible and completely customisable.
