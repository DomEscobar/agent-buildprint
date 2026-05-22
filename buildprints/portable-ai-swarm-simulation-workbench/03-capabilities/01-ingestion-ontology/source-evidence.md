# Source Evidence

The implementation must be source-independent, but these source observations explain why the capability exists.

- /root/MiroFish/README.md:69-77 describes upload of seed materials and prediction requirements as the entry point.
- /root/MiroFish/backend/app/api/graph.py:122-248 implements multipart upload, project creation, text extraction, ontology generation, and response payload.
- /root/MiroFish/backend/app/utils/file_parser.py:61-94 limits parsing to PDF, Markdown, and text.
- /root/MiroFish/backend/app/models/project.py:17-73 defines project status, files, ontology, graph id, requirement, chunk settings, and errors.

Evidence status: `OBSERVED` for cited source surfaces, `INCLUDED_NEEDS_PROOF` for future clean-room implementation readiness.
