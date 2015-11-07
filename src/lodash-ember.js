import Ember from 'ember';
import lodashUtils from 'wildcat/utils/lodash/_core/lodash-utils';


/**
 * Collection of all the utils in here. Add to this as you go.
 */
export var lodashEmber = {};


/**
 * Check that a value is an instance, as designated by Ember
 *
 * @namespace _
 * @method isInstance
 * @param {*} value: Value to check
 * @return {Boolean}
 */
export var isEmberInstance = function(value) {
	return (Ember.typeOf(value) === 'instance');
};
lodashEmber.isEmberInstance = isEmberInstance;


/**
 * Check that a value is, at least, a subclass of Ember.Object
 *
 * @namespace _
 * @method isEmberObject
 * @param {*} value: Value to check
 * @return {Boolean}
 */
export var isEmberObject = lodashUtils.makeIsType(Ember.Object);
lodashEmber.isEmberObject = isEmberObject;


/**
 * isEmberArray has been excluded as Ember.Array is not an Ember.Object
 */


/**
 * Check that a value is, at least, a subclass of Ember.ObjectProxy
 *
 * @namespace _
 * @method isEmberObjectProxy
 * @param {*} value: Value to check
 * @return {Boolean}
 */
export var isEmberObjectProxy = lodashUtils.makeIsType(Ember.ObjectProxy);
lodashEmber.isEmberObjectProxy = isEmberObjectProxy;


/**
 * Check that a value is, at least, a subclass of Ember.ArrayProxy
 *
 * @namespace _
 * @method isEmberArrayProxy
 * @param {*} value: Value to check
 * @return {Boolean}
 */
export var isEmberArrayProxy = lodashUtils.makeIsType(Ember.ArrayProxy);
lodashEmber.isEmberArrayProxy = isEmberArrayProxy;


/**
 * Check that the value is a descendent of an Ember Class
 * TODO: Check that `_.isEmberInstance` doesn't already yield the same result
 *
 * @namespace _
 * @method isEmberCollection
 * @param {*} value: Value to check
 * @return {Boolean}
 */
export var isEmberCollection = function(value) {
	return (
		_.isEmberObject(value) ||
		_.isEmberObjectProxy(value) ||
		_.isEmberArrayProxy(value)
	);
};
lodashEmber.isEmberCollection = isEmberCollection;


/**
 * Check that value is Ember Transition
 *
 * @method isEmberTransition
 * @param {*} value: Value to check
 * @return {Boolean}
 * @since v0.5.2
 */
export var isEmberTransition = function(value) {
	return (
		_.isFunction(value, 'toString') &&
		_.contains(value.toString(), 'Transition')
	);
};
lodashEmber.isEmberTransition = isEmberTransition;


/**
 * Lodash forEach
 *
 * @namespace _
 * @method _forEach
 * @param {Array|Object|String} collection The collection to iterate over.
 * @param {Function} [callback=identity] The function called per iteration.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Array|Object|String} Returns `collection`.
 * @since v0.5.2
 */
export var _forEach = _.forEach;
lodashEmber._forEach = _forEach;


/**
 * Override lodash `forEach` to support ember arrays/objects
 *
 * @namespace _
 * @method forEach
 * @param {Array|Object|String} collection The collection to iterate over.
 * @param {Function} [callback=identity] The function called per iteration.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Array|Object|String} Returns `collection`.
 */
export var forEach = function(collection, callback, thisArg) {
	if (_.isEmberArrayProxy(collection)) {
		return collection.forEach(callback, this);
	}
	if (_.isEmberObjectProxy(collection) && _.isObject(collection.get('content'))) {
		return _forEach(collection.get('content'), callback, thisArg);
	}
	return _forEach(collection, callback, thisArg);
};
lodashEmber.forEach = forEach;


/**
 * Lodash reduce
 *
 * @namespace _
 * @method _reduce
 * @param {Array|Object|String} collection The collection to iterate over.
 * @param {Function} [callback=identity] The function called per iteration.
 * @param {*} [currentValue] value at beginning of iteration
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Array|Object|String} Returns `collection`.
 * @since v1.1.0
 */
export var _reduce = _.reduce;
lodashEmber._reduce = _reduce;


/**
 * Override lodash `reduce` to support ember arrays/objects
 *
 * @namespace _
 * @method reduce
 * @param {Array|Object|String} collection The collection to iterate over.
 * @param {Function} [callback=identity] The function called per iteration.
 * @param {*} [currentValue] value at beginning of iteration
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Array|Object|String} Returns `collection`.
 * @since v1.1.0
 */
export var reduce = function(collection, callback, currentValue, thisArg) {
	if (_.isEmberArrayProxy(collection)) {
		return collection.reduce(callback, currentValue, this);
	}
	if (_.isEmberObjectProxy(collection) && _.isObject(collection.get('content'))) {
		return _reduce(collection.get('content'), callback, currentValue, thisArg);
	}
	return _reduce(collection, callback, currentValue, thisArg);
};
lodashEmber.reduce = reduce;


/**
 * Lodash map
 *
 * @namespace _
 * @method _map
 * @param {Array|Object|String} collection The collection to iterate over.
 * @param {Function} [callback=identity] The function called per iteration.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Array|Object|String} Returns `collection`.
 * @since v0.5.2
 */
export var _map = _.map;
lodashEmber._map = _map;


/**
 * Override lodash `map` to support ember arrays/objects
 *
 * @namespace _
 * @method map
 * @param {Array|Object|String} collection The collection to iterate over.
 * @param {Function} [callback=identity] The function called per iteration.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Array|Object|String} Returns `collection`.
 */
export var map = function(collection, callback, thisArg) {
	if (_.isEmberArrayProxy(collection)) {
		return collection.map(callback, this);
	}
	return _map(collection, callback, thisArg);
};
lodashEmber.map = map;


/**
 * Lodash deepGet alias to private namespace
 *
 * @namespace _
 * @method _deepGet
 * @param {Object|Array} collection: The root collection of the tree.
 * @param {String|Array} propertyPath: The property path in the collection.
 * @returns {*} The value, or undefined if it doesn't exists.
 * @since v0.5.2
 */
export var _deepGet = _.deepGet;
lodashEmber._deepGet = _deepGet;


/**
 * Retrieves the value of a property in an object tree.
 *
 * @namespace _
 * @method get
 * @param {Object|Array} collection: The root collection of the tree.
 * @param {String|Array} propertyPath: The property path in the collection.
 * @returns {*} The value, or undefined if it doesn't exists.
 */
export var get = function(collection, propertyPath) {
	// Handle Ember Objects
	if (isEmberObject(collection) || isEmberObjectProxy(collection)) {
		return collection.get(propertyPath);
	}

	return _deepGet(...arguments);
};
lodashEmber.get = get;


/**
 * Lodash deepSet alias to private namespace
 *
 * @namespace _
 * @method _deepSet
 * @param {Object|Array} collection: The root collection of the tree.
 * @param {String|Array} propertyPath: The property path in the collection.
 * @param {*} value: The property path in the collection.
 * @returns {*} The `collection` passed in with value set.
 * @since v0.5.2
 */
export var _deepSet = _.deepSet;
lodashEmber._deepSet = _deepSet;


/**
 * Retrieves the value of a property in an object tree.
 *
 * @namespace _
 * @method set
 * @param {Object|Array} collection: The root collection of the tree.
 * @param {String|Array} propertyPath: The property path in the collection.
 * @param {*} value: Value to set on the collection.
 * @returns {*} The `collection` passed in with value set.
 */
export var set = function(collection, propertyPath, value) {
	// Handle Ember Objects
	if (isEmberObject(collection) || isEmberObjectProxy(collection)) {
		collection.set(propertyPath, value);
		return collection;
	}

	return _deepSet(...arguments);
};
lodashEmber.set = set;


// Don't use the deep prefix.
// If necessary, you can access the raw function at `_._deepGet`
(() => {
	delete _.deepGet;
	delete _.deepSet;
})();


/**
 * Original lodash isEmpty
 *
 * @namespace  _
 * @method _isEmpty
 * @param {*} value
 * @return {Boolean}
 * @since v0.5.3
 */
export var _isEmpty = _.isEmpty;
lodashEmber._isEmpty = _isEmpty;


/**
 * Determines if the value is empty or not
 *
 * @namespace  _
 * @method isEmpty
 * @param {*} value
 * @return {Boolean}
 * @since v0.5.3
 */
export var isEmpty = function(value) {
	if (
		_.isEmberArrayProxy(value) &&
		_.isFunction(value.isEmpty)
	) {
		return value.isEmpty();
	}

	return _isEmpty(...arguments);
};
lodashEmber.isEmpty = isEmpty;


/**
 * Original lodash clone
 *
 * @namespace  _
 * @method _clone
 * @param {*} value
 * @return {*}
 * @since v1.0.0
 */
export var _clone = _.clone;
lodashEmber._clone = _clone;


/**
 * Returns a cloned copy of value
 *
 * @namespace  _
 * @method clone
 * @param {*} value
 * @return {*}
 * @since v1.0.0
 */
export var clone = function(value) {
	if (_.isWildcatObject(value)) {
		return value.clone();
	}

	return _clone(...arguments);
};
lodashEmber.clone = clone;


/**
 * Alias for `array.pop` or `arrayProxy.popObject`
 *
 * @namespace  _
 * @method pop
 * @param {Array|Ember.ArrayProxy} value
 * @return {*}
 * @since v1.3.0
 */
export var pop = function(value) {
	return (_.isEmberArrayProxy(value)) ? value.popObject() : value.pop();
};
lodashEmber.pop = pop;


/**
 * Alias for `array.shift` or `arrayProxy.shiftObject`
 *
 * @namespace  _
 * @method shift
 * @param {Array|Ember.ArrayProxy} value
 * @return {*}
 * @since v1.3.0
 */
export var shift = function(value) {
	return (_.isEmberArrayProxy(value)) ? value.shiftObject() : value.shift();
};
lodashEmber.shift = shift;


/**
 * Ember `typeOf` alias
 *
 * @namespace _
 * @method typeOf
 * @param {*} value: Value to check
 * @return {String} The type of `value`
 */
export var typeOf = (value) => Ember.typeOf(value);
lodashEmber.typeOf = typeOf;


export var lodashEmber;
export default lodashEmber;