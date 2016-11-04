# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.3.0]
### Changed
- The request body of an expectation is now always interpreted as a string and should be passed as a string to POST `/tests/:testId/expectations`

## [0.2.6] - 2016-10-24
### Changed
- Error `404 Expectation not found in test` now returns property `request` in error body.

## [0.0.1 - 0.2.6]
No changelog
