DROP YOUR 6 HOME-SCREEN TILE ICONS HERE
========================================

The home page (index.html) looks for these exact filenames in this folder.
If a file is missing, a clean flat-color fallback glyph is shown instead —
so the site works fine before you add anything, and upgrades automatically
the moment you drop a file in.

Required filenames (case-sensitive):

  about.png          → "Me" tile
  contact.png        → "Contact" tile
  apps.png           → "Apps" tile
  blog.png           → "Blog" tile
  projects.png       → "Projects" tile
  capabilities.png   → "Capabilities" tile

Recommended spec (matches the iOS-icon look from your reference screenshot):
  • Square image, 512×512px (1024×1024 for retina-sharp results)
  • PNG or JPG
  • Fill the whole square — the site already rounds the corners and adds
    the shadow/border, so don't pre-round or add your own padding
  • Keep the subject centered — the same crop the iOS app icons use

To change a tile's target page or add a 7th tile, edit the SECTIONS array
at the top of js/site-chrome.js — the nav, footer, and this grid all read
from that one place.
