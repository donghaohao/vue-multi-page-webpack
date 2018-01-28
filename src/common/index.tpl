<!doctype html>
<html lang="zh-cmn-Hans">
<head>
  <meta charset="utf-8">
  <meta name="format-detection" content="telephone=no, email=no">
  <meta name="description" content="这是一个公有的meta标签">
  <!-- preload -->
  {{#each commonPreload}}
  <link rel="preload" href="{{this}}">
  {{/each}}
  {{#each preload}}
  <link rel="preload" href="{{this}}">
  {{/each}}
  <!-- prefetch -->
  {{#each prefetch}}
  <link rel="prefetch" href="{{this}}">
  {{/each}}
  {{{meta meta}}}
  <title>{{default title ''}}</title>
  <script defer>
    console.log('Hello World)
  </script>
  {{{ inlineStyle }}}
  {{{styles stylesheets}}}
</head>
<body ontouchstart="">
  {{#if body}}
  {{{body}}}
  {{else}}
  <div id="app">
    <!-- shell -->
  </div>
  {{/if}}

  <script defer>
    {{#if preScript}}{{{preScript}}}{{/if}}
  </script>
  <!-- inlineScripts -->
  {{{ inlineVendor }}}

  {{{script commonScripts}}}
  {{{script scripts}}}
</body>
</html>
