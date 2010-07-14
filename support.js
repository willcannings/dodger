// uses a variable number of parameters to get the properties
// that should be checked. Used for checking option values.
// ensurePropertiesPresent(options, 'width', 'height')
function ensurePropertiesPresent(options) {
  if(options == undefined || options == null)
    throw "Options not supplied";
  
  for(var i = 1, ii = arguments.length; i < ii; i++)
    if(options[arguments[i]] == undefined || options[arguments[i]] == null)
      throw arguments[i] + " is a required property";
}

// takes a set of default options and overwrites the values
// with any options found from options
function mergeOptions(defaultOptions, userOptions, object) {
  for(option in defaultOptions) {
    if(userOptions[option] != undefined)
      object[option] = userOptions[option];
    else
      object[option] = defaultOptions[option];
  }
}
