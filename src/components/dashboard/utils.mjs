const sanitize = (input) => {
  // Input type checking
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }

  // Input length checking
  if (input.length === 0) {
    throw new Error('Input cannot be empty');
  }

  // Regex pattern matching
  const regex = /^[a-zA-Z0-9]+$/;
  if (!regex.test(input)) {
    throw new Error('Input contains illegal characters');
  }

  // Blacklist checking
  const blacklist = ['<script>', 'alert', 'prompt', 'confirm'];
  if (blacklist.includes(input.toLowerCase())) {
    throw new Error(`Input contains blacklisted word: ${input}`);
  }

  // Whitelist checking
  const whitelist = ['username', 'email', 'password'];
  if (!whitelist.includes(input.toLowerCase())) {
    throw new Error(`Input must be one of these values: ${whitelist.join(', ')}`);
  }

  // Case sensitivity
  input = input.toLowerCase();

  // Encoding
  input = encodeURI(input);

  return input;
};

const validate = (input) => {
  // Input type checking
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }

  // Input length checking
  if (input.length === 0) {
    throw new Error('Input cannot be empty');
  }

  // Regex pattern matching
  const regex = /^[a-zA-Z0-9]+$/;
  if (!regex.test(input)) {
    throw new Error('Input contains illegal characters');
  }

  // Blacklist checking
  const blacklist = ['<script>', 'alert', 'prompt', 'confirm'];
  if (blacklist.includes(input.toLowerCase())) {
    throw new Error(`Input contains blacklisted word: ${input}`);
  }

  // Whitelist checking
  const whitelist = ['username', 'email', 'password'];
  if (!whitelist.includes(input.toLowerCase())) {
    throw new Error(`Input must be one of these values: ${whitelist.join(', ')}`);
  }

  // Case sensitivity
  input = input.toLowerCase();

  // Encoding
  input = encodeURI(input);

  return input;
};

export { sanitize, validate };
