module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert'],
    ],
    'subject-case': [0],
    'subject-min-length': [2, 'always', 8],
    'subject-max-length': [2, 'always', 60],
    'subject-full-stop': [0],
    'scope-empty': [2, 'always'],
  },
}
