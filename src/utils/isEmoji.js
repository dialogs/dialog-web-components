const pattern = /[\uE000-\uF8FF]|\uD83C|\uD83D/g;

function isEmoji(text) {
  return pattern.test(text);
}

export default isEmoji;
