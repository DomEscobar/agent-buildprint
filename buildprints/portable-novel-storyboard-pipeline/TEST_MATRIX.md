# Test Matrix

| Test | Type | Expected |
|---|---|---|
| Import valid chapters | unit/integration | records inserted with pending state |
| Import empty chapter list | unit | explicit validation error |
| Event extractor success | unit | state ready and event text |
| Event extractor failure | unit | state failed and error reason |
| ScriptAgent outline/adaptation/script fixture | integration | workspace and scripts persisted |
| Asset extraction duplicate names | unit | no duplicate assets, links preserved |
| Storyboard panel parse | unit | rows match table count/duration |
| shouldGenerateImage false | unit | row retained, image not generated |
| Image provider failure | unit | media failed state |
| Video prompt generation | unit | track prompt stored |
| Storyboard XML/row parse failure | unit | clear validation error, no partial corrupt rows |
| Repeated extraction retry | integration | failed rows can retry, successful rows remain stable |
| Cancellation/abort | integration | running agent/task stops without corrupting persisted artifacts |
| Deterministic snapshot stability | unit | fixed clock/id generator gives repeatable manifest |
| No-network default test run | static/integration | mock providers only; global fetch/network not used |
| Export package snapshot | integration | manifest includes scripts/assets/storyboards/tracks/media/task log |
| Secrets scan | static | no provider values in package |
| Visual fixture mapping | unit/integration | mock media/assets/storyboard rows resolve local previewUri/thumbnailUri |
| Primary preview composition | browser | timeline, frame thumbnails, selected-shot inspector, and compact media tiles render |
| Debug drawer boundary | browser | raw refs, task log, validation history, and manifest JSON are secondary |
| Completed screenshot QA | browser/static | desktop/mobile screenshots show completed preview state, not empty dashboard |
| Anti-debug UI gate | browser/static | no raw URI table, manifest textarea, or task log dominates primary UI |

