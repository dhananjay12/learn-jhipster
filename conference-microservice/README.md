## Installation

You need jhipster minimum version 7.

## Docker Images

Run the following command inside `gateway` and `conference` folder. Use `dev` profile for local.

```
mvnw package -Pprod verify jib:build
```
If you are getting error, try using

```
mvnw -Pprod package verify jib:dockerBuild -Djib.alwaysCacheBaseImage=true
```
Other errors - https://www.jhipster.tech/docker-compose/#3
