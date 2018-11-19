# pathy

## Install

```sh
yarn global add @chuunibyou/pathy
```

## Usage

```javascript
const path = require('path')
const { mkdir, echo } = require('@chuunibyou/pathy')

mkdir(path.resolve()).and(
  mkdir('src').and(
    echo('Hello World!', 'foo'),
    echo('', 'bar')
      .if(true)
  )
).do()
```

## Contributing

1. Fork it.
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request :D

## Author

**@chuunibyou/emiya** © [taugocauci](https://github.com/2zh), Released under the [MIT](./LICENSE) License.

> [github.com/2zh](https://github.com/2zh) · GitHub [@taugocauci](https://github.com/2zh) · Twitter [@taugocauci](https://twitter.com/taugocauci)
