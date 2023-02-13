# Grid

I frequently want to draw something with a grid.  Here's the framework.

## Config

Set grid dimensions/options
```
src/config.ts
```

## Cell

Set `value` to one or more CSS classes to apply.


## Basic
```
src/components/App.tsx
```

`initalCells` sets up the first frame.  When you want to change what is
displayed, use the effect `setCells` to change the grid.

There is a keyhandler that will set the next state to a clear grid as a demo.
