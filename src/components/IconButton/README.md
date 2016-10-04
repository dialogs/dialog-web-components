Basic IconButton:

```
<div>
  <IconButton glyph="attach_file" onClick={() => alert('Clicked')} />
  <IconButton glyph="apple" onClick={() => alert('Clicked')} />
</div>
```

IconButton sizes:

```
<div>
  <IconButton glyph="phone" size="normal" onClick={() => alert('Clicked')} />
  <IconButton glyph="logo" size="large" onClick={() => alert('Clicked')} />
</div>
```

Flat Themed IconButton:

```
<div>
  <IconButton glyph="logo" size="normal" onClick={() => {}} flat theme="default" />
  <IconButton glyph="logo" size="normal" onClick={() => {}} flat theme="primary" />
  <IconButton glyph="logo" size="normal" onClick={() => {}} flat theme="success" />
  <IconButton glyph="logo" size="normal" onClick={() => {}} flat theme="danger" />
  <IconButton glyph="logo" size="normal" onClick={() => {}} flat theme="info" />
  <IconButton glyph="logo" size="normal" onClick={() => {}} flat theme="warning" />
  <br />
  <IconButton glyph="fingerprint" size="large" onClick={() => {}} flat theme="default" />
  <IconButton glyph="fingerprint" size="large" onClick={() => {}} flat theme="primary" />
  <IconButton glyph="fingerprint" size="large" onClick={() => {}} flat theme="success" />
  <IconButton glyph="fingerprint" size="large" onClick={() => {}} flat theme="danger" />
  <IconButton glyph="fingerprint" size="large" onClick={() => {}} flat theme="info" />
  <IconButton glyph="fingerprint" size="large" onClick={() => {}} flat theme="warning" />
</div>
```

Disabled IconButton:

```
<div>
  <IconButton glyph="settings" size="normal" disabled />
  <IconButton glyph="search" size="large" disabled />
  <br />
  <IconButton glyph="search" size="normal" flat disabled />
  <IconButton glyph="settings" size="large" flat disabled />
</div>
```
