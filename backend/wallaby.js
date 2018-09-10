module.exports = function () {
    return {
      tests: [
        'tests/**/*.js'
      ],
  
      env: {
        type: 'node',
        runner: 'node'  // or full path to any node executable
      }
    };
  };