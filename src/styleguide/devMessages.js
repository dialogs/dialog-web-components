import compileMessages from '../utils/compileMessages';

const requireMessages = require.context('../components', true, /l10n\/[A-Za-z]+\.yml$/);

const messages = {};
requireMessages.keys().forEach((pathname) => {
  const [, name, locale] = pathname.match(/([A-Za-z]+)\/l10n\/([A-Za-z]+)\.yml$/);
  if (!messages[locale]) {
    messages[locale] = {};
  }

  Object.assign(messages[locale], compileMessages(name, requireMessages(pathname)));
});

export default messages;
