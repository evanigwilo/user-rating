export const {
  REACT_APP_SERVER_API_VERSION,
  REACT_APP_SERVER_HOST,
  REACT_APP_SERVER_PATH,
  REACT_APP_SERVER_PORT,
  REACT_APP_SERVER_PROTOCOL,
} = process.env;

export const devAccounts = [
  "Alice",
  "Bob",
  "Charlie",
  "Dave",
  "Eve",
  "Ferdie",
] as const;

export const rateCandidates = ["Alice", "Bob", "Eve"] as const;
