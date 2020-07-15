---
title: Introduction to contract tests
date: '2020-07-15'
spoiler: An introduction to contract tests and comparison with integration tests
cta: 'testing'
---

## Context

It became evident to the Frontend team that [Swagger](https://swagger.io/) documentation alone will not suffice due to the following:

- Properties from the api response get added / removed / updated
- There is no way to inform the stakeholders (FE in our case) about the above change

Due to these reasons, we want to test an integration point by checking each application (BE or FE) in isolation to ensure the messages it sends or receives conform to a shared understanding that is documented in a "contract".

_In simple terms, we want to test the integration point with our BE API client to ensure it sends HTTP response or receives HTTP requests from our web or mobile front-end conforms to a shared understanding that is documented in a "contract"._

## Terminology

- **Consumer** --> The one who consumes the information
- **Provider** --> The one who provids the information

It's interesting to note that, contract tests enable testing of applications from either ways.

**Example:** The backend can be contract tested with a mock frontend and viceversa. Both the backend and frontend can interchange and act as the consumer or the provider.

The contract is generated during the execution of the automated tests. The **consumer generates contract files** during the execution of its isolated tests. The **provider generates verification results** during the execution of its isolated tests. These artifacts need to be shared between projects and people.

## Decision

We will use [Pact](https://pact.io) as the contract test framework.

## Consequences

- Enable FE teams to (sometimes) work ahead while the BE API is still being developed
- The consumer and provider are both under active development
- Contract tests execute faster than the integration tests and will tell which versions of our applications can be deployed safely together
- We can find out before we deploy whether or not our applications will work together, i.e. this version of FE against a given version of BE; and there is no need to wait for slow e2e tests