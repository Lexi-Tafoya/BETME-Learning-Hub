Motion in this build is CSS-driven and lives in stage.css:
  .world transform    camera flight between scenes (1050ms, cubic-bezier(.62,.02,.2,1))
  [data-rv]           layered reveals inside a scene (720ms)
  .scene opacity      focus shift between neighbouring scenes
  .assy .pill.in      framework assembly as each dimension is opened
  .row-bar i          chart bars growing from zero
journey-pulse.svg is a standalone SVG/SMIL landmark pulse, available if a section
marker needs emphasis. Nothing here depends on a JavaScript animation library.
