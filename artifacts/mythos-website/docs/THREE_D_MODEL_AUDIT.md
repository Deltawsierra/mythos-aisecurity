# 3D Model Audit — Athena Shield & Achilles Spear

**Phase:** 5B-3D.0 (audit + optimization prep only — no `/platform` integration)
**Tooling:** `@gltf-transform/cli` v4.4.0 (run via `npx`, not added as a project dependency)

---

## Summary

| Model | Source | Optimized | Reduction |
| --- | --- | --- | --- |
| Athena shield | 55.72 MB | **2.53 MB** | **95.5%** |
| Achilles spear | 33.22 MB | **1.73 MB** | **94.8%** |
| **Combined** | **88.94 MB** | **4.26 MB** | **95.2%** |

Both optimized models land **under the ideal 5–8 MB target**. The entire source
payload was texture data (three 4096×4096 PNGs per model); geometry is light and
was **left untouched** (no decimation). The win came from resizing textures to
2048² and converting them to WebP.

---

## Files

### Source (originals — do not overwrite)
- `public/models/source/AthenaShield3DModel.glb` — 55,722,616 bytes
- `public/models/source/AchillesSpear3DModel.glb` — 33,218,960 bytes

### Optimized (recommended for integration)
- `public/models/optimized/athena-shield.optimized.glb` — 2,534,196 bytes
- `public/models/optimized/achilles-spear.optimized.glb` — 1,725,492 bytes

**Recommended integration paths**
- Athena: `/models/optimized/athena-shield.optimized.glb`
- Achilles: `/models/optimized/achilles-spear.optimized.glb`

(Exposed as `ATHENA_SHIELD_MODEL_PATH` / `ACHILLES_SPEAR_MODEL_PATH` in `lib/three.ts`.)

---

## Inspection (per model)

### Geometry
| | Athena | Achilles |
| --- | --- | --- |
| Meshes | 1 (`node_0`) | 1 (`node_0`) |
| Materials | 1 (`Material.001`) | 1 (`Material.001`) |
| Triangles | 50,000 | 50,000 |
| Vertices | 35,856 | 28,454 |
| Animations | none | none |
| Cameras / lights / extra nodes | none | none |

Geometry is identical before and after optimization — confirmed by re-inspecting
the optimized files. Triangle counts (~50k each, ~100k combined) are well within
real-time budget. `prune` + `dedup` removed nothing meaningful because the source
already contained only a single mesh/material with no unused objects.

### Textures
Source: each model had **3 × 4096×4096 PNG** maps — baseColor, normal, and
packed metallic-roughness — accounting for essentially the whole file size
(Athena ~54 MB of textures, Achilles ~32 MB).

Optimized: same 3 maps, now **2048×2048 WebP**:

| Map | Athena (opt) | Achilles (opt) |
| --- | --- | --- |
| baseColor | 525 KB | 232 KB |
| normal | 367 KB | 229 KB |
| metallicRoughness | 192 KB | 52 KB |

All PBR maps were preserved — metallic/roughness fidelity is intact (no channels
dropped, no maps removed). Resolution was halved to 2048, which is ample for a
hero object viewed at this scale.

### Orientation, centering, scale
- **Up axis:** Y-up (correct), both models stand vertically.
- **Anchor:** base sits at `y = 0` (origin at the bottom of the model), not the
  centroid. For a centered scene, offset by roughly `-0.6` in Y or recenter on
  load (the prepped loader components recenter on the bounding-box centroid).
- **Scale:** reasonable, ~1.18–1.20 world units tall.
  - Athena bbox: X `[-0.588, 0.595]`, Y `[0, 1.183]`, Z `[-0.184, 0.129]` — a
    broad, shallow shield with front/back depth retained; handle/strap geometry
    is part of the single mesh and was **not** removed.
  - Achilles bbox: X `[-0.050, 0.050]`, Y `[0, 1.199]`, Z `[-0.023, 0.023]` — a
    long, thin spear, full end-to-end length preserved (**not** cropped).
- Materials are `doubleSided` (kept as-is so the thin/edge geometry renders from
  all angles).

---

## Performance notes

### Download payload — safe
Combined transfer is **4.26 MB** for both models (WebP is decoded natively by
browsers, so no extra loader/decoder is required). This is comparable to the
existing 13.2 MB homepage crest and well within budget for an on-demand,
desktop-only scene that is not preloaded.

### VRAM — the real constraint
WebP shrinks *download* size, not *GPU memory*. At 2048², each texture occupies
~22 MB of VRAM uncompressed:
- ~67 MB VRAM per model (3 maps), **~134 MB for both on screen at once.**

This is fine for desktop GPUs but is the main risk for low-end / mobile devices.

### Recommendations for integration
- **Production-safe for desktop real-time use:** yes (lazy-loaded, on-demand,
  client-only, not preloaded — same rules as the crest).
- **Disable on mobile:** **recommended.** Serve the static poster / video
  fallback on mobile and below the WebGL/perf threshold (per the existing
  `components/three/README.md` fallback rules), primarily due to VRAM.
- **Pre-rendered video fallback:** recommended as the universal fallback for
  reduced-motion, no-WebGL, and mobile — consistent with the homepage pattern.
- **Optional further passes** (only if a future phase needs them):
  - Drop textures to **1024²** to cut VRAM ~4× (~17 MB/model) if mobile real-time
    is ever required — at some loss of fine metallic detail.
  - **KTX2 / Basis** compression to reduce VRAM *and* download, but this requires
    wiring a KTX2 loader/transcoder into `useGLTF`.
  - **Draco / meshopt** geometry compression was intentionally **skipped** — the
    geometry is already tiny (~1.2–1.45 MB) and skipping it keeps the models
    loadable by `useGLTF` with zero extra decoder setup.

---

## Optimization command used

```bash
npx -y @gltf-transform/cli optimize <source>.glb <optimized>.glb \
  --simplify false \      # no geometry decimation (preserve shield/spear detail)
  --compress false \      # no Draco/meshopt — max loader compatibility
  --texture-compress webp \
  --texture-size 2048
```

No model geometry was simplified, cropped, or decimated. Originals are preserved.

---

## Pre-deploy note (important)

The source models (~89 MB combined) live under `public/`, which Next.js copies
verbatim into the static export. **Before any deploy**, exclude
`public/models/source/` from the shipped build (and ideally from git) so the
89 MB of unused source assets do not bloat the deployment — only the ~4.26 MB
optimized pair should ship.

---

## Status

- Models inspected: 2 — Athena shield, Achilles spear.
- Optimized copies created: 2 — both under the ideal target, verified not corrupt.
- Production-safe (desktop): yes. Mobile fallback: required. Further pass: optional.
- **Not yet integrated into `/platform`** — that is the next phase.
