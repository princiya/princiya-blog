---
title: How to know if you are writing integration tests or end to end tests
date: '2020-07-22'
spoiler: Unit tests vs Integration tests vs End to end tests
cta: 'testing'
---

- **Unit tests**: Unit tests are atomic. They are within the scope of one component or action or reducer or saga and do not go beyond the scope of this atomic component.
  - Example: Unit tests do not involve `reducer && saga` being tested together or `component && action && reducer && saga` being tested together.
- **Integrationg tests**: Integration tests are an extension of unit tests and involve integrating multiple components.
  - Example: component click on button -> throws an action -> watched by the saga -> calls an api endpoint (mocked) -> modify reducers state -> changes something on the same or another component.
- **End to end tests**: We use Cypress for end to end testing where we test the end results like how an external user with interact with our system / UI.

## Resources

- https://twitter.com/carolstran/status/1194647777143349248
- https://kentcdodds.com/blog/unit-vs-integration-vs-e2e-tests