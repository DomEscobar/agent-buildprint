# Design Quality Lift Receipt

direction_profile_locked: clean-minimal
three_dials_recorded:
  DESIGN_VARIANCE: 5
  MOTION_INTENSITY: 3
  VISUAL_DENSITY: 3
before_after_screenshots:
  - before: .buildprint/screenshots/before/home.png
    after: .buildprint/screenshots/after/home.png
lighthouse_audit:
  score: 100
  command: fixture
axe_audit:
  serious_or_critical: 0
  command: fixture
microcopy_inventory:
  - surface: home
    voice: direct
motion_inventory:
  - token: motion-fast
    duration: 120ms
    easing: ease-out
icon_library_inventory:
  - phosphor
typography_pairing_recorded:
  display: Geist
  body: Geist
  mono: Geist Mono
signature_moment_proof:
  type: fixture
visual_risk_budget_audit:
  used:
    - asymmetric_grid_in_one_section
banned_defaults_audit:
  status: pass
