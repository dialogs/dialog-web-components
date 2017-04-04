Basic IconButton:

```
<div className="styleguide__buttons">
  <IconButton glyph="attach_file" onClick={() => alert('Clicked')} />
  <IconButton glyph="apple" onClick={() => alert('Clicked')} />
</div>
```

IconButton sizes:

```
<div className="styleguide__buttons">
  <IconButton glyph="more_outline" size="normal" onClick={() => alert('Clicked')} />
  <IconButton glyph="phone_outline" size="large" onClick={() => alert('Clicked')} />
</div>
```

Flat Themed IconButton:

```
<div className="styleguide__buttons">
  <IconButton glyph="logo" size="normal" onClick={() => {}} flat theme="default" />
  <IconButton glyph="logo" size="normal" onClick={() => {}} flat theme="primary" />
  <IconButton glyph="logo" size="normal" onClick={() => {}} flat theme="success" />
  <IconButton glyph="logo" size="normal" onClick={() => {}} flat theme="danger" />
  <IconButton glyph="logo" size="normal" onClick={() => {}} flat theme="info" />
  <IconButton glyph="logo" size="normal" onClick={() => {}} flat theme="warning" />
  <br />
  <IconButton glyph="logo" size="large" onClick={() => {}} flat theme="default" />
  <IconButton glyph="logo" size="large" onClick={() => {}} flat theme="primary" />
  <IconButton glyph="logo" size="large" onClick={() => {}} flat theme="success" />
  <IconButton glyph="logo" size="large" onClick={() => {}} flat theme="danger" />
  <IconButton glyph="logo" size="large" onClick={() => {}} flat theme="info" />
  <IconButton glyph="logo" size="large" onClick={() => {}} flat theme="warning" />
</div>
```

Disabled IconButton:

```
<div className="styleguide__buttons">
  <IconButton glyph="attach_file" size="normal" disabled />
  <IconButton glyph="apple" size="large" disabled />
  <br />
  <IconButton glyph="more_outline" size="normal" flat disabled />
  <IconButton glyph="phone_outline" size="large" flat disabled />
</div>
```
