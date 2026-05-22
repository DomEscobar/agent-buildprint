# Product Contract: novel-event-ingestion

The implementation must import exactly ordered chapter fixtures for proof and produce event records that downstream script/storyboard stages can consume.

Required states: empty import, imported, extraction running, success, provider failure, malformed output failure. Failure must not erase prior valid event state.

