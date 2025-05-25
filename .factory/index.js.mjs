import NumberPicker from '@taufik-nurrohman/number-picker';
import {fromStates} from '@taufik-nurrohman/from';
import {hook} from '@taufik-nurrohman/hook';
import {isBoolean, isInstance, isInteger} from '@taufik-nurrohman/is';
import {getPrototype, setObjectAttributes, setPrototype} from '@taufik-nurrohman/f';

const name = 'QuantityPicker';

function QuantityPicker(self, state) {
    const $ = this;
    if (!self) {
        return $;
    }
    // Return new instance if `QuantityPicker` was called without the `new` operator
    if (!isInstance($, QuantityPicker)) {
        return new QuantityPicker(self, state);
    }
    return hook($, QuantityPicker._).attach(self, fromStates({}, QuantityPicker.state, isBoolean(state) ? {
        strict: state
    } : (state || {})));
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
        get: function () {
            let {max, step} = this.state;
            step = step ?? 1;
            return Infinity === (max = +max) || (isInteger(max) && 0 === (max % step)) ? max : Infinity;
        },
        set: function (value) {
            let $ = this,
                {state} = $,
                {step} = state;
            step = step ?? 1;
            return (state.max = isInteger(value = +value) && 0 === (value % step) ? value : Infinity), $;
        }
    },
    // Must be an integer greater than or equal to `0`
    min: {
        get: function () {
            let {min, step} = this.state;
            step = step ?? 1;
            return (isInteger(min = +min) && 0 === (min % step)) && min >= 0 ? min : 0;
        },
        set: function (value) {
            let $ = this,
                {state} = $,
                {step} = state;
            step = step ?? 1;
            return (state.min = isInteger(value = +value) && 0 === (value % step) && value >= 0 ? value : 0), $;
        }
    },
    // Must be an integer
    step: {
        get: function () {
            let {step} = this.state;
            return isInteger(step = +step) && step > 0 ? step : 1;
        },
        set: function (value) {
            let $ = this,
                {state} = $;
            return (state.step = isInteger(value = +value) && value > 0 ? value : 1), $;
        }
    }
}));

QuantityPicker.from = function (self, state) {
    return new QuantityPicker(self, state);
};

QuantityPicker.of = NumberPicker.of;

QuantityPicker.state = {
    'max': null,
    'min': null,
    'n': 'quantity-picker',
    'step': null,
    'strict': false,
    'time': {
        'error': 1000,
        'repeat': [500, 50]
    },
    'with': []
};

QuantityPicker.version = '%(version)';

setObjectAttributes(QuantityPicker, {
    name: {
        value: name
    }
}, 1);

QuantityPicker._ = getPrototype(QuantityPicker);

export default QuantityPicker;