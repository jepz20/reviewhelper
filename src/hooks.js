import { useEffect } from 'react';

const _activeElementAcceptsInput = () => {
  var activeElement = document.activeElement;
  var inputs = ['input', 'select', 'button', 'textarea'];

  return (
    !!activeElement && inputs.includes(activeElement.tagName.toLowerCase())
  );
};

export const useGlobalCtrlShortcut = (key, fn) => {
  useGlobalShortcut(key, 'ctrlKey', false, fn);
};

export const useGlobalSingleKeyShortcut = (key, fn) => {
  useGlobalShortcut(key, undefined, true, fn);
};

export const useGlobalShortcut = (key, modifier, avoidInput, fn) => {
  useEffect(() => {
    const shortcutHandler = ev => {
      if (avoidInput && _activeElementAcceptsInput()) {
        return;
      }
      const matchModifier = modifier ? ev[modifier] : true;
      if (ev.key == key && matchModifier) {
        fn();
        ev.preventDefault();
      }
    };
    document.addEventListener('keydown', shortcutHandler);
    return () => document.removeEventListener('keydown', shortcutHandler);
  }, []);
};
