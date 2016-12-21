# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.3.2]
### Changed
- GET `/tests/:testId` now returns the property `requests` for additional information about the consumed requests, e.g. the request body.

## [0.3.1]
### Changed
- The request body of an expectation is now always interpreted as a string and should be passed as a string to POST `/tests/:testId/expectations`

## [0.3.0]
- Accidentally published wrong package, unpublished, use 0.3.1

## [0.2.8] - 2016-10-26
### Changed
- Prepublish now also runs test suite
- Revert decodeURI; enforce user specifies exact URL that should match (including encoded chars)

## [0.2.7] - 2016-10-25
### Changed
- Compares decoded uri's rather than plain uri's
- Remove redundant dependencies

## [0.2.6] - 2016-10-24
### Changed
- Error `404 Expectation not found in test` now returns property `request` in error body.

## [0.0.1 - 0.2.6]
No changelog
