Basic IconButton:

    <div>
      <IconButton glyph="attach_file" onClick={() => alert('Clicked')} />
      <IconButton glyph="person_add" onClick={() => alert('Clicked')} />
    </div>

IconButton sizes:

    <div>
      <IconButton glyph="face" size="normal" onClick={() => alert('Clicked')} />
      <IconButton glyph="fingerprint" size="large" onClick={() => alert('Clicked')} />
    </div>

IconButton flat style:

    <div>
      <IconButton glyph="face" size="normal" onClick={() => alert('Clicked')} flat/>
      <IconButton glyph="fingerprint" size="large" onClick={() => alert('Clicked')} flat />
    </div>


Disabled IconButton:

    <div>
      <IconButton glyph="settings" size="normal" disabled />
      <IconButton glyph="search" size="large" disabled />
      <br />
      <IconButton glyph="settings" size="large" flat disabled />
      <IconButton glyph="search" size="normal" flat disabled />
    </div>

