Image:

```

const preview = require('./fixtures/welcome-cat-preview.txt');

<Image
  src="https://octodex.github.com/images/welcometocat.png"
  alt="Welcometocat"
  preview={preview}
  width={896}
  height={896}
/>
```

Empty Image:
```
<Image
  src={null}
  alt="Empty Image"
  preview={null}
  width={400}
  height={300}
/>
```
