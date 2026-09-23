# Vue Adaptive

Adaptive experience primitives for Vue 3. The library classifies **available space**, not device names, into semantic modes:

- `compact`
- `medium`
- `expanded`

The goal is to let a Vue app behave more like an adaptive native application: bottom navigation in compact spaces, a navigation rail in medium spaces, a sidebar/master-detail layout when expanded, and local components that can recompose themselves without `window.innerWidth` or `isMobile` props.

## Install

Once the repository exists on GitHub:

```bash
npm install github:kevinedgm/vue-adaptive
```

Or, after publishing to npm:

```bash
npm install @kevinedgm/vue-adaptive
```

## Basic usage

```vue
<script setup lang="ts">
import { Adaptive, AdaptiveSwitch } from '@kevinedgm/vue-adaptive'
import BottomNavigation from './BottomNavigation.vue'
import NavigationRail from './NavigationRail.vue'
import Sidebar from './Sidebar.vue'
</script>

<template>
  <Adaptive preset="native-detail">
    <AdaptiveSwitch>
      <template #compact>
        <BottomNavigation />
      </template>

      <template #medium>
        <NavigationRail />
      </template>

      <template #expanded>
        <Sidebar />
      </template>
    </AdaptiveSwitch>

    <RouterView />
  </Adaptive>
</template>
```

`Adaptive` uses `ResizeObserver`, so the decision follows the space actually available to the app/container. An iPad in split view can therefore become `compact` without pretending it magically stopped being an iPad.

## useAdaptive()

```vue
<script setup lang="ts">
import { useAdaptive } from '@kevinedgm/vue-adaptive'

const { size, width, policy, compact, medium, expanded } = useAdaptive()
</script>
```

Use JavaScript adaptation only when behavior truly changes. Prefer intrinsic CSS and container queries for purely visual recomposition.

## Built-in presets

The first version includes:

- `native-detail`
- `directory`
- `form`
- `dashboard`
- `settings`

Example policy for `native-detail`:

| Size | Navigation | Layout | Overlay | Density |
|---|---|---|---|---|
| compact | bottom | single | bottom-sheet | comfortable |
| medium | rail | split | dialog | comfortable |
| expanded | sidebar | master-detail | popover | normal |

## Router governance

Keep Vue Router in your application and use route metadata as the declaration layer:

```ts
const routes = [
  {
    path: '/tinas',
    component: () => import('@/views/TinasView.vue'),
    meta: { adaptive: 'native-detail' },
  },
  {
    path: '/directorio',
    component: () => import('@/views/DirectoryView.vue'),
    meta: { adaptive: 'directory' },
  },
]
```

Then resolve `route.meta.adaptive` at the app shell and pass it as the `preset` to `Adaptive`.

```vue
<Adaptive :preset="route.meta.adaptive ?? 'native-detail'">
  <AppShell />
</Adaptive>
```

This gives the architecture a clear responsibility chain:

```text
Design-system defaults
        ↓
Router preset
        ↓
View override
        ↓
Local component adaptation
```

## Local component adaptation

The same provider can be nested around a local component:

```vue
<Adaptive>
  <ProfessionalCard />
</Adaptive>
```

Inside the card, either consume `useAdaptive()` for behavioral changes or use the `data-adaptive` attribute / container queries for visual changes.

```css
.professional-card {
  display: flex;
  flex-direction: column;
}

[data-adaptive='compact'] .professional-card {
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr);
}
```

## Adaptive typography contract

`Adaptive` publishes these CSS variables:

```css
--adaptive-heading-scale
--adaptive-text-scale
--adaptive-space-scale
```

Typography components remain owners of their design while opting into the context:

```css
.title-page {
  font-size: calc(
    var(--font-page-title) *
    var(--adaptive-heading-scale, 1)
  );
}
```

No `min`, `max`, or device prop is required at the call site.

## AdaptivePane

Use `AdaptivePane` for list/detail experiences:

```vue
<AdaptivePane>
  <template #list>
    <TinasList />
  </template>

  <template #detail>
    <TinaDetail />
  </template>
</AdaptivePane>
```

In `compact`, one pane is shown. In `medium` and `expanded`, list and detail render together.

## Custom policy

```vue
<Adaptive
  :policy="{
    compact: {
      navigation: 'bottom',
      layout: 'single',
      overlay: 'bottom-sheet',
    },
    medium: {
      navigation: 'rail',
      layout: 'split',
      overlay: 'dialog',
    },
    expanded: {
      navigation: 'sidebar',
      layout: 'master-detail',
      overlay: 'popover',
    },
  }"
>
  <App />
</Adaptive>
```

## Custom breakpoints

Defaults:

```text
0–599      compact
600–899    medium
900+       expanded
```

Override them centrally:

```vue
<Adaptive
  :breakpoints="{
    compactMax: 640,
    mediumMax: 960,
  }"
>
  ...
</Adaptive>
```

These are **experience thresholds**, not device detection.

## Design principles

1. Do not detect iPhone/iPad/Android to choose layout.
2. Adapt to available space.
3. Prefer intrinsic CSS before JavaScript.
4. Use container queries for local visual recomposition.
5. Use `Adaptive` when behavior or multiple components need the same semantic size class.
6. Let the AppShell own navigation; let the View own composition; let each component own its internal layout.
7. Avoid maintaining separate Mobile/Tablet/Desktop versions of the same business view unless the product genuinely requires different semantics.

## Development

```bash
npm install
npm run check
```

## Status

`0.1.0` is an intentionally small first version. It provides the adaptive context and policy layer without trying to become a full UI framework. Humanity has enough frameworks already.
