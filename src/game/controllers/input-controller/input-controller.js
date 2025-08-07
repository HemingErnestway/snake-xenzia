// @ts-check

import { ControllerPlugin } from "./controller-plugin.js";
import { KeyboardPlugin } from "./plugins/keyboard-plugin.js";

export class InputController {
  enabled = true;
  focused = true;
  ACTION_ACTIVATED = "input-controller:action-activated";
  ACTION_DEACTIVATED = "input-controller:action-deactivated";

  /**
   * @typedef {object} Action
   * @property {number[]} keys
   * @property {boolean} enabled
   * @property {boolean} active
   */
  /** @type {Object.<string, Object.<string, Action>>} */
  actions = {};

  /** @type {Object.<string, Object.<string, Set<number>>>} */
  actionKeys = {};

  /** @type {Object.<string, Object>} */
  #actionsToBind = {};

  /** @type {Object.<string, ControllerPlugin>} */
  #plugins = {
    "keys": new KeyboardPlugin(), // default
  };

  /**
   * @param {Object.<string, Object>} actionsToBind
   * @param {HTMLElement | null} characterTarget
   * @param {HTMLElement | null} gameTarget
   */
  constructor(actionsToBind = {}, characterTarget = null, gameTarget = null) {
    this.#actionsToBind = actionsToBind;
    this.bindActions(actionsToBind);

    if (characterTarget && gameTarget) {
      this.attach(characterTarget, gameTarget);
    }
  }

  /**
   * @param {ControllerPlugin[]} plugins
   */
  addPlugins(plugins) {
    plugins.forEach(plugin => {
      this.#plugins[plugin.name] = plugin;
    });
    this.bindActions(this.#actionsToBind);
  }

  /**
   * @param {Object.<string, Object>} actionsToBind
   */
  bindActions(actionsToBind) {
    Object.keys(this.#plugins).forEach(pluginName => {
      Object.keys(actionsToBind).forEach(actionName => {
        if (this.actions[pluginName] === undefined) {
          this.actions[pluginName] = {};
        }

        this.actions[pluginName][actionName] = {
          keys: actionsToBind[actionName][this.#plugins[pluginName].name],
          enabled: actionsToBind[actionName].enabled ?? true,
          active: false,
        };

        if (this.actionKeys[pluginName] === undefined) {
          this.actionKeys[pluginName] = {};
        }

        this.actionKeys[pluginName][actionName] = new Set();
      });

      this.#plugins[pluginName].actionActivated = this.ACTION_ACTIVATED;
      this.#plugins[pluginName].actionDeactivated = this.ACTION_DEACTIVATED;

      this.#plugins[pluginName].initPlugin(this.actions, this.actionKeys);
    });
  }

  /**
   * @param {string} actionName
   */
  enableAction(actionName) {
    Object.keys(this.#plugins).forEach(pluginName => {
      this.#plugins[pluginName].enableAction(actionName);
    });
  }

  /**
   * @param {string} actionName
   */
  disableAction(actionName) {
    Object.keys(this.#plugins).forEach(pluginName => {
      this.#plugins[pluginName].disableAction(actionName);
    });
  }

  #windowFocusHandler = () => this.focused = true;
  #windowUnfocusHandler = () => this.focused = false;

  /**
   * @param {HTMLElement} chracterTarget
   * @param {HTMLElement} gameTarget
   * @param {boolean} dontEnable
   */
  attach(chracterTarget, gameTarget, dontEnable = false) {
    this.enabled = !dontEnable;

    Object.keys(this.#plugins).forEach(pluginName => {
      this.#plugins[pluginName].attachControllerListeners(
        chracterTarget,
        gameTarget,
      );
    });

    window.addEventListener("focus", this.#windowFocusHandler);
    window.addEventListener("blur", this.#windowUnfocusHandler);
  }

  detach() {
    this.enabled = false;

    Object.keys(this.#plugins).forEach(pluginName => {
      this.#plugins[pluginName].detachControllerListeners();
    });

    window.removeEventListener("focus", this.#windowFocusHandler);
    window.removeEventListener("blur", this.#windowUnfocusHandler);
  }

  /**
   * @param {string} actionName
   */
  isActionActive(actionName) {
    return Object.keys(this.#plugins).some(pluginName =>
      this.actions[pluginName][actionName]?.active
    );
  }

  /**
   * @param {number} keyCode
   */
  isKeyPressed(keyCode) {
    return this.#plugins["keys"].isKeyPressed(keyCode);
  }

  getActions() {
    return this.actions["keys"];
  }
}
