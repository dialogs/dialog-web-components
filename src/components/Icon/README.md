Basic Icon:

```
<div>
  <Icon glyph="add_member" />
  <Icon glyph="apple" />
  <Icon glyph="android" />
  <Icon glyph="arrow_back" />
  <Icon glyph="arrow_drop_up" />
  <Icon glyph="arrow_drop_down" />
  <Icon glyph="arrow_up" />
  <Icon glyph="arrow_down" />
  <Icon glyph="attach_file" />
  <Icon glyph="call" />
  <Icon glyph="call_end" />
  <Icon glyph="channel" />
  <Icon glyph="close" />
  <Icon glyph="done" />
  <Icon glyph="delete" />
  <Icon glyph="emoji" />
  <Icon glyph="emoji_activity" />
  <Icon glyph="emoji_flag" />
  <Icon glyph="emoji_food" />
  <Icon glyph="emoji_nature" />
  <Icon glyph="emoji_party" />
  <Icon glyph="emoji_smile" />
  <Icon glyph="emoji_symbols" />
  <Icon glyph="emoji_travel" />
  <Icon glyph="edit" />
  <Icon glyph="error" />
  <Icon glyph="file_download" />
  <Icon glyph="star" />
  <Icon glyph="star_outline" />
  <Icon glyph="finder" />
  <Icon glyph="group" />
  <Icon glyph="info" />
  <Icon glyph="keyboard_arrow_down" />
  <Icon glyph="keyboard_arrow_up" />
  <Icon glyph="keyboard_arrow_left" />
  <Icon glyph="keyboard_arrow_right" />
  <Icon glyph="link" />
  <Icon glyph="lock" />
  <Icon glyph="logo" />
  <Icon glyph="mail_outline" />
  <Icon glyph="mic" />
  <Icon glyph="mic_material" />
  <Icon glyph="mic_material_off" />
  <Icon glyph="minimize" />
  <Icon glyph="maximize" />
  <Icon glyph="message" />
  <Icon glyph="more" />
  <Icon glyph="more_outline" />
  <Icon glyph="notifications" />
  <Icon glyph="person" />
  <Icon glyph="phone_outline" />
  <Icon glyph="photo_camera" />
  <Icon glyph="plus" />
  <Icon glyph="plus_outline" />
  <Icon glyph="reply" />
  <Icon glyph="schedule" />
  <Icon glyph="search" />
  <Icon glyph="send" />
  <Icon glyph="tux" />
  <Icon glyph="windows" />
</div>
```

Themed Icons:

```
<div>
  <Icon glyph="logo" theme="primary" />
  <Icon glyph="done" theme="success" />
  <Icon glyph="phone_outline" theme="danger" />
  <Icon glyph="call" theme="info" />
  <Icon glyph="close" theme="warning" />
</div>
```

Inverted Icon:

```
<div>
  <Icon glyph="logo" theme="primary" inverted />
  <Icon glyph="done" theme="success" inverted />
  <Icon glyph="call_end" theme="danger" inverted />
  <Icon glyph="link" theme="info" inverted />
  <Icon glyph="close" theme="warning" inverted />
</div>
```

Sizable icon:

```
<div>
  <Icon glyph="logo" theme="primary" size="small" />
  <Icon glyph="done" theme="success" size="small" inverted />
  <Icon glyph="notifications" theme="info" />
  <Icon glyph="call" theme="danger" inverted />
  <Icon glyph="plus_outline" theme="info" size="large" />
  <Icon glyph="link" theme="warning" size={60} inverted />
</div>
```

Clickable Icon:

```
<div>
  <Icon glyph="logo" theme="primary" inverted onClick={() => {}} />
  <Icon glyph="done" theme="success" onClick={() => {}} />
  <Icon glyph="notifications" theme="danger" inverted onClick={() => {}} />
  <Icon glyph="phone_outline" theme="info" size="large" onClick={() => {}} />
  <Icon glyph="person" theme="warning" size="large" inverted onClick={() => {}} />
</div>
```
