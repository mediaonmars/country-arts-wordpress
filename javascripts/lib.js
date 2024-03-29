/*!
  * =============================================================
  * Ender: open module JavaScript framework (https://ender.no.de)
  * Build: ender build underscore underscore.string --output ../middleman/source/javascripts/lib
  * =============================================================
  */

/*!
  * Ender-JS: open module JavaScript framework (client-lib)
  * copyright Dustin Diaz & Jacob Thornton 2011 (@ded @fat)
  * https://ender.no.de
  * License MIT
  */

!function (context) {

  // a global object for node.js module compatiblity
  // ============================================

  context['global'] = context;

  // Implements simple module system
  // losely based on CommonJS Modules spec v1.1.1
  // ============================================

  var modules = {};

  function require (identifier) {
    var module = modules[identifier] || window[identifier];
    if (!module) throw new Error("Requested module '" + identifier + "' has not been defined.");
    return module;
  }

  function provide (name, what) {
    return modules[name] = what;
  }

  context['provide'] = provide;
  context['require'] = require;

  // Implements Ender's $ global access object
  // =========================================

  function aug(o, o2) {
    for (var k in o2) {
      k != 'noConflict' && k != '_VERSION' && (o[k] = o2[k]);
    }
    return o;
  }

  function boosh(s, r, els) {
                          // string || node || nodelist || window
    if (ender._select && (typeof s == 'string' || s.nodeName || s.length && 'item' in s || s == window)) {
      els = ender._select(s, r);
      els.selector = s;
    } else {
      els = isFinite(s.length) ? s : [s];
    }
    return aug(els, boosh);
  }

  function ender(s, r) {
    return boosh(s, r);
  }

  aug(ender, {
    _VERSION: '0.2.5',
    ender: function (o, chain) {
      aug(chain ? boosh : ender, o);
    },
    fn: context.$ && context.$.fn || {} // for easy compat to jQuery plugins
  });

  aug(boosh, {
    forEach: function (fn, scope, i) {
      // opt out of native forEach so we can intentionally call our own scope
      // defaulting to the current item and be able to return self
      for (i = 0, l = this.length; i < l; ++i) {
        i in this && fn.call(scope || this[i], this[i], i, this);
      }
      // return self for chaining
      return this;
    },
    $: ender // handy reference to self
  });

  var old = context.$;
  ender.noConflict = function () {
    context.$ = old;
    return this;
  };

  (typeof module !== 'undefined') && module.exports && (module.exports = ender);
  // use subscript notation as extern for Closure compilation
  context['ender'] = context['$'] = context['ender'] || ender;

}(this);

!function () {

  var module = { exports: {} }, exports = module.exports;

  // Underscore.string
  // (c) 2010 Esa-Matti Suuronen <esa-matti aet suuronen dot org>
  // Underscore.strings is freely distributable under the terms of the MIT license.
  // Documentation: https://github.com/edtsech/underscore.string
  // Some code is borrowed from MooTools and Alexandru Marasteanu.
  
  // Version 1.1.6
  
  
  (function(root){
    'use strict';
  
    if (typeof _ != 'undefined') {
      var _reverse = _().reverse,
          _include = _.include;
    }
  
    // Defining helper functions.
  
    var nativeTrim = String.prototype.trim;
  
    var parseNumber = function(source) { return source * 1 || 0; };
  
    var strRepeat = function(i, m) {
      for (var o = []; m > 0; o[--m] = i);
      return o.join('');
    };
  
    var slice = function(a){
      return Array.prototype.slice.call(a);
    };
  
    var defaultToWhiteSpace = function(characters){
      if (characters) {
        return _s.escapeRegExp(characters);
      }
      return '\\s';
    };
  
    var sArgs = function(method){
      return function(){
        var args = slice(arguments);
        for(var i=0; i<args.length; i++)
          args[i] = args[i] == null ? '' : '' + args[i];
        return method.apply(null, args);
      };
    };
  
    // sprintf() for JavaScript 0.7-beta1
    // http://www.diveintojavascript.com/projects/javascript-sprintf
    //
    // Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
    // All rights reserved.
  
    var sprintf = (function() {
      function get_type(variable) {
        return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
      }
  
      var str_repeat = strRepeat;
  
      var str_format = function() {
        if (!str_format.cache.hasOwnProperty(arguments[0])) {
          str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
        }
        return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
      };
  
      str_format.format = function(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
        for (i = 0; i < tree_length; i++) {
          node_type = get_type(parse_tree[i]);
          if (node_type === 'string') {
            output.push(parse_tree[i]);
          }
          else if (node_type === 'array') {
            match = parse_tree[i]; // convenience purposes only
            if (match[2]) { // keyword argument
              arg = argv[cursor];
              for (k = 0; k < match[2].length; k++) {
                if (!arg.hasOwnProperty(match[2][k])) {
                  throw(sprintf('[_.sprintf] property "%s" does not exist', match[2][k]));
                }
                arg = arg[match[2][k]];
              }
            } else if (match[1]) { // positional argument (explicit)
              arg = argv[match[1]];
            }
            else { // positional argument (implicit)
              arg = argv[cursor++];
            }
  
            if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
              throw(sprintf('[_.sprintf] expecting number but found %s', get_type(arg)));
            }
            switch (match[8]) {
              case 'b': arg = arg.toString(2); break;
              case 'c': arg = String.fromCharCode(arg); break;
              case 'd': arg = parseInt(arg, 10); break;
              case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
              case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
              case 'o': arg = arg.toString(8); break;
              case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
              case 'u': arg = Math.abs(arg); break;
              case 'x': arg = arg.toString(16); break;
              case 'X': arg = arg.toString(16).toUpperCase(); break;
            }
            arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
            pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
            pad_length = match[6] - String(arg).length;
            pad = match[6] ? str_repeat(pad_character, pad_length) : '';
            output.push(match[5] ? arg + pad : pad + arg);
          }
        }
        return output.join('');
      };
  
      str_format.cache = {};
  
      str_format.parse = function(fmt) {
        var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
        while (_fmt) {
          if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
            parse_tree.push(match[0]);
          }
          else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
            parse_tree.push('%');
          }
          else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
            if (match[2]) {
              arg_names |= 1;
              var field_list = [], replacement_field = match[2], field_match = [];
              if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                field_list.push(field_match[1]);
                while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                  if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                    field_list.push(field_match[1]);
                  }
                  else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
                    field_list.push(field_match[1]);
                  }
                  else {
                    throw('[_.sprintf] huh?');
                  }
                }
              }
              else {
                throw('[_.sprintf] huh?');
              }
              match[2] = field_list;
            }
            else {
              arg_names |= 2;
            }
            if (arg_names === 3) {
              throw('[_.sprintf] mixing positional and named placeholders is not (yet) supported');
            }
            parse_tree.push(match);
          }
          else {
            throw('[_.sprintf] huh?');
          }
          _fmt = _fmt.substring(match[0].length);
        }
        return parse_tree;
      };
  
      return str_format;
    })();
  
  
  
    // Defining underscore.string
  
    var _s = {
  
      isBlank: sArgs(function(str){
        return (/^\s*$/).test(str);
      }),
  
      stripTags: sArgs(function(str){
        return str.replace(/<\/?[^>]+>/ig, '');
      }),
  
      capitalize : sArgs(function(str) {
        return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
      }),
  
      chop: sArgs(function(str, step){
        step = parseNumber(step) || str.length;
        var arr = [];
        for (var i = 0; i < str.length;) {
          arr.push(str.slice(i,i + step));
          i = i + step;
        }
        return arr;
      }),
  
      clean: sArgs(function(str){
        return _s.strip(str.replace(/\s+/g, ' '));
      }),
  
      count: sArgs(function(str, substr){
        var count = 0, index;
        for (var i=0; i < str.length;) {
          index = str.indexOf(substr, i);
          index >= 0 && count++;
          i = i + (index >= 0 ? index : 0) + substr.length;
        }
        return count;
      }),
  
      chars: sArgs(function(str) {
        return str.split('');
      }),
  
      escapeHTML: sArgs(function(str) {
        return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
                              .replace(/"/g, '&quot;').replace(/'/g, "&apos;");
      }),
  
      unescapeHTML: sArgs(function(str) {
        return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
                              .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
      }),
  
      escapeRegExp: sArgs(function(str){
        // From MooTools core 1.2.4
        return str.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
      }),
  
      insert: sArgs(function(str, i, substr){
        var arr = str.split('');
        arr.splice(parseNumber(i), 0, substr);
        return arr.join('');
      }),
  
      includes: sArgs(function(str, needle){
        return str.indexOf(needle) !== -1;
      }),
  
      include: function(obj, needle) {
        if (!_include || (/string|number/).test(typeof obj)) {
          return this.includes(obj, needle);
        } else {
          return _include(obj, needle);
        }
      },
  
      join: sArgs(function(sep) {
        var args = slice(arguments);
        return args.join(args.shift());
      }),
  
      lines: sArgs(function(str) {
        return str.split("\n");
      }),
  
      reverse: function(obj){
        if (!_reverse || (/string|number/).test(typeof obj)) {
          return Array.prototype.reverse.apply(String(obj).split('')).join('');
        } else {
          return _reverse.call(_(obj));
        }
      },
  
      splice: sArgs(function(str, i, howmany, substr){
        var arr = str.split('');
        arr.splice(parseNumber(i), parseNumber(howmany), substr);
        return arr.join('');
      }),
  
      startsWith: sArgs(function(str, starts){
        return str.length >= starts.length && str.substring(0, starts.length) === starts;
      }),
  
      endsWith: sArgs(function(str, ends){
        return str.length >= ends.length && str.substring(str.length - ends.length) === ends;
      }),
  
      succ: sArgs(function(str){
        var arr = str.split('');
        arr.splice(str.length-1, 1, String.fromCharCode(str.charCodeAt(str.length-1) + 1));
        return arr.join('');
      }),
  
      titleize: sArgs(function(str){
        var arr = str.split(' '),
            word;
        for (var i=0; i < arr.length; i++) {
          word = arr[i].split('');
          if(typeof word[0] !== 'undefined') word[0] = word[0].toUpperCase();
          i+1 === arr.length ? arr[i] = word.join('') : arr[i] = word.join('') + ' ';
        }
        return arr.join('');
      }),
  
      camelize: sArgs(function(str){
        return _s.trim(str).replace(/(\-|_|\s)+(.)?/g, function(match, separator, chr) {
          return chr ? chr.toUpperCase() : '';
        });
      }),
  
      underscored: function(str){
        return _s.trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/\-|\s+/g, '_').toLowerCase();
      },
  
      dasherize: function(str){
        return _s.trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1-$2').replace(/^([A-Z]+)/, '-$1').replace(/\_|\s+/g, '-').toLowerCase();
      },
  
      trim: sArgs(function(str, characters){
        if (!characters && nativeTrim) {
          return nativeTrim.call(str);
        }
        characters = defaultToWhiteSpace(characters);
        return str.replace(new RegExp('\^[' + characters + ']+|[' + characters + ']+$', 'g'), '');
      }),
  
      ltrim: sArgs(function(str, characters){
        characters = defaultToWhiteSpace(characters);
        return str.replace(new RegExp('\^[' + characters + ']+', 'g'), '');
      }),
  
      rtrim: sArgs(function(str, characters){
        characters = defaultToWhiteSpace(characters);
        return str.replace(new RegExp('[' + characters + ']+$', 'g'), '');
      }),
  
      truncate: sArgs(function(str, length, truncateStr){
        truncateStr = truncateStr || '...';
        length = parseNumber(length);
        return str.length > length ? str.slice(0,length) + truncateStr : str;
      }),
  
      words: function(str, delimiter) {
        return String(str).split(delimiter || " ");
      },
  
      pad: sArgs(function(str, length, padStr, type) {
        var padding = '',
            padlen  = 0;
  
        length = parseNumber(length);
  
        if (!padStr) { padStr = ' '; }
        else if (padStr.length > 1) { padStr = padStr.charAt(0); }
        switch(type) {
          case 'right':
            padlen = (length - str.length);
            padding = strRepeat(padStr, padlen);
            str = str+padding;
            break;
          case 'both':
            padlen = (length - str.length);
            padding = {
              'left' : strRepeat(padStr, Math.ceil(padlen/2)),
              'right': strRepeat(padStr, Math.floor(padlen/2))
            };
            str = padding.left+str+padding.right;
            break;
          default: // 'left'
            padlen = (length - str.length);
            padding = strRepeat(padStr, padlen);;
            str = padding+str;
          }
        return str;
      }),
  
      lpad: function(str, length, padStr) {
        return _s.pad(str, length, padStr);
      },
  
      rpad: function(str, length, padStr) {
        return _s.pad(str, length, padStr, 'right');
      },
  
      lrpad: function(str, length, padStr) {
        return _s.pad(str, length, padStr, 'both');
      },
  
      sprintf: sprintf,
  
      vsprintf: function(fmt, argv){
        argv.unshift(fmt);
        return sprintf.apply(null, argv);
      },
  
      toNumber: function(str, decimals) {
        var num = parseNumber(parseNumber(str).toFixed(parseNumber(decimals)));
        return (!(num === 0 && (str !== "0" && str !== 0))) ? num : Number.NaN;
      },
  
      strRight: sArgs(function(sourceStr, sep){
        var pos =  (!sep) ? -1 : sourceStr.indexOf(sep);
        return (pos != -1) ? sourceStr.slice(pos+sep.length, sourceStr.length) : sourceStr;
      }),
  
      strRightBack: sArgs(function(sourceStr, sep){
        var pos =  (!sep) ? -1 : sourceStr.lastIndexOf(sep);
        return (pos != -1) ? sourceStr.slice(pos+sep.length, sourceStr.length) : sourceStr;
      }),
  
      strLeft: sArgs(function(sourceStr, sep){
        var pos = (!sep) ? -1 : sourceStr.indexOf(sep);
        return (pos != -1) ? sourceStr.slice(0, pos) : sourceStr;
      }),
  
      strLeftBack: sArgs(function(sourceStr, sep){
        var pos = sourceStr.lastIndexOf(sep);
        return (pos != -1) ? sourceStr.slice(0, pos) : sourceStr;
      })
  
    };
  
    // Aliases
  
    _s.strip  = _s.trim;
    _s.lstrip = _s.ltrim;
    _s.rstrip = _s.rtrim;
    _s.center = _s.lrpad;
    _s.ljust  = _s.lpad;
    _s.rjust  = _s.rpad;
  
    // CommonJS module is defined
    if (typeof module !== 'undefined' && module.exports) {
      // Export module
      module.exports = _s;
  
    // Integrate with Underscore.js
    } else if (typeof root._ !== 'undefined') {
      root._.mixin(_s);
  
    // Or define it
    } else {
      root._ = _s;
    }
  
  }(this || window));
  

  provide("underscore.string", module.exports);

  $.ender(module.exports);

}();

!function () {

  var module = { exports: {} }, exports = module.exports;

  //     Underscore.js 1.1.7
  //     (c) 2011 Jeremy Ashkenas, DocumentCloud Inc.
  //     Underscore is freely distributable under the MIT license.
  //     Portions of Underscore are inspired or borrowed from Prototype,
  //     Oliver Steele's Functional, and John Resig's Micro-Templating.
  //     For all details and documentation:
  //     http://documentcloud.github.com/underscore
  
  (function() {
  
    // Baseline setup
    // --------------
  
    // Establish the root object, `window` in the browser, or `global` on the server.
    var root = this;
  
    // Save the previous value of the `_` variable.
    var previousUnderscore = root._;
  
    // Establish the object that gets returned to break out of a loop iteration.
    var breaker = {};
  
    // Save bytes in the minified (but not gzipped) version:
    var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
  
    // Create quick reference variables for speed access to core prototypes.
    var slice            = ArrayProto.slice,
        unshift          = ArrayProto.unshift,
        toString         = ObjProto.toString,
        hasOwnProperty   = ObjProto.hasOwnProperty;
  
    // All **ECMAScript 5** native function implementations that we hope to use
    // are declared here.
    var
      nativeForEach      = ArrayProto.forEach,
      nativeMap          = ArrayProto.map,
      nativeReduce       = ArrayProto.reduce,
      nativeReduceRight  = ArrayProto.reduceRight,
      nativeFilter       = ArrayProto.filter,
      nativeEvery        = ArrayProto.every,
      nativeSome         = ArrayProto.some,
      nativeIndexOf      = ArrayProto.indexOf,
      nativeLastIndexOf  = ArrayProto.lastIndexOf,
      nativeIsArray      = Array.isArray,
      nativeKeys         = Object.keys,
      nativeBind         = FuncProto.bind;
  
    // Create a safe reference to the Underscore object for use below.
    var _ = function(obj) { return new wrapper(obj); };
  
    // Export the Underscore object for **CommonJS**, with backwards-compatibility
    // for the old `require()` API. If we're not in CommonJS, add `_` to the
    // global object.
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = _;
      _._ = _;
    } else {
      // Exported as a string, for Closure Compiler "advanced" mode.
      root['_'] = _;
    }
  
    // Current version.
    _.VERSION = '1.1.7';
  
    // Collection Functions
    // --------------------
  
    // The cornerstone, an `each` implementation, aka `forEach`.
    // Handles objects with the built-in `forEach`, arrays, and raw objects.
    // Delegates to **ECMAScript 5**'s native `forEach` if available.
    var each = _.each = _.forEach = function(obj, iterator, context) {
      if (obj == null) return;
      if (nativeForEach && obj.forEach === nativeForEach) {
        obj.forEach(iterator, context);
      } else if (obj.length === +obj.length) {
        for (var i = 0, l = obj.length; i < l; i++) {
          if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
        }
      } else {
        for (var key in obj) {
          if (hasOwnProperty.call(obj, key)) {
            if (iterator.call(context, obj[key], key, obj) === breaker) return;
          }
        }
      }
    };
  
    // Return the results of applying the iterator to each element.
    // Delegates to **ECMAScript 5**'s native `map` if available.
    _.map = function(obj, iterator, context) {
      var results = [];
      if (obj == null) return results;
      if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
      each(obj, function(value, index, list) {
        results[results.length] = iterator.call(context, value, index, list);
      });
      return results;
    };
  
    // **Reduce** builds up a single result from a list of values, aka `inject`,
    // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
    _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
      var initial = memo !== void 0;
      if (obj == null) obj = [];
      if (nativeReduce && obj.reduce === nativeReduce) {
        if (context) iterator = _.bind(iterator, context);
        return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
      }
      each(obj, function(value, index, list) {
        if (!initial) {
          memo = value;
          initial = true;
        } else {
          memo = iterator.call(context, memo, value, index, list);
        }
      });
      if (!initial) throw new TypeError("Reduce of empty array with no initial value");
      return memo;
    };
  
    // The right-associative version of reduce, also known as `foldr`.
    // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
    _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
      if (obj == null) obj = [];
      if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
        if (context) iterator = _.bind(iterator, context);
        return memo !== void 0 ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
      }
      var reversed = (_.isArray(obj) ? obj.slice() : _.toArray(obj)).reverse();
      return _.reduce(reversed, iterator, memo, context);
    };
  
    // Return the first value which passes a truth test. Aliased as `detect`.
    _.find = _.detect = function(obj, iterator, context) {
      var result;
      any(obj, function(value, index, list) {
        if (iterator.call(context, value, index, list)) {
          result = value;
          return true;
        }
      });
      return result;
    };
  
    // Return all the elements that pass a truth test.
    // Delegates to **ECMAScript 5**'s native `filter` if available.
    // Aliased as `select`.
    _.filter = _.select = function(obj, iterator, context) {
      var results = [];
      if (obj == null) return results;
      if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
      each(obj, function(value, index, list) {
        if (iterator.call(context, value, index, list)) results[results.length] = value;
      });
      return results;
    };
  
    // Return all the elements for which a truth test fails.
    _.reject = function(obj, iterator, context) {
      var results = [];
      if (obj == null) return results;
      each(obj, function(value, index, list) {
        if (!iterator.call(context, value, index, list)) results[results.length] = value;
      });
      return results;
    };
  
    // Determine whether all of the elements match a truth test.
    // Delegates to **ECMAScript 5**'s native `every` if available.
    // Aliased as `all`.
    _.every = _.all = function(obj, iterator, context) {
      var result = true;
      if (obj == null) return result;
      if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
      each(obj, function(value, index, list) {
        if (!(result = result && iterator.call(context, value, index, list))) return breaker;
      });
      return result;
    };
  
    // Determine if at least one element in the object matches a truth test.
    // Delegates to **ECMAScript 5**'s native `some` if available.
    // Aliased as `any`.
    var any = _.some = _.any = function(obj, iterator, context) {
      iterator = iterator || _.identity;
      var result = false;
      if (obj == null) return result;
      if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
      each(obj, function(value, index, list) {
        if (result |= iterator.call(context, value, index, list)) return breaker;
      });
      return !!result;
    };
  
    // Determine if a given value is included in the array or object using `===`.
    // Aliased as `contains`.
    _.include = _.contains = function(obj, target) {
      var found = false;
      if (obj == null) return found;
      if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
      any(obj, function(value) {
        if (found = value === target) return true;
      });
      return found;
    };
  
    // Invoke a method (with arguments) on every item in a collection.
    _.invoke = function(obj, method) {
      var args = slice.call(arguments, 2);
      return _.map(obj, function(value) {
        return (method.call ? method || value : value[method]).apply(value, args);
      });
    };
  
    // Convenience version of a common use case of `map`: fetching a property.
    _.pluck = function(obj, key) {
      return _.map(obj, function(value){ return value[key]; });
    };
  
    // Return the maximum element or (element-based computation).
    _.max = function(obj, iterator, context) {
      if (!iterator && _.isArray(obj)) return Math.max.apply(Math, obj);
      var result = {computed : -Infinity};
      each(obj, function(value, index, list) {
        var computed = iterator ? iterator.call(context, value, index, list) : value;
        computed >= result.computed && (result = {value : value, computed : computed});
      });
      return result.value;
    };
  
    // Return the minimum element (or element-based computation).
    _.min = function(obj, iterator, context) {
      if (!iterator && _.isArray(obj)) return Math.min.apply(Math, obj);
      var result = {computed : Infinity};
      each(obj, function(value, index, list) {
        var computed = iterator ? iterator.call(context, value, index, list) : value;
        computed < result.computed && (result = {value : value, computed : computed});
      });
      return result.value;
    };
  
    // Sort the object's values by a criterion produced by an iterator.
    _.sortBy = function(obj, iterator, context) {
      return _.pluck(_.map(obj, function(value, index, list) {
        return {
          value : value,
          criteria : iterator.call(context, value, index, list)
        };
      }).sort(function(left, right) {
        var a = left.criteria, b = right.criteria;
        return a < b ? -1 : a > b ? 1 : 0;
      }), 'value');
    };
  
    // Groups the object's values by a criterion produced by an iterator
    _.groupBy = function(obj, iterator) {
      var result = {};
      each(obj, function(value, index) {
        var key = iterator(value, index);
        (result[key] || (result[key] = [])).push(value);
      });
      return result;
    };
  
    // Use a comparator function to figure out at what index an object should
    // be inserted so as to maintain order. Uses binary search.
    _.sortedIndex = function(array, obj, iterator) {
      iterator || (iterator = _.identity);
      var low = 0, high = array.length;
      while (low < high) {
        var mid = (low + high) >> 1;
        iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
      }
      return low;
    };
  
    // Safely convert anything iterable into a real, live array.
    _.toArray = function(iterable) {
      if (!iterable)                return [];
      if (iterable.toArray)         return iterable.toArray();
      if (_.isArray(iterable))      return slice.call(iterable);
      if (_.isArguments(iterable))  return slice.call(iterable);
      return _.values(iterable);
    };
  
    // Return the number of elements in an object.
    _.size = function(obj) {
      return _.toArray(obj).length;
    };
  
    // Array Functions
    // ---------------
  
    // Get the first element of an array. Passing **n** will return the first N
    // values in the array. Aliased as `head`. The **guard** check allows it to work
    // with `_.map`.
    _.first = _.head = function(array, n, guard) {
      return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
    };
  
    // Returns everything but the first entry of the array. Aliased as `tail`.
    // Especially useful on the arguments object. Passing an **index** will return
    // the rest of the values in the array from that index onward. The **guard**
    // check allows it to work with `_.map`.
    _.rest = _.tail = function(array, index, guard) {
      return slice.call(array, (index == null) || guard ? 1 : index);
    };
  
    // Get the last element of an array.
    _.last = function(array) {
      return array[array.length - 1];
    };
  
    // Trim out all falsy values from an array.
    _.compact = function(array) {
      return _.filter(array, function(value){ return !!value; });
    };
  
    // Return a completely flattened version of an array.
    _.flatten = function(array) {
      return _.reduce(array, function(memo, value) {
        if (_.isArray(value)) return memo.concat(_.flatten(value));
        memo[memo.length] = value;
        return memo;
      }, []);
    };
  
    // Return a version of the array that does not contain the specified value(s).
    _.without = function(array) {
      return _.difference(array, slice.call(arguments, 1));
    };
  
    // Produce a duplicate-free version of the array. If the array has already
    // been sorted, you have the option of using a faster algorithm.
    // Aliased as `unique`.
    _.uniq = _.unique = function(array, isSorted) {
      return _.reduce(array, function(memo, el, i) {
        if (0 == i || (isSorted === true ? _.last(memo) != el : !_.include(memo, el))) memo[memo.length] = el;
        return memo;
      }, []);
    };
  
    // Produce an array that contains the union: each distinct element from all of
    // the passed-in arrays.
    _.union = function() {
      return _.uniq(_.flatten(arguments));
    };
  
    // Produce an array that contains every item shared between all the
    // passed-in arrays. (Aliased as "intersect" for back-compat.)
    _.intersection = _.intersect = function(array) {
      var rest = slice.call(arguments, 1);
      return _.filter(_.uniq(array), function(item) {
        return _.every(rest, function(other) {
          return _.indexOf(other, item) >= 0;
        });
      });
    };
  
    // Take the difference between one array and another.
    // Only the elements present in just the first array will remain.
    _.difference = function(array, other) {
      return _.filter(array, function(value){ return !_.include(other, value); });
    };
  
    // Zip together multiple lists into a single array -- elements that share
    // an index go together.
    _.zip = function() {
      var args = slice.call(arguments);
      var length = _.max(_.pluck(args, 'length'));
      var results = new Array(length);
      for (var i = 0; i < length; i++) results[i] = _.pluck(args, "" + i);
      return results;
    };
  
    // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
    // we need this function. Return the position of the first occurrence of an
    // item in an array, or -1 if the item is not included in the array.
    // Delegates to **ECMAScript 5**'s native `indexOf` if available.
    // If the array is large and already in sort order, pass `true`
    // for **isSorted** to use binary search.
    _.indexOf = function(array, item, isSorted) {
      if (array == null) return -1;
      var i, l;
      if (isSorted) {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
      if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
      for (i = 0, l = array.length; i < l; i++) if (array[i] === item) return i;
      return -1;
    };
  
  
    // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
    _.lastIndexOf = function(array, item) {
      if (array == null) return -1;
      if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
      var i = array.length;
      while (i--) if (array[i] === item) return i;
      return -1;
    };
  
    // Generate an integer Array containing an arithmetic progression. A port of
    // the native Python `range()` function. See
    // [the Python documentation](http://docs.python.org/library/functions.html#range).
    _.range = function(start, stop, step) {
      if (arguments.length <= 1) {
        stop = start || 0;
        start = 0;
      }
      step = arguments[2] || 1;
  
      var len = Math.max(Math.ceil((stop - start) / step), 0);
      var idx = 0;
      var range = new Array(len);
  
      while(idx < len) {
        range[idx++] = start;
        start += step;
      }
  
      return range;
    };
  
    // Function (ahem) Functions
    // ------------------
  
    // Create a function bound to a given object (assigning `this`, and arguments,
    // optionally). Binding with arguments is also known as `curry`.
    // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
    // We check for `func.bind` first, to fail fast when `func` is undefined.
    _.bind = function(func, obj) {
      if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
      var args = slice.call(arguments, 2);
      return function() {
        return func.apply(obj, args.concat(slice.call(arguments)));
      };
    };
  
    // Bind all of an object's methods to that object. Useful for ensuring that
    // all callbacks defined on an object belong to it.
    _.bindAll = function(obj) {
      var funcs = slice.call(arguments, 1);
      if (funcs.length == 0) funcs = _.functions(obj);
      each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
      return obj;
    };
  
    // Memoize an expensive function by storing its results.
    _.memoize = function(func, hasher) {
      var memo = {};
      hasher || (hasher = _.identity);
      return function() {
        var key = hasher.apply(this, arguments);
        return hasOwnProperty.call(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
      };
    };
  
    // Delays a function for the given number of milliseconds, and then calls
    // it with the arguments supplied.
    _.delay = function(func, wait) {
      var args = slice.call(arguments, 2);
      return setTimeout(function(){ return func.apply(func, args); }, wait);
    };
  
    // Defers a function, scheduling it to run after the current call stack has
    // cleared.
    _.defer = function(func) {
      return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
    };
  
    // Internal function used to implement `_.throttle` and `_.debounce`.
    var limit = function(func, wait, debounce) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var throttler = function() {
          timeout = null;
          func.apply(context, args);
        };
        if (debounce) clearTimeout(timeout);
        if (debounce || !timeout) timeout = setTimeout(throttler, wait);
      };
    };
  
    // Returns a function, that, when invoked, will only be triggered at most once
    // during a given window of time.
    _.throttle = function(func, wait) {
      return limit(func, wait, false);
    };
  
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds.
    _.debounce = function(func, wait) {
      return limit(func, wait, true);
    };
  
    // Returns a function that will be executed at most one time, no matter how
    // often you call it. Useful for lazy initialization.
    _.once = function(func) {
      var ran = false, memo;
      return function() {
        if (ran) return memo;
        ran = true;
        return memo = func.apply(this, arguments);
      };
    };
  
    // Returns the first function passed as an argument to the second,
    // allowing you to adjust arguments, run code before and after, and
    // conditionally execute the original function.
    _.wrap = function(func, wrapper) {
      return function() {
        var args = [func].concat(slice.call(arguments));
        return wrapper.apply(this, args);
      };
    };
  
    // Returns a function that is the composition of a list of functions, each
    // consuming the return value of the function that follows.
    _.compose = function() {
      var funcs = slice.call(arguments);
      return function() {
        var args = slice.call(arguments);
        for (var i = funcs.length - 1; i >= 0; i--) {
          args = [funcs[i].apply(this, args)];
        }
        return args[0];
      };
    };
  
    // Returns a function that will only be executed after being called N times.
    _.after = function(times, func) {
      return function() {
        if (--times < 1) { return func.apply(this, arguments); }
      };
    };
  
  
    // Object Functions
    // ----------------
  
    // Retrieve the names of an object's properties.
    // Delegates to **ECMAScript 5**'s native `Object.keys`
    _.keys = nativeKeys || function(obj) {
      if (obj !== Object(obj)) throw new TypeError('Invalid object');
      var keys = [];
      for (var key in obj) if (hasOwnProperty.call(obj, key)) keys[keys.length] = key;
      return keys;
    };
  
    // Retrieve the values of an object's properties.
    _.values = function(obj) {
      return _.map(obj, _.identity);
    };
  
    // Return a sorted list of the function names available on the object.
    // Aliased as `methods`
    _.functions = _.methods = function(obj) {
      var names = [];
      for (var key in obj) {
        if (_.isFunction(obj[key])) names.push(key);
      }
      return names.sort();
    };
  
    // Extend a given object with all the properties in passed-in object(s).
    _.extend = function(obj) {
      each(slice.call(arguments, 1), function(source) {
        for (var prop in source) {
          if (source[prop] !== void 0) obj[prop] = source[prop];
        }
      });
      return obj;
    };
  
    // Fill in a given object with default properties.
    _.defaults = function(obj) {
      each(slice.call(arguments, 1), function(source) {
        for (var prop in source) {
          if (obj[prop] == null) obj[prop] = source[prop];
        }
      });
      return obj;
    };
  
    // Create a (shallow-cloned) duplicate of an object.
    _.clone = function(obj) {
      return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    };
  
    // Invokes interceptor with the obj, and then returns obj.
    // The primary purpose of this method is to "tap into" a method chain, in
    // order to perform operations on intermediate results within the chain.
    _.tap = function(obj, interceptor) {
      interceptor(obj);
      return obj;
    };
  
    // Perform a deep comparison to check if two objects are equal.
    _.isEqual = function(a, b) {
      // Check object identity.
      if (a === b) return true;
      // Different types?
      var atype = typeof(a), btype = typeof(b);
      if (atype != btype) return false;
      // Basic equality test (watch out for coercions).
      if (a == b) return true;
      // One is falsy and the other truthy.
      if ((!a && b) || (a && !b)) return false;
      // Unwrap any wrapped objects.
      if (a._chain) a = a._wrapped;
      if (b._chain) b = b._wrapped;
      // One of them implements an isEqual()?
      if (a.isEqual) return a.isEqual(b);
      if (b.isEqual) return b.isEqual(a);
      // Check dates' integer values.
      if (_.isDate(a) && _.isDate(b)) return a.getTime() === b.getTime();
      // Both are NaN?
      if (_.isNaN(a) && _.isNaN(b)) return false;
      // Compare regular expressions.
      if (_.isRegExp(a) && _.isRegExp(b))
        return a.source     === b.source &&
               a.global     === b.global &&
               a.ignoreCase === b.ignoreCase &&
               a.multiline  === b.multiline;
      // If a is not an object by this point, we can't handle it.
      if (atype !== 'object') return false;
      // Check for different array lengths before comparing contents.
      if (a.length && (a.length !== b.length)) return false;
      // Nothing else worked, deep compare the contents.
      var aKeys = _.keys(a), bKeys = _.keys(b);
      // Different object sizes?
      if (aKeys.length != bKeys.length) return false;
      // Recursive comparison of contents.
      for (var key in a) if (!(key in b) || !_.isEqual(a[key], b[key])) return false;
      return true;
    };
  
    // Is a given array or object empty?
    _.isEmpty = function(obj) {
      if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
      for (var key in obj) if (hasOwnProperty.call(obj, key)) return false;
      return true;
    };
  
    // Is a given value a DOM element?
    _.isElement = function(obj) {
      return !!(obj && obj.nodeType == 1);
    };
  
    // Is a given value an array?
    // Delegates to ECMA5's native Array.isArray
    _.isArray = nativeIsArray || function(obj) {
      return toString.call(obj) === '[object Array]';
    };
  
    // Is a given variable an object?
    _.isObject = function(obj) {
      return obj === Object(obj);
    };
  
    // Is a given variable an arguments object?
    _.isArguments = function(obj) {
      return !!(obj && hasOwnProperty.call(obj, 'callee'));
    };
  
    // Is a given value a function?
    _.isFunction = function(obj) {
      return !!(obj && obj.constructor && obj.call && obj.apply);
    };
  
    // Is a given value a string?
    _.isString = function(obj) {
      return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
    };
  
    // Is a given value a number?
    _.isNumber = function(obj) {
      return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed));
    };
  
    // Is the given value `NaN`? `NaN` happens to be the only value in JavaScript
    // that does not equal itself.
    _.isNaN = function(obj) {
      return obj !== obj;
    };
  
    // Is a given value a boolean?
    _.isBoolean = function(obj) {
      return obj === true || obj === false;
    };
  
    // Is a given value a date?
    _.isDate = function(obj) {
      return !!(obj && obj.getTimezoneOffset && obj.setUTCFullYear);
    };
  
    // Is the given value a regular expression?
    _.isRegExp = function(obj) {
      return !!(obj && obj.test && obj.exec && (obj.ignoreCase || obj.ignoreCase === false));
    };
  
    // Is a given value equal to null?
    _.isNull = function(obj) {
      return obj === null;
    };
  
    // Is a given variable undefined?
    _.isUndefined = function(obj) {
      return obj === void 0;
    };
  
    // Utility Functions
    // -----------------
  
    // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
    // previous owner. Returns a reference to the Underscore object.
    _.noConflict = function() {
      root._ = previousUnderscore;
      return this;
    };
  
    // Keep the identity function around for default iterators.
    _.identity = function(value) {
      return value;
    };
  
    // Run a function **n** times.
    _.times = function (n, iterator, context) {
      for (var i = 0; i < n; i++) iterator.call(context, i);
    };
  
    // Add your own custom functions to the Underscore object, ensuring that
    // they're correctly added to the OOP wrapper as well.
    _.mixin = function(obj) {
      each(_.functions(obj), function(name){
        addToWrapper(name, _[name] = obj[name]);
      });
    };
  
    // Generate a unique integer id (unique within the entire client session).
    // Useful for temporary DOM ids.
    var idCounter = 0;
    _.uniqueId = function(prefix) {
      var id = idCounter++;
      return prefix ? prefix + id : id;
    };
  
    // By default, Underscore uses ERB-style template delimiters, change the
    // following template settings to use alternative delimiters.
    _.templateSettings = {
      evaluate    : /<%([\s\S]+?)%>/g,
      interpolate : /<%=([\s\S]+?)%>/g
    };
  
    // JavaScript micro-templating, similar to John Resig's implementation.
    // Underscore templating handles arbitrary delimiters, preserves whitespace,
    // and correctly escapes quotes within interpolated code.
    _.template = function(str, data) {
      var c  = _.templateSettings;
      var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
        'with(obj||{}){__p.push(\'' +
        str.replace(/\\/g, '\\\\')
           .replace(/'/g, "\\'")
           .replace(c.interpolate, function(match, code) {
             return "'," + code.replace(/\\'/g, "'") + ",'";
           })
           .replace(c.evaluate || null, function(match, code) {
             return "');" + code.replace(/\\'/g, "'")
                                .replace(/[\r\n\t]/g, ' ') + "__p.push('";
           })
           .replace(/\r/g, '\\r')
           .replace(/\n/g, '\\n')
           .replace(/\t/g, '\\t')
           + "');}return __p.join('');";
      var func = new Function('obj', tmpl);
      return data ? func(data) : func;
    };
  
    // The OOP Wrapper
    // ---------------
  
    // If Underscore is called as a function, it returns a wrapped object that
    // can be used OO-style. This wrapper holds altered versions of all the
    // underscore functions. Wrapped objects may be chained.
    var wrapper = function(obj) { this._wrapped = obj; };
  
    // Expose `wrapper.prototype` as `_.prototype`
    _.prototype = wrapper.prototype;
  
    // Helper function to continue chaining intermediate results.
    var result = function(obj, chain) {
      return chain ? _(obj).chain() : obj;
    };
  
    // A method to easily add functions to the OOP wrapper.
    var addToWrapper = function(name, func) {
      wrapper.prototype[name] = function() {
        var args = slice.call(arguments);
        unshift.call(args, this._wrapped);
        return result(func.apply(_, args), this._chain);
      };
    };
  
    // Add all of the Underscore functions to the wrapper object.
    _.mixin(_);
  
    // Add all mutator Array functions to the wrapper.
    each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
      var method = ArrayProto[name];
      wrapper.prototype[name] = function() {
        method.apply(this._wrapped, arguments);
        return result(this._wrapped, this._chain);
      };
    });
  
    // Add all accessor Array functions to the wrapper.
    each(['concat', 'join', 'slice'], function(name) {
      var method = ArrayProto[name];
      wrapper.prototype[name] = function() {
        return result(method.apply(this._wrapped, arguments), this._chain);
      };
    });
  
    // Start chaining a wrapped Underscore object.
    wrapper.prototype.chain = function() {
      this._chain = true;
      return this;
    };
  
    // Extracts the result from a wrapped and chained object.
    wrapper.prototype.value = function() {
      return this._wrapped;
    };
  
  })();
  

  provide("underscore", module.exports);

  $.ender(module.exports);

}();
