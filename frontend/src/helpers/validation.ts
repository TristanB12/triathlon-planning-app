const isEmail = (email: string): boolean => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const isRequired = <T>(value: T): boolean => (!!value);

export { isEmail, isRequired };