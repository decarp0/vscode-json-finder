# Change Log

All notable changes to the **jsonfinder** extension will be documented in this file.  
This project adheres to [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [1.0.2] – 2026-01-07

### Added

- Right‑click context menu action **“Find Usage of Translation Key”** for JSON files.
- Right‑click context menu action **Find JSON key and value by path** for Other files.
- Automatic extraction of full JSON key paths using a robust AST parser (`jsonc-parser`).
- Reverse lookup: search for translation key usage across all workspace files (TS, TSX, JSX, JS, HTML, Vue, etc.).
- Navigation to the first detected usage in code files.

### Changed

- Removed the manual input prompt when searching for key usage.
- Improved JSON key path detection for nested objects and complex structures.
- Replaced line‑based key detection with reliable AST traversal.

## [0.0.3] – 2025-09-03

### Added

- Initial release with command to locate JSON keys by path.
