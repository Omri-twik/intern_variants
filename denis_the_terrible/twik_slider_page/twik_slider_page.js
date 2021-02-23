document.getElementsByTagName("body")[0].innerHTML = "";
document.getElementsByTagName("head")[0].innerHTML = "";

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    global.numeral = factory();
  }
})(this, function () {
  var numeral,
    _,
    VERSION = "2.0.6",
    formats = {},
    locales = {},
    defaults = {
      currentLocale: "en",
      zeroFormat: null,
      nullFormat: null,
      defaultFormat: "0,0",
      scalePercentBy100: true,
    },
    options = {
      currentLocale: defaults.currentLocale,
      zeroFormat: defaults.zeroFormat,
      nullFormat: defaults.nullFormat,
      defaultFormat: defaults.defaultFormat,
      scalePercentBy100: defaults.scalePercentBy100,
    };

  function Numeral(input, number) {
    this._input = input;

    this._value = number;
  }

  numeral = function (input) {
    var value, kind, unformatFunction, regexp;

    if (numeral.isNumeral(input)) {
      value = input.value();
    } else if (input === 0 || typeof input === "undefined") {
      value = 0;
    } else if (input === null || _.isNaN(input)) {
      value = null;
    } else if (typeof input === "string") {
      if (options.zeroFormat && input === options.zeroFormat) {
        value = 0;
      } else if (
        (options.nullFormat && input === options.nullFormat) ||
        !input.replace(/[^0-9]+/g, "").length
      ) {
        value = null;
      } else {
        for (kind in formats) {
          regexp =
            typeof formats[kind].regexps.unformat === "function"
              ? formats[kind].regexps.unformat()
              : formats[kind].regexps.unformat;

          if (regexp && input.match(regexp)) {
            unformatFunction = formats[kind].unformat;

            break;
          }
        }

        unformatFunction = unformatFunction || numeral._.stringToNumber;

        value = unformatFunction(input);
      }
    } else {
      value = Number(input) || null;
    }

    return new Numeral(input, value);
  };

  numeral.version = VERSION;

  numeral.isNumeral = function (obj) {
    return obj instanceof Numeral;
  };

  numeral._ = _ = {
    numberToFormat: function (value, format, roundingFunction) {
      var locale = locales[numeral.options.currentLocale],
        negP = false,
        optDec = false,
        leadingCount = 0,
        abbr = "",
        trillion = 1000000000000,
        billion = 1000000000,
        million = 1000000,
        thousand = 1000,
        decimal = "",
        neg = false,
        abbrForce,
        abs,
        min,
        max,
        power,
        int,
        precision,
        signed,
        thousands,
        output;

      value = value || 0;

      abs = Math.abs(value);

      if (numeral._.includes(format, "(")) {
        negP = true;
        format = format.replace(/[\(|\)]/g, "");
      } else if (
        numeral._.includes(format, "+") ||
        numeral._.includes(format, "-")
      ) {
        signed = numeral._.includes(format, "+")
          ? format.indexOf("+")
          : value < 0
          ? format.indexOf("-")
          : -1;
        format = format.replace(/[\+|\-]/g, "");
      }

      if (numeral._.includes(format, "a")) {
        abbrForce = format.match(/a(k|m|b|t)?/);

        abbrForce = abbrForce ? abbrForce[1] : false;

        if (numeral._.includes(format, " a")) {
          abbr = " ";
        }

        format = format.replace(new RegExp(abbr + "a[kmbt]?"), "");

        if ((abs >= trillion && !abbrForce) || abbrForce === "t") {
          abbr += locale.abbreviations.trillion;
          value = value / trillion;
        } else if (
          (abs < trillion && abs >= billion && !abbrForce) ||
          abbrForce === "b"
        ) {
          abbr += locale.abbreviations.billion;
          value = value / billion;
        } else if (
          (abs < billion && abs >= million && !abbrForce) ||
          abbrForce === "m"
        ) {
          abbr += locale.abbreviations.million;
          value = value / million;
        } else if (
          (abs < million && abs >= thousand && !abbrForce) ||
          abbrForce === "k"
        ) {
          abbr += locale.abbreviations.thousand;
          value = value / thousand;
        }
      }

      if (numeral._.includes(format, "[.]")) {
        optDec = true;
        format = format.replace("[.]", ".");
      }

      int = value.toString().split(".")[0];
      precision = format.split(".")[1];
      thousands = format.indexOf(",");
      leadingCount = (format.split(".")[0].split(",")[0].match(/0/g) || [])
        .length;

      if (precision) {
        if (numeral._.includes(precision, "[")) {
          precision = precision.replace("]", "");
          precision = precision.split("[");
          decimal = numeral._.toFixed(
            value,
            precision[0].length + precision[1].length,
            roundingFunction,
            precision[1].length
          );
        } else {
          decimal = numeral._.toFixed(
            value,
            precision.length,
            roundingFunction
          );
        }

        int = decimal.split(".")[0];

        if (numeral._.includes(decimal, ".")) {
          decimal = locale.delimiters.decimal + decimal.split(".")[1];
        } else {
          decimal = "";
        }

        if (optDec && Number(decimal.slice(1)) === 0) {
          decimal = "";
        }
      } else {
        int = numeral._.toFixed(value, 0, roundingFunction);
      }

      if (
        abbr &&
        !abbrForce &&
        Number(int) >= 1000 &&
        abbr !== locale.abbreviations.trillion
      ) {
        int = String(Number(int) / 1000);

        switch (abbr) {
          case locale.abbreviations.thousand:
            abbr = locale.abbreviations.million;
            break;
          case locale.abbreviations.million:
            abbr = locale.abbreviations.billion;
            break;
          case locale.abbreviations.billion:
            abbr = locale.abbreviations.trillion;
            break;
        }
      }

      if (numeral._.includes(int, "-")) {
        int = int.slice(1);
        neg = true;
      }

      if (int.length < leadingCount) {
        for (var i = leadingCount - int.length; i > 0; i--) {
          int = "0" + int;
        }
      }

      if (thousands > -1) {
        int = int
          .toString()
          .replace(
            /(\d)(?=(\d{3})+(?!\d))/g,
            "$1" + locale.delimiters.thousands
          );
      }

      if (format.indexOf(".") === 0) {
        int = "";
      }

      output = int + decimal + (abbr ? abbr : "");

      if (negP) {
        output = (negP && neg ? "(" : "") + output + (negP && neg ? ")" : "");
      } else {
        if (signed >= 0) {
          output =
            signed === 0
              ? (neg ? "-" : "+") + output
              : output + (neg ? "-" : "+");
        } else if (neg) {
          output = "-" + output;
        }
      }

      return output;
    },

    stringToNumber: function (string) {
      var locale = locales[options.currentLocale],
        stringOriginal = string,
        abbreviations = {
          thousand: 3,
          million: 6,
          billion: 9,
          trillion: 12,
        },
        abbreviation,
        value,
        i,
        regexp;

      if (options.zeroFormat && string === options.zeroFormat) {
        value = 0;
      } else if (
        (options.nullFormat && string === options.nullFormat) ||
        !string.replace(/[^0-9]+/g, "").length
      ) {
        value = null;
      } else {
        value = 1;

        if (locale.delimiters.decimal !== ".") {
          string = string
            .replace(/\./g, "")
            .replace(locale.delimiters.decimal, ".");
        }

        for (abbreviation in abbreviations) {
          regexp = new RegExp(
            "[^a-zA-Z]" +
              locale.abbreviations[abbreviation] +
              "(?:\\)|(\\" +
              locale.currency.symbol +
              ")?(?:\\))?)?$"
          );

          if (stringOriginal.match(regexp)) {
            value *= Math.pow(10, abbreviations[abbreviation]);
            break;
          }
        }

        value *=
          (string.split("-").length +
            Math.min(
              string.split("(").length - 1,
              string.split(")").length - 1
            )) %
          2
            ? 1
            : -1;

        string = string.replace(/[^0-9\.]+/g, "");

        value *= Number(string);
      }

      return value;
    },
    isNaN: function (value) {
      return typeof value === "number" && isNaN(value);
    },
    includes: function (string, search) {
      return string.indexOf(search) !== -1;
    },
    insert: function (string, subString, start) {
      return string.slice(0, start) + subString + string.slice(start);
    },
    reduce: function (array, callback) {
      if (this === null) {
        throw new TypeError(
          "Array.prototype.reduce called on null or undefined"
        );
      }

      if (typeof callback !== "function") {
        throw new TypeError(callback + " is not a function");
      }

      var t = Object(array),
        len = t.length >>> 0,
        k = 0,
        value;

      if (arguments.length === 3) {
        value = arguments[2];
      } else {
        while (k < len && !(k in t)) {
          k++;
        }

        if (k >= len) {
          throw new TypeError("Reduce of empty array with no initial value");
        }

        value = t[k++];
      }
      for (; k < len; k++) {
        if (k in t) {
          value = callback(value, t[k], k, t);
        }
      }
      return value;
    },

    multiplier: function (x) {
      var parts = x.toString().split(".");

      return parts.length < 2 ? 1 : Math.pow(10, parts[1].length);
    },

    correctionFactor: function () {
      var args = Array.prototype.slice.call(arguments);

      return args.reduce(function (accum, next) {
        var mn = _.multiplier(next);
        return accum > mn ? accum : mn;
      }, 1);
    },

    toFixed: function (value, maxDecimals, roundingFunction, optionals) {
      var splitValue = value.toString().split("."),
        minDecimals = maxDecimals - (optionals || 0),
        boundedPrecision,
        optionalsRegExp,
        power,
        output;

      if (splitValue.length === 2) {
        boundedPrecision = Math.min(
          Math.max(splitValue[1].length, minDecimals),
          maxDecimals
        );
      } else {
        boundedPrecision = minDecimals;
      }

      power = Math.pow(10, boundedPrecision);

      output = (
        roundingFunction(value + "e+" + boundedPrecision) / power
      ).toFixed(boundedPrecision);

      if (optionals > maxDecimals - boundedPrecision) {
        optionalsRegExp = new RegExp(
          "\\.?0{1," + (optionals - (maxDecimals - boundedPrecision)) + "}$"
        );
        output = output.replace(optionalsRegExp, "");
      }

      return output;
    },
  };

  numeral.options = options;

  numeral.formats = formats;

  numeral.locales = locales;

  numeral.locale = function (key) {
    if (key) {
      options.currentLocale = key.toLowerCase();
    }

    return options.currentLocale;
  };

  numeral.localeData = function (key) {
    if (!key) {
      return locales[options.currentLocale];
    }

    key = key.toLowerCase();

    if (!locales[key]) {
      throw new Error("Unknown locale : " + key);
    }

    return locales[key];
  };

  numeral.reset = function () {
    for (var property in defaults) {
      options[property] = defaults[property];
    }
  };

  numeral.zeroFormat = function (format) {
    options.zeroFormat = typeof format === "string" ? format : null;
  };

  numeral.nullFormat = function (format) {
    options.nullFormat = typeof format === "string" ? format : null;
  };

  numeral.defaultFormat = function (format) {
    options.defaultFormat = typeof format === "string" ? format : "0.0";
  };

  numeral.register = function (type, name, format) {
    name = name.toLowerCase();

    if (this[type + "s"][name]) {
      throw new TypeError(name + " " + type + " already registered.");
    }

    this[type + "s"][name] = format;

    return format;
  };

  numeral.validate = function (val, culture) {
    var _decimalSep,
      _thousandSep,
      _currSymbol,
      _valArray,
      _abbrObj,
      _thousandRegEx,
      localeData,
      temp;

    if (typeof val !== "string") {
      val += "";

      if (console.warn) {
        console.warn(
          "Numeral.js: Value is not string. It has been co-erced to: ",
          val
        );
      }
    }

    val = val.trim();

    if (!!val.match(/^\d+$/)) {
      return true;
    }

    if (val === "") {
      return false;
    }

    try {
      localeData = numeral.localeData(culture);
    } catch (e) {
      localeData = numeral.localeData(numeral.locale());
    }

    _currSymbol = localeData.currency.symbol;
    _abbrObj = localeData.abbreviations;
    _decimalSep = localeData.delimiters.decimal;
    if (localeData.delimiters.thousands === ".") {
      _thousandSep = "\\.";
    } else {
      _thousandSep = localeData.delimiters.thousands;
    }

    temp = val.match(/^[^\d]+/);
    if (temp !== null) {
      val = val.substr(1);
      if (temp[0] !== _currSymbol) {
        return false;
      }
    }

    temp = val.match(/[^\d]+$/);
    if (temp !== null) {
      val = val.slice(0, -1);
      if (
        temp[0] !== _abbrObj.thousand &&
        temp[0] !== _abbrObj.million &&
        temp[0] !== _abbrObj.billion &&
        temp[0] !== _abbrObj.trillion
      ) {
        return false;
      }
    }

    _thousandRegEx = new RegExp(_thousandSep + "{2}");

    if (!val.match(/[^\d.,]/g)) {
      _valArray = val.split(_decimalSep);
      if (_valArray.length > 2) {
        return false;
      } else {
        if (_valArray.length < 2) {
          return (
            !!_valArray[0].match(/^\d+.*\d$/) &&
            !_valArray[0].match(_thousandRegEx)
          );
        } else {
          if (_valArray[0].length === 1) {
            return (
              !!_valArray[0].match(/^\d+$/) &&
              !_valArray[0].match(_thousandRegEx) &&
              !!_valArray[1].match(/^\d+$/)
            );
          } else {
            return (
              !!_valArray[0].match(/^\d+.*\d$/) &&
              !_valArray[0].match(_thousandRegEx) &&
              !!_valArray[1].match(/^\d+$/)
            );
          }
        }
      }
    }

    return false;
  };

  numeral.fn = Numeral.prototype = {
    clone: function () {
      return numeral(this);
    },
    format: function (inputString, roundingFunction) {
      var value = this._value,
        format = inputString || options.defaultFormat,
        kind,
        output,
        formatFunction;

      roundingFunction = roundingFunction || Math.round;

      if (value === 0 && options.zeroFormat !== null) {
        output = options.zeroFormat;
      } else if (value === null && options.nullFormat !== null) {
        output = options.nullFormat;
      } else {
        for (kind in formats) {
          if (format.match(formats[kind].regexps.format)) {
            formatFunction = formats[kind].format;

            break;
          }
        }

        formatFunction = formatFunction || numeral._.numberToFormat;

        output = formatFunction(value, format, roundingFunction);
      }

      return output;
    },
    value: function () {
      return this._value;
    },
    input: function () {
      return this._input;
    },
    set: function (value) {
      this._value = Number(value);

      return this;
    },
    add: function (value) {
      var corrFactor = _.correctionFactor.call(null, this._value, value);

      function cback(accum, curr, currI, O) {
        return accum + Math.round(corrFactor * curr);
      }

      this._value = _.reduce([this._value, value], cback, 0) / corrFactor;

      return this;
    },
    subtract: function (value) {
      var corrFactor = _.correctionFactor.call(null, this._value, value);

      function cback(accum, curr, currI, O) {
        return accum - Math.round(corrFactor * curr);
      }

      this._value =
        _.reduce([value], cback, Math.round(this._value * corrFactor)) /
        corrFactor;

      return this;
    },
    multiply: function (value) {
      function cback(accum, curr, currI, O) {
        var corrFactor = _.correctionFactor(accum, curr);
        return (
          (Math.round(accum * corrFactor) * Math.round(curr * corrFactor)) /
          Math.round(corrFactor * corrFactor)
        );
      }

      this._value = _.reduce([this._value, value], cback, 1);

      return this;
    },
    divide: function (value) {
      function cback(accum, curr, currI, O) {
        var corrFactor = _.correctionFactor(accum, curr);
        return Math.round(accum * corrFactor) / Math.round(curr * corrFactor);
      }

      this._value = _.reduce([this._value, value], cback);

      return this;
    },
    difference: function (value) {
      return Math.abs(numeral(this._value).subtract(value).value());
    },
  };

  numeral.register("locale", "en", {
    delimiters: {
      thousands: ",",
      decimal: ".",
    },
    abbreviations: {
      thousand: "k",
      million: "m",
      billion: "b",
      trillion: "t",
    },
    ordinal: function (number) {
      var b = number % 10;
      return ~~((number % 100) / 10) === 1
        ? "th"
        : b === 1
        ? "st"
        : b === 2
        ? "nd"
        : b === 3
        ? "rd"
        : "th";
    },
    currency: {
      symbol: "$",
    },
  });

  (function () {
    numeral.register("format", "bps", {
      regexps: {
        format: /(BPS)/,
        unformat: /(BPS)/,
      },
      format: function (value, format, roundingFunction) {
        var space = numeral._.includes(format, " BPS") ? " " : "",
          output;

        value = value * 10000;

        format = format.replace(/\s?BPS/, "");

        output = numeral._.numberToFormat(value, format, roundingFunction);

        if (numeral._.includes(output, ")")) {
          output = output.split("");

          output.splice(-1, 0, space + "BPS");

          output = output.join("");
        } else {
          output = output + space + "BPS";
        }

        return output;
      },
      unformat: function (string) {
        return +(numeral._.stringToNumber(string) * 0.0001).toFixed(15);
      },
    });
  })();

  (function () {
    var decimal = {
        base: 1000,
        suffixes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      },
      binary = {
        base: 1024,
        suffixes: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"],
      };

    var allSuffixes = decimal.suffixes.concat(
      binary.suffixes.filter(function (item) {
        return decimal.suffixes.indexOf(item) < 0;
      })
    );
    var unformatRegex = allSuffixes.join("|");

    unformatRegex = "(" + unformatRegex.replace("B", "B(?!PS)") + ")";

    numeral.register("format", "bytes", {
      regexps: {
        format: /([0\s]i?b)/,
        unformat: new RegExp(unformatRegex),
      },
      format: function (value, format, roundingFunction) {
        var output,
          bytes = numeral._.includes(format, "ib") ? binary : decimal,
          suffix =
            numeral._.includes(format, " b") ||
            numeral._.includes(format, " ib")
              ? " "
              : "",
          power,
          min,
          max;

        format = format.replace(/\s?i?b/, "");

        for (power = 0; power <= bytes.suffixes.length; power++) {
          min = Math.pow(bytes.base, power);
          max = Math.pow(bytes.base, power + 1);

          if (value === null || value === 0 || (value >= min && value < max)) {
            suffix += bytes.suffixes[power];

            if (min > 0) {
              value = value / min;
            }

            break;
          }
        }

        output = numeral._.numberToFormat(value, format, roundingFunction);

        return output + suffix;
      },
      unformat: function (string) {
        var value = numeral._.stringToNumber(string),
          power,
          bytesMultiplier;

        if (value) {
          for (power = decimal.suffixes.length - 1; power >= 0; power--) {
            if (numeral._.includes(string, decimal.suffixes[power])) {
              bytesMultiplier = Math.pow(decimal.base, power);

              break;
            }

            if (numeral._.includes(string, binary.suffixes[power])) {
              bytesMultiplier = Math.pow(binary.base, power);

              break;
            }
          }

          value *= bytesMultiplier || 1;
        }

        return value;
      },
    });
  })();

  (function () {
    numeral.register("format", "currency", {
      regexps: {
        format: /(\$)/,
      },
      format: function (value, format, roundingFunction) {
        var locale = numeral.locales[numeral.options.currentLocale],
          symbols = {
            before: format.match(/^([\+|\-|\(|\s|\$]*)/)[0],
            after: format.match(/([\+|\-|\)|\s|\$]*)$/)[0],
          },
          output,
          symbol,
          i;

        format = format.replace(/\s?\$\s?/, "");

        output = numeral._.numberToFormat(value, format, roundingFunction);

        if (value >= 0) {
          symbols.before = symbols.before.replace(/[\-\(]/, "");
          symbols.after = symbols.after.replace(/[\-\)]/, "");
        } else if (
          value < 0 &&
          !numeral._.includes(symbols.before, "-") &&
          !numeral._.includes(symbols.before, "(")
        ) {
          symbols.before = "-" + symbols.before;
        }

        for (i = 0; i < symbols.before.length; i++) {
          symbol = symbols.before[i];

          switch (symbol) {
            case "$":
              output = numeral._.insert(output, locale.currency.symbol, i);
              break;
            case " ":
              output = numeral._.insert(
                output,
                " ",
                i + locale.currency.symbol.length - 1
              );
              break;
          }
        }

        for (i = symbols.after.length - 1; i >= 0; i--) {
          symbol = symbols.after[i];

          switch (symbol) {
            case "$":
              output =
                i === symbols.after.length - 1
                  ? output + locale.currency.symbol
                  : numeral._.insert(
                      output,
                      locale.currency.symbol,
                      -(symbols.after.length - (1 + i))
                    );
              break;
            case " ":
              output =
                i === symbols.after.length - 1
                  ? output + " "
                  : numeral._.insert(
                      output,
                      " ",
                      -(
                        symbols.after.length -
                        (1 + i) +
                        locale.currency.symbol.length -
                        1
                      )
                    );
              break;
          }
        }

        return output;
      },
    });
  })();

  (function () {
    numeral.register("format", "exponential", {
      regexps: {
        format: /(e\+|e-)/,
        unformat: /(e\+|e-)/,
      },
      format: function (value, format, roundingFunction) {
        var output,
          exponential =
            typeof value === "number" && !numeral._.isNaN(value)
              ? value.toExponential()
              : "0e+0",
          parts = exponential.split("e");

        format = format.replace(/e[\+|\-]{1}0/, "");

        output = numeral._.numberToFormat(
          Number(parts[0]),
          format,
          roundingFunction
        );

        return output + "e" + parts[1];
      },
      unformat: function (string) {
        var parts = numeral._.includes(string, "e+")
            ? string.split("e+")
            : string.split("e-"),
          value = Number(parts[0]),
          power = Number(parts[1]);

        power = numeral._.includes(string, "e-") ? (power *= -1) : power;

        function cback(accum, curr, currI, O) {
          var corrFactor = numeral._.correctionFactor(accum, curr),
            num =
              (accum * corrFactor * (curr * corrFactor)) /
              (corrFactor * corrFactor);
          return num;
        }

        return numeral._.reduce([value, Math.pow(10, power)], cback, 1);
      },
    });
  })();

  (function () {
    numeral.register("format", "ordinal", {
      regexps: {
        format: /(o)/,
      },
      format: function (value, format, roundingFunction) {
        var locale = numeral.locales[numeral.options.currentLocale],
          output,
          ordinal = numeral._.includes(format, " o") ? " " : "";

        format = format.replace(/\s?o/, "");

        ordinal += locale.ordinal(value);

        output = numeral._.numberToFormat(value, format, roundingFunction);

        return output + ordinal;
      },
    });
  })();

  (function () {
    numeral.register("format", "percentage", {
      regexps: {
        format: /(%)/,
        unformat: /(%)/,
      },
      format: function (value, format, roundingFunction) {
        var space = numeral._.includes(format, " %") ? " " : "",
          output;

        if (numeral.options.scalePercentBy100) {
          value = value * 100;
        }

        format = format.replace(/\s?\%/, "");

        output = numeral._.numberToFormat(value, format, roundingFunction);

        if (numeral._.includes(output, ")")) {
          output = output.split("");

          output.splice(-1, 0, space + "%");

          output = output.join("");
        } else {
          output = output + space + "%";
        }

        return output;
      },
      unformat: function (string) {
        var number = numeral._.stringToNumber(string);
        if (numeral.options.scalePercentBy100) {
          return number * 0.01;
        }
        return number;
      },
    });
  })();

  (function () {
    numeral.register("format", "time", {
      regexps: {
        format: /(:)/,
        unformat: /(:)/,
      },
      format: function (value, format, roundingFunction) {
        var hours = Math.floor(value / 60 / 60),
          minutes = Math.floor((value - hours * 60 * 60) / 60),
          seconds = Math.round(value - hours * 60 * 60 - minutes * 60);

        return (
          hours +
          ":" +
          (minutes < 10 ? "0" + minutes : minutes) +
          ":" +
          (seconds < 10 ? "0" + seconds : seconds)
        );
      },
      unformat: function (string) {
        var timeArray = string.split(":"),
          seconds = 0;

        if (timeArray.length === 3) {
          seconds = seconds + Number(timeArray[0]) * 60 * 60;

          seconds = seconds + Number(timeArray[1]) * 60;

          seconds = seconds + Number(timeArray[2]);
        } else if (timeArray.length === 2) {
          seconds = seconds + Number(timeArray[0]) * 60;

          seconds = seconds + Number(timeArray[1]);
        }
        return Number(seconds);
      },
    });
  })();

  return numeral;
});

let newHead = `
<meta charset="utf-8">
<title>Twik for Marketers</title>
<meta content="width=device-width, initial-scale=1" name="viewport">
<meta content="Webflow" name="generator">

<script src="https://use.typekit.net/vwy0cvd.js" type="text/javascript"></script>
<script type="text/javascript">
    try {
        Typekit.load();
    } catch (e) {}
</script>
<!-- [if lt IE 9]><script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js" type="text/javascript"></script><![endif] -->
<script type="text/javascript">
    ! function(o, c) {
        var n = c.documentElement,
            t = " w-mod-";
        n.className += t + "js", ("ontouchstart" in o || o.DocumentTouch && c instanceof DocumentTouch) && (n.className += t + "touch")
    }(window, document);
</script>
<link href="https://github.com/danielunited/twik-lp-marketers/blob/main/images/favicon.png?raw=true" rel="shortcut icon" type="image/x-icon">
<link href="https://github.com/danielunited/twik-lp-marketers/blob/main/images/webclip.png?raw=true" rel="apple-touch-icon">

<style>
.pricing-content {
	flex-grow:      1;
	display:        flex;
	flex-direction: column;
}

#features {
	user-select: none;

}

.pricing-body {
	color:            #121320;
	/*padding: 20px 0;*/
	/*padding-bottom: 0;*/
	flex-grow:        1;
	background-color: #ededed;
}

.pricing-footer {
	/*position: sticky;*/
	/*bottom: 0;*/
}

.pricing-footer .kard {
	margin-bottom: -50px;

}

.pricing-block {
	margin-bottom: -44px;
}

.pricing-block h5 {
	font-size:  1rem;
	margin:     0;
}

.pricing-block p.per {
}

.range-slider-wrapper {
	display: flex;
	/*margin-bottom: -43px;*/
}

.range-slider-prefix {
	padding:      25px 0;
	margin-right: 4px;
	width:        30px;
}

.range-slider-prefix > div {
	height:           3px;
	background-color: #1c7962;
}

.range-slider-container {
	padding:   25px 0;
	flex-grow: 1;
}

/*.range-slider-container.disabled {
	opacity: .3;
}*/

.pricing-block.disabled .range-slider-wrapper {
	opacity: .3;
}

.range-slider {
	position: relative;
}

.range-slider-track {
	height:           3px;
	background-color: #dfe8eb;
}

.range-slider-progress {
	height:           3px;
	background-color: #3a4478;
	position:         absolute;
	top:              0;
	left:             0;
}

.range-slider-progress.green .range-slider-cursor span {
	background-color: #007f65;
}

.range-slider-cursor {
	/*background-color: red;*/
	width:           60px;
	height:          60px;
	position:        absolute;
	top:             0;
	right:           0;
	transform:       translateY(-50%) translateX(50%);
	display:         inline-flex;
	align-items:     center;
	justify-content: center;
}

.range-slider-cursor span {
	width:            22px;
	height:           22px;
	display:          block;
	border-radius:    100px;
	background-color: #3a4478;
	border:           3px solid white;
	box-shadow:       0 0 10px rgba(0, 0, 0, 0.1);
	transform:        translateX(-2px);
}

.checkbox-container {

}

.checkbox-input {
	display:     flex;
	height:      100%;
	align-items: center;
}

.checkbox-input-wrapper {
	width:            20px;
	height:           20px;
	display:          flex;
	justify-content:  center;
	align-items:      center;
	position:         relative;
	background-color: #dfe8eb;
	transform:        translateY(-2px);
	margin-right:     15px;
	flex-shrink:      0;
}

.customer_success_wrapper:not(.checked) label {
	opacity: .5;
}

.customer_success_wrapper:not(.checked) #pixel_query_container .feature-col {
	opacity: .5;
}

.customer_success_wrapper.checked .checkbox-input-wrapper {
	background-color: rgb(35, 151, 122);
}

.checkbox-input-wrapper img {
	width:   12px;
	display: none;
}

.customer_success_wrapper.checked .checkbox-input-wrapper img {
	display: block;
}

.checkbox input {
	position: absolute;
	left:     0;
	top:      0;
	width:    100%;
	height:   100%;
	opacity:  0;
	margin:   0;
	padding:  0;
}

.feature-info {
	width:            20px;
	height:           20px;
	line-height:      20px;
	text-align:       center;
	background-color: #dfe8eb;
	border-radius:    100px;
	display:          inline-block;
	font-size:        .7rem;
	margin:           0 4px;
}

.twik-tooltip-container {
	position: relative;
	cursor:   pointer;
	display:  inline-block;
}

.twik-tooltip.in {
	background-color: rgba(18, 19, 32, 0.9);
	transform:        none;
	opacity:          1;
	z-index:          5;
	display:          inline-flex;
}

.twik-tooltip {
	position:        fixed;
	bottom:          0;
	left:            0;
	opacity:         0;
	width:           100%;
	height:          100%;
	z-index:         -1;
	font-size:       0.8rem;
	align-items:     center;
	justify-content: center;
	display:         none;
	font-weight: 400;
}

.twik-tooltip > span {
	display:          block;
	padding:          15px;
	background-color: #fafafa;
	box-shadow:       0 0 10px rgba(0, 0, 0, 0.3);
	/*width: 400px;*/
	margin:           0 20px;
}

.twik-tooltip > span:before {
	content:      '';
	width:        0;
	height:       0;
	border-style: solid;
	border-width: 6px 6px 0 6px;
	border-color: #fafafa transparent transparent transparent;
	position:     absolute;
	bottom:       0;
	left:         10%;
	transform:    translateX(-50%) translateY(100%);
}

@media (min-width: 768px) {
	.twik-tooltip {
		position:   absolute;
		transition: opacity 300ms, transform 300ms;
		width:      100%;
		bottom:     100%;
	}

	.twik-tooltip.in {
		transform:        translateY(-10px);
		background-color: transparent;
	}

	.twik-tooltip > span {
		position:  absolute;
		bottom:    0;
		left:      50%;
		width:     400px;
		margin:    0;
		transform: translateX(-10%);
	}
}

.price-switch {
	background-color: #ededed;
	padding:          10px 15px 10px 10px;
	text-align:       center;
	color:            darkgray;
	/*transition: background-color 100ms ease-in-out;*/
	font-size:        .8rem;
	margin:           0;
	position:         absolute;
	left:             100%;
	top:              50%;
	transform:        translateY(-50%);
	z-index:          2;
	width:            60px;
	/*border-radius: 0 2px 2px 0;*/
}

.price-switch img, .price-switch svg {
	position:    absolute;
	top:         0;
	left:        0;
	height:      100%;
	width:       auto;
	display:     block;
	margin-left: -15px;
}

.price-switch svg {
	fill: #ededed;
}

.checked .price-switch svg {
	fill: #3a4478;
}

.price-switch .price-text {
	position: relative;
}

.price-switch.green {
	background-color: #007f65;
	color:            #fafafa;

}

.price-switch.blue {
	background-color: #3a4478;
	color:            #fafafa;
}

.price-switch.green svg {
	fill: #007f65;
}

.price-switch.blue svg {
	fill: #3a4478;
}

.price-switch.dark {
	background-color: #121320;
	color:            #fafafa;

}

.customer_success_wrapper.checked .price-switch {
	background-color: #3a4478;
	color:            #fafafa;
}

.green-gap {
	background-color: #007f65;
	padding:          40px;
}

.feature-count {
	/*background-color: #fafafa;*/
	padding:       10px;
	text-align:    center;
	/*border: 3px solid #007f65;*/
	border-radius: 3px;
	font-size:     1rem;
	margin:        0;
}

.disabled .price-switch {
	display: none;
}

.disabled .feature-count {
	opacity: .3;
}

.price-tab {
	background-color: #fafafa;
	position:         relative;
	margin-top:       -40px;
	text-align:       center;
	padding:          15px;
}

.price-col {
	background-color: #fafafa;
	position:         relative;
	height:           113px;
	display:          flex;
	flex-direction:   column;
	justify-content:  center;
	font-size:        .8rem;
}

.price-col.sml, .feature-col.sml {
	height: 80px;
}

.feature-col {
	padding: 20px 0;
}

@media (min-width: 768px) {
	.feature-col {
		padding: 20px;
	}
}

.last .feature-col, .last .price-col {
	/*border-color: transparent;*/
}

.customer_success_wrapper:not(.checked) .price-col {
	background-color: #dfe8eb;
}

.customer_success_wrapper:not(.checked) .price-switch {
	display: none;
}

.pricing-block.disabled .price-col {
	background-color: #dfe8eb;
}

.enterprise-tab {
	background-color: #d9d9d9;
	padding-top:      30px;
}

.enterprise-tab p {
	background-color: #3a4478;
	color:            #fafafa;
	text-align:       center;
	padding:          20px;
	margin:           0 -15px;
}

.customer_success_wrapper .price-col {
	padding-top: 20px;
	height:      100px;
}

.customer_success_wrapper > div > .feature-col {
	padding-top: 40px;
}

.total-kard {
	margin:              0 -15px;
	margin-top:          30px;
	/*margin-bottom: -10px;*/
	/*transform: translateY(100%);*/
	position:            relative;
	z-index:             2;
	/*background-image: url("../assets/v2/pricing-cost.png");*/
	background-position: center center;
	background-size:     contain;
	background-repeat:   no-repeat;
	padding:             40px;
}

.pricing-footer-img {
	width:     100%;
	max-width: 300px;
	transform: translateY(30%);
	position:  relative;
	z-index:   2;
	/*margin-bottom: -30px;*/
}

.gift-banner {
	position:      relative;
	z-index:       2;
	margin-bottom: 30px;
	text-align:    center;
}

.gift-banner img {
	width:      80px;
	margin-top: -80px;
}

#pixel_query_container .feature-col {
	padding-left: 60px;
}

#pixel_queries h5 {
	margin-top: 5px;
}

.pricing-block.last .price-col {
	padding-bottom: 25px;
}

.desktop-title {
	position: absolute;
	z-index:  -10;
	opacity:  0;
}

.mobile-title {

}

@media (min-width: 768px) {
	.mobile-title {
		position: absolute;
		z-index:  -10;
		opacity:  0;
	}

	.desktop-title {
		position: static;
		z-index:  auto;
		opacity:  1;
	}
}

/* Pricing overlay */
.col, .col-1, .col-10, .col-11, .col-12, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-auto, .col-lg, .col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-auto, .col-md, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-auto, .col-sm, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-auto, .col-xl, .col-xl-1, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-auto {
    position: relative;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
}
.justify-content-center {
    -ms-flex-pack: center!important;
    justify-content: center!important;
}
.twik-banner.gray {
    background-color: #eff3f5;
}
.twik-banner {
    padding: 77px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    position: relative;
    width: 100%;
}
.row {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
}
.container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}
.col-12 {
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    max-width: 100%;
}
.col-8 {
    -ms-flex: 0 0 66.666667%;
    flex: 0 0 66.666667%;
    max-width: 66.666667%;
}
.price-tab {
    background-color: #fafafa;
    position: relative;
    margin-top: -40px;
    text-align: center;
    padding: 15px;
}
.col-3 {
    -ms-flex: 0 0 25%;
    flex: 0 0 25%;
    max-width: 25%;
}
.feature-col {
    padding: 20px 0;
}
.pricing-block.last .price-col {
    padding-bottom: 25px;
}
.price-col {
    background-color: #fafafa;
    position: relative;
    height: 113px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: .8rem;
}
.align-center {
    text-align: center;
}
.col-3 {
    -ms-flex: 0 0 25%;
    flex: 0 0 25%;
    max-width: 25%;
}
.p3 {
    font-size: 1.3rem;
}
.col-10 {
    -ms-flex: 0 0 83.333333%;
    flex: 0 0 83.333333%;
    max-width: 83.333333%;
}
.kard.bordered {
    border-bottom: 5px solid #007f65;
}
.kard {
    color: #121320;
    background-color: #fafafa;
    box-shadow: 0 0 10px rgb(0 0 0 / 10%);
}
.padding-x2 {
    padding: 30px;
}
.align-center {
    text-align: center;
}
.p5 {
	font-size: 1.75rem;
	color: #121320;
}

#personalization_count {
	color: #121320;
}

@media (min-width: 992px){
	.container {
	    max-width: 960px;
	}
}
@media (min-width: 1200px){
	.container {
	    max-width: 1140px;
	}
}
@media (min-width: 576px){
	.container, .container-sm {
	    max-width: 540px;
	}
}
@media (min-width: 768px){
	.container, .container-md, .container-sm {
	    max-width: 720px;
	}
}
@media (min-width: 992px){
	.container, .container-lg, .container-md, .container-sm {
	    max-width: 960px;
	}
}
@media (min-width: 1200px){
	.container, .container-lg, .container-md, .container-sm, .container-xl {
	    max-width: 1140px;
	}
}
@media (min-width: 1500px){
	.container, .container-lg, .container-md, .container-sm, .container-xl {
	    max-width: 1400px;
	}
}

@media (min-width: 992px)
{
	.col-lg-10 {
	    -ms-flex: 0 0 83.333333%;
	    flex: 0 0 83.333333%;
	    max-width: 83.333333%;
	}
}

@media (min-width: 1500px)
{
	.col-xxl-11 {
	    -ms-flex: 0 0 91.6666667%;
	    flex: 0 0 91.6666667%;
	    max-width: 91.6666667%;
	}
}

@media (min-width: 1500px)
{
	.col-xxl-10 {
	    -ms-flex: 0 0 83.3333333%;
	    flex: 0 0 83.3333333%;
	    max-width: 83.3333333%;
	}
}


@media (min-width: 1500px)
{
	.col-xxl-2 {
	    -ms-flex: 0 0 16.6666667%;
	    flex: 0 0 16.6666667%;
	    max-width: 16.6666667%;
	}
}
@media (min-width: 1500px)
{
	.col-xxl-10 {
	    -ms-flex: 0 0 83.3333333%;
	    flex: 0 0 83.3333333%;
	    max-width: 83.3333333%;
	}
}
@media (min-width: 768px)
{
	.feature-col {
	    padding: 20px;
	}
}
@media (min-width: 1500px)
{
	.col-xxl-2 {
	    -ms-flex: 0 0 16.6666667%;
	    flex: 0 0 16.6666667%;
	    max-width: 16.6666667%;
	}
}
@media (min-width: 768px)
{
	.price-switch {
	    width: 77px;
	}
}
@media (min-width: 992px)
{
	.col-lg-5 {
	    -ms-flex: 0 0 41.666667%;
	    flex: 0 0 41.666667%;
	    max-width: 41.666667%;
	}
}

@media (min-width: 768px)
{
	.col-md-6 {
	    -ms-flex: 0 0 50%;
	    flex: 0 0 50%;
	    max-width: 50%;
	}
}


@font-face {
    font-family: 'webflow-icons';
    src: url("data:application/x-font-ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwT1MvMg8SBiUAAAC8AAAAYGNtYXDpP+a4AAABHAAAAFxnYXNwAAAAEAAAAXgAAAAIZ2x5ZmhS2XEAAAGAAAADHGhlYWQTFw3HAAAEnAAAADZoaGVhCXYFgQAABNQAAAAkaG10eCe4A1oAAAT4AAAAMGxvY2EDtALGAAAFKAAAABptYXhwABAAPgAABUQAAAAgbmFtZSoCsMsAAAVkAAABznBvc3QAAwAAAAAHNAAAACAAAwP4AZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADpAwPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAQAAAAAwACAACAAQAAQAg5gPpA//9//8AAAAAACDmAOkA//3//wAB/+MaBBcIAAMAAQAAAAAAAAAAAAAAAAABAAH//wAPAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEBIAAAAyADgAAFAAAJAQcJARcDIP5AQAGA/oBAAcABwED+gP6AQAABAOAAAALgA4AABQAAEwEXCQEH4AHAQP6AAYBAAcABwED+gP6AQAAAAwDAAOADQALAAA8AHwAvAAABISIGHQEUFjMhMjY9ATQmByEiBh0BFBYzITI2PQE0JgchIgYdARQWMyEyNj0BNCYDIP3ADRMTDQJADRMTDf3ADRMTDQJADRMTDf3ADRMTDQJADRMTAsATDSANExMNIA0TwBMNIA0TEw0gDRPAEw0gDRMTDSANEwAAAAABAJ0AtAOBApUABQAACQIHCQEDJP7r/upcAXEBcgKU/usBFVz+fAGEAAAAAAL//f+9BAMDwwAEAAkAABcBJwEXAwE3AQdpA5ps/GZsbAOabPxmbEMDmmz8ZmwDmvxmbAOabAAAAgAA/8AEAAPAAB0AOwAABSInLgEnJjU0Nz4BNzYzMTIXHgEXFhUUBw4BBwYjNTI3PgE3NjU0Jy4BJyYjMSIHDgEHBhUUFx4BFxYzAgBqXV6LKCgoKIteXWpqXV6LKCgoKIteXWpVSktvICEhIG9LSlVVSktvICEhIG9LSlVAKCiLXl1qal1eiygoKCiLXl1qal1eiygoZiEgb0tKVVVKS28gISEgb0tKVVVKS28gIQABAAABwAIAA8AAEgAAEzQ3PgE3NjMxFSIHDgEHBhUxIwAoKIteXWpVSktvICFmAcBqXV6LKChmISBvS0pVAAAAAgAA/8AFtgPAADIAOgAAARYXHgEXFhUUBw4BBwYHIxUhIicuAScmNTQ3PgE3NjMxOAExNDc+ATc2MzIXHgEXFhcVATMJATMVMzUEjD83NlAXFxYXTjU1PQL8kz01Nk8XFxcXTzY1PSIjd1BQWlJJSXInJw3+mdv+2/7c25MCUQYcHFg5OUA/ODlXHBwIAhcXTzY1PTw1Nk8XF1tQUHcjIhwcYUNDTgL+3QFt/pOTkwABAAAAAQAAmM7nP18PPPUACwQAAAAAANciZKUAAAAA1yJkpf/9/70FtgPDAAAACAACAAAAAAAAAAEAAAPA/8AAAAW3//3//QW2AAEAAAAAAAAAAAAAAAAAAAAMBAAAAAAAAAAAAAAAAgAAAAQAASAEAADgBAAAwAQAAJ0EAP/9BAAAAAQAAAAFtwAAAAAAAAAKABQAHgAyAEYAjACiAL4BFgE2AY4AAAABAAAADAA8AAMAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAADgCuAAEAAAAAAAEADQAAAAEAAAAAAAIABwCWAAEAAAAAAAMADQBIAAEAAAAAAAQADQCrAAEAAAAAAAUACwAnAAEAAAAAAAYADQBvAAEAAAAAAAoAGgDSAAMAAQQJAAEAGgANAAMAAQQJAAIADgCdAAMAAQQJAAMAGgBVAAMAAQQJAAQAGgC4AAMAAQQJAAUAFgAyAAMAAQQJAAYAGgB8AAMAAQQJAAoANADsd2ViZmxvdy1pY29ucwB3AGUAYgBmAGwAbwB3AC0AaQBjAG8AbgBzVmVyc2lvbiAxLjAAVgBlAHIAcwBpAG8AbgAgADEALgAwd2ViZmxvdy1pY29ucwB3AGUAYgBmAGwAbwB3AC0AaQBjAG8AbgBzd2ViZmxvdy1pY29ucwB3AGUAYgBmAGwAbwB3AC0AaQBjAG8AbgBzUmVndWxhcgBSAGUAZwB1AGwAYQByd2ViZmxvdy1pY29ucwB3AGUAYgBmAGwAbwB3AC0AaQBjAG8AbgBzRm9udCBnZW5lcmF0ZWQgYnkgSWNvTW9vbi4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==") format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  [class^="w-icon-"],
  [class*=" w-icon-"] {
    font-family: 'webflow-icons' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .w-icon-slider-right:before {
    content: "\e600";
  }
  .w-icon-slider-left:before {
    content: "\e601";
  }
  .w-icon-nav-menu:before {
    content: "\e602";
  }
  .w-icon-arrow-down:before,
  .w-icon-dropdown-toggle:before {
    content: "\e603";
  }
  .w-icon-file-upload-remove:before {
    content: "\e900";
  }
  .w-icon-file-upload-icon:before {
    content: "\e903";
  }
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  html {
    height: 100%;
  }
  body {
    margin: 0;
    min-height: 100%;
    background-color: #fff;
    font-family: Arial, sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: #333;
  }
  img {
    max-width: 100%;
    vertical-align: middle;
    display: inline-block;
  }
  html.w-mod-touch * {
    background-attachment: scroll !important;
  }
  .w-block {
    display: block;
  }
  .w-inline-block {
    max-width: 100%;
    display: inline-block;
  }
  .w-clearfix:before,
  .w-clearfix:after {
    content: " ";
    display: table;
    grid-column-start: 1;
    grid-row-start: 1;
    grid-column-end: 2;
    grid-row-end: 2;
  }
  .w-clearfix:after {
    clear: both;
  }
  .w-hidden {
    display: none;
  }
  .w-button {
    display: inline-block;
    padding: 9px 15px;
    background-color: #3898EC;
    color: white;
    border: 0;
    line-height: inherit;
    text-decoration: none;
    cursor: pointer;
    border-radius: 0;
  }
  input.w-button {
    -webkit-appearance: button;
  }
  html[data-w-dynpage] [data-w-cloak] {
    color: transparent !important;
  }
  .w-webflow-badge,
  .w-webflow-badge * {
    position: static;
    left: auto;
    top: auto;
    right: auto;
    bottom: auto;
    z-index: auto;
    display: block;
    visibility: visible;
    overflow: visible;
    overflow-x: visible;
    overflow-y: visible;
    box-sizing: border-box;
    width: auto;
    height: auto;
    max-height: none;
    max-width: none;
    min-height: 0;
    min-width: 0;
    margin: 0;
    padding: 0;
    float: none;
    clear: none;
    border: 0 none transparent;
    border-radius: 0;
    background: none;
    background-image: none;
    background-position: 0% 0%;
    background-size: auto auto;
    background-repeat: repeat;
    background-origin: padding-box;
    background-clip: border-box;
    background-attachment: scroll;
    background-color: transparent;
    box-shadow: none;
    opacity: 1.0;
    transform: none;
    transition: none;
    direction: ltr;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    font-size: inherit;
    line-height: inherit;
    font-style: inherit;
    font-variant: inherit;
    text-align: inherit;
    letter-spacing: inherit;
    text-decoration: inherit;
    text-indent: 0;
    text-transform: inherit;
    list-style-type: disc;
    text-shadow: none;
    font-smoothing: auto;
    vertical-align: baseline;
    cursor: inherit;
    white-space: inherit;
    word-break: normal;
    word-spacing: normal;
    word-wrap: normal;
  }
  .w-webflow-badge {
    position: fixed !important;
    display: inline-block !important;
    visibility: visible !important;
    opacity: 1 !important;
    z-index: 2147483647 !important;
    top: auto !important;
    right: 12px !important;
    bottom: 12px !important;
    left: auto !important;
    color: #AAADB0 !important;
    background-color: #fff !important;
    border-radius: 3px !important;
    padding: 6px 8px 6px 6px !important;
    font-size: 12px !important;
    opacity: 1.0 !important;
    line-height: 14px !important;
    text-decoration: none !important;
    transform: none !important;
    margin: 0 !important;
    width: auto !important;
    height: auto !important;
    overflow: visible !important;
    white-space: nowrap;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  .w-webflow-badge > img {
    display: inline-block !important;
    visibility: visible !important;
    opacity: 1 !important;
    vertical-align: middle !important;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
    margin-bottom: 10px;
  }
  h1 {
    font-size: 38px;
    line-height: 44px;
    margin-top: 20px;
  }
  h2 {
    font-size: 32px;
    line-height: 36px;
    margin-top: 20px;
  }
  h3 {
    font-size: 24px;
    line-height: 30px;
    margin-top: 20px;
  }
  h4 {
    font-size: 18px;
    line-height: 24px;
    margin-top: 10px;
  }
  h5 {
    font-size: 14px;
    line-height: 20px;
    margin-top: 10px;
  }
  h6 {
    font-size: 12px;
    line-height: 18px;
    margin-top: 10px;
  }
  p {
    margin-top: 0;
    margin-bottom: 10px;
  }
  blockquote {
    margin: 0 0 10px 0;
    padding: 10px 20px;
    border-left: 5px solid #E2E2E2;
    font-size: 18px;
    line-height: 22px;
  }
  figure {
    margin: 0;
    margin-bottom: 10px;
  }
  figcaption {
    margin-top: 5px;
    text-align: center;
  }
  ul,
  ol {
    margin-top: 0px;
    margin-bottom: 10px;
    padding-left: 40px;
  }
  .w-list-unstyled {
    padding-left: 0;
    list-style: none;
  }
  .w-embed:before,
  .w-embed:after {
    content: " ";
    display: table;
    grid-column-start: 1;
    grid-row-start: 1;
    grid-column-end: 2;
    grid-row-end: 2;
  }
  .w-embed:after {
    clear: both;
  }
  .w-video {
    width: 100%;
    position: relative;
    padding: 0;
  }
  .w-video iframe,
  .w-video object,
  .w-video embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  fieldset {
    padding: 0;
    margin: 0;
    border: 0;
  }
  button,
  html input[type="button"],
  input[type="reset"] {
    border: 0;
    cursor: pointer;
    -webkit-appearance: button;
  }
  .w-form {
    margin: 0 0 15px;
  }
  .w-form-done {
    display: none;
    padding: 20px;
    text-align: center;
    background-color: #dddddd;
  }
  .w-form-fail {
    display: none;
    margin-top: 10px;
    padding: 10px;
    background-color: #ffdede;
  }
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  .w-input,
  .w-select {
    display: block;
    width: 100%;
    height: 38px;
    padding: 8px 12px;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 1.428571429;
    color: #333333;
    vertical-align: middle;
    background-color: #ffffff;
    border: 1px solid #cccccc;
  }
  .w-input:-moz-placeholder,
  .w-select:-moz-placeholder {
    color: #999;
  }
  .w-input::-moz-placeholder,
  .w-select::-moz-placeholder {
    color: #999;
    opacity: 1;
  }
  .w-input:-ms-input-placeholder,
  .w-select:-ms-input-placeholder {
    color: #999;
  }
  .w-input::-webkit-input-placeholder,
  .w-select::-webkit-input-placeholder {
    color: #999;
  }
  .w-input:focus,
  .w-select:focus {
    border-color: #3898EC;
    outline: 0;
  }
  .w-input[disabled],
  .w-select[disabled],
  .w-input[readonly],
  .w-select[readonly],
  fieldset[disabled] .w-input,
  fieldset[disabled] .w-select {
    cursor: not-allowed;
    background-color: #eeeeee;
  }
  textarea.w-input,
  textarea.w-select {
    height: auto;
  }
  .w-select {
    background-color: #f3f3f3;
  }
  .w-select[multiple] {
    height: auto;
  }
  .w-form-label {
    display: inline-block;
    cursor: pointer;
    font-weight: normal;
    margin-bottom: 0px;
  }
  .w-radio {
    display: block;
    margin-bottom: 5px;
    padding-left: 20px;
  }
  .w-radio:before,
  .w-radio:after {
    content: " ";
    display: table;
    grid-column-start: 1;
    grid-row-start: 1;
    grid-column-end: 2;
    grid-row-end: 2;
  }
  .w-radio:after {
    clear: both;
  }
  .w-radio-input {
    margin: 4px 0 0;
    margin-top: 1px ;
    line-height: normal;
    float: left;
    margin-left: -20px;
  }
  .w-radio-input {
    margin-top: 3px;
  }
  .w-file-upload {
    display: block;
    margin-bottom: 10px;
  }
  .w-file-upload-input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -100;
  }
  .w-file-upload-default,
  .w-file-upload-uploading,
  .w-file-upload-success {
    display: inline-block;
    color: #333333;
  }
  .w-file-upload-error {
    display: block;
    margin-top: 10px;
  }
  .w-file-upload-default.w-hidden,
  .w-file-upload-uploading.w-hidden,
  .w-file-upload-error.w-hidden,
  .w-file-upload-success.w-hidden {
    display: none;
  }
  .w-file-upload-uploading-btn {
    display: flex;
    font-size: 14px;
    font-weight: normal;
    cursor: pointer;
    margin: 0;
    padding: 8px 12px;
    border: 1px solid #cccccc;
    background-color: #fafafa;
  }
  .w-file-upload-file {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    margin: 0;
    padding: 8px 9px 8px 11px;
    border: 1px solid #cccccc;
    background-color: #fafafa;
  }
  .w-file-upload-file-name {
    font-size: 14px;
    font-weight: normal;
    display: block;
  }
  .w-file-remove-link {
    margin-top: 3px;
    margin-left: 10px;
    width: auto;
    height: auto;
    padding: 3px;
    display: block;
    cursor: pointer;
  }
  .w-icon-file-upload-remove {
    margin: auto;
    font-size: 10px;
  }
  .w-file-upload-error-msg {
    display: inline-block;
    color: #ea384c;
    padding: 2px 0;
  }
  .w-file-upload-info {
    display: inline-block;
    line-height: 38px;
    padding: 0 12px;
  }
  .w-file-upload-label {
    display: inline-block;
    font-size: 14px;
    font-weight: normal;
    cursor: pointer;
    margin: 0;
    padding: 8px 12px;
    border: 1px solid #cccccc;
    background-color: #fafafa;
  }
  .w-icon-file-upload-icon,
  .w-icon-file-upload-uploading {
    display: inline-block;
    margin-right: 8px;
    width: 20px;
  }
  .w-icon-file-upload-uploading {
    height: 20px;
  }
  .w-container {
    margin-left: auto;
    margin-right: auto;
    max-width: 940px;
  }
  .w-container:before,
  .w-container:after {
    content: " ";
    display: table;
    grid-column-start: 1;
    grid-row-start: 1;
    grid-column-end: 2;
    grid-row-end: 2;
  }
  .w-container:after {
    clear: both;
  }
  .w-container .w-row {
    margin-left: -10px;
    margin-right: -10px;
  }
  .w-row:before,
  .w-row:after {
    content: " ";
    display: table;
    grid-column-start: 1;
    grid-row-start: 1;
    grid-column-end: 2;
    grid-row-end: 2;
  }
  .w-row:after {
    clear: both;
  }
  .w-row .w-row {
    margin-left: 0;
    margin-right: 0;
  }
  .w-col {
    position: relative;
    float: left;
    width: 100%;
    min-height: 1px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .w-col .w-col {
    padding-left: 0;
    padding-right: 0;
  }
  .w-col-1 {
    width: 8.33333333%;
  }
  .w-col-2 {
    width: 16.66666667%;
  }
  .w-col-3 {
    width: 25%;
  }
  .w-col-4 {
    width: 33.33333333%;
  }
  .w-col-5 {
    width: 41.66666667%;
  }
  .w-col-6 {
    width: 50%;
  }
  .w-col-7 {
    width: 58.33333333%;
  }
  .w-col-8 {
    width: 66.66666667%;
  }
  .w-col-9 {
    width: 75%;
  }
  .w-col-10 {
    width: 83.33333333%;
  }
  .w-col-11 {
    width: 91.66666667%;
  }
  .w-col-12 {
    width: 100%;
  }
  .w-hidden-main {
    display: none !important;
  }
  @media screen and (max-width: 991px) {
    .w-container {
      max-width: 728px;
    }
    .w-hidden-main {
      display: inherit !important;
    }
    .w-hidden-medium {
      display: none !important;
    }
    .w-col-medium-1 {
      width: 8.33333333%;
    }
    .w-col-medium-2 {
      width: 16.66666667%;
    }
    .w-col-medium-3 {
      width: 25%;
    }
    .w-col-medium-4 {
      width: 33.33333333%;
    }
    .w-col-medium-5 {
      width: 41.66666667%;
    }
    .w-col-medium-6 {
      width: 50%;
    }
    .w-col-medium-7 {
      width: 58.33333333%;
    }
    .w-col-medium-8 {
      width: 66.66666667%;
    }
    .w-col-medium-9 {
      width: 75%;
    }
    .w-col-medium-10 {
      width: 83.33333333%;
    }
    .w-col-medium-11 {
      width: 91.66666667%;
    }
    .w-col-medium-12 {
      width: 100%;
    }
    .w-col-stack {
      width: 100%;
      left: auto;
      right: auto;
    }
  }
  @media screen and (max-width: 767px) {
    .w-hidden-main {
      display: inherit !important;
    }
    .w-hidden-medium {
      display: inherit !important;
    }
    .w-hidden-small {
      display: none !important;
    }
    .w-row,
    .w-container .w-row {
      margin-left: 0;
      margin-right: 0;
    }
    .w-col {
      width: 100%;
      left: auto;
      right: auto;
    }
    .w-col-small-1 {
      width: 8.33333333%;
    }
    .w-col-small-2 {
      width: 16.66666667%;
    }
    .w-col-small-3 {
      width: 25%;
    }
    .w-col-small-4 {
      width: 33.33333333%;
    }
    .w-col-small-5 {
      width: 41.66666667%;
    }
    .w-col-small-6 {
      width: 50%;
    }
    .w-col-small-7 {
      width: 58.33333333%;
    }
    .w-col-small-8 {
      width: 66.66666667%;
    }
    .w-col-small-9 {
      width: 75%;
    }
    .w-col-small-10 {
      width: 83.33333333%;
    }
    .w-col-small-11 {
      width: 91.66666667%;
    }
    .w-col-small-12 {
      width: 100%;
    }
  }
  @media screen and (max-width: 479px) {
    .w-container {
      max-width: none;
    }
    .w-hidden-main {
      display: inherit !important;
    }
    .w-hidden-medium {
      display: inherit !important;
    }
    .w-hidden-small {
      display: inherit !important;
    }
    .w-hidden-tiny {
      display: none !important;
    }
    .w-col {
      width: 100%;
    }
    .w-col-tiny-1 {
      width: 8.33333333%;
    }
    .w-col-tiny-2 {
      width: 16.66666667%;
    }
    .w-col-tiny-3 {
      width: 25%;
    }
    .w-col-tiny-4 {
      width: 33.33333333%;
    }
    .w-col-tiny-5 {
      width: 41.66666667%;
    }
    .w-col-tiny-6 {
      width: 50%;
    }
    .w-col-tiny-7 {
      width: 58.33333333%;
    }
    .w-col-tiny-8 {
      width: 66.66666667%;
    }
    .w-col-tiny-9 {
      width: 75%;
    }
    .w-col-tiny-10 {
      width: 83.33333333%;
    }
    .w-col-tiny-11 {
      width: 91.66666667%;
    }
    .w-col-tiny-12 {
      width: 100%;
    }
  }
  .w-widget {
    position: relative;
  }
  .w-widget-map {
    width: 100%;
    height: 400px;
  }
  .w-widget-map label {
    width: auto;
    display: inline;
  }
  .w-widget-map img {
    max-width: inherit;
  }
  .w-widget-map .gm-style-iw {
    text-align: center;
  }
  .w-widget-map .gm-style-iw > button {
    display: none !important;
  }
  .w-widget-twitter {
    overflow: hidden;
  }
  .w-widget-twitter-count-shim {
    display: inline-block;
    vertical-align: top;
    position: relative;
    width: 28px;
    height: 20px;
    text-align: center;
    background: white;
    border: #758696 solid 1px;
    border-radius: 3px;
  }
  .w-widget-twitter-count-shim * {
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .w-widget-twitter-count-shim .w-widget-twitter-count-inner {
    position: relative;
    font-size: 15px;
    line-height: 12px;
    text-align: center;
    color: #999;
    font-family: serif;
  }
  .w-widget-twitter-count-shim .w-widget-twitter-count-clear {
    position: relative;
    display: block;
  }
  .w-widget-twitter-count-shim.w--large {
    width: 36px;
    height: 28px;
  }
  .w-widget-twitter-count-shim.w--large .w-widget-twitter-count-inner {
    font-size: 18px;
    line-height: 18px;
  }
  .w-widget-twitter-count-shim:not(.w--vertical) {
    margin-left: 5px;
    margin-right: 8px;
  }
  .w-widget-twitter-count-shim:not(.w--vertical).w--large {
    margin-left: 6px;
  }
  .w-widget-twitter-count-shim:not(.w--vertical):before,
  .w-widget-twitter-count-shim:not(.w--vertical):after {
    top: 50%;
    left: 0;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  .w-widget-twitter-count-shim:not(.w--vertical):before {
    border-color: rgba(117, 134, 150, 0);
    border-right-color: #5d6c7b;
    border-width: 4px;
    margin-left: -9px;
    margin-top: -4px;
  }
  .w-widget-twitter-count-shim:not(.w--vertical).w--large:before {
    border-width: 5px;
    margin-left: -10px;
    margin-top: -5px;
  }
  .w-widget-twitter-count-shim:not(.w--vertical):after {
    border-color: rgba(255, 255, 255, 0);
    border-right-color: white;
    border-width: 4px;
    margin-left: -8px;
    margin-top: -4px;
  }
  .w-widget-twitter-count-shim:not(.w--vertical).w--large:after {
    border-width: 5px;
    margin-left: -9px;
    margin-top: -5px;
  }
  .w-widget-twitter-count-shim.w--vertical {
    width: 61px;
    height: 33px;
    margin-bottom: 8px;
  }
  .w-widget-twitter-count-shim.w--vertical:before,
  .w-widget-twitter-count-shim.w--vertical:after {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  .w-widget-twitter-count-shim.w--vertical:before {
    border-color: rgba(117, 134, 150, 0);
    border-top-color: #5d6c7b;
    border-width: 5px;
    margin-left: -5px;
  }
  .w-widget-twitter-count-shim.w--vertical:after {
    border-color: rgba(255, 255, 255, 0);
    border-top-color: white;
    border-width: 4px;
    margin-left: -4px;
  }
  .w-widget-twitter-count-shim.w--vertical .w-widget-twitter-count-inner {
    font-size: 18px;
    line-height: 22px;
  }
  .w-widget-twitter-count-shim.w--vertical.w--large {
    width: 76px;
  }
  .w-widget-gplus {
    overflow: hidden;
  }
  .w-background-video {
    position: relative;
    overflow: hidden;
    height: 500px;
    color: white;
  }
  .w-background-video > video {
    background-size: cover;
    background-position: 50% 50%;
    position: absolute;
    margin: auto;
    width: 100%;
    height: 100%;
    right: -100%;
    bottom: -100%;
    top: -100%;
    left: -100%;
    object-fit: cover;
    z-index: -100;
  }
  .w-background-video > video::-webkit-media-controls-start-playback-button {
    display: none !important;
    -webkit-appearance: none;
  }
  .w-slider {
    position: relative;
    height: 300px;
    text-align: center;
    background: #dddddd;
    clear: both;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .w-slider-mask {
    position: relative;
    display: block;
    overflow: hidden;
    z-index: 1;
    left: 0;
    right: 0;
    height: 100%;
    white-space: nowrap;
  }
  .w-slide {
    position: relative;
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 100%;
    white-space: normal;
    text-align: left;
  }
  .w-slider-nav {
    position: absolute;
    z-index: 2;
    top: auto;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    padding-top: 10px;
    height: 40px;
    text-align: center;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .w-slider-nav.w-round > div {
    border-radius: 100%;
  }
  .w-slider-nav.w-num > div {
    width: auto;
    height: auto;
    padding: 0.2em 0.5em;
    font-size: inherit;
    line-height: inherit;
  }
  .w-slider-nav.w-shadow > div {
    box-shadow: 0 0 3px rgba(51, 51, 51, 0.4);
  }
  .w-slider-nav-invert {
    color: #fff;
  }
  .w-slider-nav-invert > div {
    background-color: rgba(34, 34, 34, 0.4);
  }
  .w-slider-nav-invert > div.w-active {
    background-color: #222;
  }
  .w-slider-dot {
    position: relative;
    display: inline-block;
    width: 1em;
    height: 1em;
    background-color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    margin: 0 3px 0.5em;
    transition: background-color 100ms, color 100ms;
  }
  .w-slider-dot.w-active {
    background-color: #fff;
  }
  .w-slider-dot:focus {
    outline: none;
    box-shadow: 0px 0px 0px 2px #fff;
  }
  .w-slider-dot:focus.w-active {
    box-shadow: none;
  }
  .w-slider-arrow-left,
  .w-slider-arrow-right {
    position: absolute;
    width: 80px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    cursor: pointer;
    overflow: hidden;
    color: white;
    font-size: 40px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .w-slider-arrow-left [class^="w-icon-"],
  .w-slider-arrow-right [class^="w-icon-"],
  .w-slider-arrow-left [class*=" w-icon-"],
  .w-slider-arrow-right [class*=" w-icon-"] {
    position: absolute;
  }
  .w-slider-arrow-left:focus,
  .w-slider-arrow-right:focus {
    outline: 0;
  }
  .w-slider-arrow-left {
    z-index: 3;
    right: auto;
  }
  .w-slider-arrow-right {
    z-index: 4;
    left: auto;
  }
  .w-icon-slider-left,
  .w-icon-slider-right {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 1em;
    height: 1em;
  }
  .w-slider-aria-label {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  .w-dropdown {
    display: inline-block;
    position: relative;
    text-align: left;
    margin-left: auto;
    margin-right: auto;
    z-index: 900;
  }
  .w-dropdown-btn,
  .w-dropdown-toggle,
  .w-dropdown-link {
    position: relative;
    vertical-align: top;
    text-decoration: none;
    color: #222222;
    padding: 20px;
    text-align: left;
    margin-left: auto;
    margin-right: auto;
    white-space: nowrap;
  }
  .w-dropdown-toggle {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: inline-block;
    cursor: pointer;
    padding-right: 40px;
  }
  .w-dropdown-toggle:focus {
    outline: 0;
  }
  .w-icon-dropdown-toggle {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    margin-right: 20px;
    width: 1em;
    height: 1em;
  }
  .w-dropdown-list {
    position: absolute;
    background: #dddddd;
    display: none;
    min-width: 100%;
  }
  .w-dropdown-list.w--open {
    display: block;
  }
  .w-dropdown-link {
    padding: 10px 20px;
    display: block;
    color: #222222;
  }
  .w-dropdown-link.w--current {
    color: #0082f3;
  }
  .w-dropdown-link:focus {
    outline: 0;
  }
  @media screen and (max-width: 767px) {
    .w-nav-brand {
      padding-left: 10px;
    }
  }
  
  .w-lightbox-backdrop {
    color: #000;
    cursor: auto;
    font-family: serif;
    font-size: medium;
    font-style: normal;
    font-variant: normal;
    font-weight: normal;
    letter-spacing: normal;
    line-height: normal;
    list-style: disc;
    text-align: start;
    text-indent: 0;
    text-shadow: none;
    text-transform: none;
    visibility: visible;
    white-space: normal;
    word-break: normal;
    word-spacing: normal;
    word-wrap: normal;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    color: #fff;
    font-family: "Helvetica Neue", Helvetica, Ubuntu, "Segoe UI", Verdana, sans-serif;
    font-size: 17px;
    line-height: 1.2;
    font-weight: 300;
    text-align: center;
    background: rgba(0, 0, 0, 0.9);
    z-index: 2000;
    outline: 0;
  
    opacity: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-transform: translate(0, 0);
  
  }
  
  .w-lightbox-backdrop,
  .w-lightbox-container {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .w-lightbox-content {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }
  .w-lightbox-view {
    position: absolute;
    width: 100vw;
    height: 100vh;
    opacity: 0;
  }
  .w-lightbox-view:before {
    content: "";
    height: 100vh;
  }
  
  .w-lightbox-group,
  .w-lightbox-group .w-lightbox-view,
  .w-lightbox-group .w-lightbox-view:before {
    height: 86vh;
  }
  .w-lightbox-frame,
  .w-lightbox-view:before {
    display: inline-block;
    vertical-align: middle;
  }
  
  .w-lightbox-figure {
    position: relative;
    margin: 0;
  
  }
  .w-lightbox-group .w-lightbox-figure {
    cursor: pointer;
  }
  
  .w-lightbox-img {
    width: auto;
    height: auto;
    max-width: none;
  }
  
  .w-lightbox-image {
    display: block;
    float: none;
   
    max-width: 100vw;
    max-height: 100vh;
  }
  .w-lightbox-group .w-lightbox-image {
    max-height: 86vh;
  }
  .w-lightbox-caption {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    padding: .5em 1em;
    background: rgba(0, 0, 0, 0.4);
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .w-lightbox-embed {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .w-lightbox-control {
    position: absolute;
    top: 0;
    width: 4em;
    background-size: 24px;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    -webkit-transition: all .3s;
    transition: all .3s;
  }
  .w-lightbox-left {
    display: none;
    bottom: 0;
    left: 0;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0yMCAwIDI0IDQwIiB3aWR0aD0iMjQiIGhlaWdodD0iNDAiPjxnIHRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PHBhdGggZD0ibTAgMGg1djIzaDIzdjVoLTI4eiIgb3BhY2l0eT0iLjQiLz48cGF0aCBkPSJtMSAxaDN2MjNoMjN2M2gtMjZ6IiBmaWxsPSIjZmZmIi8+PC9nPjwvc3ZnPg==");
  }
  .w-lightbox-right {
    display: none;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii00IDAgMjQgNDAiIHdpZHRoPSIyNCIgaGVpZ2h0PSI0MCI+PGcgdHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJtMC0waDI4djI4aC01di0yM2gtMjN6IiBvcGFjaXR5PSIuNCIvPjxwYXRoIGQ9Im0xIDFoMjZ2MjZoLTN2LTIzaC0yM3oiIGZpbGw9IiNmZmYiLz48L2c+PC9zdmc+");
  }
  
  .w-lightbox-close {
    right: 0;
    height: 2.6em;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii00IDAgMTggMTciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxNyI+PGcgdHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJtMCAwaDd2LTdoNXY3aDd2NWgtN3Y3aC01di03aC03eiIgb3BhY2l0eT0iLjQiLz48cGF0aCBkPSJtMSAxaDd2LTdoM3Y3aDd2M2gtN3Y3aC0zdi03aC03eiIgZmlsbD0iI2ZmZiIvPjwvZz48L3N2Zz4=");
    background-size: 18px;
  }
  
  .w-lightbox-strip {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 1vh;
    line-height: 0;
   
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
  }
  
  .w-lightbox-item {
    display: inline-block;
    width: 10vh;
    padding: 2vh 1vh;
    box-sizing: content-box;
    
    cursor: pointer;
    -webkit-transform: translate3d(0, 0, 0);
  
  }
  .w-lightbox-active {
    opacity: .3;
  }
  .w-lightbox-thumbnail {
    position: relative;
    height: 10vh;
    background: #222;
    overflow: hidden;
  }
  .w-lightbox-thumbnail-image {
    position: absolute;
    top: 0;
    left: 0;
  }
  .w-lightbox-thumbnail .w-lightbox-tall {
    top: 50%;
    width: 100%;
    -webkit-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    transform: translate(0, -50%);
  }
  .w-lightbox-thumbnail .w-lightbox-wide {
    left: 50%;
    height: 100%;
    -webkit-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
  }
  
  .w-lightbox-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    margin-top: -20px;
    margin-left: -20px;
    border: 5px solid rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    -webkit-animation: spin .8s infinite linear;
    animation: spin .8s infinite linear;
  }
  .w-lightbox-spinner:after {
    content: "";
    position: absolute;
    top: -4px;
    right: -4px;
    bottom: -4px;
    left: -4px;
    border: 3px solid transparent;
    border-bottom-color: #fff;
    border-radius: 50%;
  }
  
  .w-lightbox-hide {
    display: none;
  }
  .w-lightbox-noscroll {
    overflow: hidden;
  }
  @media (min-width: 768px) {
    .w-lightbox-content {
      height: 96vh;
      margin-top: 2vh;
    }
    .w-lightbox-view,
    .w-lightbox-view:before {
      height: 96vh;
    }
    
    .w-lightbox-group,
    .w-lightbox-group .w-lightbox-view,
    .w-lightbox-group .w-lightbox-view:before {
      height: 84vh;
    }
    .w-lightbox-image {
      max-width: 96vw;
      max-height: 96vh;
    }
    .w-lightbox-group .w-lightbox-image {
      max-width: 82.3vw;
      max-height: 84vh;
    }
    .w-lightbox-left,
    .w-lightbox-right {
      display: block;
      opacity: .5;
    }
    .w-lightbox-close {
      opacity: .8;
    }
    .w-lightbox-control:hover {
      opacity: 1;
    }
  }
  .w-lightbox-inactive,
  .w-lightbox-inactive:hover {
    opacity: 0;
  }
  .w-richtext:before,
  .w-richtext:after {
    content: " ";
    display: table;
    grid-column-start: 1;
    grid-row-start: 1;
    grid-column-end: 2;
    grid-row-end: 2;
  }
  .w-richtext:after {
    clear: both;
  }
  .w-richtext[contenteditable="true"]:before,
  .w-richtext[contenteditable="true"]:after {
    white-space: initial;
  }
  .w-richtext ol,
  .w-richtext ul {
    overflow: hidden;
  }
  .w-richtext .w-richtext-figure-selected.w-richtext-figure-type-video div:after,
  .w-richtext .w-richtext-figure-selected[data-rt-type="video"] div:after {
    outline: 2px solid #2895f7;
  }
  .w-richtext .w-richtext-figure-selected.w-richtext-figure-type-image div,
  .w-richtext .w-richtext-figure-selected[data-rt-type="image"] div {
    outline: 2px solid #2895f7;
  }
  .w-richtext figure.w-richtext-figure-type-video > div:after,
  .w-richtext figure[data-rt-type="video"] > div:after {
    content: '';
    position: absolute;
    display: none;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .w-richtext figure {
    position: relative;
    max-width: 60%;
  }
  .w-richtext figure > div:before {
    cursor: default!important;
  }
  .w-richtext figure img {
    width: 100%;
  }
  .w-richtext figure figcaption.w-richtext-figcaption-placeholder {
    opacity: 0.6;
  }
  .w-richtext figure div {
    font-size: 0px;
    color: transparent;
  }
  .w-richtext figure.w-richtext-figure-type-image,
  .w-richtext figure[data-rt-type="image"] {
    display: table;
  }
  .w-richtext figure.w-richtext-figure-type-image > div,
  .w-richtext figure[data-rt-type="image"] > div {
    display: inline-block;
  }
  .w-richtext figure.w-richtext-figure-type-image > figcaption,
  .w-richtext figure[data-rt-type="image"] > figcaption {
    display: table-caption;
    caption-side: bottom;
  }
  .w-richtext figure.w-richtext-figure-type-video,
  .w-richtext figure[data-rt-type="video"] {
    width: 60%;
    height: 0;
  }
  .w-richtext figure.w-richtext-figure-type-video iframe,
  .w-richtext figure[data-rt-type="video"] iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .w-richtext figure.w-richtext-figure-type-video > div,
  .w-richtext figure[data-rt-type="video"] > div {
    width: 100%;
  }
  .w-richtext figure.w-richtext-align-center {
    margin-right: auto;
    margin-left: auto;
    clear: both;
  }
  .w-richtext figure.w-richtext-align-center.w-richtext-figure-type-image > div,
  .w-richtext figure.w-richtext-align-center[data-rt-type="image"] > div {
    max-width: 100%;
  }
  .w-richtext figure.w-richtext-align-normal {
    clear: both;
  }
  .w-richtext figure.w-richtext-align-fullwidth {
    width: 100%;
    max-width: 100%;
    text-align: center;
    clear: both;
    display: block;
    margin-right: auto;
    margin-left: auto;
  }
  .w-richtext figure.w-richtext-align-fullwidth > div {
    display: inline-block;
  
    padding-bottom: inherit;
  }
  .w-richtext figure.w-richtext-align-fullwidth > figcaption {
    display: block;
  }
  .w-richtext figure.w-richtext-align-floatleft {
    float: left;
    margin-right: 15px;
    clear: none;
  }
  .w-richtext figure.w-richtext-align-floatright {
    float: right;
    margin-left: 15px;
    clear: none;
  }
  .w-nav {
    position: relative;
    background: #dddddd;
    z-index: 1000;
  }
  .w-nav:before,
  .w-nav:after {
    content: " ";
    display: table;
    grid-column-start: 1;
    grid-row-start: 1;
    grid-column-end: 2;
    grid-row-end: 2;
  }
  .w-nav:after {
    clear: both;
  }
  .w-nav-brand {
    position: relative;
    float: left;
    text-decoration: none;
    color: #333333;
  }
  .w-nav-link {
    position: relative;
    display: inline-block;
    vertical-align: top;
    text-decoration: none;
    color: #222222;
    padding: 20px;
    text-align: left;
    margin-left: auto;
    margin-right: auto;
  }
  .w-nav-link.w--current {
    color: #0082f3;
  }
  .w-nav-menu {
    position: relative;
    float: right;
  }
  [data-nav-menu-open] {
    display: block !important;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #C8C8C8;
    text-align: center;
    overflow: visible;
    min-width: 200px;
  }
  .w--nav-link-open {
    display: block;
    position: relative;
  }
  .w-nav-overlay {
    position: absolute;
    overflow: hidden;
    display: none;
    top: 100%;
    left: 0;
    right: 0;
    width: 100%;
  }
  .w-nav-overlay [data-nav-menu-open] {
    top: 0;
  }
  .w-nav[data-animation="over-left"] .w-nav-overlay {
    width: auto;
  }
  .w-nav[data-animation="over-left"] .w-nav-overlay,
  .w-nav[data-animation="over-left"] [data-nav-menu-open] {
    right: auto;
    z-index: 1;
    top: 0;
  }
  .w-nav[data-animation="over-right"] .w-nav-overlay {
    width: auto;
  }
  .w-nav[data-animation="over-right"] .w-nav-overlay,
  .w-nav[data-animation="over-right"] [data-nav-menu-open] {
    left: auto;
    z-index: 1;
    top: 0;
  }
  .w-nav-button {
    position: relative;
    float: right;
    padding: 18px;
    font-size: 24px;
    display: none;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .w-nav-button:focus {
    outline: 0;
  }
  .w-nav-button.w--open {
    background-color: #C8C8C8;
    color: white;
  }
  .w-nav[data-collapse="all"] .w-nav-menu {
    display: none;
  }
  .w-nav[data-collapse="all"] .w-nav-button {
    display: block;
  }
  .w--nav-dropdown-open {
    display: block;
  }
  .w--nav-dropdown-toggle-open {
    display: block;
  }
  .w--nav-dropdown-list-open {
    position: static;
  }
  @media screen and (max-width: 991px) {
    .w-nav[data-collapse="medium"] .w-nav-menu {
      display: none;
    }
    .w-nav[data-collapse="medium"] .w-nav-button {
      display: block;
    }
  }
  @media screen and (max-width: 767px) {
    .w-nav[data-collapse="small"] .w-nav-menu {
      display: none;
    }
    .w-nav[data-collapse="small"] .w-nav-button {
      display: block;
    }
    .w-nav-brand {
      padding-left: 10px;
    }
  }
  @media screen and (max-width: 479px) {
    .w-nav[data-collapse="tiny"] .w-nav-menu {
      display: none;
    }
    .w-nav[data-collapse="tiny"] .w-nav-button {
      display: block;
    }
  }
  .w-tabs {
    position: relative;
  }
  .w-tabs:before,
  .w-tabs:after {
    content: " ";
    display: table;
    grid-column-start: 1;
    grid-row-start: 1;
    grid-column-end: 2;
    grid-row-end: 2;
  }
  .w-tabs:after {
    clear: both;
  }
  .w-tab-menu {
    position: relative;
  }
  .w-tab-link {
    position: relative;
    display: inline-block;
    vertical-align: top;
    text-decoration: none;
    padding: 9px 30px;
    text-align: left;
    cursor: pointer;
    color: #222222;
    background-color: #dddddd;
  }
  .w-tab-link.w--current {
    background-color: #C8C8C8;
  }
  .w-tab-link:focus {
    outline: 0;
  }
  .w-tab-content {
    position: relative;
    display: block;
    overflow: hidden;
  }
  .w-tab-pane {
    position: relative;
    display: none;
  }
  .w--tab-active {
    display: block;
  }
  @media screen and (max-width: 479px) {
    .w-tab-link {
      display: block;
    }
  }
  .w-ix-emptyfix:after {
    content: "";
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .w-dyn-empty {
    padding: 10px;
    background-color: #dddddd;
  }
  .w-dyn-hide {
    display: none !important;
  }
  .w-dyn-bind-empty {
    display: none !important;
  }
  .w-condition-invisible {
    display: none !important;
  }
  body {
    font-family: proxima-nova, sans-serif;
    color: #333;
    font-size: 16px;
    line-height: 24px;
  }
  
  h1 {
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 38px;
    line-height: 44px;
    font-weight: bold;
  }
  
  h2 {
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 32px;
    line-height: 36px;
    font-weight: bold;
  }
  
  h3 {
    margin-top: 8px;
    margin-bottom: 10px;
    font-size: 24px;
    line-height: 30px;
    font-weight: 700;
  }
  
  p {
    margin-bottom: 10px;
    color: #707070;
  }
  
  .section {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    padding-top: 64px;
    padding-bottom: 64px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    background-image: url('https://github.com/danielunited/twik-lp-marketers/blob/main/images/Polygon-Copy-172x.png?raw=true'), url('https://github.com/danielunited/twik-lp-marketers/blob/main/images/Polygon-Copy-172x.png?raw=true');
    background-position: -15% 200%, 130% -100%;
    background-size: auto 500px, auto 500px;
    background-repeat: no-repeat, no-repeat;
  }
  
  .section.intro-header {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    border-bottom: 1px solid #e2e2e2;
    background-image: -webkit-gradient(linear, left top, left bottom, from(#fff), to(#fff)), url('https://github.com/danielunited/twik-lp-marketers/blob/main/images/Polygon-Copy-172x.png?raw=true');
    background-image: linear-gradient(180deg, #fff, #fff), url('https://github.com/danielunited/twik-lp-marketers/blob/main/images/Polygon-Copy-172x.png?raw=true');
    background-position: 0px 0px, 125% -100%;
    background-size: auto, auto 500px;
    background-repeat: repeat, no-repeat;
  }
  
  .section.cta-section {
    padding-bottom: 78px;
    background-color: #028970;
    background-image: -webkit-gradient(linear, left top, left bottom, from(#00886b), to(#00614c)), url('https://github.com/danielunited/twik-lp-marketers/blob/main/images/Polygon-Copy-172x.png?raw=true'), url('https://github.com/danielunited/twik-lp-marketers/blob/main/images/Polygon-Copy-172x.png?raw=true');
    background-image: linear-gradient(180deg, #00886b, #00614c), url('https://github.com/danielunited/twik-lp-marketers/blob/main/images/Polygon-Copy-172x.png?raw=true'), url('https://github.com/danielunited/twik-lp-marketers/blob/main/images/Polygon-Copy-172x.png?raw=true');
    background-position: 0px 0px, -10% 200%, 125% -100%;
    background-size: auto, auto 500px, auto 500px;
    background-repeat: repeat, no-repeat, no-repeat;
  }
  
  .section.more-padding-bottom {
    padding-bottom: 78px;
    background-image: none;
  }
  
  .section.more-padding-bottom.faces-bg {
    background-image: url('https://github.com/danielunited/twik-lp-marketers/blob/main/images/faces-1.png?raw=true'), url('https://github.com/danielunited/twik-lp-marketers/blob/main/images/faces-4.png?raw=true'), url('https://github.com/danielunited/twik-lp-marketers/blob/main/images/faces-2.png?raw=true'), url('https://github.com/danielunited/twik-lp-marketers/blob/main/images/faces-3.png?raw=true');
    background-position: 98% 80%, 100% 0%, 0% 100%, 25px 25px;
    background-size: 160px, 150px, 150px, 170px;
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
  }
  
  .text-center {
    text-align: center;
  }
  
  .paragraph {
    max-width: 740px;
    margin-bottom: 32px;
    font-size: 18px;
    line-height: 26px;
  }
  
  .image {
    width: 56px;
    margin-bottom: 12px;
  }
  
  .feature {
    width: 32%;
    margin-bottom: 36px;
    text-align: center;
  }
  
  .feature-container {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: -36px;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  
  .cta {
    padding: 12px 24px;
    border-style: solid;
    border-width: 1px;
    border-color: #00725d;
    border-radius: 6px;
    background-color: #028970;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.18);
    -webkit-transition: all 120ms ease;
    transition: all 120ms ease;
  }
  
  .cta:hover {
    box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.12);
    -webkit-transform: translate(0px, -4px);
    -ms-transform: translate(0px, -4px);
    transform: translate(0px, -4px);
  }
  
  .cta.white-btn {
    border-color: #fff;
    background-color: transparent;
  }
  
  .image-2 {
    position: relative;
    height: 520px;
    margin-top: -48px;
    margin-right: -48px;
    margin-left: 56px;
  }
  
  .wide-container {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    max-width: 1140px;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  
  .wide-container.wider {
    max-width: 1170px;
  }
  
  .image-3 {
    height: 36px;
    margin-bottom: 24px;
  }
  
  .image-5 {
    height: 24px;
    margin-top: -1px;
    margin-right: 12px;
  }
  
  .div-block {
    margin-top: 12px;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  
  .text-block {
    display: inline-block;
  }
  
  .play-video {
    display: inline-block;
    border-radius: 2px;
    cursor: pointer;
  }
  
  .play-video:hover {
    background-color: #f3f3f3;
  }
  
  .html-embed {
    overflow: hidden;
    width: 800px;
    border-radius: 2px;
    box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.24);
  }
  
  .image-6 {
    position: absolute;
    left: auto;
    top: -12px;
    right: -12px;
    bottom: auto;
    z-index: 1;
    width: 36px;
    height: 36px;
    padding: 8px;
    border-radius: 100px;
    background-color: #fff;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.24);
    cursor: pointer;
  }
  
  .div-block-5 {
    position: relative;
  }
  
  .thisone {
    position: fixed;
    left: 0%;
    top: 0%;
    right: 0%;
    bottom: 0%;
    z-index: 5;
    display: none;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.81);
  }
  
  .slider {
    height: auto;
    min-width: 650px;
    background-color: #fff;
  }
  
  .dnone {
    display: none;
  }
  
  .image-7 {
    width: 500px;
    margin-bottom: 24px;
  }
  
  .div-block-6 {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    height: 100%;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  
  .text-block-2 {
    color: #9e9e9e;
    font-size: 24px;
    line-height: 28px;
    font-weight: 600;
  }
  
  .heading {
    margin-top: 2px;
    font-weight: 600;
    text-align: center;
  }
  
  .div-block-7 {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  
  .white-text {
    color: #fff;
  }
  
  .white-text.mb18 {
    margin-bottom: 36px;
  }
  
  .mb36 {
    margin-bottom: 36px;
  }
  
  .legal-info {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    padding-top: 0px;
    padding-bottom: 12px;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  
  .footer-links {
    padding-right: 8px;
    padding-left: 8px;
    color: #bdbdbd;
    font-size: 14px;
    text-decoration: none;
  }
  
  .submit-button {
    width: 100%;
  }
  
  .text-field {
    height: 48px;
    padding-right: 18px;
    padding-left: 18px;
    border: 1px none #000;
    background-color: #f0f0f0;
  }
  
  .text-field::-webkit-input-placeholder {
    color: #5f5f5f;
  }
  
  .text-field:-ms-input-placeholder {
    color: #5f5f5f;
  }
  
  .text-field::-ms-input-placeholder {
    color: #5f5f5f;
  }
  
  .text-field::placeholder {
    color: #5f5f5f;
  }
  
  .div-block-8 {
    margin-top: 18px;
    display: none;
  }
  
  .contact-us {
    cursor: pointer;
  }
  
  @media screen and (max-width: 991px) {
    .section {
      background-image: none;
    }
  
    .feature {
      width: 50%;
    }
  
    .image-2 {
      height: auto;
      margin-top: 0px;
      margin-right: 0px;
      margin-left: 0px;
    }
  
    .wide-container {
      padding-right: 24px;
      padding-left: 24px;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      text-align: center;
    }
  
    .slider {
      margin-top: 24px;
      margin-left: 0px;
    }
  
    .div-block-6 {
      text-align: center;
    }
  }
  
  @media screen and (max-width: 767px) {
    .section.more-padding-bottom.faces-bg {
      background-image: none;
    }
  
    .feature {
      width: 100%;
    }
  }
  
  @media screen and (max-width: 479px) {
    .section {
      padding-top: 48px;
      padding-bottom: 48px;
    }
  
    .section.intro-header {
      overflow: hidden;
      background-image: none;
      background-position: 0px 0px;
      background-size: auto;
      background-repeat: repeat;
    }
  
    .image-2 {
      max-width: 150%;
      margin-top: -18px;
      margin-right: -36px;
      margin-bottom: -64px;
    }
  
    .html-embed {
      width: 90vw;
    }
  
    .thisone {
      display: none;
    }
  
    .container {
      position: relative;
      z-index: 1;
    }
  
    .slider {
      z-index: -1;
      min-width: 100%;
      margin-right: -24px;
      margin-left: -24px;
    }
  
    .image-7 {
      max-width: 110%;
    }
  
    .heading {
      padding-right: 12px;
      padding-left: 12px;
    }
  
    .div-block-7 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
    }
  }
  
  @font-face {
    font-family: 'Neuwelt';
    src: url('../fonts/Neuwelt-Bold.otf') format('opentype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Neuwelt';
    src: url('../fonts/Neuwelt-Medium.otf') format('opentype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Neuwelt';
    src: url('../fonts/NeuweltText-Medium.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  html {
    font-family: sans-serif;
  
    -ms-text-size-adjust: 100%;
  
    -webkit-text-size-adjust: 100%;
  
  }
  
  body {
    margin: 0;
  }
  
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section,
  summary {
    display: block;
  }
  
  audio,
  canvas,
  progress,
  video {
    display: inline-block;
  
    vertical-align: baseline;
   
  }
  
  audio:not([controls]) {
    display: none;
    height: 0;
  }
  
  [hidden],
  template {
    display: none;
  }
  
  a {
    background-color: transparent;
  }
  
  a:active,
  a:hover {
    outline: 0;
  }
  
  abbr[title] {
    border-bottom: 1px dotted;
  }
  
  b,
  strong {
    font-weight: bold;
  }
  
  dfn {
    font-style: italic;
  }
  
  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }
  
  mark {
    background: #ff0;
    color: #000;
  }
  
  small {
    font-size: 80%;
  }
  
  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sup {
    top: -0.5em;
  }
  sub {
    bottom: -0.25em;
  }
  
  img {
    border: 0;
  }
  
  svg:not(:root) {
    overflow: hidden;
  }
  
  figure {
    margin: 1em 40px;
  }
  
  hr {
    box-sizing: content-box;
    height: 0;
  }
  
  pre {
    overflow: auto;
  }
  
  code,
  kbd,
  pre,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }
  
  button,
  input,
  optgroup,
  select,
  textarea {
    color: inherit;
  
    font: inherit;
  
    margin: 0;
   
  }
  
  button {
    overflow: visible;
  }
  
  button,
  select {
    text-transform: none;
  }
  
  button,
  html input[type="button"],
  input[type="reset"] {
    -webkit-appearance: button;
  
    cursor: pointer;
  
  }
  
  button[disabled],
  html input[disabled] {
    cursor: default;
  }
  
  button::-moz-focus-inner,
  input::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
  
  input {
    line-height: normal;
  }
  
  input[type="checkbox"],
  input[type="radio"] {
    box-sizing: border-box;
  
    padding: 0;
  
  }
  
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    height: auto;
  }
  
  input[type="search"] {
    -webkit-appearance: none;
  
  }
  
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  
  fieldset {
    border: 1px solid #c0c0c0;
    margin: 0 2px;
    padding: 0.35em 0.625em 0.75em;
  }
  
  legend {
    border: 0;
  
    padding: 0;
  }
  
  textarea {
    overflow: auto;
  }
  
  optgroup {
    font-weight: bold;
  }
  
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  td,
  th {
    padding: 0;
  }
  

</style>

`;

let newBody = `
<div class="section intro-header" id="start">
        <div class="thisone">
            <div>
                <div class="div-block-5"><img src="https://github.com/danielunited/twik-lp-marketers/blob/main/images/close.svg?raw=true" loading="lazy" data-w-id="3ad31b2f-1bb3-f66e-ccdc-b1fb1d43f145" alt="" class="image-6"></div>
                <div class="html-embed w-embed w-iframe">
                    <div style="width:100%;height:0px;position:relative;padding-bottom:56.250%;"><iframe src="https://streamable.com/e/v09tky" frameborder="0" width="100%" height="100%" allowfullscreen="" style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;"></iframe></div>
                </div>
            </div>
        </div>
        <div class="wide-container">
            <div class="container w-container"><img src="https://github.com/danielunited/twik-lp-marketers/blob/main/images/twik-logo-svg.svg?raw=true" loading="lazy" alt="" class="image-3">
                <h1>A/B testing is dead.<br>Long live personalization!</h1>
                <p class="paragraph">Use twik to set variations and let twik determine what variation to show to what visitor to achieve maximum conversions. No maintenance needed, and no manual audience segmentation. Twik does it all for you automatically</p>
                <a href="https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?response_type=code&access_type=offline&client_id=496673480121-8jm728bm1d6lk99sbq18ukj1d43oo3ks.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fapi.twik.io%2Foauth2callback&state=%7B%22referer%22%3A%22%22%2C%22origin%22%3A%22https%3A%5C%2F%5C%2Fwww.twik.io%5C%2F%22%7D&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&include_granted_scopes=true&prompt=consent&flowName=GeneralOAuthFlow"
                    class="cta w-button">Get Started Free</a>
                <div class="div-block">
                    <div>
                        <div class="text-block contact-us contact-us-primary">Contact us</div>
                    </div>
                </div>
                <div class="div-block">
                    <div data-w-id="0e1943db-0d2d-f593-2d22-faf082d02eb3" class="play-video"><img src="https://github.com/danielunited/twik-lp-marketers/blob/main/images/play-button.svg?raw=true" loading="lazy" alt="" class="image-5">
                        <div class="text-block">See it in action</div>
                    </div>
                </div>
                <div class="div-block-8 contact-us-form">
                    <div class="w-form">
                        <form id="email-form" name="email-form" data-name="Email Form"><input type="text" class="text-field w-input" maxlength="256" name="name" data-name="Name" placeholder="Name" id="name" required=""><input type="email" class="text-field w-input" maxlength="256" name="email" data-name="Email" placeholder="Email"
                                id="email" required=""><input type="text" class="text-field w-input" maxlength="256" name="website" data-name="website" placeholder="Website" id="website" required=""><input type="submit" value="Send a message" data-wait="Please wait..."
                                class="submit-button cta w-button"></form>
                        <div class="w-form-done">
                            <div>Thank you! Your submission has been received!</div>
                        </div>
                        <div class="w-form-fail">
                            <div>Oops! Something went wrong while submitting the form.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div data-delay="3000" data-animation="cross" data-autoplay="1" data-disable-swipe="1" data-duration="500" data-infinite="1" class="slider w-slider">
                <div class="w-slider-mask">
                    <div class="w-slide">
                        <div class="div-block-6">
                            <div class="div-block-7"><img src="https://github.com/danielunited/twik-lp-marketers/blob/main/images/il2.png?raw=true" loading="lazy" sizes="(max-width: 479px) 100vw, 500px" srcset="https://github.com/danielunited/twik-lp-marketers/blob/main/images/il2-p-500.png?raw=true 500w, https://github.com/danielunited/twik-lp-marketers/blob/main/images/il2.png?raw=true 2282w" alt="" class="image-7">
                                <div class="text-block-2">A/B Testing</div>
                                <h3 class="heading">One &quot;winning&quot; version for all visitors<br>results in losing some of the audience<br></h3>
                            </div>
                        </div>
                    </div>
                    <div class="w-slide">
                        <div class="div-block-6">
                            <div class="div-block-7"><img src="https://github.com/danielunited/twik-lp-marketers/blob/main/images/il1.png?raw=true" loading="lazy" sizes="(max-width: 479px) 100vw, 500px" srcset="https://github.com/danielunited/twik-lp-marketers/blob/main/images/il1-p-500.png?raw=true 500w, https://github.com/danielunited/twik-lp-marketers/blob/main/images/il1-p-800.png?raw=true 800w, https://github.com/danielunited/twik-lp-marketers/blob/main/images/il1.png?raw=true 2282w" alt="" class="image-7">
                                <div class="text-block-2">Personalization</div>
                                <h3 class="heading">Tailored, optimized view for every visitor<br>results in maximizing conversions<br></h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dnone w-slider-arrow-left">
                    <div class="w-icon-slider-left"></div>
                </div>
                <div class="dnone w-slider-arrow-right">
                    <div class="w-icon-slider-right"></div>
                </div>
                <div class="dnone w-slider-nav w-round"></div>
            </div>
        </div>
    </div>
    <div class="section">
        <div class="wide-container wider">
            <div class="feature-container">
                <div class="feature"><img src="https://github.com/danielunited/twik-lp-marketers/blob/main/images/icon1.png?raw=true" loading="lazy" alt="" class="image">
                    <h3>Personalize instead of A/B testing</h3>
                    <p>Twik automatically matches each visitor with relevant variants to maximize conversions. No data science or maintenance required - launch your variations and let twik do the rest.<br></p>
                </div>
                <div class="feature"><img src="https://github.com/danielunited/twik-lp-marketers/blob/main/images/icon2.png?raw=true" loading="lazy" alt="" class="image">
                    <h3>Instant visual editor<br></h3>
                    <p>Edit your site and create variations without changing your site code. Let your marketing team work freely without nudging your dev&#x27; team.</p>
                </div>
                <div class="feature"><img src="https://github.com/danielunited/twik-lp-marketers/blob/main/images/icon3.png?raw=true" loading="lazy" alt="" class="image">
                    <h3>Auto-personalize navigation &amp; catalogues<br></h3>
                    <p>Maximize sales with automated scoring of site menu items and product catalogues. Use twik’s magic to create and match a unique version of your site per each visitor with the ultimate goal of increasing sales.<br></p>
                </div>
                <div class="feature"><img src="https://github.com/danielunited/twik-lp-marketers/blob/main/images/icon4.png?raw=true" loading="lazy" alt="" class="image">
                    <h3>Audience intel&#x27; &amp; targeting<br></h3>
                    <p>Tap into your audience. Easily define user profile groups to be used for targeting, retargeting, experimentation, or business intelligence.<br></p>
                </div>
                <div class="feature"><img src="https://github.com/danielunited/twik-lp-marketers/blob/main/images/icon5.png?raw=true" loading="lazy" alt="" class="image">
                    <h3>Full control<br></h3>
                    <p>Tweak every element. Control every piece of content, such as text, image, color, destination url, and more.<br></p>
                </div>
                <div class="feature"><img src="https://github.com/danielunited/twik-lp-marketers/blob/main/images/icon6.png?raw=true" loading="lazy" alt="" class="image">
                    <h3>Twik n’ play<br></h3>
                    <p>A library of user experience enhancers available for twik-powered websites. Pop-up generator, currency convert, input validation, sticky header, accessibility options, and more features, ready for immediate activation on your site.<br></p>
                </div>
            </div>
        </div>
    </div>
    <div class="section cta-section">
        <div class="wide-container">
            <div class="text-center white-text">
                <h1>Ready to start? It&#x27;s free.</h1>
                <p class="white-text mb36">Our freemium model lets you get started quickly and pay as you grow<br></p>
                <a href="https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?response_type=code&access_type=offline&client_id=496673480121-8jm728bm1d6lk99sbq18ukj1d43oo3ks.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fapi.twik.io%2Foauth2callback&state=%7B%22referer%22%3A%22%22%2C%22origin%22%3A%22https%3A%5C%2F%5C%2Fwww.twik.io%5C%2F%22%7D&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&include_granted_scopes=true&prompt=consent&flowName=GeneralOAuthFlow"
                    class="cta white-btn w-button">Get Started Free</a>
                <div class="div-block">
                    <div>
                        <div class="text-block contact-us contact-us-secondary">Contact us</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="section" style="padding: 0;">
        <div style="width: 100%">
            <div id="pricing" style="width: 100%">
                <div class="twik-banner gray gr">
                    <div class="container" style="margin-top: -77px">
                        <div class="row justify-content-center">
                            <div class="col-12 col-lg-10">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-12 col-xxl-11">
                                            <div class="row">
                                                <div class="col-8 col-xxl-10"></div>
                                                <div class="col-3 col-xxl-2 price-tab">
                                                    <p><small>Monthly billed</small>
                                                    </p>
                                                </div>
                                            </div>
                                            <div id="features"></div>
                                            <div class="customer_success_wrapper" id="customer_success_wrapper">
                                                <div id="pixel_query_container"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="container">
                                    <div class="row justify-content-center">
                                        <div class="col-10 col-md-6 col-lg-5">
                                            <div class="kard bordered padding-x2 align-center total-kard" style="margin-bottom: -100px">
                                                <div>
                                                    <p style="margin-bottom: 5px;">
                                                        Estimated cost</p>
                                                    <p class="p5"><span id="pricing_total">0</span>
                                                        <small>/ month</small></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="section more-padding-bottom faces-bg">
        <div class="wide-container wider">
            <div class="text-center">
                <h1>Make it personal</h1>
                <p class="mb36">Start free, pay as you grow<br></p>
                <a href="https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?response_type=code&access_type=offline&client_id=496673480121-8jm728bm1d6lk99sbq18ukj1d43oo3ks.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fapi.twik.io%2Foauth2callback&state=%7B%22referer%22%3A%22%22%2C%22origin%22%3A%22https%3A%5C%2F%5C%2Fwww.twik.io%5C%2F%22%7D&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&include_granted_scopes=true&prompt=consent&flowName=GeneralOAuthFlow"
                    class="cta w-button">Get Started Free</a>
                <div class="div-block">
                    <div>
                        <div class="text-block contact-us contact-us-secondary">Contact us</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="legal-info">
        <div class="wide-container">
            <div>
                <a href="https://www.twik.io/privacy/" target="_blank" class="footer-links">Privacy</a>
                <a href="https://www.twik.io/terms/" target="_blank" class="footer-links">Terms</a>
                <a href="https://www.twik.io/gdpr/" target="_blank" class="footer-links">GDPR</a>
                <a href="https://www.twik.io/accessibility/" target="_blank" class="footer-links">Accessibility</a>
            </div>
        </div>
    </div>
    <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=600ff3ff7e8fd9110f4fe5c0" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="js/webflow.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>
    <script src="scripts/pricing.js"></script>
    <!-- [if lte IE 9]><script src="https://cdnjs.cloudflare.com/ajax/libs/placeholders/3.0.2/placeholders.min.js"></script><![endif] -->
    <script>
        $('.contact-us').click(function() {
            let status = $('.contact-us-form').css('display')
            $('.contact-us-form').toggle(200)
            if (status != 'block') {
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#start").offset().top
                }, 400);
            }
        })
    </script>
`;

document.getElementsByTagName("head")[0].innerHTML = newHead;
document.getElementsByTagName("body")[0].innerHTML = newBody;
(() => {
  const features = {
    domains: {
      name: "Domains",
      item: "domains",
      desc: "First domain free",
      rangeMin: 0,
      rangeMax: 100,
      free: 1,
      price: 20,
      per: " / domain",
      count: 1,
      total: 0,
      tooltip:
        "More than one domain will allow connection between your projects in one account (Such as monitoring and sharing content from one domain to another).",
    },
    recording_pageviews: {
      name: "Business Intelligence",
      item: "pageviews",
      desc: "First 10k pageviews free",
      rangeMin: 0,
      rangeMax: 1000000,
      free: 10000,
      price: 0,
      per: " / pageview",
      count: 10000,
      total: 0,
      relyOn: ["personalization"],
      tooltip:
        "This allows you to record traffic on your website. every KPI that can help you increase CRO, This information is critical to help you review site performance and analyze the visitor journey.",
    },
    personalization: {
      name: "AI Personalization\n",
      item: "session",
      desc: "First 5k pageviews free",
      rangeMin: 0,
      rangeMax: 1000000,
      free: 2000,
      price: 0.01,
      count: 5000,
      total: 0,
      dependsOn: ["recording_pageviews"],
      tooltip:
        "Twik delivers AI-based personalized content to enhance user experience and increase engagement.",
    },
    dynamic_variants: {
      name: "Live Content",
      item: "scrapers",
      desc: "First dynamic variant free",
      rangeMin: 0,
      rangeMax: 100,
      free: 1,
      price: 10,
      per: " / dynamic variant",
      count: 1,
      total: 0,
      tooltip:
        "A live piece of content that changes in real-time. This can be an element from another page on your website or from another domain.",
    },
  };

  function pricingTotal() {
    console.log("test");
    let total = 0;
    Object.keys(features).forEach((feature) => {
      if (feature === "pixel_queries" && features["pixel_queries"].disabled) {
      } else {
        total += features[feature].total;
      }
    });
    $("#pricing_total").text(numeral(total).format("($0.0a)"));
  }

  function updateFeature(id, progress, count, _total) {
    const total =
      count * features[id].price - features[id].free * features[id].price;
    $(`#${id}_progress`).width(progress + "%");
    $(`#${id}_progress`).removeClass(total === 0 ? "blue" : "green");
    $(`#${id}_progress`).addClass(total === 0 ? "green" : "blue");
    const n = numeral(total).format(total < 1000 ? "($0a)" : "($0.00a)");
    $(`#${id}_count`).text(numeral(count).format("0a"));
    $(`#${id}_total`).text(
      total === 0 ? (features[id].free > 0 ? "Free" : n) : n
    );
    $(`#${id}_total`).removeClass("green blue");
    $(`#${id}_total`).addClass(
      total === 0 ? (features[id].free > 0 ? "green" : "") : "blue"
    );
    $(`#${id} .price-switch`).removeClass("green blue");
    $(`#${id} .price-switch`).addClass(
      total === 0 ? (features[id].free > 0 ? "green" : "") : "blue"
    );
    features[id].count = count;
    features[id].total = total;
  }

  function applyFeature(container, f, isLast = false) {
    const id = f;
    const feature = features[f];
    container.append(`
        <div class="pricing-block ${feature.disabled ? "disabled" : ""} ${
      isLast ? "last" : ""
    }" id="${id}">
            <div class="row">
                <div class="col-8 col-xxl-10 feature-col">
                    <div class="row">
                        <div class="col">
                            <h5>
		                        <span>${
                              feature.name
                            } <span class="twik-tooltip-container"><span class="feature-info twik-tooltip-trigger">?</span><span class="twik-tooltip"><span>${
      feature.tooltip
    }</span></span></span></span>
		                    </h5>
                            <p class="per"><small>¢1 / ${
                              feature.item
                            }</small></p>
		                    <div class="range-slider-wrapper">
				                ${
                          feature.free > 0
                            ? '<div class="range-slider-prefix"><div></div></div>'
                            : ""
                        }
				                <div class="range-slider-container" id="${id}_slider">
				                    <div class="range-slider">
				                        <div class="range-slider-progress ${
                                  feature.total === 0 ? "green" : ""
                                }" id="${id}_progress"
				                             style="width: 0">
				                            <div class="range-slider-cursor">
				                                <span></span>
				                            </div>
				                        </div>
				                        <div class="range-slider-track"></div>
				                    </div>
				                </div>
				            </div>
						</div>
					</div>
                </div>
                <div class="col-3 col-xxl-2 align-center price-col">
                    <p class="p3"><span id="${id}_count">${numeral(
      feature.free
    ).format("0a")}</span></p>
                    <p><small>TARGETED ${
                      feature.item.toUpperCase() + "S"
                    }</small></p>
                    <p class="price-switch ${
                      features[id].total === 0
                        ? features[id].free > 0
                          ? "green"
                          : ""
                        : "blue"
                    }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="103.53" height="89.66" viewBox="0 0 103.53 89.66">
  <path id="Polygon_9" data-name="Polygon 9" d="M3094.34,1651.43l-25.88,44.83h-51.77l-25.88-44.83,25.88-44.83h51.77Z" transform="translate(-2990.81 -1606.59)"/>
</svg>
                        <span class="price-text" id="${id}_total"></span>
					</p>
				</div>
				<div class="col-2"></div>
            </div>
        </div>
        `);
    const progress = (feature.free * 100) / feature.rangeMax;
    const count = Math.round((progress * feature.rangeMax) / 100);
    const total = count * feature.price - feature.free * feature.price;
    const n = numeral(total).format("($0.0a)");
    $(`#${id}_progress`).width(progress + "%");
    $(`#${id}_total`).text(total === 0 ? (feature.free > 0 ? "Free" : n) : n);

    function onMouseMove(e) {
      onSliderMove(e, $(`#${id}_slider`));
    }

    $("body")
      .on("mousedown", `#${id}_slider`, function () {
        $("body").on("mousemove", onMouseMove);
      })
      .on("touchstart", `#${id}_slider`, function () {
        $("body").on("touchmove", onMouseMove);
      })
      .on("mouseup", function () {
        $("body").unbind("mousemove", onMouseMove);
      })
      .on("touchend", `#${id}_slider`, function () {
        $("body").unbind("touchmove", onMouseMove);
      });
    $("#customer_success").change(function () {
      if (this.checked) {
        updateFeature(
          "customer_support",
          null,
          1,
          features["customer_support"].price
        );
        $("#customer_success_wrapper").addClass("checked");
        features["pixel_queries"].disabled = false;
        $("#pixel_queries_slider")
          .parents(".pricing-block")
          .removeClass("disabled");
        $("#customer_success_count").text(1);
      } else {
        updateFeature("customer_support", null, 0, 0);
        $("#customer_success_wrapper").removeClass("checked");
        features["pixel_queries"].disabled = true;
        $("#pixel_queries_slider")
          .parents(".pricing-block")
          .addClass("disabled");
        $("#customer_success_count").text(0);
      }
      pricingTotal();
    });

    function onSliderMove(e, el) {
      if (feature.disabled) return;
      const rangeMin = feature.rangeMin;
      const rangeMax = feature.rangeMax;
      const pageX = e.pageX || e.changedTouches[0].pageX;
      const pos = Math.round(pageX - el.offset().left);
      const percentage = Math.ceil((100 / el.width()) * pos);
      const min = (feature.free * 100) / rangeMax;
      const progress = Math.min(Math.max(min, percentage), 100);
      const count = Math.round((progress * rangeMax) / 100);
      const total = count * feature.price - feature.free * feature.price;
      updateFeature(id, progress, count, total);
      if (feature.dependsOn) {
        feature.dependsOn.forEach((_feature) => {
          if (features[id].count > features[_feature].count) {
            updateFeature(_feature, progress, count, total);
          }
        });
      }
      if (feature.relyOn) {
        feature.relyOn.forEach((_feature) => {
          if (features[id].count < features[_feature].count) {
            updateFeature(_feature, progress, count, total);
          }
        });
      }
      pricingTotal();
    }
  }

  $(document).ready(function () {
    const firstItems = ["personalization"];
    firstItems.forEach((feature, i) => {
      const isLast = i === firstItems.length - 1;
      applyFeature($("#features"), feature, isLast);
    });
    //applyFeature($('#pixel_query_container'), 'pixel_queries', true);
    $("#pricing_total").text(numeral(0).format("($0.0a)"));
  });

  $(document).ready(function () {
    $("body")
      .on("mouseenter", ".twik-tooltip-trigger", function () {
        $(this).siblings(".twik-tooltip").addClass("in");
      })
      .on("touchstart", ".twik-tooltip-trigger", function () {
        $(this).siblings(".twik-tooltip").addClass("in");
      })
      .on("touchstart", ".twik-tooltip", function () {
        $(this).removeClass("in");
      })
      .on("mouseleave", ".twik-tooltip-trigger", function () {
        $(this).siblings(".twik-tooltip").removeClass("in");
      });
  });

  //  CONTACT US BUTTONS

  // primary button
  let primary_btn = document.getElementsByClassName("contact-us-primary")[0];
  primary_btn.addEventListener("click", function (e) {
    e.stopPropagation();
    $(".contact-us-form").toggle(200);
  });

  // secondary button
  let secondary_btns = document.getElementsByClassName("contact-us-secondary");
  for (btn of secondary_btns) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      let status = $(".contact-us-form").css("display");
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: $("#start").offset().top,
        },
        400
      );
      if (status != "block") {
        $(".contact-us-form").toggle(200);
      }
    });
  }

  // video open close buttons
  let play_vid_btn = document.getElementsByClassName("play-video")[0];
  let close_vid_btn = document.getElementsByClassName("image-6")[0];
  let video = document.getElementsByClassName("thisone")[0];
  let video_child = video.children[0];

  function display_flex() {
    if (video.children.length === 0) {
      video.appendChild(video_child);
    }
    video.style.display = "flex";
  }

  function display_none() {
    if (video.children.length === 1) {
      video.removeChild(video_child);
    }
    video.style.display = "none";
  }

  play_vid_btn.addEventListener("click", display_flex);
  close_vid_btn.addEventListener("click", display_none);
})();
