/*!
 *
 * The MIT License (MIT)
 *
 * Copyright © 2025 Taufik Nurrohman <https://github.com/taufik-nurrohman>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the “Software”), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */
(function (g, f) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = f() : typeof define === 'function' && define.amd ? define(f) : (g = typeof globalThis !== 'undefined' ? globalThis : g || self, g.QuantityPicker = f());
})(this, (function () {
    'use strict';

    function _arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
    }

    function _arrayWithHoles(r) {
        if (Array.isArray(r)) return r;
    }

    function _iterableToArrayLimit(r, l) {
        var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
        if (null != t) {
            var e,
                n,
                i,
                u,
                a = [],
                f = true,
                o = false;
            try {
                if (i = (t = t.call(r)).next, 0 === l) {
                    if (Object(t) !== t) return;
                    f = !1;
                } else
                    for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
            } catch (r) {
                o = true, n = r;
            } finally {
                try {
                    if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
                } finally {
                    if (o) throw n;
                }
            }
            return a;
        }
    }

    function _maybeArrayLike(r, a, e) {
        if (a && !Array.isArray(a) && "number" == typeof a.length) {
            var y = a.length;
            return _arrayLikeToArray(a, void 0 !== e && e < y ? e : y);
        }
        return r(a, e);
    }

    function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function _slicedToArray(r, e) {
        return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
    }

    function _unsupportedIterableToArray(r, a) {
        if (r) {
            if ("string" == typeof r) return _arrayLikeToArray(r, a);
            var t = {}.toString.call(r).slice(8, -1);
            return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
        }
    }
    var isArray = function isArray(x) {
        return Array.isArray(x);
    };
    var isBoolean = function isBoolean(x) {
        return false === x || true === x;
    };
    var isDefined = function isDefined(x) {
        return 'undefined' !== typeof x;
    };
    var isFunction = function isFunction(x) {
        return 'function' === typeof x;
    };
    var isInstance = function isInstance(x, of, exact) {
        if (!x || 'object' !== typeof x) {
            return false;
        }
        if (exact) {
            return isSet(of) && isSet(x.constructor) && of === x.constructor;
        }
        return isSet(of) && x instanceof of ;
    };
    var isInteger = function isInteger(x) {
        return isNumber(x) && 0 === x % 1;
    };
    var isNull = function isNull(x) {
        return null === x;
    };
    var isNumber = function isNumber(x) {
        return 'number' === typeof x && !Number.isNaN(x);
    };
    var isNumeric = function isNumeric(x) {
        return /^[+-]?(?:\d*\.)?\d+$/.test(x + "");
    };
    var isObject = function isObject(x, isPlain) {
        if (isPlain === void 0) {
            isPlain = true;
        }
        if (!x || 'object' !== typeof x) {
            return false;
        }
        return isPlain ? isInstance(x, Object, 1) : true;
    };
    var isSet = function isSet(x) {
        return isDefined(x) && !isNull(x);
    };
    var isString = function isString(x) {
        return 'string' === typeof x;
    };
    var hasValue = function hasValue(x, data) {
        return -1 !== data.indexOf(x);
    };
    var _fromStates = function fromStates() {
        for (var _len = arguments.length, lot = new Array(_len), _key = 0; _key < _len; _key++) {
            lot[_key] = arguments[_key];
        }
        var out = lot.shift();
        for (var i = 0, j = toCount(lot); i < j; ++i) {
            for (var k in lot[i]) {
                // Assign value
                if (!isSet(out[k])) {
                    out[k] = lot[i][k];
                    continue;
                }
                // Merge array
                if (isArray(out[k]) && isArray(lot[i][k])) {
                    out[k] = [ /* Clone! */ ].concat(out[k]);
                    for (var ii = 0, jj = toCount(lot[i][k]); ii < jj; ++ii) {
                        if (!hasValue(lot[i][k][ii], out[k])) {
                            out[k].push(lot[i][k][ii]);
                        }
                    }
                    // Merge object recursive
                } else if (isObject(out[k]) && isObject(lot[i][k])) {
                    out[k] = _fromStates({
                        /* Clone! */ }, out[k], lot[i][k]);
                    // Replace value
                } else {
                    out[k] = lot[i][k];
                }
            }
        }
        return out;
    };
    var _fromValue = function fromValue(x) {
        if (isArray(x)) {
            return x.map(function (v) {
                return _fromValue(x);
            });
        }
        if (isObject(x)) {
            for (var k in x) {
                x[k] = _fromValue(x[k]);
            }
            return x;
        }
        if (false === x) {
            return 'false';
        }
        if (null === x) {
            return 'null';
        }
        if (true === x) {
            return 'true';
        }
        return "" + x;
    };
    var toCaseCamel = function toCaseCamel(x) {
        return x.replace(/[-_.](\w)/g, function (m0, m1) {
            return toCaseUpper(m1);
        });
    };
    var toCaseLower = function toCaseLower(x) {
        return x.toLowerCase();
    };
    var toCaseUpper = function toCaseUpper(x) {
        return x.toUpperCase();
    };
    var toCount = function toCount(x) {
        return x.length;
    };
    var toJSON = function toJSON(x) {
        return JSON.stringify(x);
    };
    var toNumber = function toNumber(x, base) {
        if (base === void 0) {
            base = 10;
        }
        return base ? parseInt(x, base) : parseFloat(x);
    };
    var toString = function toString(x, base) {
        return isNumber(x) ? x.toString(base) : "" + x;
    };
    var _toValue = function toValue(x) {
        if (isArray(x)) {
            return x.map(function (v) {
                return _toValue(v);
            });
        }
        if (isObject(x)) {
            for (var k in x) {
                x[k] = _toValue(x[k]);
            }
            return x;
        }
        if (isString(x) && isNumeric(x)) {
            if ('0' === x[0] && -1 === x.indexOf('.')) {
                return x;
            }
            return toNumber(x);
        }
        if ('false' === x) {
            return false;
        }
        if ('null' === x) {
            return null;
        }
        if ('true' === x) {
            return true;
        }
        return x;
    };
    var forEachArray = function forEachArray(array, at) {
        for (var i = 0, j = toCount(array), v; i < j; ++i) {
            v = at.call(array, array[i], i);
            if (-1 === v) {
                array.splice(i, 1);
                continue;
            }
            if (0 === v) {
                break;
            }
            if (1 === v) {
                continue;
            }
        }
        return array;
    };
    var forEachObject = function forEachObject(object, at) {
        var v;
        for (var k in object) {
            v = at.call(object, object[k], k);
            if (-1 === v) {
                delete object[k];
                continue;
            }
            if (0 === v) {
                break;
            }
            if (1 === v) {
                continue;
            }
        }
        return object;
    };
    var getPrototype = function getPrototype(of) {
        return of.prototype;
    };
    var getReference = function getReference(key) {
        return getValueInMap(key, references) || null;
    };
    var getValueInMap = function getValueInMap(k, map) {
        return map.get(k);
    };
    var setObjectAttributes = function setObjectAttributes(of, attributes, asStaticAttributes) {
        if (!asStaticAttributes) {
            of = getPrototype(of);
        }
        return forEachObject(attributes, function (v, k) {
            Object.defineProperty(of, k, v);
        }), of;
    };
    var setObjectMethods = function setObjectMethods(of, methods, asStaticMethods) {
        {
            of = getPrototype(of);
        }
        return forEachObject(methods, function (v, k) {
            of [k] = v;
        }), of;
    };
    var setPrototype = function setPrototype(of, value) {
        return of.prototype = value;
    };
    var setReference = function setReference(key, value) {
        return setValueInMap(key, value, references);
    };
    var setValueInMap = function setValueInMap(k, v, map) {
        return map.set(k, v);
    };
    var references = new WeakMap();

    function _toArray$1(iterable) {
        return Array.from(iterable);
    }
    var D = document;
    var W = window;
    var R = D.documentElement;
    var getAttribute = function getAttribute(node, attribute, parseValue) {
        if (parseValue === void 0) {
            parseValue = true;
        }
        if (!hasAttribute(node, attribute)) {
            return null;
        }
        var value = node.getAttribute(attribute);
        return parseValue ? _toValue(value) : value;
    };
    var getChildFirst = function getChildFirst(parent, anyNode) {
        return parent['first' + (anyNode ? "" : 'Element') + 'Child'] || null;
    };
    var getChildren = function getChildren(parent, index, anyNode) {
        var children = _toArray$1(parent['child' + ('Nodes')]);
        return isNumber(index) ? children[index] || null : children;
    };
    var getElement = function getElement(query, scope) {
        return (scope || D).querySelector(query);
    };
    var getID = function getID(node, batch) {
        if (batch === void 0) {
            batch = 'e:';
        }
        if (hasID(node)) {
            return getAttribute(node, 'id');
        }
        if (!isSet(theID[batch])) {
            theID[batch] = 0;
        }
        return batch + toString(Date.now() + (theID[batch] += 1), 16);
    };
    var getName = function getName(node) {
        return toCaseLower(node && node.nodeName || "") || null;
    };
    var getParent = function getParent(node, query) {
        if (query) {
            return node.closest(query) || null;
        }
        return node.parentNode || null;
    };
    var getParentForm = function getParentForm(node) {
        var state = 'form';
        if (hasState(node, state) && state === getName(node[state])) {
            return node[state];
        }
        return getParent(node, state);
    };
    var getText = function getText(node, trim) {
        if (trim === void 0) {
            trim = true;
        }
        var state = 'textContent';
        if (!hasState(node, state)) {
            return false;
        }
        var content = node[state];
        content = trim ? content.trim() : content;
        return "" !== content ? content : null;
    };
    var getType = function getType(node) {
        return node && node.nodeType || null;
    };
    var getValue = function getValue(node, parseValue) {
        var value = (node.value || "").replace(/\r?\n|\r/g, '\n');
        value = value;
        return "" !== value ? value : null;
    };
    var hasAttribute = function hasAttribute(node, attribute) {
        return node.hasAttribute(attribute);
    };
    var hasID = function hasID(node) {
        return hasAttribute(node, 'id');
    };
    var hasState = function hasState(node, state) {
        return state in node;
    };
    var isDisabled = function isDisabled(node) {
        return node.disabled;
    };
    var isReadOnly = function isReadOnly(node) {
        return node.readOnly;
    };
    var isRequired = function isRequired(node) {
        return node.required;
    };
    var letAria = function letAria(node, aria) {
        return letAttribute(node, 'aria-' + aria);
    };
    var letAttribute = function letAttribute(node, attribute) {
        return node.removeAttribute(attribute), node;
    };
    var letClass = function letClass(node, value) {
        return node.classList.remove(value), node;
    };
    var letDatum = function letDatum(node, datum) {
        return letAttribute(node, 'data-' + datum);
    };
    var letElement = function letElement(node) {
        var parent = getParent(node);
        return node.remove(), parent;
    };
    var letHTML = function letHTML(node) {
        var state = 'innerHTML';
        return hasState(node, state) && (node[state] = ""), node;
    };
    var letStyle = function letStyle(node, style) {
        return node.style[toCaseCamel(style)] = null, node;
    };
    var setAria = function setAria(node, aria, value) {
        return setAttribute(node, 'aria-' + aria, true === value ? 'true' : value);
    };
    var setArias = function setArias(node, data) {
        return forEachObject(data, function (v, k) {
            v || "" === v || 0 === v ? setAria(node, k, v) : letAria(node, k);
        }), node;
    };
    var setAttribute = function setAttribute(node, attribute, value) {
        if (true === value) {
            value = attribute;
        }
        return node.setAttribute(attribute, _fromValue(value)), node;
    };
    var setAttributes = function setAttributes(node, attributes) {
        return forEachObject(attributes, function (v, k) {
            if ('aria' === k && isObject(v)) {
                return setArias(node, v), 1;
            }
            if ('class' === k) {
                return setClasses(node, v), 1;
            }
            if ('data' === k && isObject(v)) {
                return setData(node, v), 1;
            }
            if ('style' === k && isObject(v)) {
                return setStyles(node, v), 1;
            }
            v || "" === v || 0 === v ? setAttribute(node, k, v) : letAttribute(node, k);
        }), node;
    };
    var setChildLast = function setChildLast(parent, node) {
        return parent.append(node), node;
    };
    var setClass = function setClass(node, value) {
        return node.classList.add(value), node;
    };
    var setClasses = function setClasses(node, classes) {
        if (isArray(classes)) {
            return forEachArray(classes, function (k) {
                return setClass(node, k);
            }), node;
        }
        if (isObject(classes)) {
            return forEachObject(classes, function (v, k) {
                return v ? setClass(node, k) : letClass(node, k);
            }), node;
        }
        return node.className = classes, node;
    };
    var setData = function setData(node, data) {
        return forEachObject(data, function (v, k) {
            v || "" === v || 0 === v ? setDatum(node, k, v) : letDatum(node, k);
        }), node;
    };
    var setDatum = function setDatum(node, datum, value) {
        if (isArray(value) || isObject(value)) {
            value = toJSON(value);
        }
        return setAttribute(node, 'data-' + datum, true === value ? 'true' : value);
    };
    var setElement = function setElement(node, content, attributes, options) {
        node = isString(node) ? D.createElement(node, isString(options) ? {
            is: options
        } : options) : node;
        if (isArray(content) && toCount(content)) {
            letHTML(node);
            forEachArray(content, function (v) {
                return setChildLast(isString(v) ? setElementText(v) : v);
            });
        } else if (isObject(content)) {
            attributes = content;
            content = false;
        }
        if (isString(content)) {
            setHTML(node, content);
        }
        if (isObject(attributes)) {
            return setAttributes(node, attributes), node;
        }
        return node;
    };
    var setElementText = function setElementText(text) {
        return isString(text) ? text = D.createTextNode(text) : text, text;
    };
    var setHTML = function setHTML(node, content, trim) {
        if (trim === void 0) {
            trim = true;
        }
        if (null === content) {
            return node;
        }
        var state = 'innerHTML';
        return hasState(node, state) && (node[state] = trim ? content.trim() : content), node;
    };
    var setID = function setID(node, value, batch) {
        if (batch === void 0) {
            batch = 'e:';
        }
        return setAttribute(node, 'id', isSet(value) ? value : getID(node, batch));
    };
    var setNext = function setNext(current, node) {
        return current.after(node), node;
    };
    var setStyle = function setStyle(node, style, value) {
        if (isNumber(value)) {
            value += 'px';
        }
        return node.style[toCaseCamel(style)] = _fromValue(value), node;
    };
    var setStyles = function setStyles(node, styles) {
        return forEachObject(styles, function (v, k) {
            v || "" === v || 0 === v ? setStyle(node, k, v) : letStyle(node, k);
        }), node;
    };
    var setText = function setText(node, content, trim) {
        if (trim === void 0) {
            trim = true;
        }
        if (null === content) {
            return node;
        }
        var state = 'textContent';
        return hasState(node, state) && (node[state] = trim ? content.trim() : content), node;
    };
    var setValue = function setValue(node, value) {
        if (null === value) {
            return letAttribute(node, 'value');
        }
        return node.value = _fromValue(value), node;
    };
    var theID = {};
    var _getSelection = function _getSelection() {
        return D.getSelection();
    };
    var _setRange = function _setRange() {
        return D.createRange();
    };
    // <https://stackoverflow.com/a/6691294/1163000>
    // The `node` parameter is currently not in use
    var insertAtSelection = function insertAtSelection(node, content, mode, selection) {
        selection = selection || _getSelection();
        var from, range, to;
        if (selection.rangeCount) {
            range = selection.getRangeAt(0);
            range.deleteContents();
            to = D.createDocumentFragment();
            var nodeCurrent, nodeFirst, nodeLast;
            if (isString(content)) {
                from = setElement('div');
                setHTML(from, content);
                while (nodeCurrent = getChildFirst(from, 1)) {
                    nodeLast = setChildLast(to, nodeCurrent);
                }
            } else if (isArray(content)) {
                forEachArray(content, function (v) {
                    return nodeLast = setChildLast(to, v);
                });
            } else {
                nodeLast = setChildLast(to, content);
            }
            nodeFirst = getChildFirst(to, 1);
            range.insertNode(to);
            if (nodeLast) {
                range = range.cloneRange();
                range.setStartAfter(nodeLast);
                range.setStartBefore(nodeFirst);
                setSelection(node, range, selectToNone(selection));
            }
        }
        return selection;
    };
    // The `node` parameter is currently not in use
    var letSelection = function letSelection(node, selection) {
        selection = selection || _getSelection();
        return selection.empty(), selection;
    };
    // <https://stackoverflow.com/a/13950376/1163000>
    var restoreSelection = function restoreSelection(node, store, selection) {
        var index = 0,
            range = _setRange();
        range.setStart(node, 0);
        range.collapse(true);
        var exit,
            hasStart,
            nodeCurrent,
            nodeStack = [node];
        while (!exit && (nodeCurrent = nodeStack.pop())) {
            if (3 === getType(nodeCurrent)) {
                var indexNext = index + toCount(nodeCurrent);
                if (!hasStart && store[0] >= index && store[0] <= indexNext) {
                    range.setStart(nodeCurrent, store[0] - index);
                    hasStart = true;
                }
                if (hasStart && store[1] >= index && store[1] <= indexNext) {
                    exit = true;
                    range.setEnd(nodeCurrent, store[1] - index);
                }
                index = indexNext;
            } else {
                forEachArray(getChildren(nodeCurrent, null), function (v) {
                    return nodeStack.push(v);
                });
            }
        }
        return setSelection(node, range, letSelection(node, selection));
    };
    var selectTo = function selectTo(node, mode, selection) {
        selection = selection || _getSelection();
        letSelection(node, selection);
        var range = _setRange();
        range.selectNodeContents(node);
        selection = setSelection(node, range, selection);
        if (1 === mode) {
            selection.collapseToEnd();
        } else if (-1 === mode) {
            selection.collapseToStart();
        } else;
    };
    var selectToNone = function selectToNone(selection) {
        selection = selection || _getSelection();
        // selection.removeAllRanges();
        if (selection.rangeCount) {
            selection.removeRange(selection.getRangeAt(0));
        }
        return selection;
    };
    // The `node` parameter is currently not in use
    var setSelection = function setSelection(node, range, selection) {
        selection = selection || _getSelection();
        if (isArray(range)) {
            return restoreSelection(node, range, selection);
        }
        return selection.addRange(range), selection;
    };

    function _toArray(iterable) {
        return Array.from(iterable);
    }
    var clearTimeout = W.clearTimeout,
        setTimeout = W.setTimeout; // For better minification
    var delay = function delay(task, time) {
        var stickyTime = isInteger(time) && time >= 0,
            timer;
        return [function () {
            var _this2 = this;
            var lot = _toArray(arguments);
            if (!stickyTime) {
                time = lot.shift();
            }
            timer = setTimeout(function () {
                return task.apply(_this2, lot);
            }, time);
        }, function () {
            timer && clearTimeout(timer);
        }];
    };
    var repeat = function repeat(task, start, step) {
        var stickyStart = isInteger(start) && start >= 0,
            stickyStep = isInteger(step) && step >= 0,
            timerToRepeat,
            timerToStart;
        return [function () {
            var _this3 = this;
            var lot = _toArray(arguments);
            if (!stickyStart) {
                start = lot.shift();
            }
            if (!stickyStep) {
                step = lot.shift();
            }
            var _r = function r() {
                task.apply(_this3, lot);
                timerToRepeat = setTimeout(_r, step);
            };
            if (start > 0) {
                timerToStart = setTimeout(_r, start);
            } else {
                _r();
            }
        }, function () {
            timerToRepeat && clearTimeout(timerToRepeat);
            timerToStart && clearTimeout(timerToStart);
        }];
    };

    function hook($, $$) {
        $$ = $$ || $;
        $$.fire = function (event, data, that) {
            var $ = this,
                hooks = $.hooks;
            if (!isSet(hooks[event])) {
                return $;
            }
            return forEachArray(hooks[event], function (v) {
                v.apply(that || $, data);
            }), $;
        };
        $$.off = function (event, task) {
            var $ = this,
                hooks = $.hooks;
            if (!isSet(event)) {
                return hooks = {}, $;
            }
            if (isSet(hooks[event])) {
                if (isSet(task)) {
                    var j = toCount(hooks[event]);
                    // Clean-up empty hook(s)
                    if (0 === j) {
                        delete hooks[event];
                    } else {
                        for (var i = 0; i < j; ++i) {
                            if (task === hooks[event][i]) {
                                hooks[event].splice(i, 1);
                                break;
                            }
                        }
                    }
                } else {
                    delete hooks[event];
                }
            }
            return $;
        };
        $$.on = function (event, task) {
            var $ = this,
                hooks = $.hooks;
            if (!isSet(hooks[event])) {
                hooks[event] = [];
            }
            if (isSet(task)) {
                hooks[event].push(task);
            }
            return $;
        };
        return $.hooks = {}, $;
    }
    var offEvent = function offEvent(name, node, then) {
        node.removeEventListener(name, then);
    };
    var offEventDefault = function offEventDefault(e) {
        return e && e.preventDefault();
    };
    var onEvent = function onEvent(name, node, then, options) {
        if (options === void 0) {
            options = false;
        }
        node.addEventListener(name, then, options);
    };
    var EVENT_DOWN = 'down';
    var EVENT_UP = 'up';
    var EVENT_BLUR = 'blur';
    var EVENT_CUT = 'cut';
    var EVENT_FOCUS = 'focus';
    var EVENT_INPUT = 'input';
    var EVENT_INPUT_START = 'before' + EVENT_INPUT;
    var EVENT_INVALID = 'invalid';
    var EVENT_KEY = 'key';
    var EVENT_KEY_DOWN = EVENT_KEY + EVENT_DOWN;
    var EVENT_MOUSE = 'mouse';
    var EVENT_MOUSE_DOWN = EVENT_MOUSE + EVENT_DOWN;
    var EVENT_MOUSE_UP = EVENT_MOUSE + EVENT_UP;
    var EVENT_PASTE = 'paste';
    var EVENT_RESET = 'reset';
    var EVENT_SUBMIT = 'submit';
    var EVENT_TOUCH = 'touch';
    var EVENT_TOUCH_END = EVENT_TOUCH + 'end';
    var EVENT_TOUCH_START = EVENT_TOUCH + 'start';
    var EVENT_WHEEL = 'wheel';
    var KEY_DOWN = 'Down';
    var KEY_LEFT = 'Left';
    var KEY_UP = 'Up';
    var KEY_A = 'a';
    var KEY_ARROW = 'Arrow';
    var KEY_ARROW_DOWN = KEY_ARROW + KEY_DOWN;
    var KEY_ARROW_LEFT = KEY_ARROW + KEY_LEFT;
    var KEY_ARROW_UP = KEY_ARROW + KEY_UP;
    var KEY_ENTER = 'Enter';
    var KEY_PAGE = 'Page';
    var KEY_PAGE_DOWN = KEY_PAGE + KEY_DOWN;
    var KEY_PAGE_UP = KEY_PAGE + KEY_UP;
    var KEY_TAB = 'Tab';
    var TOKEN_CONTENTEDITABLE = 'contenteditable';
    var TOKEN_DISABLED = 'disabled';
    var TOKEN_FALSE = 'false';
    var TOKEN_INVALID = EVENT_INVALID;
    var TOKEN_READONLY = 'readonly';
    var TOKEN_READ_ONLY = 'readOnly';
    var TOKEN_REQUIRED = 'required';
    var TOKEN_TABINDEX = 'tabindex';
    var TOKEN_TAB_INDEX = 'tabIndex';
    var TOKEN_TRUE = 'true';
    var TOKEN_VALUE = 'value';
    var TOKEN_VALUENOW = TOKEN_VALUE + 'now';
    var TOKEN_VISIBILITY = 'visibility';
    var _delay = delay(function (picker) {
            letAria(picker.mask, TOKEN_INVALID);
        }),
        _delay2 = _maybeArrayLike(_slicedToArray, _delay, 2),
        letError = _delay2[0],
        letErrorAbort = _delay2[1];
    var setError = function setError(picker) {
        var mask = picker.mask,
            state = picker.state,
            time = state.time,
            error = time.error;
        if (isInteger(error) && error > 0) {
            setAria(mask, TOKEN_INVALID, true);
        }
    };
    var _delay3 = delay(function (picker) {
            var _mask = picker._mask,
                input = _mask.input;
            toggleHintByValue(picker, getText(input, 0));
        }),
        _delay4 = _maybeArrayLike(_slicedToArray, _delay3, 1),
        toggleHint = _delay4[0];
    var toggleHintByValue = function toggleHintByValue(picker, value) {
        var _mask = picker._mask,
            hint = _mask.hint;
        value ? setStyle(hint, TOKEN_VISIBILITY, 'hidden') : letStyle(hint, TOKEN_VISIBILITY);
    };
    var name$1 = 'NumberPicker';
    var _repeat = repeat(function ($, picker, step) {
            cycleValue($, picker, step, repeatStop);
        }),
        _repeat2 = _maybeArrayLike(_slicedToArray, _repeat, 2),
        repeatStart = _repeat2[0],
        repeatStop = _repeat2[1];

    function checkValue(picker) {
        var _mask = picker._mask,
            max = picker.max,
            min = picker.min,
            step = picker.step,
            input = _mask.input,
            v,
            value = +(v = getText(input)); // Get from the current input
        if (!isNumber(value)) {
            return picker.fire('not.number', [v]), 0;
        }
        if (0 !== value % step) {
            return picker.fire('not.step', [value, step]), 0;
        }
        if (value < min) {
            return picker.fire('min.number', [value, min]), 0;
        }
        if (value > max) {
            return picker.fire('max.number', [value, max]), 0;
        }
        return picker.fire('is.number', [value]), 1;
    }

    function cycleValue($, picker, step, onStop, onStep) {
        var _active = picker._active,
            _fix = picker._fix;
        if (_fix) {
            return focusTo(picker);
        }
        if (!_active) {
            return;
        }
        var mask = picker.mask,
            max = picker.max,
            min = picker.min,
            state = picker.state,
            value = picker.value,
            strict = state.strict;
        // Snap number to the nearest step
        value = Math.round(+(value != null ? value : 0) / step) * step + step;
        if (!isNumber(value)) {
            if (strict) {
                return setError(picker), focusTo($), selectTo($);
            }
            picker[TOKEN_VALUE] = value = step < 0 ? min : max;
            setAria(mask, TOKEN_VALUENOW, value);
        }
        if (value > max || value < min) {
            if (strict) {
                return focusTo($), selectTo($), onStop && onStop(picker);
            }
            setError(picker);
        } else {
            letError(0, picker);
        }
        value += "";
        // Ensure decimal part in number
        if (0 !== step % 1) {
            var b = step + "",
                c = hasValue('.', b) ? toCount(b.split('.')[1]) : 0,
                d = 0 === c ? '0' : '0'.repeat(c);
            if (hasValue('.', value)) {
                value = value.split('.');
                value = value[0] + '.' + value[1].padEnd(c, d);
            } else {
                value += '.' + d;
            }
        }
        setAria(mask, TOKEN_VALUENOW, value);
        picker[TOKEN_VALUE] = value, focusTo($), selectTo($);
    }

    function focusTo(node) {
        return node.focus(), node;
    }

    function onBeforeInputTextInput(e) {
        var $ = this,
            picker = getReference($),
            step = picker.step,
            data = e.data,
            inputType = e.inputType;
        var characters = '-0123456789';
        if (0 !== step % 1) {
            characters += '.';
        }
        if ('insertText' === inputType && !hasValue(data, characters)) {
            offEventDefault(e);
        }
    }

    function onBlurStepDown() {
        var $ = this,
            picker = getReference($),
            state = picker.state,
            time = state.time,
            error = time.error;
        letError(isInteger(error) && error > 0 ? error : 0, picker);
    }

    function onBlurStepUp() {
        onBlurStepDown.call(this);
    }

    function onBlurTextInput() {
        var $ = this,
            picker = getReference($),
            mask = picker.mask;
        onBlurStepDown.call($);
        onEvent(EVENT_MOUSE_DOWN, mask, onPointerDownMask);
        onEvent(EVENT_TOUCH_START, mask, onPointerDownMask);
    }

    function onCutTextInput(e) {
        var $ = this,
            picker = getReference($),
            mask = picker.mask,
            self = picker.self,
            v;
        toggleHint(1, picker), delay(function () {
            setValue(self, v = getText($));
            if (v && '-' !== v && '.' !== v) {
                setAria(mask, TOKEN_VALUENOW, v);
            } else {
                letAria(mask, TOKEN_VALUENOW);
            }
        })[0](1);
    }
    // Focus on the “visually hidden” self will move its focus to the mask, maintains the natural flow of the tab(s)!
    function onFocusSelf() {
        focusTo(getReference(this));
    }

    function onFocusStepDown() {
        letErrorAbort();
    }

    function onFocusStepUp() {
        onFocusStepDown();
    }

    function onFocusTextInput() {
        letErrorAbort();
        var $ = this,
            picker = getReference($),
            mask = picker.mask;
        if (!checkValue(picker)) {
            setError(picker);
        }
        offEvent(EVENT_MOUSE_DOWN, mask, onPointerDownMask);
        offEvent(EVENT_TOUCH_START, mask, onPointerDownMask);
        selectTo($);
    }

    function onInputTextInput(e) {
        var $ = this,
            picker = getReference($),
            _active = picker._active,
            _fix = picker._fix;
        if (!_active || _fix) {
            if (_fix) {
                focusTo(picker);
            }
            return offEventDefault(e);
        }
        var inputType = e.inputType,
            mask = picker.mask,
            self = picker.self,
            state = picker.state,
            strict = state.strict,
            v,
            value = +(v = getText($));
        // Take from the current text
        if ('deleteContent' === inputType.slice(0, 13) && 0 === value) {
            toggleHintByValue(picker, 0);
        } else if ('insertText' === inputType) {
            toggleHintByValue(picker, 1);
        }
        if ('-' === v || '.' === v);
        else if (!checkValue(picker)) {
            setError(picker);
            if (strict) {
                return;
            }
        } else {
            letError(0, picker);
        }
        if (v && '-' !== v && '.' !== v) {
            setAria(mask, TOKEN_VALUENOW, v);
        } else {
            letAria(mask, TOKEN_VALUENOW);
        }
        setValue(self, null !== v ? v : ""), picker.fire('change', [v]);
    }

    function onInvalidSelf(e) {
        e && offEventDefault(e);
        var $ = this;
        onBlurTextInput.call($), setError(getReference($));
    }

    function onKeyDownStepDown(e) {
        var $ = this,
            picker = getReference($),
            _active = picker._active,
            _fix = picker._fix;
        if (!_active || _fix) {
            if (_fix) {
                focusTo(picker);
            }
            return offEventDefault(e);
        }
        var key = e.key,
            keyIsAlt = e.altKey,
            keyIsCtrl = e.ctrlKey,
            _mask = picker._mask,
            max = picker.max,
            min = picker.min,
            state = picker.state,
            step = picker.step,
            _step = _mask._step,
            up = _step.up,
            strict = state.strict,
            exit;
        if (KEY_ARROW_LEFT === key || keyIsCtrl && KEY_A === key) {
            exit = true;
            focusTo(picker);
        } else if (KEY_ARROW_UP === key) {
            exit = true;
            focusTo(up), cycleValue(up, picker, step, strict && function (picker) {
                picker[TOKEN_VALUE] = max;
            });
        } else if (KEY_ARROW_DOWN === key || KEY_ENTER === key || ' ' === key) {
            exit = true;
            cycleValue($, picker, -step, strict && function (picker) {
                picker[TOKEN_VALUE] = min;
            });
        } else if (KEY_TAB === key);
        else {
            if (!keyIsAlt && !keyIsCtrl) {
                focusTo(picker);
            }
        }
        exit && offEventDefault(e);
    }

    function onKeyDownStepUp(e) {
        var $ = this,
            picker = getReference($),
            _active = picker._active,
            _fix = picker._fix;
        if (!_active || _fix) {
            if (_fix) {
                focusTo(picker);
            }
            return offEventDefault(e);
        }
        var key = e.key,
            keyIsAlt = e.altKey,
            keyIsCtrl = e.ctrlKey,
            _mask = picker._mask,
            max = picker.max,
            min = picker.min,
            state = picker.state,
            step = picker.step,
            _step = _mask._step,
            down = _step.down,
            strict = state.strict,
            exit;
        if (KEY_ARROW_LEFT === key || keyIsCtrl && KEY_A === key) {
            exit = true;
            focusTo(picker);
        } else if (KEY_ARROW_DOWN === key) {
            exit = true;
            focusTo(down), cycleValue(down, picker, -step, strict && function (picker) {
                picker[TOKEN_VALUE] = min;
            });
        } else if (KEY_ARROW_UP === key || KEY_ENTER === key || ' ' === key) {
            exit = true;
            cycleValue($, picker, step, strict && function (picker) {
                picker[TOKEN_VALUE] = max;
            });
        } else if (KEY_TAB === key);
        else {
            if (!keyIsAlt && !keyIsCtrl) {
                focusTo(picker);
            }
        }
        exit && offEventDefault(e);
    }

    function onKeyDownTextInput(e) {
        var $ = this,
            picker = getReference($),
            _active = picker._active,
            _fix = picker._fix;
        if (!_active || _fix) {
            if (_fix) {
                focusTo(picker);
            }
            return;
        }
        var key = e.key,
            keyIsAlt = e.altKey,
            keyIsCtrl = e.ctrlKey,
            keyIsShift = e.shiftKey,
            _mask = picker._mask,
            self = picker.self,
            _step = _mask._step,
            down = _step.down,
            up = _step.up,
            exit,
            form,
            submit;
        if (keyIsAlt);
        else if (keyIsCtrl);
        else if (keyIsShift) {
            if (KEY_TAB === key) {
                selectToNone();
            }
        } else if (KEY_ARROW_DOWN === key || KEY_PAGE_DOWN === key) {
            exit = true;
            selectToNone(), focusTo(down), onKeyDownStepDown.call(down, e);
        } else if (KEY_ARROW_UP === key || KEY_PAGE_UP === key) {
            exit = true;
            selectToNone(), focusTo(up), onKeyDownStepUp.call(up, e);
        } else if (KEY_ENTER === key) {
            exit = true;
            if ((form = getParentForm(self)) && isFunction(form.requestSubmit)) {
                // <https://developer.mozilla.org/en-US/docs/Glossary/Submit_button>
                submit = getElement('button:not([type]),button[type=submit],input[type=image],input[type=submit]', form);
                submit ? form.requestSubmit(submit) : form.requestSubmit();
            }
        } else if (KEY_TAB === key) {
            selectToNone();
        }
        exit && offEventDefault(e);
    }

    function onPasteTextInput(e) {
        offEventDefault(e);
        var $ = this,
            picker = getReference($),
            mask = picker.mask,
            state = picker.state,
            time = state.time,
            error = time.error,
            v = getText($),
            vv,
            wasError;
        insertAtSelection($, e.clipboardData.getData('text/plain'));
        if (!isNumber(+(vv = getText($)))) {
            wasError = true;
            setText($, null !== v ? v : ""); // Restore previous text
        }
        picker[TOKEN_VALUE] = v = getText($);
        if (v) {
            setAria(mask, TOKEN_VALUENOW, v);
        } else {
            letAria(mask, TOKEN_VALUENOW);
        }
        focusTo($), selectTo($);
        if (wasError) {
            letErrorAbort(), setError(picker), letError(isInteger(error) && error > 0 ? error : 0, picker);
            picker.fire('not.number', [vv]);
        }
    }

    function onPointerDownMask(e) {
        offEventDefault(e);
        var $ = this,
            picker = getReference($),
            _active = picker._active,
            _fix = picker._fix;
        if (!_active || _fix) {
            if (_fix) {
                focusTo(picker);
            }
            return;
        }
        var _mask = picker._mask,
            mask = picker.mask,
            _step = _mask._step,
            down = _step.down,
            up = _step.up,
            target = e.target,
            targetDown = target,
            targetUp = target;
        if (down === targetDown || up === targetUp) {
            return;
        }
        while (mask !== targetDown) {
            targetDown = getParent(targetDown);
            if (down === targetDown) {
                return;
            }
        }
        while (mask !== targetUp) {
            targetUp = getParent(targetUp);
            if (up === targetUp) {
                return;
            }
        }
        focusTo(picker);
    }

    function onPointerDownStepDown(e) {
        offEventDefault(e);
        var $ = this,
            picker = getReference($),
            min = picker.min,
            state = picker.state,
            step = picker.step,
            strict = state.strict,
            time = state.time,
            repeat = time.repeat;
        cycleValue($, picker, -step, strict && function (picker) {
            picker[TOKEN_VALUE] = min, focusTo($);
        });
        repeatStart(repeat[0], repeat[1], $, picker, -step);
        onEvent(EVENT_MOUSE_UP, R, onPointerUpRoot);
        onEvent(EVENT_TOUCH_END, R, onPointerUpRoot);
    }

    function onPointerDownStepUp(e) {
        offEventDefault(e);
        var $ = this,
            picker = getReference($),
            max = picker.max,
            state = picker.state,
            step = picker.step,
            strict = state.strict,
            time = state.time,
            repeat = time.repeat;
        cycleValue($, picker, step, strict && function (picker) {
            picker[TOKEN_VALUE] = max, focusTo($);
        });
        repeatStart(repeat[0], repeat[1], $, picker, step);
        onEvent(EVENT_MOUSE_UP, R, onPointerUpRoot);
        onEvent(EVENT_TOUCH_END, R, onPointerUpRoot);
    }

    function onPointerUpRoot() {
        var $ = this;
        offEvent(EVENT_MOUSE_UP, $, onPointerUpRoot);
        offEvent(EVENT_TOUCH_END, $, onPointerUpRoot);
        repeatStop();
    }

    function onResetForm() {
        getReference(this).reset();
    }

    function onSubmitForm(e) {
        var $ = this,
            picker = getReference($),
            self = picker.self;
        picker.value;
        if (!checkValue(picker)) {
            onInvalidSelf.call(self), offEventDefault(e);
        }
    }

    function onWheelMask(e) {
        offEventDefault(e);
        var $ = this,
            picker = getReference($),
            _mask = picker._mask,
            max = picker.max,
            min = picker.min,
            state = picker.state,
            step = picker.step,
            _step = _mask._step,
            down = _step.down,
            up = _step.up,
            strict = state.strict,
            deltaY = e.deltaY;
        // Wheel up
        if (deltaY < 0) {
            cycleValue(up, picker, step, strict && function (picker) {
                picker[TOKEN_VALUE] = max, focusTo(up);
            });
            // Wheel down
        } else {
            cycleValue(down, picker, -step, strict && function (picker) {
                picker[TOKEN_VALUE] = min, focusTo(down);
            });
        }
    }

    function NumberPicker(self, state) {
        var $ = this;
        if (!self) {
            return $;
        }
        // Return new instance if `NumberPicker` was called without the `new` operator
        if (!isInstance($, NumberPicker)) {
            return new NumberPicker(self, state);
        }
        setReference(self, hook($, NumberPicker._));
        return $.attach(self, _fromStates({}, NumberPicker.state, isBoolean(state) ? {
            strict: state
        } : state || {}));
    }
    NumberPicker.from = function (self, state) {
        return new NumberPicker(self, state);
    };
    NumberPicker.of = getReference;
    NumberPicker.state = {
        'max': null,
        'min': null,
        'n': 'number-picker',
        'step': null,
        'strict': false,
        'time': {
            'error': 1000,
            'repeat': [500, 50]
        },
        'with': []
    };
    NumberPicker.version = '1.0.3';
    setObjectAttributes(NumberPicker, {
        name: {
            value: name$1
        }
    }, 1);
    setObjectAttributes(NumberPicker, {
        active: {
            get: function get() {
                return this._active;
            },
            set: function set(value) {
                selectToNone();
                var $ = this,
                    _mask = $._mask,
                    mask = $.mask,
                    self = $.self,
                    input = _mask.input,
                    v = !!value;
                self[TOKEN_DISABLED] = !($._active = v);
                if (v) {
                    letAria(input, TOKEN_DISABLED);
                    letAria(mask, TOKEN_DISABLED);
                    setAttribute(input, TOKEN_CONTENTEDITABLE, "");
                } else {
                    letAttribute(input, TOKEN_CONTENTEDITABLE);
                    setAria(input, TOKEN_DISABLED, true);
                    setAria(mask, TOKEN_DISABLED, true);
                }
                return $;
            }
        },
        fix: {
            get: function get() {
                return this._fix;
            },
            set: function set(value) {
                selectToNone();
                var $ = this,
                    _mask = $._mask,
                    mask = $.mask,
                    self = $.self,
                    input = _mask.input,
                    v = !!value;
                self[TOKEN_READ_ONLY] = $._fix = v;
                if (v) {
                    letAttribute(input, TOKEN_CONTENTEDITABLE);
                    setAria(input, TOKEN_READONLY, true);
                    setAria(mask, TOKEN_READONLY, true);
                    setAttribute(input, TOKEN_TABINDEX, 0);
                } else {
                    letAria(input, TOKEN_READONLY);
                    letAria(mask, TOKEN_READONLY);
                    letAttribute(input, TOKEN_TABINDEX);
                    setAttribute(input, TOKEN_CONTENTEDITABLE, "");
                }
                return $;
            }
        },
        max: {
            get: function get() {
                var _this$state = this.state,
                    max = _this$state.max,
                    step = _this$state.step;
                step = step != null ? step : 1;
                return Infinity === (max = +max) || isNumber(max) && 0 === max % step ? max : Infinity;
            },
            set: function set(value) {
                var $ = this,
                    state = $.state,
                    step = state.step;
                step = step != null ? step : 1;
                return state.max = isNumber(value = +value) && 0 === value % step ? value : Infinity, $;
            }
        },
        min: {
            get: function get() {
                var _this$state2 = this.state,
                    min = _this$state2.min,
                    step = _this$state2.step;
                step = step != null ? step : 1;
                return -Infinity === (min = +min) || isNumber(min) && 0 === min % step ? min : -Infinity;
            },
            set: function set(value) {
                var $ = this,
                    state = $.state,
                    step = state.step;
                step = step != null ? step : 1;
                return state.min = isNumber(value = +value) && 0 === value % step ? value : -Infinity, $;
            }
        },
        step: {
            get: function get() {
                var step = this.state.step;
                return isNumber(step = +step) && step > 0 ? step : 1;
            },
            set: function set(value) {
                var $ = this,
                    state = $.state;
                return state.step = isNumber(value = +value) && value > 0 ? value : 1, $;
            }
        },
        text: {
            get: function get() {
                return getText(this._mask.input);
            },
            set: function set(value) {
                var $ = this,
                    _active = $._active,
                    _fix = $._fix;
                if (!_active || _fix) {
                    return $;
                }
                var _mask = $._mask,
                    input = _mask.input,
                    v;
                return setText(input, v = _fromValue(value)), toggleHintByValue($, v), $;
            }
        },
        value: {
            get: function get() {
                var value = getValue(this.self);
                return "" !== value ? value : null;
            },
            set: function set(value) {
                var $ = this,
                    _active = $._active,
                    v;
                if (!_active) {
                    return $;
                }
                value = +(v = (value != null ? value : "") + "");
                var _mask = $._mask,
                    self = $.self,
                    state = $.state,
                    input = _mask.input,
                    strict = state.strict,
                    time = state.time,
                    error = time.error;
                setText(input, v), toggleHintByValue($, v);
                if (!checkValue($)) {
                    setError($);
                    if (strict) {
                        return letError(isInteger(error) && error > 0 ? error : 0, $), setText(input, $[TOKEN_VALUE]), $;
                    }
                } else {
                    letError(0, $);
                }
                return setValue(self, v), $.fire('change', ["" !== v ? v : null]);
            }
        },
        vital: {
            get: function get() {
                return this._vital;
            },
            set: function set(value) {
                selectToNone();
                var $ = this,
                    _mask = $._mask,
                    mask = $.mask,
                    self = $.self,
                    input = _mask.input,
                    v = !!value;
                self[TOKEN_REQUIRED] = $._vital = v;
                if (v) {
                    setAria(input, TOKEN_REQUIRED, true);
                    setAria(mask, TOKEN_REQUIRED, true);
                } else {
                    letAria(input, TOKEN_REQUIRED);
                    letAria(mask, TOKEN_REQUIRED);
                }
                return $;
            }
        }
    });
    NumberPicker._ = setObjectMethods(NumberPicker, {
        attach: function attach(self, state) {
            var $ = this;
            self = self || $.self;
            state = state || $.state;
            $.self = self;
            $.state = state;
            var _state = state,
                max = _state.max,
                min = _state.min,
                n = _state.n,
                step = _state.step,
                isDisabledSelf = isDisabled(self),
                isReadOnlySelf = isReadOnly(self),
                isRequiredSelf = isRequired(self),
                theInputID = self.id,
                theInputMax = self.max,
                theInputMin = self.min,
                theInputName = self.name,
                theInputPlaceholder = self.placeholder || theInputMin,
                theInputStep = self.step,
                theInputValue = getValue(self);
            $._active = !isDisabledSelf;
            $._fix = isReadOnlySelf;
            $._vital = isRequiredSelf;
            var stepDown = setElement('span', {
                'class': n + '__step-down',
                'tabindex': -1
            });
            var stepFlex = setElement('span', {
                'aria': {
                    'hidden': TOKEN_TRUE
                },
                'class': n + '__step'
            });
            var stepUp = setElement('span', {
                'class': n + '__step-up',
                'tabindex': -1
            });
            var form = getParentForm(self);
            var mask = setElement('div', {
                'aria': {
                    'disabled': isDisabledSelf ? TOKEN_TRUE : false,
                    'readonly': isReadOnlySelf ? TOKEN_TRUE : false,
                    'required': isRequiredSelf ? TOKEN_TRUE : false,
                    'valuemax': theInputMax ? theInputMax : false,
                    'valuemin': theInputMin ? theInputMin : false,
                    'valuenow': theInputValue ? theInputValue : false
                },
                'class': n,
                'role': 'spinbutton'
            });
            $.mask = mask;
            var maskFlex = setElement('div', {
                'class': n + '__flex',
                'role': 'group'
            });
            var text = setElement('span', {
                'class': n + '__text'
            });
            var textInput = setElement('span', {
                'aria': {
                    'disabled': isDisabledSelf ? TOKEN_TRUE : false,
                    'multiline': TOKEN_FALSE,
                    'placeholder': theInputPlaceholder || '0',
                    'readonly': isReadOnlySelf ? TOKEN_TRUE : false,
                    'required': isRequiredSelf ? TOKEN_TRUE : false
                },
                'autocapitalize': 'off',
                'contenteditable': isDisabledSelf || isReadOnlySelf ? false : "",
                'inputmode': isInteger(step) ? 'numeric' : 'decimal',
                'role': 'textbox',
                'spellcheck': TOKEN_FALSE,
                'tabindex': isReadOnlySelf ? 0 : false
            });
            var textInputHint = setElement('span', theInputPlaceholder || '0', {
                'aria': {
                    'hidden': TOKEN_TRUE
                }
            });
            setChildLast(mask, maskFlex);
            setChildLast(maskFlex, text);
            setChildLast(maskFlex, stepFlex);
            setChildLast(stepFlex, stepUp);
            setChildLast(stepFlex, stepDown);
            onEvent(EVENT_BLUR, stepDown, onBlurStepDown);
            onEvent(EVENT_INPUT_START, textInput, onBeforeInputTextInput);
            onEvent(EVENT_BLUR, stepUp, onBlurStepUp);
            onEvent(EVENT_BLUR, textInput, onBlurTextInput);
            onEvent(EVENT_CUT, textInput, onCutTextInput);
            onEvent(EVENT_FOCUS, stepDown, onFocusStepDown);
            onEvent(EVENT_FOCUS, stepUp, onFocusStepUp);
            onEvent(EVENT_FOCUS, textInput, onFocusTextInput);
            onEvent(EVENT_INPUT, textInput, onInputTextInput);
            onEvent(EVENT_KEY_DOWN, stepDown, onKeyDownStepDown);
            onEvent(EVENT_KEY_DOWN, stepUp, onKeyDownStepUp);
            onEvent(EVENT_KEY_DOWN, textInput, onKeyDownTextInput);
            onEvent(EVENT_MOUSE_DOWN, stepDown, onPointerDownStepDown);
            onEvent(EVENT_MOUSE_DOWN, stepUp, onPointerDownStepUp);
            onEvent(EVENT_PASTE, textInput, onPasteTextInput);
            onEvent(EVENT_TOUCH_START, stepDown, onPointerDownStepDown);
            onEvent(EVENT_TOUCH_START, stepUp, onPointerDownStepUp);
            onEvent(EVENT_WHEEL, mask, onWheelMask);
            setChildLast(text, textInput);
            setChildLast(text, textInputHint);
            setReference(stepDown, $);
            setReference(stepUp, $);
            setReference(textInput, $);
            setClass(self, n + '__self');
            setNext(self, mask);
            setChildLast(mask, self);
            if (form) {
                onEvent(EVENT_RESET, form, onResetForm);
                onEvent(EVENT_SUBMIT, form, onSubmitForm);
                setID(form);
                setReference(form, $);
            }
            onEvent(EVENT_FOCUS, self, onFocusSelf);
            onEvent(EVENT_INVALID, self, onInvalidSelf);
            onEvent(EVENT_MOUSE_DOWN, mask, onPointerDownMask);
            onEvent(EVENT_TOUCH_START, mask, onPointerDownMask);
            self[TOKEN_TAB_INDEX] = -1;
            setReference(mask, $);
            $._mask = {
                _step: {
                    down: stepDown,
                    self: stepFlex,
                    up: stepUp
                },
                flex: maskFlex,
                hint: textInputHint,
                input: textInput,
                of: self,
                self: mask,
                step: stepFlex
            };
            // Re-assign some state value(s) using the setter to either normalize or reject the initial value
            $.max = max = "" !== theInputMax ? theInputMax : max != null ? max : Infinity;
            $.min = min = "" !== theInputMin ? theInputMin : min != null ? min : -Infinity;
            $.step = step = "" !== theInputStep ? theInputStep : step != null ? step : 1;
            var _active = $._active;
            // Force the `this._active` value to `true` to set the initial value
            $._active = true;
            theInputValue && ($[TOKEN_VALUE] = $['_' + TOKEN_VALUE] = theInputValue);
            // After the initial value has been set, restore the previous `this._active` value
            $._active = _active;
            // Force `id` attribute(s)
            setAria(mask, 'labelledby', getID(setID(text)));
            setAria(self, 'hidden', true);
            setID(mask);
            setID(maskFlex);
            setID(self);
            setID(stepDown);
            setID(stepFlex);
            setID(stepUp);
            setID(textInput);
            setID(textInputHint);
            theInputID && setDatum(mask, 'id', theInputID);
            theInputName && setDatum(mask, 'name', theInputName);
            // Attach extension(s)
            if (isSet(state) && isArray(state.with)) {
                forEachArray(state.with, function (v, k) {
                    if (isString(v)) {
                        v = NumberPicker[v];
                    }
                    // `const Extension = function (self, state = {}) {}`
                    if (isFunction(v)) {
                        v.call($, self, state);
                        // `const Extension = {attach: function (self, state = {}) {}, detach: function (self, state = {}) {}}`
                    } else if (isObject(v) && isFunction(v.attach)) {
                        v.attach.call($, self, state);
                    }
                });
            }
            return $;
        },
        blur: function blur() {
            selectToNone();
            var $ = this,
                _mask = $._mask,
                _step = $._step,
                input = _mask.input,
                down = _step.down,
                up = _step.up;
            return down.blur(), input.blur(), up.blur(), $;
        },
        detach: function detach() {
            var $ = this,
                _mask = $._mask,
                mask = $.mask,
                self = $.self,
                state = $.state,
                _step = _mask._step,
                input = _mask.input,
                down = _step.down,
                up = _step.up;
            var form = getParentForm(self);
            $._active = false;
            $._value = null;
            if (form) {
                offEvent(EVENT_RESET, form, onResetForm);
                offEvent(EVENT_SUBMIT, form, onSubmitForm);
            }
            offEvent(EVENT_BLUR, down, onBlurStepDown);
            offEvent(EVENT_BLUR, input, onBlurTextInput);
            offEvent(EVENT_BLUR, up, onBlurStepUp);
            offEvent(EVENT_CUT, input, onCutTextInput);
            offEvent(EVENT_FOCUS, down, onFocusStepDown);
            offEvent(EVENT_FOCUS, input, onFocusTextInput);
            offEvent(EVENT_FOCUS, self, onFocusSelf);
            offEvent(EVENT_FOCUS, up, onFocusStepUp);
            offEvent(EVENT_INPUT_START, input, onBeforeInputTextInput);
            offEvent(EVENT_INVALID, self, onInvalidSelf);
            offEvent(EVENT_KEY_DOWN, down, onKeyDownStepDown);
            offEvent(EVENT_KEY_DOWN, input, onKeyDownTextInput);
            offEvent(EVENT_KEY_DOWN, up, onKeyDownStepUp);
            offEvent(EVENT_MOUSE_DOWN, mask, onPointerDownMask);
            offEvent(EVENT_PASTE, input, onPasteTextInput);
            offEvent(EVENT_TOUCH_START, mask, onPointerDownMask);
            offEvent(EVENT_WHEEL, mask, onWheelMask);
            // Detach extension(s)
            if (isArray(state.with)) {
                forEachArray(state.with, function (v, k) {
                    if (isString(v)) {
                        v = NumberPicker[v];
                    }
                    if (isObject(v) && isFunction(v.detach)) {
                        v.detach.call($, self, state);
                    }
                });
            }
            self[TOKEN_TAB_INDEX] = null;
            letAria(self, 'hidden');
            letClass(self, state.n + '__self');
            setNext(mask, self);
            letElement(mask);
            $._mask = {
                of: self
            };
            $.mask = null;
            return $;
        },
        focus: function focus(mode) {
            var $ = this,
                _active = $._active;
            if (!_active) {
                return $;
            }
            var _mask = $._mask,
                input = _mask.input;
            return focusTo(input), selectTo(input, mode), $;
        },
        reset: function reset(focus, mode) {
            var $ = this,
                _active = $._active;
            if (!_active) {
                return $;
            }
            $[TOKEN_VALUE] = $['_' + TOKEN_VALUE];
            return focus ? $.focus(mode) : $;
        }
    });
    var name = 'QuantityPicker';

    function QuantityPicker(self, state) {
        var $ = this;
        if (!self) {
            return $;
        }
        // Return new instance if `QuantityPicker` was called without the `new` operator
        if (!isInstance($, QuantityPicker)) {
            return new QuantityPicker(self, state);
        }
        return hook($, QuantityPicker._).attach(self, _fromStates({}, QuantityPicker.state, isBoolean(state) ? {
            strict: state
        } : state || {}));
    }
    setPrototype(QuantityPicker, Object.create(NumberPicker._, {
        constructor: {
            configurable: true,
            enumerable: false,
            value: QuantityPicker,
            writable: true
        },
        // Must be an integer
        max: {
            get: function get() {
                var _this$state = this.state,
                    max = _this$state.max,
                    step = _this$state.step;
                step = step != null ? step : 1;
                return Infinity === (max = +max) || isInteger(max) && 0 === max % step ? max : Infinity;
            },
            set: function set(value) {
                var $ = this,
                    state = $.state,
                    step = state.step;
                step = step != null ? step : 1;
                return state.max = isInteger(value = +value) && 0 === value % step ? value : Infinity, $;
            }
        },
        // Must be an integer greater than or equal to `0`
        min: {
            get: function get() {
                var _this$state2 = this.state,
                    min = _this$state2.min,
                    step = _this$state2.step;
                step = step != null ? step : 1;
                return isInteger(min = +min) && 0 === min % step && min >= 0 ? min : 0;
            },
            set: function set(value) {
                var $ = this,
                    state = $.state,
                    step = state.step;
                step = step != null ? step : 1;
                return state.min = isInteger(value = +value) && 0 === value % step && value >= 0 ? value : 0, $;
            }
        },
        // Must be an integer
        step: {
            get: function get() {
                var step = this.state.step;
                return isInteger(step = +step) && step > 0 ? step : 1;
            },
            set: function set(value) {
                var $ = this,
                    state = $.state;
                return state.step = isInteger(value = +value) && value > 0 ? value : 1, $;
            }
        }
    }));
    QuantityPicker.from = function (self, state) {
        return new QuantityPicker(self, state);
    };
    QuantityPicker.of = NumberPicker.of;
    QuantityPicker.state = {
        'max': null,
        'min': 0,
        'n': 'quantity-picker',
        'step': 1,
        'strict': true,
        'time': {
            'error': 1000,
            'repeat': [500, 50]
        },
        'with': []
    };
    QuantityPicker.version = '1.0.0';
    setObjectAttributes(QuantityPicker, {
        name: {
            value: name
        }
    }, 1);
    QuantityPicker._ = getPrototype(QuantityPicker);
    return QuantityPicker;
}));