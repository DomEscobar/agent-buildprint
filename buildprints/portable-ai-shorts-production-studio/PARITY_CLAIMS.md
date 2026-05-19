# Capability Claims

Use this file and `claims.yaml` whenever describing an implementation result.

## Safe Claims

- Clean-room portable AI shorts studio webapp proof.
- Workflow-shape proof from product URL/manual description to scripts, configuration, generation status, local MP4 result, gallery consent, and publish handoff.
- Contract-parity proof for documented local request/response shapes when tests pass.
- Mocked-provider proof when deterministic adapters are used.
- Local fixture media proof when a playable 1080x1920 MP4 and ffprobe evidence are recorded.
- Consent-gated gallery and mock/manual social handoff payload proof.

## Adapter Claims Only

- Gemini research/analysis/script generation is an adapter claim. Evidence: `saasshorts.py:47-147`, `saasshorts.py:239-365`, `saasshorts.py:368-546`.
- ElevenLabs TTS/voices is an adapter claim. Evidence: `saasshorts.py:757-817`.
- fal.ai/Flux/Hailuo/Kling/VEED generation is an adapter claim. Evidence: `saasshorts.py:553-624`, `saasshorts.py:673-754`, `saasshorts.py:824-945`.
- Upload-Post TikTok/Instagram/YouTube publishing is an adapter claim. Evidence: `app.py:1044-1138`, `app.py:1812-1893`.
- S3 gallery/backup behavior is an adapter claim. Evidence: `s3_uploader.py:16-41`, `s3_uploader.py:87-191`, `s3_uploader.py:193-300`.
- yt-dlp URL download is an adapter claim. Evidence: `main.py:15`, `app.py:1238-1243`.

## Forbidden Wording

Do not call an implementation:

- OpenShorts clone;
- drop-in replacement;
- provider/API parity implementation;
- rendering-quality parity proof;
- social-platform publishing parity proof;
- direct official TikTok/Instagram/YouTube publishing implementation;
- production-ready hosted SaaS;
- public-gallery-safe without privacy/access-control evidence;
- live-provider-ready without sandbox evidence.

## Required Safe Summary

Use wording like:

```txt
This is a clean-room portable AI shorts studio webapp proof. It demonstrates workflow shape, local contracts, deterministic mocked provider adapters, fixture media composition, consent-gated gallery metadata, and mock/manual publish handoff. It does not claim OpenShorts clone status, provider/API parity, rendering-quality parity, live provider success, or social-platform publishing parity.
```
