# World ID
---------------
---------------

## Getting started

### Project setup
```
yarn | yarn install
```

#### env variables
env-variables is setup by default, just run copy .env-development to .env.development or fill new with .env.example

### Compiles and hot-reloads for development
```
yarn start
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Run unit tests
```
yarn test
```

### Lints release/release candidate version
```
yarn rsc %release-version%
```

### Build docker image with version
```
 docker build --no-cache --progress=plain --build-arg BUILD_VERSION=1.0.0-rc.0 -t react-template .
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE) file for details
